"use strict"
const fs = require("fs")
const path = require("path")
const coins = require("coinlist")
const alphaSort = require("alpha-sort")
const manifest = require("../manifest.json")

const overrides = new Map([
	["VRSC", "VerusCoin"],
	["GMR", "Gimmer"],
	["NEXO", "Nexo"],
	["GUSD", "Gemini dollar"],
	["CALL", "Capital"],
	["BOS", "BOScoin"],
	["CIX", "Cryptonetix"],
	["COQUI", "COQUI Cash"],
	["DEEZ", "DeezNuts"],
	["MZC", "MAZA"],
	["CVC", "Civic"],
	["BTM", "Bitmark"],
	["GLXT", "GLX Token"],
	["ONG", "SoMee.Social"],
	["CC", "CoinCollect"],
	["2GIVE", "2Give"],
	["BOOTY", "Booty"],
	["PUNGO", "Pungo Token"],
	["X", "GLX Equity Token"],
	["AYWA", "Aywa"],
	["CHAIN", "Chainmakers"],
	["LPT", "Livepeer Token"],
	["AUDR", "AUDRamp"],
	["BAB", "Bitcoin Cash ABC"],
	["BSV", "BitcoinSV"],
	["GOLD", "Dragonereum Gold"],
	["USDC", "USD Coin"]
])

const icons = manifest.map(icon => {
	console.log("ICON", icon)
	const txid = icon.txid
	const id = icon.symbol

	return {
		symbol: id.toUpperCase(),
		name: overrides.get(id) || coins.get(id, "name") || id
	}
})

icons.sort((a, b) => alphaSort.asc(a.symbol, b.symbol))

const data = `${JSON.stringify(icons, null, "\t")}\n`

fs.writeFileSync(path.resolve(__dirname, "../manifest.json"), data)
