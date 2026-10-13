import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as calculateOverall, d as useAdmin, f as useStore, l as supabase, n as POSITIONS, r as POSITION_SHORT, s as playerAttendanceRate } from "./store-BHxlUJJ1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Activity, a as Trash2, f as Plus, h as MessageCircle, l as Search, o as SlidersHorizontal, p as Phone, r as UserPen, s as ShieldCheck, t as X, u as Save, v as List, y as LayoutGrid } from "../_libs/lucide-react.mjs";
import { a as DialogDescription, c as DialogTitle, d as SheetContent, f as SheetDescription, h as SheetTitle, i as DialogContent, l as Input, m as SheetHeader, n as Button, p as SheetFooter, r as Dialog, s as DialogHeader, t as AppShell, u as Sheet, v as cn } from "./AppShell-BSlUBO1-.mjs";
import { a as createPlayer, c as updatePlayerById, i as SquadNumber, l as updatePlayerRatings, n as POSITION_PLURAL, o as deletePlayerById, s as getPlayers, t as POSITION_ORDER } from "./ClubUI-C_SwkKfy.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as PositionBadge } from "./select--9x-vYPt.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as CardContent, h as Label, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Card } from "./label-Dm8bLATZ.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/squad-Drgi51pI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var FILTERS = [
	{
		label: "All",
		value: "All"
	},
	{
		label: "GK",
		value: "Goalkeeper"
	},
	{
		label: "DEF",
		value: "Defender"
	},
	{
		label: "MID",
		value: "Midfielder"
	},
	{
		label: "FWD",
		value: "Forward"
	}
];
var EMPTY = {
	fullName: "",
	jerseyNumber: "",
	position: "",
	phoneNumber: ""
};
var ATTRIBUTE_LABELS = [
	["pac", "Pace"],
	["sho", "Shooting"],
	["pas", "Passing"],
	["dri", "Dribbling"],
	["def", "Defending"],
	["phy", "Physical"]
];
function OverallBadge({ player, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex min-w-12 flex-col items-center rounded-md border border-gold/50 bg-pitch px-2 py-1 text-pitch-foreground shadow-sm", className),
		"aria-label": `${player.overall} overall rating`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-display text-2xl leading-none",
			children: player.overall
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-condensed text-[10px] font-bold uppercase tracking-wider text-gold",
			children: "OVR"
		})]
	});
}
var FORMS = [
	"Poor",
	"Okay",
	"Good",
	"Excellent"
];
function PlayerProfileDialog({ player, onClose }) {
	const [editingRatings, setEditingRatings] = (0, import_react.useState)(false);
	const { isAdmin } = useAdmin();
	const [draftAttributes, setDraftAttributes] = (0, import_react.useState)(null);
	const [draftForm, setDraftForm] = (0, import_react.useState)("Okay");
	function startEdit(p) {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		setDraftAttributes({ ...p.attributes });
		setDraftForm(p.form);
		setEditingRatings(true);
	}
	function cancelEdit() {
		setEditingRatings(false);
		setDraftAttributes(null);
	}
	async function saveRatings(p) {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		if (!draftAttributes) return;
		const overall = calculateOverall(draftAttributes, p.position);
		await updatePlayerRatings(p.id, draftAttributes, overall, draftForm);
		toast.success(`${p.fullName}'s ratings saved — ${overall} OVR`);
		cancelEdit();
	}
	const liveOverall = player && draftAttributes ? calculateOverall(draftAttributes, player.position) : player?.overall;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: player !== null,
		onOpenChange: (open) => {
			if (!open) {
				cancelEdit();
				onClose();
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-h-[92vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto border-2 border-gold/60 bg-pitch p-0 text-pitch-foreground sm:rounded-lg",
			children: player ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [player.fullName, " player card"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Overall rating, current form and six core football attributes." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pitch-stripes relative overflow-hidden p-5 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/ambassador_logo.jpeg",
						alt: "",
						"aria-hidden": true,
						className: "pointer-events-none absolute -right-14 top-10 w-64 rounded-full opacity-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-start justify-between gap-3 border-b border-pitch-foreground/20 pb-5 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-condensed text-xs font-bold uppercase tracking-[0.25em] text-gold",
								children: "Ambassador FC · First Team"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex min-w-0 items-center gap-3 sm:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadNumber, {
									number: player.jerseyNumber,
									name: player.fullName,
									size: "lg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl leading-tight sm:text-4xl sm:leading-none",
										children: player.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-condensed text-sm font-bold uppercase tracking-wider text-pitch-foreground/70",
										children: [
											POSITION_SHORT[player.position],
											" · #",
											player.jerseyNumber
										]
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex shrink-0 flex-col items-center gap-2 sm:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-5xl leading-none text-gold sm:text-6xl",
									children: liveOverall
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-condensed text-xs font-bold uppercase tracking-[0.2em]",
									children: "OVR"
								})]
							}), !editingRatings ? isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "border-gold/60 bg-transparent text-gold hover:bg-gold/10 hover:text-gold",
								onClick: () => startEdit(player),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), " Edit ratings"]
							}) : null]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-5 grid grid-cols-2 gap-x-7 gap-y-4",
						children: ATTRIBUTE_LABELS.map(([key, label]) => {
							const value = editingRatings && draftAttributes ? draftAttributes[key] : player.attributes[key];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-end justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-condensed text-xs font-bold uppercase tracking-wider text-pitch-foreground/65",
										children: key
									}), editingRatings && draftAttributes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 1,
										max: 99,
										value,
										"aria-label": label,
										onChange: (e) => {
											const n = Math.max(1, Math.min(99, Number(e.target.value) || 1));
											setDraftAttributes({
												...draftAttributes,
												[key]: n
											});
										},
										className: "h-8 w-16 border-gold/40 bg-pitch-foreground/10 text-center font-display text-lg text-pitch-foreground"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-display text-2xl leading-none",
										children: value
									})]
								}),
								editingRatings && draftAttributes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 1,
									max: 99,
									step: 1,
									value: [value],
									"aria-label": `${label} slider`,
									onValueChange: ([n]) => setDraftAttributes({
										...draftAttributes,
										[key]: n ?? value
									}),
									className: "mt-2"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-1.5 overflow-hidden rounded-full bg-pitch-foreground/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-gold",
										style: { width: `${value}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: label
								})
							] }, key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-6 flex items-center justify-between gap-3 border-t border-pitch-foreground/20 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-wider text-pitch-foreground/65",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-gold" }), " Current form"]
						}), editingRatings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draftForm,
							onValueChange: (v) => setDraftForm(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Player form",
								className: "h-8 w-32 border-gold/40 bg-pitch-foreground/10 font-condensed text-sm font-bold uppercase text-pitch-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: FORMS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: f,
								children: f
							}, f)) })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-sm bg-gold px-3 py-1 font-condensed text-sm font-bold uppercase text-warning-foreground",
							children: player.form
						})]
					}),
					editingRatings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-5 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1 bg-gold font-condensed font-bold uppercase tracking-wider text-warning-foreground hover:bg-gold/90",
							onClick: () => saveRatings(player),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save ratings"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "flex-1 border-pitch-foreground/40 bg-transparent text-pitch-foreground hover:bg-pitch-foreground/10 hover:text-pitch-foreground",
							onClick: cancelEdit,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Cancel"]
						})]
					}) : null
				]
			})] }) : null
		})
	});
}
function digits(phone) {
	return phone.replace(/[^\d]/g, "");
}
function SquadPage() {
	const [supabasePlayers, setSupabasePlayers] = (0, import_react.useState)([]);
	async function loadPlayers() {
		const players = await getPlayers();
		setSupabasePlayers(players ?? []);
	}
	(0, import_react.useEffect)(() => {
		loadPlayers();
	}, []);
	const { data, addPlayer, updatePlayer, removePlayer } = useStore();
	const { isAdmin } = useAdmin();
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("jersey");
	const [view, setView] = (0, import_react.useState)("sheet");
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [profilePlayer, setProfilePlayer] = (0, import_react.useState)(null);
	const players = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return supabasePlayers.filter((p) => {
			const matchQ = !q || p.fullName.toLowerCase().includes(q) || String(p.jerseyNumber).includes(q);
			const matchP = filter === "All" || p.position === filter;
			return matchQ && matchP;
		}).sort((a, b) => {
			if (sort === "name") return a.fullName.localeCompare(b.fullName);
			if (sort === "rate") return playerAttendanceRate(data, b.id) - playerAttendanceRate(data, a.id);
			return a.jerseyNumber - b.jerseyNumber;
		});
	}, [
		supabasePlayers,
		query,
		filter,
		sort
	]);
	function openAdd() {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		setEditing(null);
		setForm(EMPTY);
		setErrors({});
		setSheetOpen(true);
	}
	function openEdit(p) {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		setEditing(p);
		setForm({
			fullName: p.fullName,
			jerseyNumber: String(p.jerseyNumber),
			position: p.position,
			phoneNumber: p.phoneNumber
		});
		setErrors({});
		setSheetOpen(true);
	}
	async function submit() {
		if (!isAdmin) {
			toast.error("Admin access required");
			return;
		}
		const next = {};
		if (form.fullName.trim().length < 3) next.fullName = "Enter the player's full name.";
		const jersey = Number(form.jerseyNumber);
		if (!form.jerseyNumber || Number.isNaN(jersey) || jersey < 1 || jersey > 99) next.jerseyNumber = "Jersey number must be between 1 and 99.";
		else if (supabasePlayers.some((p) => p.jerseyNumber === jersey && p.id !== editing?.id)) next.jerseyNumber = "That jersey number is already taken.";
		if (!form.position) next.position = "Choose a position.";
		if (digits(form.phoneNumber).length < 7) next.phoneNumber = "Enter a valid phone number.";
		setErrors(next);
		if (Object.keys(next).length) return;
		const payload = {
			fullName: form.fullName.trim(),
			jerseyNumber: jersey,
			position: form.position,
			phoneNumber: form.phoneNumber.trim()
		};
		if (editing) {
			await updatePlayerById(editing.id, payload);
			await loadPlayers();
			toast.success(`${payload.fullName} updated`);
		} else {
			await createPlayer(payload);
			await loadPlayers();
			toast.success(`${payload.fullName} added`);
		}
		setSheetOpen(false);
		setForm(EMPTY);
		setEditing(null);
		setSheetOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Squad",
		subtitle: `${supabasePlayers.length} registered players`,
		action: isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openAdd,
			size: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add player"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search by name or jersey number",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "order-last ml-auto flex overflow-hidden rounded-md border-2 border-foreground",
							children: [[
								"sheet",
								"Team sheet",
								LayoutGrid
							], [
								"list",
								"List",
								List
							]].map(([v, l, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setView(v),
								className: cn("flex items-center gap-1.5 px-3 py-1.5 font-condensed text-xs font-bold uppercase tracking-wider", view === v ? "bg-foreground text-background" : "bg-card text-foreground"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
									" ",
									l
								]
							}, v))
						}), FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f.value),
							className: cn("rounded-full border px-3.5 py-1.5 font-condensed text-xs font-bold uppercase tracking-wider transition-colors", filter === f.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40"),
							children: f.label
						}, f.value))]
					}),
					view === "sheet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [POSITION_ORDER.map((pos) => {
							const group = players.filter((p) => p.position === pos);
							if (!group.length) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-3 border-b-2 border-foreground pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl text-foreground sm:text-3xl",
									children: POSITION_PLURAL[pos]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-sm bg-pitch px-2 py-0.5 font-condensed text-sm font-bold text-pitch-foreground",
									children: group.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
								children: group.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pointer-events-none absolute -right-1 -top-4 font-display text-7xl text-primary/[0.07]",
											children: p.jerseyNumber
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											className: "relative h-auto w-full justify-start gap-4 p-0 text-left hover:bg-transparent",
											onClick: () => setProfilePlayer(p),
											"aria-label": `View ${p.fullName}'s player card`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadNumber, {
													number: p.jerseyNumber,
													name: p.fullName,
													size: "lg"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate font-condensed text-lg font-bold uppercase leading-tight text-foreground",
														children: p.fullName
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-1 flex flex-wrap items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionBadge, { position: p.position }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-condensed text-xs font-semibold uppercase tracking-wide text-muted-foreground",
															children: [playerAttendanceRate(data, p.id), "% attendance"]
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverallBadge, { player: p })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-4 flex gap-1 border-t border-border pt-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													variant: "ghost",
													size: "sm",
													className: "flex-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `tel:${digits(p.phoneNumber)}`,
														"aria-label": "Call player",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													variant: "ghost",
													size: "sm",
													className: "flex-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `https://wa.me/${digits(p.phoneNumber)}`,
														target: "_blank",
														rel: "noreferrer",
														"aria-label": "WhatsApp player",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: "flex-1",
													onClick: () => openEdit(p),
													"aria-label": "Edit player",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPen, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: "flex-1",
													onClick: () => setDeleteTarget(p),
													"aria-label": "Remove player",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
												})
											]
										})
									]
								}, p.id))
							})] }, pos);
						}), players.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "No players found."
						}) : null]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 lg:hidden",
						children: [players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "shadow-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: "h-auto w-full justify-start gap-3 p-0 text-left hover:bg-transparent",
									onClick: () => setProfilePlayer(p),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadNumber, {
											number: p.jerseyNumber,
											name: p.fullName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-semibold text-foreground",
												children: p.fullName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionBadge, { position: p.position }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: [playerAttendanceRate(data, p.id), "% attendance"]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverallBadge, { player: p })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-4 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											size: "sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `tel:${digits(p.phoneNumber)}`,
												"aria-label": "Call player",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											size: "sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `https://wa.me/${digits(p.phoneNumber)}`,
												target: "_blank",
												rel: "noreferrer",
												"aria-label": "WhatsApp player",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => openEdit(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPen, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => setDeleteTarget(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
										})
									]
								})]
							})
						}, p.id)), players.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "No players found."
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "hidden shadow-none lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "font-semibold",
										onClick: () => setSort("jersey"),
										children: "#"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "font-semibold",
									onClick: () => setSort("name"),
									children: "Player"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Position" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Rating" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phone" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "font-semibold",
									onClick: () => setSort("rate"),
									children: "Attendance"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Actions"
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-display text-xl",
									children: p.jerseyNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "link",
									className: "h-auto p-0 font-medium text-foreground",
									onClick: () => setProfilePlayer(p),
									children: p.fullName
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionBadge, { position: p.position }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 font-display text-xl text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }),
										" ",
										p.overall
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-muted-foreground",
									children: p.phoneNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [playerAttendanceRate(data, p.id), "%"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "ghost",
												size: "icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `tel:${digits(p.phoneNumber)}`,
													"aria-label": "Call",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => openEdit(p),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPen, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => setDeleteTarget(p),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
											})
										]
									})
								})
							] }, p.id)) })] }), players.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-sm text-muted-foreground",
								children: "No players found."
							}) : null]
						})
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheetOpen,
				onOpenChange: setSheetOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "right",
					className: "w-full sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: editing ? "Edit player" : "Add player" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: editing ? "Update squad details." : "Register a new player in the squad." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "fullName",
											children: "Full name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "fullName",
											value: form.fullName,
											onChange: (e) => setForm({
												...form,
												fullName: e.target.value
											}),
											placeholder: "e.g. Victor Agu"
										}),
										errors.fullName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.fullName
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "jersey",
											children: "Jersey number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "jersey",
											inputMode: "numeric",
											value: form.jerseyNumber,
											onChange: (e) => setForm({
												...form,
												jerseyNumber: e.target.value
											}),
											placeholder: "1 – 99"
										}),
										errors.jerseyNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.jerseyNumber
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Position" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.position,
											onValueChange: (v) => setForm({
												...form,
												position: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select position" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: POSITIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: p,
												children: [
													p,
													" (",
													POSITION_SHORT[p],
													")"
												]
											}, p)) })]
										}),
										errors.position ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.position
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "phone",
											children: "Phone number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "phone",
											inputMode: "tel",
											value: form.phoneNumber,
											onChange: (e) => setForm({
												...form,
												phoneNumber: e.target.value
											}),
											placeholder: "+234 803 000 0000"
										}),
										errors.phoneNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.phoneNumber
										}) : null
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: submit,
							children: editing ? "Save changes" : "Add to squad"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setSheetOpen(false),
							children: "Cancel"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleteTarget,
				onOpenChange: (o) => !o && setDeleteTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					"Remove ",
					deleteTarget?.fullName,
					"?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This removes the player and all of their attendance records. This cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: async () => {
						if (!isAdmin) {
							toast.error("Admin access required");
							return;
						}
						if (deleteTarget) {
							await supabase.from("attendance_records").delete().eq("player_id", deleteTarget.id);
							await deletePlayerById(deleteTarget.id);
							await loadPlayers();
							toast.success(`${deleteTarget.fullName} removed`);
						}
						setDeleteTarget(null);
					},
					children: "Remove player"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerProfileDialog, {
				player: profilePlayer,
				onClose: () => setProfilePlayer(null)
			})
		]
	});
}
//#endregion
export { SquadPage as component };
