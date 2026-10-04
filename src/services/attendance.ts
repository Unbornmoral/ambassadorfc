import { supabase } from "@/lib/supabase";

export async function getSupabasePlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*");

  if (error) throw error;

  return data;
}

export async function getSupabaseSessions() {
  const { data, error } = await supabase
    .from("training_sessions")
    .select("*");

  if (error) throw error;

  return data;
}

export async function createAttendance(records: any[]) {
  const { data, error } = await supabase
    .from("attendance_records")
    .insert(records)
    .select();

  if (error) throw error;

  return data;
}
``