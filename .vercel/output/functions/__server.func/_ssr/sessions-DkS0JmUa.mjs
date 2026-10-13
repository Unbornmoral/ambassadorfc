import { l as supabase } from "./store-BHxlUJJ1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sessions-DkS0JmUa.js
var TEAM_ID = "455bb402-3f15-425e-a84d-11cd2525395f";
async function getSessions() {
	const { data, error } = await supabase.from("training_sessions").select("*").order("date");
	if (error) throw error;
	return data ?? [];
}
async function createSession(session) {
	const { data, error } = await supabase.from("training_sessions").insert({
		team_id: TEAM_ID,
		title: session.title,
		date: session.date,
		time: session.time,
		location: session.location,
		notes: session.notes ?? null
	}).select();
	if (error) throw error;
	return data;
}
async function deleteSessionById(id) {
	const { error } = await supabase.from("training_sessions").delete().eq("id", id);
	if (error) throw error;
}
//#endregion
export { deleteSessionById as n, getSessions as r, createSession as t };
