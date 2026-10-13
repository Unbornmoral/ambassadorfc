import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as supabase } from "./store-BHxlUJJ1.mjs";
import { v as cn } from "./AppShell-BSlUBO1-.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DeIgXofm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function getAttendanceRecords() {
	const { data, error } = await supabase.from("attendance_records").select("*");
	if (error) throw error;
	return data ?? [];
}
async function setAttendanceRecord(sessionId, playerId, status) {
	const { data: existingRows, error: findError } = await supabase.from("attendance_records").select("*").eq("session_id", sessionId).eq("player_id", playerId);
	if (findError) throw findError;
	const existing = existingRows?.[0];
	if (findError) throw findError;
	if (existing) {
		const { error } = await supabase.from("attendance_records").update({ status }).eq("id", existing.id);
		if (error) throw error;
		return;
	}
	const { error } = await supabase.from("attendance_records").insert({
		session_id: sessionId,
		player_id: playerId,
		status
	});
	if (error) throw error;
}
async function clearAttendanceRecords(sessionId) {
	const { error } = await supabase.from("attendance_records").delete().eq("session_id", sessionId);
	if (error) throw error;
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
//#endregion
export { setAttendanceRecord as i, clearAttendanceRecords as n, getAttendanceRecords as r, Progress as t };
