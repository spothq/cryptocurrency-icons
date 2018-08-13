## Maintaining

We don't currently accept contributions for icons as the process for creating them is a bit complicated. This guide is for the maintainers.

### Adding a new icon

- Create the icon and export from Sketch.
- Add the symbol name of the currency to `manifest.json`, for example:
```js
[
	{
		"symbol": "$PAC",
		"name": "Paccoin"
	},
	// …
	{
		"symbol": "BTC"
	}
]
```
- Then run `npm install && npm run manifest` and the name will be filled in:
```js
[
	{
		"symbol": "$PAC",
		"name": "Paccoin"
	},
	// …
	{
		"symbol": "BTC",
		"name": "Bitcoin"
	}
]
```
