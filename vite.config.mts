import { defineConfig } from "vite";
import NodeCGPlugin from "vite-plugin-nodecg";

export default defineConfig({
	clearScreen: false,
	plugins: [
		NodeCGPlugin({
			inputs: {
				"graphics/*.tsx": "./src/template.html",
				"dashboard/*.tsx": "./src/template.html",
			},
			srcDir: "./src/browser",
		}),
	],
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "[name].js",
			},
		},
	},
});
