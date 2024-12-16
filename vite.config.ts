import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({
			compiler: "svelte",
			defaultStyle: "display: inline; height: 1rem; width: 1rem;",
			defaultClass: "icon",
		}),
	],
	build: {
		cssMinify: "lightningcss",
	},
});
