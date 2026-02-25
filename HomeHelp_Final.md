# 🛠️ HomeHelp — Marketplace pentru Servicii Tehnice la Domiciliu

> **Limba interfeței**: Engleză | **Plată**: Stripe (planificat post-MVP)

## 📝 Descriere Generală

O platformă web de tip marketplace care conectează **proprietarii de locuințe** (_Helped_) cu **specialiști tehnici** (_Helpers_) pentru reparații de nișă: instalații sanitare, centrale termice, electrice, climatizare, etc. Aplicația facilitează întreg procesul — de la postarea problemei, negocierea prețului prin chat, până la finalizarea lucrării și review — inspirată de modelul de interacțiune **Vinted**.

---

## 💻 Stack Tehnic

| Tehnologie       | Rol                | Justificare                                                                 |
| ---------------- | ------------------ | --------------------------------------------------------------------------- |
| React + Vite     | Frontend Framework | Performanță ridicată, HMR rapid, ecosistem vast                            |
| TypeScript       | Limbaj             | Type-safety, reducerea bug-urilor la runtime, documentare implicită a codului |
| Supabase         | BaaS (Backend)     | PostgreSQL, Auth gata configurat, Storage pentru imagini, Realtime (viitor) |
| Tailwind CSS     | Styling            | Design rapid, responsiv, consistență vizuală                               |
| Vercel           | Deployment         | CI/CD automat, performanță excelentă pentru SPA-uri                        |

---

## 🔄 Workflow-ul Aplicației (5 Etape)

### 1. Autentificare și Profilare
- Utilizatorul se înregistrează via **Supabase Auth** (email + parolă).
- La prima logare, alege un **rol**: _Helped_ sau _Helper_.
- **Helped** → profil simplu: nume, telefon, oraș.
- **Helper** → profil extins: nume, telefon, oraș, categorii de expertiză (din listă predefinită), descriere scurtă, experiență.

### 2. Postarea Problemei (Job / Ticket)
- Helped-ul creează un **Job** cu:
  - **Categorie** (selectată din listă predefinită: Instalații apă, Gaze, Electrice, Centrale termice, Climatizare, Altele)
  - **Titlu scurt** + **descriere detaliată**
  - **Fotografii** (opțional, stocate în Supabase Storage)
  - **Oraș / Zonă** (selectat din listă)
  - **Urgență** (scăzută / medie / urgentă)
  - **Buget orientativ** (opțional)
- Status inițial: `OPEN`

### 3. Discovery & Bidding (Negocierea)
- Helpers accesează un **feed filtrat** după oraș și categoriile lor de expertiză.
- Helper-ul vizualizează detaliile job-ului și poate trimite o **Ofertă**:
  - Preț propus
  - Mesaj explicativ
- La trimiterea ofertei, se deschide automat un **canal de chat** privat între Helped și Helper.
- Chatul funcționează cu **refresh** (polling); în viitor se va migra la Supabase Realtime.

### 4. Acceptare & Execuție
- Helped-ul compară ofertele primite și **acceptă una**.
- Daca helpedul doreste sa negocieze pretul, o poate face prin chat.
- Status job: `OPEN` → `ASSIGNED` → `IN_PROGRESS`
- Celelalte oferte sunt marcate ca `REJECTED`.
- Chatul rămâne activ pentru coordonare (fotografii, detalii, programare).

### 5. Finalizare & Review
- Helped-ul marchează job-ul ca **COMPLETED**.
- Ambele părți pot lăsa un **review** (1-5 stele + comentariu).
- Rating-ul Helper-ului se actualizează automat (medie).

---

## 📍 State Machine — Ciclul de viață al unui Job

```
OPEN → ASSIGNED → IN_PROGRESS → COMPLETED
  ↘ CANCELLED / EXPIRED
```

| Tranziție                  | Declanșator                          |
| -------------------------- | ------------------------------------ |
| `OPEN → ASSIGNED`          | Helped acceptă o ofertă              |
| `ASSIGNED → IN_PROGRESS`   | Helper confirmă că a început lucrul  |
| `IN_PROGRESS → COMPLETED`  | Helped confirmă finalizarea          |
| `OPEN → EXPIRED`           | Nicio ofertă în termen              |
| `OPEN/ASSIGNED → CANCELLED`| Helped anulează (cu motiv)          |

---

## 🧩 Caracteristici Cheie (Features)

- **Chat privat per job** — comunicare directă Helped ↔ Helper
- **Sistem de oferte tip Vinted** — preț + mesaj, negociere în chat
- **Feed dinamic** — filtrare automată după orașul și expertiza Helper-ului
- **Sistem de review-uri** — construiește reputația pe platformă
- **Upload imagini** — Supabase Storage pentru fotografii ale problemei
- **Securitate RLS** — date protejate la nivel de rând
- **Responsive design** — funcționează și pe mobil (în browser)

---

## 🏗️ Schema Bazei de Date

### `profiles`
| Coloană          | Tip         | Descriere                                    |
| ---------------- | ----------- | -------------------------------------------- |
| `id`             | UUID (PK)   | = `auth.users.id`                            |
| `role`           | ENUM        | `helped` / `helper`                          |
| `full_name`      | TEXT        | Nume complet                                 |
| `phone`          | TEXT        | Telefon                                      |
| `city`           | TEXT        | Orașul                                        |
| `avatar_url`     | TEXT        | URL avatar (Storage)                         |
| `bio`            | TEXT        | Descriere scurtă (helper)                    |
| `rating_avg`     | NUMERIC     | Media rating-ului (helper)                   |
| `rating_count`   | INTEGER     | Nr. total review-uri (helper)                |
| `created_at`     | TIMESTAMPTZ | Data creării                                 |

### `categories` (predefinite)
| Coloană | Tip       | Descriere         |
| ------- | --------- | ----------------- |
| `id`    | UUID (PK) | ID categorie      |
| `name`  | TEXT      | Ex: "Instalații apă" |

### `helper_categories` (many-to-many)
| Coloană       | Tip       | Descriere                    |
| ------------- | --------- | ---------------------------- |
| `helper_id`   | UUID (FK) | → `profiles.id`              |
| `category_id` | UUID (FK) | → `categories.id`            |

### `jobs`
| Coloană        | Tip         | Descriere                        |
| -------------- | ----------- | -------------------------------- |
| `id`           | UUID (PK)   | ID job                           |
| `requester_id` | UUID (FK)   | → `profiles.id` (helped)         |
| `category_id`  | UUID (FK)   | → `categories.id`                |
| `title`        | TEXT        | Titlu scurt                      |
| `description`  | TEXT        | Descriere detaliată              |
| `photos`       | TEXT[]      | URL-uri imagini (Storage)        |
| `city`         | TEXT        | Orașul                           |
| `urgency`      | ENUM        | `low` / `medium` / `urgent`      |
| `budget`       | NUMERIC     | Buget orientativ (opțional)      |
| `status`       | ENUM        | `open`/`assigned`/`in_progress`/`completed`/`cancelled`/`expired` |
| `created_at`   | TIMESTAMPTZ | Data postării                    |

### `offers`
| Coloană      | Tip         | Descriere                      |
| ------------ | ----------- | ------------------------------ |
| `id`         | UUID (PK)   | ID ofertă                     |
| `job_id`     | UUID (FK)   | → `jobs.id`                    |
| `helper_id`  | UUID (FK)   | → `profiles.id` (helper)       |
| `price`      | NUMERIC     | Prețul propus                  |
| `message`    | TEXT        | Mesaj explicativ               |
| `status`     | ENUM        | `pending`/`accepted`/`rejected` |
| `created_at` | TIMESTAMPTZ | Data trimiterii                |

### `conversations`
| Coloană      | Tip         | Descriere                |
| ------------ | ----------- | ------------------------ |
| `id`         | UUID (PK)   | ID conversație           |
| `job_id`     | UUID (FK)   | → `jobs.id`              |
| `helped_id`  | UUID (FK)   | → `profiles.id`          |
| `helper_id`  | UUID (FK)   | → `profiles.id`          |
| `created_at` | TIMESTAMPTZ | Data deschiderii         |

### `messages`
| Coloană           | Tip         | Descriere                     |
| ----------------- | ----------- | ----------------------------- |
| `id`              | UUID (PK)   | ID mesaj                      |
| `conversation_id` | UUID (FK)   | → `conversations.id`          |
| `sender_id`       | UUID (FK)   | → `profiles.id`               |
| `body`            | TEXT        | Conținutul mesajului           |
| `type`            | ENUM        | `text` / `image`              |
| `created_at`      | TIMESTAMPTZ | Data trimiterii               |

### `reviews`
| Coloană        | Tip         | Descriere                     |
| -------------- | ----------- | ----------------------------- |
| `id`           | UUID (PK)   | ID review                     |
| `job_id`       | UUID (FK)   | → `jobs.id`                   |
| `from_user_id` | UUID (FK)   | Cine lasă review-ul           |
| `to_user_id`   | UUID (FK)   | Cine primește review-ul       |
| `stars`        | INTEGER     | 1-5                           |
| `comment`      | TEXT        | Comentariu (opțional)         |
| `created_at`   | TIMESTAMPTZ | Data review-ului              |

---

## 🔒 Securitate — Row Level Security (RLS)

| Tabel            | Regulă                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| `profiles`       | SELECT public; UPDATE doar pe propriul rând                            |
| `jobs`           | Helped: CRUD pe propriile job-uri; Helpers: SELECT doar pe job-uri `open` din orașul lor |
| `offers`         | Helper: INSERT/UPDATE pe propriile oferte; Helped: SELECT pe ofertele la job-urile sale |
| `conversations`  | SELECT/INSERT doar pentru participanți                                  |
| `messages`       | SELECT/INSERT doar pentru participanții conversației                    |
| `reviews`        | INSERT doar după `completed`, o singură dată per direcție per job       |

---

## 🗺️ Rute Web (Pagini)

| Rută                        | Descriere                                |
| --------------------------- | ---------------------------------------- |
| `/`                         | Landing page                             |
| `/login`                    | Autentificare                            |
| `/register`                 | Înregistrare + alegere rol               |
| `/dashboard`                | Dashboard principal (diferit per rol)    |
| `/jobs/new`                 | Creare job nou (Helped)                  |
| `/jobs`                     | Feed job-uri (Helper) / Job-urile mele (Helped) |
| `/jobs/:id`                 | Detalii job + oferte                     |
| `/chat`                     | Lista conversații                        |
| `/chat/:conversationId`     | Chat individual                          |
| `/profile`                  | Profil propriu (editare)                 |
| `/profile/:userId`          | Profil public (vizualizare)              |

---

## ⚠️ Edge Cases de Tratat

- **Niciun helper în oraș** → mesaj informativ, sugestie de repostare
- **Ofertă retrasă** → notificare Helped, celelalte oferte rămân active
- **Job expirat fără oferte** → status `EXPIRED`, opțiune de repostare
- **Abuz în chat** → buton de raportare, review negativ
- **Imagini invalide** → validare tip + dimensiune la upload

---

## 📊 Metrici pentru Demo / Susținere

- Număr total de job-uri postate / completate
- Rata de oferte per job
- Rating mediu per categorie
- Timp mediu până la prima ofertă

---

## 📖 Poveste Completă #1 — Perspectiva Helped (Maria)

> Maria are o problemă: centrala ei termică nu mai produce apă caldă.

1. **Înregistrare** — Maria intră pe HomeHelp, creează un cont cu email și parolă. Alege rolul **Helped**. Completează: nume, telefon, oraș (București).

2. **Postare Job** — Din dashboard, apasă **„Postează o problemă"**. Completează:
   - Categorie: *Centrale termice*
   - Titlu: *„Centrala nu mai face apă caldă"*
   - Descriere: *„Centrala Ariston funcționează pe încălzire dar nu mai produce apă caldă. Model X, 3 ani vechime."*
   - Fotografii: 2 poze cu centrala și codul de eroare
   - Oraș: *București*
   - Urgență: *Medie*
   - Buget: *200-400 RON*

3. **Primește oferte** — În câteva ore, Maria vede 3 oferte de la helpers diferiți:
   - Andrei: 250 RON — *„Probabil e senzorul NTC, am piese la mine"*
   - Cosmin: 350 RON — *„Trebuie diagnostic, prețul include deplasarea"*
   - Vlad: 200 RON — *„Pot veni mâine dimineață"*

4. **Chat & Negociere** — Maria deschide chatul cu Andrei pentru a întreba detalii. Întreabă: *„Cât durează reparația?"*. Andrei răspunde: *„~1 oră, am reparat multe Ariston-uri"*. Maria verifică profilul lui Andrei — rating 4.7/5, 23 review-uri.

5. **Acceptare** — Maria acceptă oferta lui Andrei (250 RON). Status: `ASSIGNED`. Celelalte oferte devin `REJECTED`. Cosmin și Vlad primesc notificare.

6. **Coordonare** — În chat, Andrei și Maria stabilesc: *„Joi, ora 14:00"*. Andrei confirmă: status → `IN_PROGRESS`.

7. **Finalizare** — Andrei repară centrala. Maria marchează job-ul ca **COMPLETED**.

8. **Review** — Maria lasă review: ⭐⭐⭐⭐⭐ *„Profesionist, rapid, a rezolvat problema în 45 de minute."* Rating-ul lui Andrei se actualizează.

---

## 📖 Poveste Completă #2 — Perspectiva Helper (Andrei)

> Andrei este tehnician specializat în centrale termice și instalații de gaz.

1. **Înregistrare** — Andrei creează cont pe HomeHelp, alege rolul **Helper**. Completează:
   - Nume: *Andrei Popescu*
   - Telefon, oraș: *București*
   - Categorii de expertiză: *Centrale termice*, *Instalații gaz*
   - Descriere: *„Tehnician autorizat ISCIR, 8 ani experiență, specializat pe Ariston, Vaillant, Viessmann."*

2. **Descoperă job-uri** — Din dashboard, Andrei vede **feed-ul de job-uri** filtrat automat pe orașul său (București) și categoriile sale. Vede job-ul Mariei: *„Centrala nu mai face apă caldă"*.

3. **Analizează și trimite ofertă** — Deschide job-ul, citește descrierea, se uită la poze. Trimite o **ofertă**:
   - Preț: *250 RON*
   - Mesaj: *„Probabil e senzorul NTC, am piese la mine. Pot veni în 1-2 zile."*
   - Se deschide automat un **chat** cu Maria.

4. **Conversație** — Maria îl întreabă detalii. Andrei răspunde profesionist, câștigă încrederea ei.

5. **Ofertă acceptată** — Andrei primește notificare: **oferta a fost acceptată!** Status job: `ASSIGNED`.

6. **Execuție** — Joi la 14:00, Andrei ajunge la Maria. Marchează `IN_PROGRESS` din aplicație. Repară centrala în 45 de minute.

7. **Job completat** — Maria confirmă finalizarea. Status: `COMPLETED`.

8. **Review primit** — Andrei primește review de 5 stele. Rating-ul său crește de la 4.65 la 4.70. Profilul său devine mai vizibil pe platformă.

9. **Continuă** — Andrei se întoarce la feed și caută următorul job. Cu cât are mai multe review-uri bune, cu atât mai multă încredere câștigă de la viitorii clienți.

---

## 🚀 Plan de Dezvoltare (Priorități)

### MVP (Minimum Viable Product)
- [x] Definire arhitectură și schema DB
- [ ] Setup proiect: React + Vite + TypeScript + Tailwind
- [ ] Configurare Supabase: Auth, DB, Storage, RLS
- [ ] Autentificare (login / register / alegere rol)
- [ ] CRUD Job-uri (creare, listare, detalii)
- [ ] Sistem oferte (trimitere, vizualizare, acceptare)
- [ ] Chat simplu (polling/refresh)
- [ ] Sistem review-uri
- [ ] Profil utilizator (vizualizare + editare)
- [ ] Deploy pe Vercel

### Nice-to-have (Post-MVP)
- [ ] Realtime chat (Supabase Realtime)
- [ ] Plată online cu **Stripe** (checkout, transfer către helper)
- [ ] Notificări in-app
- [ ] Hartă vizuală pentru locație
- [ ] Dashboard cu statistici
- [ ] Dark mode
- [ ] Filtru avansat (preț, rating, urgență)
