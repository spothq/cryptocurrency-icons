const manifest = require('../manifest.json');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const coins = require('coinlist');
const alphaSort = require('alpha-sort');

const icons = manifest.icons.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;

	return {
		name: coins.get(id, 'name') || id,
		symbol: id,
	};
});

icons.sort((a, b) => {
	return alphaSort.asc(a.symbol, b.symbol);
});

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), JSON.stringify({ icons }, null, 4));
