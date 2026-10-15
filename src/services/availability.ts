import { supabase } from "@/lib/supabase";

export async function getAvailability(sessionId: string) {
  const { data, error } = await supabase
    .from("player_availability")
    .select("*")
    .eq("session_id", sessionId);

  if (error) throw error;

  return data ?? [];
}

export async function setAvailability(
  playerId: string,
  sessionId: string,
  status: string,
) {
  const { error } = await supabase
    .from("player_availability")
    .upsert(
      {
        player_id: playerId,
        session_id: sessionId,
        status,
      },
      {
        onConflict: "player_id,session_id",
      },
    );

  if (error) throw error;
}

export async function clearAvailability(
  playerId: string,
  sessionId: string,
) {
  const { error } = await supabase
    .from("player_availability")
    .delete()
    .eq("player_id", playerId)
    .eq("session_id", sessionId);

  if (error) throw error;
}