'use strict';
const fs = require('fs');
const path = require('path');
const coins = require('coinlist');
const getColors = require('get-svg-colors');
const alphaSort = require('alpha-sort');
const manifest = require('../manifest.json');

const overrides = new Map([
	['VRSC', 'VerusCoin'],
	['GMR', 'Gimmer'],
	['NEXO', 'Nexo'],
	['GUSD', 'Gemini dollar'],
	['CALL', 'Capital'],
	['BOS', 'BOScoin'],
	['CIX', 'Cryptonetix'],
	['COQUI', 'COQUI Cash'],
	['DEEZ', 'DeezNuts'],
	['MZC', 'MAZA'],
	['CVC', 'Civic'],
	['BTM', 'Bitmark'],
	['GLXT', 'GLX Token'],
	['ONG', 'SoMee.Social'],
	['CC', 'CoinCollect'],
	['2GIVE', '2Give'],
	['BOOTY', 'Booty'],
	['PUNGO', 'Pungo Token'],
	['X', 'GLX Equity Token'],
	['AYWA', 'Aywa'],
	['CHAIN', 'Chainmakers'],
	['LPT', 'Livepeer Token'],
	['AUDR', 'AUDRamp'],
	['BAB', 'Bitcoin Cash ABC'],
	['BSV', 'BitcoinSV'],
	['GOLD', 'Dragonereum Gold'],
	['USDC', 'USD Coin'],
	['AEUR', 'Augmint Euro Token'],
	['BCIO', 'Blockchain.io'],
	['BEAM', 'Beam'],
	['BTT', 'BitTorrent'],
	['GRIN', 'Grin'],
	['ILK', 'Inlock Token'],
	['BTM', 'Bytom']
]);

const icons = manifest.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;
	const fileName = `${id.toLowerCase()}.svg`;
	const svgPath = path.join(__dirname, '..', 'svg', 'color', fileName);
	let color;
	if (fs.existsSync(svgPath)) {
		const svg = fs.readFileSync(svgPath, 'utf8');
		const colors = getColors(svg);
		const hex = colors.fills[0].hex().toUpperCase();
		color = hex;
	}

	return {
		symbol: id.toUpperCase(),
		name: overrides.get(id) || coins.get(id, 'name') || id,
		color
	};
});

icons.sort((a, b) => alphaSort.asc(a.symbol, b.symbol));

const data = JSON.stringify(icons, null, '\t') + '\n';

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), data);
