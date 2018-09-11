'use strict';
const fs = require('fs');
const path = require('path');
const coins = require('coinlist');
const alphaSort = require('alpha-sort');
const manifest = require('../manifest.json');

const overrides = new Map([
	['VRSC', 'VerusCoin'],
	['GMR', 'Gimmer'],
	['NEXO', 'Nexo']
]);

const icons = manifest.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;

	return {
		symbol: id.toUpperCase(),
		name: overrides.get(id) || coins.get(id, 'name') || id
	};
});

icons.sort((a, b) => alphaSort.asc(a.symbol, b.symbol));

const data = JSON.stringify(icons, null, '\t') + '\n';

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), data);
