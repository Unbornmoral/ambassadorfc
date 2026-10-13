import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as supabase } from "./store-BHxlUJJ1.mjs";
import { v as cn } from "./AppShell-BSlUBO1-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ClubUI-C_SwkKfy.js
var import_jsx_runtime = require_jsx_runtime();
async function createPlayer(player) {
	console.log("PLAYER PAYLOAD:", player);
	const { data, error } = await supabase.from("players").insert({
		team_id: "455bb402-3f15-425e-a84d-11cd2525395f",
		full_name: player.fullName,
		jersey_number: player.jerseyNumber,
		phone_number: player.phoneNumber,
		position: player.position,
		active: true,
		pac: 50,
		sho: 50,
		pas: 50,
		dri: 50,
		def: 50,
		phy: 50,
		overall: 50,
		form: "Okay"
	}).select();
	console.log("SUPABASE DATA:", data);
	console.log("SUPABASE ERROR:", error);
	if (error) throw error;
	return data;
}
async function getPlayers() {
	const { data, error } = await supabase.from("players").select("*").order("jersey_number");
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
			phy: player.phy
		}
	}));
}
async function updatePlayerById(id, player) {
	const { data, error } = await supabase.from("players").update({
		full_name: player.fullName,
		jersey_number: player.jerseyNumber,
		phone_number: player.phoneNumber,
		position: player.position
	}).eq("id", id).select();
	if (error) throw error;
	return data;
}
async function deletePlayerById(id) {
	const { error } = await supabase.from("players").delete().eq("id", id);
	if (error) throw error;
}
async function updatePlayerRatings(id, attributes, overall, form) {
	const { data, error } = await supabase.from("players").update({
		pac: attributes.pac,
		sho: attributes.sho,
		pas: attributes.pas,
		dri: attributes.dri,
		def: attributes.def,
		phy: attributes.phy,
		overall,
		form
	}).eq("id", id).select();
	if (error) throw error;
	return data;
}
function SectionTitle({ kicker, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-end gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-condensed text-xs font-bold uppercase tracking-[0.3em] text-primary",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-1 font-display text-3xl text-foreground",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mb-2 h-0.5 flex-1 bg-foreground/80" })]
	});
}
function initials(name) {
	return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}
/** Shirt-style squad number with player initials avatar. */
function SquadNumber({ number, name, size = "md", className }) {
	const big = size === "lg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mr-3 shrink-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex items-center justify-center rounded-full bg-secondary font-condensed font-bold text-secondary-foreground ring-2 ring-card", big ? "size-14 pr-2 text-base" : "size-11 pr-2 text-xs"),
			children: initials(name)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("absolute -bottom-1 -right-4 flex items-center justify-center rounded-md bg-pitch font-display text-pitch-foreground ring-2 ring-card", big ? "h-6 min-w-6 px-1 text-sm" : "h-5 min-w-5 px-0.5 text-xs"),
			children: number
		})]
	});
}
var POSITION_ORDER = [
	"Goalkeeper",
	"Defender",
	"Midfielder",
	"Forward"
];
var POSITION_PLURAL = {
	Goalkeeper: "Goalkeepers",
	Defender: "Defenders",
	Midfielder: "Midfielders",
	Forward: "Forwards"
};
//#endregion
export { createPlayer as a, updatePlayerById as c, SquadNumber as i, updatePlayerRatings as l, POSITION_PLURAL as n, deletePlayerById as o, SectionTitle as r, getPlayers as s, POSITION_ORDER as t };
