'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SVG_DIR = path.join(ROOT, 'svg');
const CDN_DIST = path.join(ROOT, 'cdn-dist');
const OUTPUT = path.join(ROOT, 'cdn-manifest.json');

const VARIANTS = ['color', 'icon', 'white', 'black'];

function hashFile(filePath) {
	const contents = fs.readFileSync(filePath);
	return crypto.createHash('sha256').update(contents).digest('hex').slice(0, 8);
}

const manifest = {};
let added = 0;
let unchanged = 0;

for (const variant of VARIANTS) {
	const srcDir = path.join(SVG_DIR, variant);
	if (!fs.existsSync(srcDir)) continue;

	const destDir = path.join(CDN_DIST, 'svg', variant);
	fs.mkdirSync(destDir, { recursive: true });

	manifest[variant] = {};

	// Build the set of expected hashed filenames for this variant
	const expectedFiles = new Set();

	for (const file of fs.readdirSync(srcDir).sort()) {
		if (!file.endsWith('.svg')) continue;
		const name = file.slice(0, -4); // strip .svg
		const hash = hashFile(path.join(srcDir, file));
		manifest[variant][name] = hash;

		const hashedFilename = `${hash}-${name}.svg`;
		expectedFiles.add(hashedFilename);

		const destPath = path.join(destDir, hashedFilename);
		if (!fs.existsSync(destPath)) {
			// New or changed icon — copy with new hash-prefixed name
			fs.copyFileSync(path.join(srcDir, file), destPath);
			added++;
		} else {
			unchanged++;
		}
	}

	// Remove stale files (old hashes from previously changed icons)
	for (const existing of fs.readdirSync(destDir)) {
		if (!expectedFiles.has(existing)) {
			fs.unlinkSync(path.join(destDir, existing));
		}
	}
}

fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, '\t') + '\n');
const total = Object.values(manifest).reduce((n, v) => n + Object.keys(v).length, 0);
console.log(`cdn-manifest.json written with ${total} entries`);
console.log(`cdn-dist/: ${added} added, ${unchanged} unchanged`);
