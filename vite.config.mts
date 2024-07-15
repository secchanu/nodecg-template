import rollupEsbuild from "rollup-plugin-esbuild";
import rollupExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";

import packageJson from "./package.json";
// eslint-disable-next-line import/extensions, import/no-unresolved
import nodecg from "./vite-plugin-nodecg.mjs";

export default defineConfig({
	clearScreen: false,
	plugins: [
		nodecg({
			bundleName: packageJson.name,
			graphics: "./src/browser/graphics/*.tsx",
			dashboard: "./src/browser/dashboard/*.tsx",
			extension: {
				input: "./src/extension/index.ts",
				plugins: [rollupEsbuild(), rollupExternals()],
			},
		}),
	],
});
