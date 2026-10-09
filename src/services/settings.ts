import { supabase } from "@/lib/supabase";

const TEAM_ID = "455bb402-3f15-425e-a84d-11cd2525395f";

export async function getSettings() {
  const { data, error } = await supabase
    .from("team_settings")
    .select("*")
    .eq("team_id", TEAM_ID)
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export async function updateSettings({
  teamName,
  coachName,
  coachPhone,
  defaultLocation,
}: {
  teamName: string;
  coachName: string;
  coachPhone: string;
  defaultLocation: string;
}) {
  const { data: existing } = await supabase
    .from("team_settings")
    .select("*")
    .eq("team_id", TEAM_ID)
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("team_settings")
      .update({
        default_location: defaultLocation,
        team_name: teamName,
        coach_name: coachName,
        coach_phone: coachPhone,
      })
      .eq("id", existing.id);

    if (error) throw error;

    return;
  }

  const { error } = await supabase
    .from("team_settings")
    .insert({
      team_id: TEAM_ID,
      default_location: defaultLocation,
      team_name: teamName,
      coach_name: coachName,
      coach_phone: coachPhone,
    });

  if (error) throw error;
}