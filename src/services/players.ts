import { supabase } from "@/lib/supabase";

export async function createPlayers(players: any[]) {
  const { data, error } = await supabase
    .from("players")
    .insert(
      players.map((player) => ({
  team_id: "455bb402-3f15-425e-a84d-11cd2525395f",

  full_name: player.fullName,
  jersey_number: player.jerseyNumber,
  phone_number: player.phoneNumber,
  position: player.position,
  active: player.active,
  pac: player.attributes.pac,
  sho: player.attributes.sho,
  pas: player.attributes.pas,
  dri: player.attributes.dri,
  def: player.attributes.def,
  phy: player.attributes.phy,
  overall: player.overall,
  form: player.form,
}))
    )
    .select();

  if (error) throw error;

  return data;
}