import { supabase } from "@/lib/supabase";

export async function createSessions(sessions: any[]) {
  const { data, error } = await supabase
    .from("training_sessions")
    .insert(
      sessions.map((session) => ({
        team_id: "455bb402-3f15-425e-a84d-11cd2525395f",
        title: session.title,
        date: session.date,
        time: session.time,
        location: session.location,
        notes: session.notes,
      }))
    )
    .select();

  if (error) throw error;

  return data;
}