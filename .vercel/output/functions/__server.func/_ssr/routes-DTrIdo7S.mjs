import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as useStore, o as formatDate, u as todayISO } from "./store-BHxlUJJ1.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CalendarClock, C as ClipboardCheck, S as Clock, _ as MapPin, i as Trophy, j as ArrowRight, m as Percent, n as Users } from "../_libs/lucide-react.mjs";
import { g as TeamBadge, n as Button, t as AppShell } from "./AppShell-BSlUBO1-.mjs";
import { r as getAttendanceRecords, t as Progress } from "./progress-DeIgXofm.mjs";
import { r as getSessions } from "./sessions-DkS0JmUa.mjs";
import { r as SectionTitle, s as getPlayers } from "./ClubUI-C_SwkKfy.mjs";
import { t as getSettings } from "./settings-Cp2XVyFp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DTrIdo7S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Metric({ label, value, hint, icon: Icon, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-lg border-2 border-foreground/90 bg-card p-5 transition-transform hover:-translate-y-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute -right-2 -top-6 font-display text-8xl text-primary/[0.07]",
				children: index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-[0.2em] text-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
					" ",
					label
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 truncate font-display text-4xl text-foreground",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 truncate font-condensed text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 bottom-0 h-1 bg-primary transition-all group-hover:h-1.5" })
		]
	});
}
function Dashboard() {
	const { data } = useStore();
	const [supabasePlayers, setSupabasePlayers] = (0, import_react.useState)([]);
	const [supabaseSessions, setSupabaseSessions] = (0, import_react.useState)([]);
	const [attendanceRecords, setAttendanceRecords] = (0, import_react.useState)([]);
	const [supabaseSettings, setSupabaseSettings] = (0, import_react.useState)(null);
	const today = todayISO();
	const upcoming = [...supabaseSessions].filter((s) => s.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
	const next = upcoming[0];
	const past = [...supabaseSessions].filter((s) => s.date < today).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
	const recent = past.slice(0, 3);
	const credit = attendanceRecords.reduce((sum, record) => sum + (record.status === "present" ? 1 : record.status === "late" ? .5 : 0), 0);
	const rate = attendanceRecords.length ? Math.round(credit / attendanceRecords.length * 100) : 0;
	async function loadPlayers() {
		const players = await getPlayers();
		setSupabasePlayers(players ?? []);
	}
	async function loadSessions() {
		const sessions = await getSessions();
		setSupabaseSessions(sessions ?? []);
	}
	async function loadAttendance() {
		const attendance = await getAttendanceRecords();
		setAttendanceRecords(attendance ?? []);
	}
	async function loadSettings() {
		const settings = await getSettings();
		setSupabaseSettings(settings);
	}
	(0, import_react.useEffect)(() => {
		loadPlayers();
		loadSessions();
		loadAttendance();
		loadSettings();
	}, []);
	const squad = supabasePlayers.filter((p) => p.active);
	const top = [...squad].map((p) => {
		const records = attendanceRecords.filter((a) => a.player_id === p.id);
		const credit = records.reduce((sum, r) => sum + (r.status === "present" ? 1 : r.status === "late" ? .5 : 0), 0);
		return {
			p,
			r: records.length ? Math.round(credit / records.length * 100) : 0
		};
	}).sort((a, b) => b.r - a.r)[0];
	const todaySession = upcoming.find((s) => s.date === todayISO());
	const rollCall = todaySession ?? next;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: `Welcome, ${(supabaseSettings?.coach_name ?? "Coach").replace(/^Coach\s+/, "")}`,
		subtitle: `Matchday operations • ${squad.length} registered players`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pitch-lines relative overflow-hidden rounded-xl text-pitch-foreground",
					style: { background: "var(--gradient-hero)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pitch-stripes absolute inset-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/ambassador_logo.jpeg",
							alt: "",
							"aria-hidden": true,
							className: "pointer-events-none absolute -right-16 top-1/2 hidden w-[420px] -translate-y-1/2 rounded-full opacity-15 mix-blend-luminosity md:block"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamBadge, { className: "size-16 rounded-full border-2 border-gold sm:size-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-condensed text-xs font-bold uppercase tracking-[0.3em] text-gold",
										children: "Est. Club • First Team"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 font-display text-5xl sm:text-7xl xl:text-8xl",
									children: supabaseSettings?.team_name ?? "Ambassador FC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-condensed text-lg font-semibold uppercase tracking-[0.3em] text-pitch-foreground/80 sm:text-xl",
									children: [
										"Discipline ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold",
											children: "•"
										}),
										" Commitment",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold",
											children: "•"
										}),
										" Excellence"
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-pitch-foreground/15 bg-pitch/70 p-5 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-[0.25em] text-gold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4" }), " Next training session"]
									}),
									next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-2xl sm:text-3xl",
										children: next.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "mt-4 grid grid-cols-3 gap-3 border-t border-pitch-foreground/15 pt-4 font-condensed",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60",
												children: "Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 text-sm font-bold uppercase",
												children: formatDate(next.date)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60",
												children: "Kick-off"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 flex items-center gap-1 text-sm font-bold uppercase",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
													" ",
													next.time
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] font-bold uppercase tracking-[0.2em] text-pitch-foreground/60",
												children: "Venue"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 flex items-start gap-1 text-sm font-bold uppercase leading-tight",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-3.5 shrink-0" }),
													" ",
													next.location
												]
											})] })
										]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm opacity-80",
										children: "No sessions scheduled yet."
									}),
									rollCall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "mt-5 w-full bg-gold font-condensed text-base font-bold uppercase tracking-wider text-foreground hover:bg-gold/90",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/attendance",
											search: { session: rollCall.id },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "size-4" }),
												todaySession ? "Session today — roll call" : "Prepare roll call",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
											]
										})
									}) : null
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Club overview",
					title: "The squad in numbers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							index: "01",
							label: "Squad",
							value: String(squad.length),
							icon: Users,
							hint: "Active players"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							index: "02",
							label: "Sessions",
							value: String(supabaseSessions.length),
							icon: CalendarClock,
							hint: `${past.length} completed`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							index: "03",
							label: "Attendance",
							value: `${rate}%`,
							icon: Percent,
							hint: "Late counts as half"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							index: "04",
							label: "Player of commitment",
							value: top && top.r > 0 ? top.p.fullName.split(" ").slice(-1)[0] : "—",
							icon: Trophy,
							hint: top && top.r > 0 ? `${top.p.fullName} • ${top.r}%` : "No attendance data yet"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Training log",
					title: "Recent sessions"
				}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No sessions recorded yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 lg:grid-cols-3",
					children: recent.map((s) => {
						const sessionAttendance = attendanceRecords.filter((a) => a.session_id === s.id);
						const sum = {
							present: sessionAttendance.filter((a) => a.status === "present").length,
							late: sessionAttendance.filter((a) => a.status === "late").length,
							absent: sessionAttendance.filter((a) => a.status === "absent").length,
							marked: sessionAttendance.length,
							unmarked: squad.length - sessionAttendance.length,
							total: squad.length
						};
						const pct = sum.total ? Math.round(sum.marked / sum.total * 100) : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/attendance",
							search: { session: s.id },
							className: "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between bg-pitch px-4 py-2 font-condensed text-xs font-bold uppercase tracking-[0.2em] text-pitch-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(s.date) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: s.time
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xl text-foreground",
											children: s.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid grid-cols-3 divide-x divide-border border-y border-border py-2 text-center font-condensed",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
													n: sum.present,
													l: "Present",
													c: "text-success"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
													n: sum.late,
													l: "Late",
													c: "text-warning"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
													n: sum.absent,
													l: "Absent",
													c: "text-destructive"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: pct,
											className: "mt-3 h-1.5"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-t border-border px-4 py-2.5 font-condensed text-sm font-bold uppercase tracking-wider text-primary",
									children: ["Match report ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
								})
							]
						}, s.id);
					})
				})] })
			]
		})
	});
}
function Stat({ n, l, c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `font-display text-2xl ${c}`,
		children: n
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
		children: l
	})] });
}
//#endregion
export { Dashboard as component };
