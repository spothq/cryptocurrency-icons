'use strict';
const manifest = require('./cdn-manifest.json');

const DEFAULT_BASE_URL = 'https://cdn.bitgo.com/cryptocurrency-icons';

/**
 * Returns the CDN URL for a cryptocurrency icon.
 *
 * @param {string} name - Icon filename without extension (e.g. 'btc', 'eth')
 * @param {'color' | 'icon' | 'white' | 'black'} [variant='color'] - Icon variant
 * @param {string} [baseUrl] - CDN base URL override (useful for local/staging testing)
 * @returns {string} Full CDN URL with content hash for cache busting
 */
function getCdnIconUrl(name, variant, baseUrl) {
	const v = variant || 'color';
	const base = baseUrl || DEFAULT_BASE_URL;
	const hash = manifest[v] && manifest[v][name];
	const filename = hash ? `${hash}-${name}.svg` : `${name}.svg`;
	return `${base}/svg/${v}/${filename}`;
}

module.exports = { getCdnIconUrl };
