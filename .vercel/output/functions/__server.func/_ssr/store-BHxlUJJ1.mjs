import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BHxlUJJ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydGJkd29peG93cGRpbXB5ZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4OTY2OTYsImV4cCI6MjEwNjQ3MjY5Nn0.iAl90_MoUs6sSBHg57B8ve98Wc8sb88su10OA7BewDE",
	"VITE_SUPABASE_URL": "https://crtbdwoixowpdimpyevj.supabase.co"
}["VITE_SUPABASE_URL"];
var supabaseAnonKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydGJkd29peG93cGRpbXB5ZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4OTY2OTYsImV4cCI6MjEwNjQ3MjY5Nn0.iAl90_MoUs6sSBHg57B8ve98Wc8sb88su10OA7BewDE",
	"VITE_SUPABASE_URL": "https://crtbdwoixowpdimpyevj.supabase.co"
}["VITE_SUPABASE_ANON_KEY"];
if (!supabaseUrl || !supabaseAnonKey) throw new Error("Missing Supabase environment variables");
var supabase = createClient(supabaseUrl, supabaseAnonKey);
async function verifyAdminPassword(password) {
	const { data, error } = await supabase.from("admin_settings").select("admin_password").limit(1).single();
	if (error) throw error;
	return data.admin_password === password;
}
var AdminContext = (0, import_react.createContext)(null);
function AdminProvider({ children }) {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	async function login(password) {
		const valid = await verifyAdminPassword(password);
		if (valid) setIsAdmin(true);
		return valid;
	}
	function logout() {
		setIsAdmin(false);
	}
	const value = (0, import_react.useMemo)(() => ({
		isAdmin,
		login,
		logout
	}), [isAdmin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminContext.Provider, {
		value,
		children
	});
}
function useAdmin() {
	const context = (0, import_react.useContext)(AdminContext);
	if (!context) throw new Error("useAdmin must be used inside AdminProvider");
	return context;
}
var POSITIONS = [
	"Goalkeeper",
	"Defender",
	"Midfielder",
	"Forward"
];
var POSITION_SHORT = {
	Goalkeeper: "GK",
	Defender: "DEF",
	Midfielder: "MID",
	Forward: "FWD"
};
var DEFAULT_ATTRIBUTES = {
	Goalkeeper: {
		pac: 48,
		sho: 25,
		pas: 58,
		dri: 45,
		def: 74,
		phy: 70
	},
	Defender: {
		pac: 67,
		sho: 42,
		pas: 61,
		dri: 57,
		def: 73,
		phy: 74
	},
	Midfielder: {
		pac: 70,
		sho: 64,
		pas: 73,
		dri: 72,
		def: 62,
		phy: 67
	},
	Forward: {
		pac: 76,
		sho: 74,
		pas: 63,
		dri: 73,
		def: 35,
		phy: 68
	}
};
function calculateOverall(attributes, position) {
	const positionWeights = {
		Goalkeeper: {
			pac: .05,
			sho: .02,
			pas: .13,
			dri: .05,
			def: .5,
			phy: .25
		},
		Defender: {
			pac: .15,
			sho: .05,
			pas: .15,
			dri: .1,
			def: .35,
			phy: .2
		},
		Midfielder: {
			pac: .12,
			sho: .15,
			pas: .25,
			dri: .23,
			def: .12,
			phy: .13
		},
		Forward: {
			pac: .2,
			sho: .3,
			pas: .13,
			dri: .22,
			def: .03,
			phy: .12
		}
	}[position];
	return Math.round(attributes.pac * positionWeights.pac + attributes.sho * positionWeights.sho + attributes.pas * positionWeights.pas + attributes.dri * positionWeights.dri + attributes.def * positionWeights.def + attributes.phy * positionWeights.phy);
}
function uuid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function isoDaysFromNow(offset) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offset);
	return d.toISOString().slice(0, 10);
}
var NOW = (/* @__PURE__ */ new Date()).toISOString();
var LOCATION = "Ambassador FC Training Ground";
var ROSTER = [
	[
		"Emeka Okafor",
		1,
		"Goalkeeper",
		"+2348031000001",
		{
			pac: 52,
			sho: 24,
			pas: 62,
			dri: 48,
			def: 80,
			phy: 76
		},
		"Excellent"
	],
	[
		"Tunde Balogun",
		12,
		"Goalkeeper",
		"+2348031000002",
		{
			pac: 46,
			sho: 22,
			pas: 56,
			dri: 44,
			def: 73,
			phy: 69
		},
		"Good"
	],
	[
		"Samuel Adeyemi",
		2,
		"Defender",
		"+2348031000003",
		{
			pac: 74,
			sho: 41,
			pas: 64,
			dri: 61,
			def: 77,
			phy: 75
		},
		"Good"
	],
	[
		"Chinedu Eze",
		4,
		"Defender",
		"+2348031000004",
		{
			pac: 65,
			sho: 38,
			pas: 59,
			dri: 55,
			def: 80,
			phy: 82
		},
		"Excellent"
	],
	[
		"Musa Ibrahim",
		5,
		"Defender",
		"+2348031000005",
		{
			pac: 68,
			sho: 45,
			pas: 63,
			dri: 58,
			def: 75,
			phy: 79
		},
		"Good"
	],
	[
		"David Oyelaran",
		3,
		"Defender",
		"+2348031000006",
		{
			pac: 77,
			sho: 47,
			pas: 67,
			dri: 66,
			def: 72,
			phy: 71
		},
		"Okay"
	],
	[
		"Peter Nwosu",
		15,
		"Defender",
		"+2348031000007",
		{
			pac: 62,
			sho: 36,
			pas: 57,
			dri: 53,
			def: 71,
			phy: 76
		},
		"Good"
	],
	[
		"Kelechi Obi",
		6,
		"Midfielder",
		"+2348031000008",
		{
			pac: 69,
			sho: 63,
			pas: 78,
			dri: 76,
			def: 69,
			phy: 71
		},
		"Excellent"
	],
	[
		"Ifeanyi Ugo",
		8,
		"Midfielder",
		"+2348031000009",
		{
			pac: 72,
			sho: 68,
			pas: 75,
			dri: 74,
			def: 63,
			phy: 68
		},
		"Good"
	],
	[
		"Ahmed Bello",
		10,
		"Midfielder",
		"+2348031000010",
		{
			pac: 78,
			sho: 73,
			pas: 80,
			dri: 82,
			def: 49,
			phy: 64
		},
		"Excellent"
	],
	[
		"Joshua Ade",
		14,
		"Midfielder",
		"+2348031000011",
		{
			pac: 67,
			sho: 61,
			pas: 71,
			dri: 69,
			def: 66,
			phy: 73
		},
		"Okay"
	],
	[
		"Segun Ojo",
		16,
		"Midfielder",
		"+2348031000012",
		{
			pac: 74,
			sho: 65,
			pas: 72,
			dri: 77,
			def: 57,
			phy: 66
		},
		"Good"
	],
	[
		"Victor Agu",
		7,
		"Forward",
		"+2348031000013",
		{
			pac: 86,
			sho: 78,
			pas: 67,
			dri: 82,
			def: 32,
			phy: 70
		},
		"Excellent"
	],
	[
		"Daniel Etim",
		9,
		"Forward",
		"+2348031000014",
		{
			pac: 74,
			sho: 82,
			pas: 62,
			dri: 75,
			def: 34,
			phy: 80
		},
		"Good"
	],
	[
		"Bright Osaze",
		11,
		"Forward",
		"+2348031000015",
		{
			pac: 82,
			sho: 74,
			pas: 69,
			dri: 79,
			def: 37,
			phy: 67
		},
		"Good"
	],
	[
		"Femi Akande",
		17,
		"Forward",
		"+2348031000016",
		{
			pac: 79,
			sho: 70,
			pas: 61,
			dri: 72,
			def: 31,
			phy: 74
		},
		"Okay"
	]
];
var SESSION_PLAN = [
	[
		"Saturday Morning Conditioning",
		-21,
		"07:30"
	],
	[
		"Sunday Tactical Shape & Set Pieces",
		-15,
		"16:00"
	],
	[
		"Saturday Small-Sided Games",
		-14,
		"07:30"
	],
	[
		"Sunday Finishing Drills",
		-8,
		"16:00"
	],
	[
		"Saturday Morning Conditioning",
		-7,
		"07:30"
	],
	[
		"Sunday Recovery & Possession Work",
		-1,
		"16:00"
	],
	[
		"Saturday Pre-Match Sharpening",
		0,
		"08:00"
	],
	[
		"Sunday Match Day Preparation",
		1,
		"16:00"
	],
	[
		"Saturday Strength & Endurance Block",
		7,
		"07:30"
	]
];
function buildSeedData() {
	const players = ROSTER.map(([fullName, jerseyNumber, position, phoneNumber, attributes, form]) => ({
		id: uuid(),
		fullName,
		jerseyNumber,
		position,
		phoneNumber,
		active: true,
		attributes,
		overall: calculateOverall(attributes, position),
		form,
		createdAt: NOW
	}));
	const sessions = SESSION_PLAN.map(([title, offset, time], i) => ({
		id: uuid(),
		title,
		date: isoDaysFromNow(offset),
		time,
		location: LOCATION,
		notes: i === 0 ? "Focus on aerobic base and hydration." : void 0,
		createdAt: NOW
	}));
	const today = isoDaysFromNow(0);
	const attendance = [];
	sessions.filter((s) => s.date < today).forEach((s, si) => {
		players.forEach((p, pi) => {
			const mix = (si * 7 + pi * 3) % 10;
			const status = mix === 0 ? "absent" : mix === 1 || mix === 2 ? "late" : "present";
			attendance.push({
				id: uuid(),
				sessionId: s.id,
				playerId: p.id,
				status,
				createdAt: NOW
			});
		});
	});
	return {
		players,
		sessions,
		attendance,
		settings: {
			teamName: "Ambassador FC",
			coachName: "Coach Daniel Obi",
			coachPhone: "+2348030000000",
			defaultLocation: LOCATION
		}
	};
}
var STORAGE_KEY = "ambassador-fc-data-v1";
var StoreContext = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [data, setData] = (0, import_react.useState)(() => buildSeedData());
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				const seed = buildSeedData();
				const players = (parsed.players ?? seed.players).map((player) => {
					const attributes = player.attributes ?? DEFAULT_ATTRIBUTES[player.position];
					return {
						...player,
						attributes,
						overall: player.overall ?? calculateOverall(attributes, player.position),
						form: player.form ?? "Okay"
					};
				});
				setData({
					...seed,
					...parsed,
					players
				});
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch {}
	}, [data, hydrated]);
	const addPlayer = (0, import_react.useCallback)((p) => {
		const attributes = DEFAULT_ATTRIBUTES[p.position];
		setData((d) => ({
			...d,
			players: [...d.players, {
				...p,
				id: uuid(),
				active: true,
				attributes,
				overall: calculateOverall(attributes, p.position),
				form: "Okay",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]
		}));
	}, []);
	const updatePlayer = (0, import_react.useCallback)((id, patch) => {
		setData((d) => ({
			...d,
			players: d.players.map((p) => p.id === id ? {
				...p,
				...patch
			} : p)
		}));
	}, []);
	const removePlayer = (0, import_react.useCallback)((id) => {
		setData((d) => ({
			...d,
			players: d.players.filter((p) => p.id !== id),
			attendance: d.attendance.filter((a) => a.playerId !== id)
		}));
	}, []);
	const addSession = (0, import_react.useCallback)((s) => {
		setData((d) => ({
			...d,
			sessions: [...d.sessions, {
				...s,
				id: uuid(),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]
		}));
	}, []);
	const removeSession = (0, import_react.useCallback)((id) => {
		setData((d) => ({
			...d,
			sessions: d.sessions.filter((s) => s.id !== id),
			attendance: d.attendance.filter((a) => a.sessionId !== id)
		}));
	}, []);
	const setAttendance = (0, import_react.useCallback)((sessionId, playerId, status) => {
		setData((d) => {
			const existing = d.attendance.find((a) => a.sessionId === sessionId && a.playerId === playerId);
			if (existing) return {
				...d,
				attendance: d.attendance.map((a) => a.id === existing.id ? {
					...a,
					status
				} : a)
			};
			return {
				...d,
				attendance: [...d.attendance, {
					id: uuid(),
					sessionId,
					playerId,
					status,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}]
			};
		});
	}, []);
	const markAllPresent = (0, import_react.useCallback)((sessionId) => {
		setData((d) => {
			const rest = d.attendance.filter((a) => a.sessionId !== sessionId);
			const existing = d.attendance.filter((a) => a.sessionId === sessionId);
			const next = d.players.filter((p) => p.active).map((p) => {
				const prev = existing.find((a) => a.playerId === p.id);
				return {
					id: prev?.id ?? uuid(),
					sessionId,
					playerId: p.id,
					status: "present",
					notes: prev?.notes,
					createdAt: prev?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
				};
			});
			return {
				...d,
				attendance: [...rest, ...next]
			};
		});
	}, []);
	const clearAttendance = (0, import_react.useCallback)((sessionId) => {
		setData((d) => ({
			...d,
			attendance: d.attendance.filter((a) => a.sessionId !== sessionId)
		}));
	}, []);
	const updateSettings = (0, import_react.useCallback)((patch) => {
		setData((d) => ({
			...d,
			settings: {
				...d.settings,
				...patch
			}
		}));
	}, []);
	const resetDemoData = (0, import_react.useCallback)(() => setData(buildSeedData()), []);
	const value = (0, import_react.useMemo)(() => ({
		data,
		hydrated,
		addPlayer,
		updatePlayer,
		removePlayer,
		addSession,
		removeSession,
		setAttendance,
		markAllPresent,
		clearAttendance,
		updateSettings,
		resetDemoData
	}), [
		data,
		hydrated,
		addPlayer,
		updatePlayer,
		removePlayer,
		addSession,
		removeSession,
		setAttendance,
		markAllPresent,
		clearAttendance,
		updateSettings,
		resetDemoData
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used inside StoreProvider");
	return ctx;
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function formatDate(date) {
	return (/* @__PURE__ */ new Date(date + "T00:00:00")).toLocaleDateString(void 0, {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function playerAttendanceRate(data, playerId) {
	const records = data.attendance.filter((a) => a.playerId === playerId);
	if (!records.length) return 0;
	const credit = records.reduce((sum, r) => sum + (r.status === "present" ? 1 : r.status === "late" ? .5 : 0), 0);
	return Math.round(credit / records.length * 100);
}
function sessionSummary(data, sessionId) {
	const records = data.attendance.filter((a) => a.sessionId === sessionId);
	const present = records.filter((r) => r.status === "present").length;
	const late = records.filter((r) => r.status === "late").length;
	const absent = records.filter((r) => r.status === "absent").length;
	const active = data.players.filter((p) => p.active).length;
	return {
		present,
		late,
		absent,
		marked: records.length,
		unmarked: Math.max(active - records.length, 0),
		total: active
	};
}
//#endregion
export { calculateOverall as a, sessionSummary as c, useAdmin as d, useStore as f, StoreProvider as i, supabase as l, POSITIONS as n, formatDate as o, POSITION_SHORT as r, playerAttendanceRate as s, AdminProvider as t, todayISO as u };
