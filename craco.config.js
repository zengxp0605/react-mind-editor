const path = require("path");
const CracoLessPlugin = require('craco-less');

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths, devServer }) => {
			console.log("ENV: ", env);
			paths.appBuild = webpackConfig.output.path = path.resolve("dist");
			return webpackConfig;
		},
		alias: {
			Src: path.resolve(__dirname, "src"),
			Components: path.resolve(__dirname, "src/components"),
			Common: path.resolve(__dirname, "src/common"),
			Pages: path.resolve(__dirname, "src/pages"),
			Utils: path.resolve(__dirname, "src/utils"),
			Apis: path.resolve(__dirname, "src/apis"),
			Lib: path.resolve(__dirname, "src/lib"),
			Services: path.resolve(__dirname, "src/services"),
			Images: path.resolve(__dirname, "src/assets/images"),
			Assets: path.resolve(__dirname, "src/assets"),
			"@videos": path.resolve(__dirname, "src/assets/videos"),
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { "@primary-color": "#21439e" },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
