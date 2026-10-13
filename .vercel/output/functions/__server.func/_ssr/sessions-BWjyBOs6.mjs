import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as sessionSummary, d as useAdmin, f as useStore, o as formatDate, u as todayISO } from "./store-BHxlUJJ1.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ClipboardCheck, O as CalendarPlus, S as Clock, _ as MapPin, a as Trash2 } from "../_libs/lucide-react.mjs";
import { a as DialogDescription, c as DialogTitle, i as DialogContent, l as Input, n as Button, o as DialogFooter, r as Dialog, s as DialogHeader, t as AppShell, v as cn } from "./AppShell-BSlUBO1-.mjs";
import { n as deleteSessionById, r as getSessions, t as createSession } from "./sessions-DkS0JmUa.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as CardContent, h as Label, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Card } from "./label-Dm8bLATZ.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sessions-BWjyBOs6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function SessionCard({ session, completed, onDelete }) {
	const { data } = useStore();
	const { isAdmin } = useAdmin();
	const sum = sessionSummary(data, session.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold text-foreground",
							children: session.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: formatDate(session.date)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold " + (completed ? "border-success/40 bg-success/15 text-primary" : "border-primary/30 bg-primary/10 text-primary"),
						children: completed ? "Completed" : "Upcoming"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
							" ",
							session.time
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
							" ",
							session.location
						]
					})]
				}),
				session.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: session.notes
				}) : null,
				sum.marked > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs font-medium text-foreground",
					children: [
						sum.present,
						" present • ",
						sum.late,
						" late • ",
						sum.absent,
						" absent"
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: completed ? "outline" : "default",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/attendance",
							search: { session: session.id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "size-4" }), completed ? "View report" : "Take attendance"]
						})
					}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onDelete,
						"aria-label": "Delete session",
						disabled: !isAdmin,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
					})]
				})
			]
		})
	});
}
function SessionsPage() {
	const [supabaseSessions, setSupabaseSessions] = (0, import_react.useState)([]);
	const { data, addSession, removeSession } = useStore();
	const { isAdmin } = useAdmin();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		date: todayISO(),
		time: "07:30",
		location: data.settings.defaultLocation,
		notes: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setForm((f) => ({
			...f,
			location: data.settings.defaultLocation
		}));
	}, [data.settings.defaultLocation]);
	async function loadSessions() {
		const sessions = await getSessions();
		setSupabaseSessions(sessions ?? []);
		console.log("SUPABASE SESSIONS:", sessions);
	}
	(0, import_react.useEffect)(() => {
		loadSessions();
	}, []);
	const today = todayISO();
	const upcoming = supabaseSessions.filter((s) => s.date >= today);
	const past = supabaseSessions.filter((s) => s.date < today);
	async function submit() {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		const next = {};
		if (form.title.trim().length < 3) next.title = "Give the session a title.";
		if (!form.date) next.date = "Pick a date.";
		if (!form.time) next.time = "Pick a time.";
		if (!form.location.trim()) next.location = "Where is the session?";
		setErrors(next);
		if (Object.keys(next).length) return;
		await createSession({
			title: form.title.trim(),
			date: form.date,
			time: form.time,
			location: form.location.trim(),
			notes: form.notes.trim()
		});
		await loadSessions();
		toast.success("Session scheduled");
		setOpen(false);
		setForm({
			title: "",
			date: todayISO(),
			time: "07:30",
			location: data.settings.defaultLocation,
			notes: ""
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Training sessions",
		subtitle: `${upcoming.length} upcoming • ${past.length} completed`,
		action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: () => setOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "size-4" }), "New session"]
		}) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "upcoming",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "upcoming",
							className: "flex-1",
							children: "Upcoming"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "past",
							className: "flex-1",
							children: "Past"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "upcoming",
						className: "mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3",
						children: [upcoming.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCard, {
							session: s,
							completed: false,
							onDelete: () => setDeleteId(s.id)
						}, s.id)), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-sm text-muted-foreground",
							children: "No upcoming sessions scheduled."
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "past",
						className: "mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3",
						children: [past.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCard, {
							session: s,
							completed: true,
							onDelete: () => setDeleteId(s.id)
						}, s.id)), past.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-sm text-muted-foreground",
							children: "No past sessions yet."
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Schedule a session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Add a new training session to the calendar." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "title",
										children: "Title"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "title",
										value: form.title,
										onChange: (e) => setForm({
											...form,
											title: e.target.value
										}),
										placeholder: "Saturday Morning Conditioning"
									}),
									errors.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.title
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "date",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "date",
											type: "date",
											value: form.date,
											onChange: (e) => setForm({
												...form,
												date: e.target.value
											})
										}),
										errors.date ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.date
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "time",
											children: "Time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "time",
											type: "time",
											value: form.time,
											onChange: (e) => setForm({
												...form,
												time: e.target.value
											})
										}),
										errors.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.time
										}) : null
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "location",
										children: "Location"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "location",
										value: form.location,
										onChange: (e) => setForm({
											...form,
											location: e.target.value
										})
									}),
									errors.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.location
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "notes",
									children: "Notes (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "notes",
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									}),
									placeholder: "Focus of the session"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submit,
						children: "Schedule session"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleteId,
				onOpenChange: (o) => !o && setDeleteId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this session?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "The session and its attendance records will be permanently removed." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: async () => {
						if (!isAdmin) {
							toast.error("Admin access required");
							return;
						}
						if (deleteId) {
							await deleteSessionById(deleteId);
							await loadSessions();
							toast.success("Session deleted");
						}
						setDeleteId(null);
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
//#endregion
export { SessionsPage as component };
