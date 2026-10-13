import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useAdmin, f as useStore, s as playerAttendanceRate } from "./store-BHxlUJJ1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as RotateCcw, u as Save, x as Download } from "../_libs/lucide-react.mjs";
import { l as Input, n as Button, t as AppShell } from "./AppShell-BSlUBO1-.mjs";
import { n as updateSettings, t as getSettings } from "./settings-Cp2XVyFp.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as CardContent, f as CardDescription, h as Label, i as AlertDialogContent, l as AlertDialogTrigger, m as CardTitle, n as AlertDialogAction, o as AlertDialogFooter, p as CardHeader, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Card } from "./label-Dm8bLATZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DCaTMXb8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function download(filename, content, type) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function SettingsPage() {
	const { isAdmin } = useAdmin();
	const [supabaseSettings, setSupabaseSettings] = (0, import_react.useState)(null);
	const { data, hydrated, updateSettings: updateSettings$1, resetDemoData } = useStore();
	const [form, setForm] = (0, import_react.useState)({
		teamName: data.settings.teamName,
		coachName: data.settings.coachName,
		coachPhone: data.settings.coachPhone,
		defaultLocation: data.settings.defaultLocation
	});
	async function loadSettings() {
		const settings = await getSettings();
		setSupabaseSettings(settings);
		setForm((current) => ({
			...current,
			defaultLocation: settings?.default_location ?? ""
		}));
		console.log("SUPABASE SETTINGS:", settings);
	}
	(0, import_react.useEffect)(() => {
		loadSettings();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!supabaseSettings) return;
		setForm({
			teamName: supabaseSettings.team_name ?? "",
			coachName: supabaseSettings.coach_name ?? "",
			coachPhone: supabaseSettings.coach_phone ?? "",
			defaultLocation: supabaseSettings.default_location ?? ""
		});
	}, [supabaseSettings]);
	function exportCsv() {
		download("ambassador-fc-squad.csv", [[
			"Jersey",
			"Full name",
			"Position",
			"Phone",
			"Attendance rate %"
		], ...data.players.map((p) => [
			String(p.jerseyNumber),
			p.fullName,
			p.position,
			p.phoneNumber,
			String(playerAttendanceRate(data, p.id))
		])].map((r) => r.map((c) => `"${c.replace(/"/g, "\"\"")}"`).join(",")).join("\n"), "text/csv");
		toast.success("CSV exported");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Settings",
		subtitle: "Team profile and data utilities",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "shadow-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Team profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Shown across the app and used as session defaults." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "teamName",
								children: "Team name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "teamName",
								value: form.teamName,
								disabled: !isAdmin,
								onChange: (e) => setForm({
									...form,
									teamName: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "coachName",
								children: "Coach name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "coachName",
								value: form.coachName,
								disabled: !isAdmin,
								onChange: (e) => setForm({
									...form,
									coachName: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "coachPhone",
								children: "Coach phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "coachPhone",
								value: form.coachPhone,
								disabled: !isAdmin,
								onChange: (e) => setForm({
									...form,
									coachPhone: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "pitch",
								children: "Home training pitch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pitch",
								value: form.defaultLocation,
								disabled: !isAdmin,
								onChange: (e) => setForm({
									...form,
									defaultLocation: e.target.value
								})
							})]
						}),
						isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: async () => {
								if (!isAdmin) {
									toast.error("Admin access required");
									return;
								}
								await updateSettings({
									teamName: form.teamName,
									coachName: form.coachName,
									coachPhone: form.coachPhone,
									defaultLocation: form.defaultLocation
								});
								await loadSettings();
								toast.success("Team profile saved");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save changes"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "shadow-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Export data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Download the squad and attendance history." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => {
								download("ambassador-fc-data.json", JSON.stringify(data, null, 2), "application/json");
								toast.success("JSON exported");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export JSON"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: exportCsv,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export squad CSV"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-destructive/30 shadow-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Reset to demo data"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Replaces everything with the original demo squad, sessions and attendance." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset to demo data"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reset all data?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Every player, session and attendance record you added will be lost." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => {
							if (!isAdmin) {
								toast.error("Admin access required");
								return;
							}
							resetDemoData();
							toast.success("Demo data restored");
						},
						children: "Reset"
					})] })] })] }) })]
				})]
			})]
		})
	});
}
//#endregion
export { SettingsPage as component };
