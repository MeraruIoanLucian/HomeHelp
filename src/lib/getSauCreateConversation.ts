//nu prea are nevoie de explicatii, ca in nume zice tot

import { supabase } from "./supabase"

export async function getOrCreateConversation(jobId: string, helpedId: string, helperId: string) {

    const { data: conversation } = await supabase
        .from("conversations")
        .select("*")
        .eq("job_id", jobId)
        .eq("helped_id", helpedId)
        .eq("helper_id", helperId)
        .maybeSingle()

    if (conversation) {
        return conversation
    }

    const { data: newConversation } = await supabase
        .from("conversations")
        .insert({
            job_id: jobId,
            helped_id: helpedId,
            helper_id: helperId,
        })
        .select()
        .single()

    return newConversation

}