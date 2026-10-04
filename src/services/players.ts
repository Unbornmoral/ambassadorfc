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

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("jersey_number");

  

  if (error) throw error;

  return (data ?? []).map((player) => ({
  id: player.id,
  fullName: player.full_name,
  jerseyNumber: player.jersey_number,
  position: player.position,
  phoneNumber: player.phone_number,
  active: player.active,
  overall: player.overall,
  form: player.form,
  attributes: {
    pac: player.pac,
    sho: player.sho,
    pas: player.pas,
    dri: player.dri,
    def: player.def,
    phy: player.phy,
  },
}));
}