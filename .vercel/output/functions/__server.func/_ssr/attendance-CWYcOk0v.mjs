import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useAdmin, f as useStore, o as formatDate } from "./store-BHxlUJJ1.mjs";
import { t as Route } from "./attendance-BFz9I6Re.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as CheckCheck, S as Clock, _ as MapPin, d as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell, v as cn } from "./AppShell-BSlUBO1-.mjs";
import { i as setAttendanceRecord, n as clearAttendanceRecords, r as getAttendanceRecords, t as Progress } from "./progress-DeIgXofm.mjs";
import { r as getSessions } from "./sessions-DkS0JmUa.mjs";
import { i as SquadNumber, n as POSITION_PLURAL, s as getPlayers, t as POSITION_ORDER } from "./ClubUI-C_SwkKfy.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as PositionBadge } from "./select--9x-vYPt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-CWYcOk0v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTIONS = [
	{
		status: "present",
		letter: "P",
		label: "Present"
	},
	{
		status: "late",
		letter: "L",
		label: "Late"
	},
	{
		status: "absent",
		letter: "A",
		label: "Absent"
	}
];
function toneFor(status, active) {
	if (!active) return "border-border bg-card text-muted-foreground hover:border-foreground/60";
	if (status === "present") return "border-transparent bg-success text-success-foreground";
	if (status === "late") return "border-transparent bg-warning text-warning-foreground";
	return "border-transparent bg-destructive text-destructive-foreground";
}
function AttendancePage() {
	const { isAdmin } = useAdmin();
	const { session: initial } = Route.useSearch();
	const [supabaseSessions, setSupabaseSessions] = (0, import_react.useState)([]);
	const { data } = useStore();
	const [attendanceRecords, setAttendanceRecords] = (0, import_react.useState)([]);
	const [supabasePlayers, setSupabasePlayers] = (0, import_react.useState)([]);
	async function loadPlayers() {
		const players = await getPlayers();
		setSupabasePlayers(players ?? []);
	}
	async function loadAttendance() {
		const records = await getAttendanceRecords();
		setAttendanceRecords(records ?? []);
	}
	async function loadSessions() {
		const sessions = await getSessions();
		setSupabaseSessions(sessions ?? []);
	}
	(0, import_react.useEffect)(() => {
		loadAttendance();
		loadPlayers();
		loadSessions();
	}, []);
	const sorted = [...supabaseSessions].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
	const [sessionId, setSessionId] = (0, import_react.useState)(initial || sorted[0]?.id || "");
	(0, import_react.useEffect)(() => {
		if (!sessionId && sorted.length) setSessionId(sorted[0].id);
	}, [sorted, sessionId]);
	(0, import_react.useEffect)(() => {
		if (initial) setSessionId(initial);
	}, [initial]);
	const session = supabaseSessions.find((s) => s.id === sessionId) ?? sorted[0];
	const squad = [...supabasePlayers].filter((p) => p.active).sort((a, b) => a.jerseyNumber - b.jerseyNumber);
	const sessionAttendance = attendanceRecords.filter((a) => a.session_id === session?.id);
	const sum = {
		present: sessionAttendance.filter((a) => a.status === "present").length,
		late: sessionAttendance.filter((a) => a.status === "late").length,
		absent: sessionAttendance.filter((a) => a.status === "absent").length,
		marked: sessionAttendance.length,
		unmarked: squad.length - sessionAttendance.length,
		total: squad.length
	};
	const pct = sum.total ? Math.round(sum.marked / sum.total * 100) : 0;
	const statusBar = {
		present: "bg-success",
		late: "bg-warning",
		absent: "bg-destructive",
		none: "bg-border"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Matchday roll call",
		subtitle: "Tap to select your squad — saved automatically",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pitch-lines relative overflow-hidden rounded-xl text-pitch-foreground",
				style: { background: "var(--gradient-hero)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pitch-stripes absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative space-y-4 p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-condensed text-xs font-bold uppercase tracking-[0.3em] text-gold",
							children: "Team sheet • Training session"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: session?.id ?? "",
							onValueChange: setSessionId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-12 border-pitch-foreground/25 bg-pitch/60 font-condensed text-base font-bold uppercase tracking-wide text-pitch-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a session" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: sorted.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: s.id,
								children: [
									s.title,
									" — ",
									s.date
								]
							}, s.id)) })]
						}),
						session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-4xl sm:text-5xl",
								children: session.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-x-5 gap-y-1 font-condensed text-sm font-semibold uppercase tracking-wider text-pitch-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(session.date) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
											" ",
											session.time
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
											" ",
											session.location
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 overflow-hidden rounded-lg border border-pitch-foreground/15 bg-pitch/70 text-center",
								children: [
									[
										"Present",
										sum.present,
										"text-success"
									],
									[
										"Late",
										sum.late,
										"text-gold"
									],
									[
										"Absent",
										sum.absent,
										"text-destructive"
									],
									[
										"Unmarked",
										sum.unmarked,
										"text-pitch-foreground/70"
									]
								].map(([l, n, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-r border-pitch-foreground/10 py-3 last:border-r-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-display text-3xl sm:text-4xl", c),
										children: n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-condensed text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60 sm:text-xs",
										children: l
									})]
								}, l))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex justify-between font-condensed text-xs font-bold uppercase tracking-[0.2em]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-pitch-foreground/70",
									children: "Squad checked in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-gold",
									children: [pct, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: pct,
								className: "h-2 bg-pitch-foreground/15"
							})] })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm opacity-80",
							children: "Schedule a session to begin."
						})
					]
				})]
			}), session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[76px] z-10 flex gap-2 rounded-lg border-2 border-foreground bg-card p-2 sm:top-[84px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "h-12 flex-1 font-condensed text-base font-bold uppercase tracking-wider",
					onClick: async () => {
						if (!isAdmin) {
							toast.error("Admin access required");
							return;
						}
						for (const player of squad) await setAttendanceRecord(session.id, player.id, "present");
						await loadAttendance();
						toast.success("Full squad marked present");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-5" }), " Full squad present"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "h-12 font-condensed text-base font-bold uppercase tracking-wider",
					onClick: async () => {
						if (!isAdmin) {
							toast.error("Admin access required");
							return;
						}
						await clearAttendanceRecords(session.id);
						await loadAttendance();
						toast.success("Team sheet cleared");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset"]
				})]
			}), POSITION_ORDER.map((pos) => {
				const group = squad.filter((p) => p.position === pos);
				if (!group.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-3 border-b-2 border-foreground pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-foreground",
						children: POSITION_PLURAL[pos]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto font-condensed text-sm font-bold uppercase tracking-wider text-muted-foreground",
						children: [
							group.filter((p) => attendanceRecords.some((a) => a.session_id === session.id && a.player_id === p.id)).length,
							"/",
							group.length,
							" marked"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 lg:grid-cols-2",
					children: group.map((p) => {
						const record = attendanceRecords.find((a) => a.session_id === session.id && a.player_id === p.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-3 pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-y-0 left-0 w-1.5 transition-colors", statusBar[record?.status ?? "none"]) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadNumber, {
									number: p.jerseyNumber,
									name: p.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-condensed text-base font-bold uppercase leading-tight text-foreground",
										children: p.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionBadge, {
										position: p.position,
										className: "mt-1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex shrink-0 gap-1.5",
									children: ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: !isAdmin,
										"aria-label": `${a.label} — ${p.fullName}`,
										"aria-pressed": record?.status === a.status,
										onClick: async () => {
											if (!isAdmin) {
												toast.error("Admin access required");
												return;
											}
											await setAttendanceRecord(session.id, p.id, a.status);
											await loadAttendance();
											toast.success(`${p.fullName} marked ${a.label}`);
										},
										className: cn("flex size-12 flex-col items-center justify-center rounded-md border-2 font-display text-lg transition-all active:scale-95 sm:size-14", toneFor(a.status, record?.status === a.status)),
										children: [a.letter, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-condensed text-[9px] font-bold tracking-wider",
											children: a.label
										})]
									}, a.status))
								})
							]
						}, p.id);
					})
				})] }, pos);
			})] }) : null]
		})
	});
}
//#endregion
export { AttendancePage as component };
