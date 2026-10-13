import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-BFz9I6Re.js
var $$splitComponentImporter = () => import("./attendance-CWYcOk0v.mjs");
var Route = createFileRoute("/attendance")({
	validateSearch: (search) => ({ session: typeof search["session"] === "string" ? search["session"] : "" }),
	head: () => ({ meta: [
		{ title: "Roll Call — Ambassador FC" },
		{
			name: "description",
			content: "Pitch-side attendance tracking with one-tap present, late and absent marking."
		},
		{
			property: "og:title",
			content: "Roll Call — Ambassador FC"
		},
		{
			property: "og:description",
			content: "Mark training attendance for the Ambassador FC squad in seconds."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
