const manifest = require('../manifest.json');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiUrl = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';

const formattedIcons = [];

axios({ method: 'GET', url: apiUrl }).then(res => {
	const coins = res.data;
	const icons = manifest.icons;

	icons.forEach(icon => {
		let needMatch = icon;

		if (typeof needMatch !== 'string') {
			needMatch = icon.symbol;
		}

		let coin = coins.find(item => {
			return item.symbol.toLowerCase() === needMatch.toLowerCase();
		});

		coin = coin || { name: needMatch, symbol: needMatch };

		formattedIcons.push({
			name: coin.name,
			symbol: coin.symbol,
		})
	});

	fs.writeFileSync(
		path.resolve(process.cwd(), './manifest.json'),
		JSON.stringify({ icons: formattedIcons }, null, 4)
	);
});

