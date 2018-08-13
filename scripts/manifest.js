const manifest = require('../manifest.json');
const fs = require('fs');
const path = require('path');
const coins = require('coinlist');
const alphaSort = require('alpha-sort');

const icons = manifest.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;

	return {
		name: coins.get(id, 'name') || id,
		symbol: id.toUpperCase(),
	};
});

icons.sort((a, b) => {
	return alphaSort.asc(a.symbol, b.symbol);
});

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), JSON.stringify(icons, null, 4));
