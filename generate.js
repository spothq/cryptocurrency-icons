const { readdirSync, readFileSync } = require("fs");
const { transform } = require("@svgr/core");
const { join } = require("path");
const esbuild = require("esbuild");

const ICON_DIR = "./svg/icon";
const ICON_COLOR_DIR = "./svg/color";

const generateComponents = (iconDir) => {
	const icons = readdirSync(iconDir);
	icons.forEach((file) => {
		const [fileName] = file.split(".");
		let iconName = fileName;
		if (iconName === "index") {
			iconName = "indexIcon";
		}
		const svgPath = join(iconDir, file);
		const svgCode = readFileSync(svgPath);

		const jsCode = transform.sync(
			svgCode,
			{
				expandProps: "end",
				typescript: false,
				jsx: false,
			},
			{ filePath: svgPath }
		);

		esbuild.buildSync({
			outfile: `react/${iconName}.js`,
			allowOverwrite: true,
			loader: {
				".js": "jsx",
			},
			stdin: {
				contents: jsCode,
				loader: "jsx",
			},
		});
	});
};

generateComponents(ICON_DIR);
generateComponents(ICON_COLOR_DIR);
