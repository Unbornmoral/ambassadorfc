import { supabase } from "@/lib/supabase";


const TEAM_ID = "455bb402-3f15-425e-a84d-11cd2525395f";

export async function getSessions() {
  const { data, error } = await supabase
    .from("training_sessions")
    .select("*")
    .order("date");

  if (error) throw error;

  return data ?? [];
}

export async function createSession(session: any) {
  const { data, error } = await supabase
    .from("training_sessions")
    .insert({
      team_id: TEAM_ID,
      title: session.title,
      date: session.date,
      time: session.time,
      location: session.location,
      notes: session.notes ?? null,
    })
    .select();

  if (error) throw error;

  return data;
}

export async function deleteSessionById(id: string) {
  const { error } = await supabase
    .from("training_sessions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}