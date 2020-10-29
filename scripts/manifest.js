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
	['BTM', 'Bytom'],
	['D', 'Denarius'],
	['BTCD', 'BitcoinDark'],
	['CMT', 'Comet'],
	['CTR', 'Centra'],
	['HSR', 'HShare'],
	['ICN', 'Iconomi'],
	['IOST', 'IOStoken'],
	['PRL', 'Oyster'],
	['RCN', 'Rcoin'],
	['REN', 'Ren'],
	['RYO', 'Ryo Currency'],
	['SKY', 'Skycoin'],
	['XVC', 'Vcash'],
	['MATIC', 'Matic Network'],
	['AMPL', 'Ampleforth'],
	['DOT', 'Polkadot'],
	['KLOWN', 'Ether Clown'],
	['LEO', 'Unus Sed LEO'],
	['SAI', 'Single Collateral DAI'],
	['SIN', 'SINOVATE'],
	['YFI', 'yearn.finance']
]);

const icons = manifest.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;
	const filename = `${id.toLowerCase()}.svg`;
	const svgPath = path.resolve(__dirname, '../svg/color/', filename);
	const svg = fs.readFileSync(svgPath, 'utf8');
	const fillColor = getColors(svg).fills[0];

	if (!fillColor) {
		throw new Error(`Couldn't get color for \`${id}\``);
	}

	return {
		symbol: id.toUpperCase(),
		name: overrides.get(id) || coins.get(id, 'name') || id,
		color: fillColor.hex().toLowerCase()
	};
});

icons.sort((a, b) => alphaSort.asc(a.symbol, b.symbol));

const data = JSON.stringify(icons, null, '\t') + '\n';

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), data);
