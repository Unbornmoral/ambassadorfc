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

export async function getAttendanceRecords() {
  const { data, error } = await supabase
    .from("attendance_records")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

export async function createAttendance(records: any[]) {
  const { data, error } = await supabase
    .from("attendance_records")
    .insert(records)
    .select();

  if (error) throw error;

  return data;
}

export async function setAttendanceRecord(
  sessionId: string,
  playerId: string,
  status: string
) {
  const { data: existing, error: findError } = await supabase
    .from("attendance_records")
    .select("*")
    .eq("session_id", sessionId)
    .eq("player_id", playerId)
    .maybeSingle();

  if (findError) throw findError;

  if (existing) {
    const { error } = await supabase
      .from("attendance_records")
      .update({
        status,
      })
      .eq("id", existing.id);

    if (error) throw error;

    return;
  }

  const { error } = await supabase
    .from("attendance_records")
    .insert({
      session_id: sessionId,
      player_id: playerId,
      status,
    });

  if (error) throw error;
}

export async function clearAttendanceRecords(sessionId: string) {
  const { error } = await supabase
    .from("attendance_records")
    .delete()
    .eq("session_id", sessionId);

  if (error) throw error;
}