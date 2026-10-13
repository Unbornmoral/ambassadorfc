import { supabase } from "@/lib/supabase";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_settings")
    .select("admin_password")
    .limit(1)
    .single();

  if (error) throw error;
  return data.admin_password === password;
}
