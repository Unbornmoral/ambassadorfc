import { supabase } from "@/lib/supabase";

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function createAnnouncement(
  title: string,
  message: string
) {
  const { error } = await supabase
    .from("announcements")
    .insert({
      title,
      message,
    });

  if (error) throw error;
}

export async function deleteAnnouncement(
  id: string
) {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;
}