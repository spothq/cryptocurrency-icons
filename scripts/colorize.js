const fs = require("fs-extra");
const path = require("path");
const manifest = require("../manifest.json");
const getColors = require("get-svg-colors")


async function colorize() {
	for (coin of manifest) {
		const coinName = `${coin.symbol.toLowerCase()}.svg`;
		let svgPath = path.join(__dirname, '..', 'svg', 'color', coinName);
		const svg = await fs.readFile(svgPath, 'utf8').catch(() => null);
		if (svg === null) {
			coin.color = "not_found"
		} else {
			const colors = getColors(svg);
			const hex = colors.fills.map(color => color.hex().toUpperCase())[0];
			coin.color = hex;
		}
	}
	return Promise.resolve(manifest);
}

colorize().then(res => {
	console.log("Added hex colors to manifest.json")
	fs.writeJSON("../manifest.json", res)
})
