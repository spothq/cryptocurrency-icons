const { readdirSync, readFileSync } = require("fs");
const { transform } = require("@svgr/core");
const { join } = require("path");
const esbuild = require("esbuild");

const ICON_SOURCE_DIR = "./svg/color";

const generateComponents = () => {
	const icons = readdirSync(ICON_SOURCE_DIR);
	icons.forEach((file) => {
		const [fileName] = file.split(".");
		let iconName = fileName;
		if (iconName === "index") {
			iconName = "indexIcon";
		}
		const svgPath = join(ICON_SOURCE_DIR, file);
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

generateComponents();
