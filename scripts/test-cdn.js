'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { getCdnIconUrl } = require('../cdn.js');
const cdnManifest = require('../cdn-manifest.json');

// ---------------------------------------------------------------------------
// getCdnIconUrl
// ---------------------------------------------------------------------------

test('returns color CDN URL with hash prefix for known icon', () => {
	const url = getCdnIconUrl('btc');
	assert.match(url, /^https:\/\/cdn\.bitgo\.com\/cryptocurrency-icons\/svg\/color\/[0-9a-f]{8}-btc\.svg$/);
});

test('defaults to color variant when none specified', () => {
	const url = getCdnIconUrl('eth');
	assert.ok(url.includes('/svg/color/'));
	assert.ok(url.endsWith('-eth.svg'));
});

test('uses specified variant in URL', () => {
	for (const variant of ['color', 'icon', 'white', 'black']) {
		const url = getCdnIconUrl('btc', variant);
		assert.ok(url.includes(`/svg/${variant}/`), `expected ${variant} in URL`);
		assert.ok(url.endsWith('-btc.svg'), `expected hashed filename for ${variant}`);
	}
});

test('hash is prefixed to filename for known icons', () => {
	const url = getCdnIconUrl('eth', 'white');
	assert.match(url, /\/[0-9a-f]{8}-eth\.svg$/);
});

test('returns URL without hash prefix for unknown icon', () => {
	const url = getCdnIconUrl('definitelynotacoin');
	assert.equal(url, 'https://cdn.bitgo.com/cryptocurrency-icons/svg/color/definitelynotacoin.svg');
});

test('uses custom baseUrl when provided', () => {
	const base = 'https://staging.cdn.bitgo.com/cryptocurrency-icons';
	const url = getCdnIconUrl('btc', 'color', base);
	assert.ok(url.startsWith(base));
	assert.ok(url.includes('/svg/color/'));
	assert.ok(url.endsWith('-btc.svg'));
});

test('custom baseUrl still includes hash prefix', () => {
	const base = 'https://staging.cdn.bitgo.com/cryptocurrency-icons';
	const url = getCdnIconUrl('btc', 'color', base);
	assert.match(url, /\/[0-9a-f]{8}-btc\.svg$/);
});

test('hash differs between variants for same icon', () => {
	// color and white are different SVGs so hashes must differ
	const colorUrl = getCdnIconUrl('btc', 'color');
	const whiteUrl = getCdnIconUrl('btc', 'white');
	const colorHash = path.basename(colorUrl).split('-')[0];
	const whiteHash = path.basename(whiteUrl).split('-')[0];
	assert.notEqual(colorHash, whiteHash);
});

// ---------------------------------------------------------------------------
// cdn-manifest.json shape
// ---------------------------------------------------------------------------

test('cdn-manifest.json contains all four variants', () => {
	for (const variant of ['color', 'icon', 'white', 'black']) {
		assert.ok(cdnManifest[variant], `missing variant: ${variant}`);
	}
});

test('all hashes are 8 lowercase hex characters', () => {
	for (const [variant, entries] of Object.entries(cdnManifest)) {
		for (const [name, hash] of Object.entries(entries)) {
			assert.match(
				hash,
				/^[0-9a-f]{8}$/,
				`${variant}/${name} has invalid hash: ${hash}`
			);
		}
	}
});

test('cdn-manifest.json entries match svg files on disk', () => {
	for (const variant of ['color', 'icon', 'white', 'black']) {
		const dir = path.join(ROOT, 'svg', variant);
		const svgFiles = fs.readdirSync(dir)
			.filter(f => f.endsWith('.svg'))
			.map(f => f.slice(0, -4));

		const manifestNames = Object.keys(cdnManifest[variant]);

		const missingFromManifest = svgFiles.filter(n => !cdnManifest[variant][n]);
		const extraInManifest = manifestNames.filter(n => !svgFiles.includes(n));

		assert.deepEqual(missingFromManifest, [], `${variant}: SVG files missing from manifest`);
		assert.deepEqual(extraInManifest, [], `${variant}: manifest has entries with no SVG file`);
	}
});

// ---------------------------------------------------------------------------
// cdn-dist/ output
// ---------------------------------------------------------------------------

test('cdn-dist/ contains hashed SVG files for all variants', () => {
	for (const variant of ['color', 'icon', 'white', 'black']) {
		const distDir = path.join(ROOT, 'cdn-dist', 'svg', variant);
		assert.ok(fs.existsSync(distDir), `cdn-dist/svg/${variant}/ does not exist`);

		const files = fs.readdirSync(distDir);
		assert.ok(files.length > 0, `cdn-dist/svg/${variant}/ is empty`);

		for (const file of files) {
			assert.match(file, /^[0-9a-f]{8}-.+\.svg$/, `unexpected filename in cdn-dist/svg/${variant}/: ${file}`);
		}
	}
});

test('cdn-dist/ file count matches manifest entry count', () => {
	for (const variant of ['color', 'icon', 'white', 'black']) {
		const distDir = path.join(ROOT, 'cdn-dist', 'svg', variant);
		const distCount = fs.readdirSync(distDir).filter(f => f.endsWith('.svg')).length;
		const manifestCount = Object.keys(cdnManifest[variant]).length;
		assert.equal(distCount, manifestCount, `cdn-dist/svg/${variant}/ has ${distCount} files but manifest has ${manifestCount} entries`);
	}
});
