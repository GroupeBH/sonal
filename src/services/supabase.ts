import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://nrlueptwurrexkflrldk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybHVlcHR3dXJyZXhrZmxybGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MDYwMzEsImV4cCI6MjA1NjE4MjAzMX0.C56xQ7rEJwICGA38YqYzCMKcz5QvqrrcoNqpOber5r8");

export const postRequest = async(req_name: string, body: object) => {
    const { data: thisData, error: thisError } = await supabase.rpc(req_name, body);

    return { data: thisData, error: thisError }
}

export const getElementsRequest = async(table: string) => {
    const { data: thisData } = await supabase
    .from(table)
    .select(`
      *
    `)

    return { data: thisData }
}

export const getElementRequest = async(table: string, id: string) => {
    const { data: thisData } = await supabase
    .from(table)
    .select(`
      *
    `)
    .eq("id", id)
    .single()

    return { data: thisData }
}