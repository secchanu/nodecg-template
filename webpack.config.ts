import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";
import { sync } from "glob";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import nodeExternals from "webpack-node-externals";

const isProduction = process.env["NODE_ENV"] === "production";
const isWatch = Boolean(process.env["WEBPACK_WATCH"]);

const base: webpack.Configuration = {
	watch: isWatch,
	mode: isProduction ? "production" : "development",
	devtool: "cheap-source-map",
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".json"],
	},
};

const makeBrowserConfig = (name: string): webpack.Configuration => {
	const entry: webpack.Entry = {};
	const files = sync(`./src/browser/${name}/*.tsx`);
	for (const file of files) {
		entry[path.basename(file, ".tsx")] = file;
	}

	return merge(base, {
		entry,
		output: {
			path: path.resolve(__dirname, name),
			filename: "[name].js",
			publicPath: "",
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						"babel-loader",
						{
							loader: "ts-loader",
							options: {
								transpileOnly: true,
								configFile: path.resolve(
									__dirname,
									"src/browser/tsconfig.json",
								),
							},
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|webm|svg|woff2?)$/,
					type: "asset/resource",
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								modules: {
									exportLocalsConvention: "camelCase",
								},
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		plugins: [
			...Object.keys(entry).map(
				(entryName) =>
					new HtmlPlugin({
						filename: `${entryName}.html`,
						chunks: [entryName],
						template: `webpack/${name}.html`,
						title: entryName,
					}),
			),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerMode: "static",
				reportFilename: path.resolve(__dirname, `bundle-analyzer/${name}.html`),
			}),
			...(isWatch ? [] : [new WebpackBar({ name })]),
		],
	});
};

const extensionConfig = merge(base, {
	target: "node",
	node: false,
	entry: path.resolve(__dirname, "src/extension/index.ts"),
	output: {
		path: path.resolve(__dirname, "extension"),
		filename: "index.js",
		libraryTarget: "commonjs2",
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					configFile: path.resolve(__dirname, "src/extension/tsconfig.json"),
				},
			},
		],
	},
	externals: [nodeExternals()],
	plugins: [...(isWatch ? [] : [new WebpackBar({ name: "extension" })])],
});

const config: webpack.Configuration[] = [
	makeBrowserConfig("dashboard"),
	makeBrowserConfig("graphics"),
	extensionConfig,
];

export default config;
