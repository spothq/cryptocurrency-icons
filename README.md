# Deprecation Warning
This repo is currently unmaintained

We are working on a more user-friendly way to submit token icons, including on token creation at mint.bitcoin.com

Status quo
- mint.bitcoin.com pulls token icons from this repo: https://github.com/kosinusbch/slp-token-icons
- Bitcoin.com mobile wallet uses its own whitelist based on https://markets.bitcoin.com/featured-tokens
- Badger uses its own whitelist viewable here https://github.com/Bitcoin-com/badger-mobile/tree/develop/assets/images/token-icons (not affiliated with https://github.com/Bitcoin-com/bch-token-icons/)

Future
- Bitcoin.com will have an open-source repo where pretty much anything goes; it will be possible to submit to this repo when creating a token at mint.bitcoin.com
- We'll have a whitelist repo that's a subset of the pretty-much-anything-goes repo
- Wallets and apps can choose either/or

# Bitcoin Cash Token Icons

This project contains Bitcon Cash token icons in 4 sizes. Completely free. All we ask is that you don’t claim them as your own, and share this resource with others.

Images are in the PNG format (transparent) in `32×32`, `32×32 (2x)`, and `128×128` variants, along with SVG versions. Each token has a `name`, `symbol` and `tokenId` listed in [manfest.json](manifest.json).

There's also a [`generic` icon](https://github.com/Bitcoin-com/bch-token-icons/blob/master/svg/icon/generic.svg) that can be used for cryptocurrencies missing an icon here.

If there is a token you’re looking for that hasn’t been included, please [create a new pull-request](https://github.com/Bitcoin-com/bch-token-icons/pulls/new) and add it. Please include your icon in the 3 sizes mentioned above and add your token's `name`, `symbol` and `tokenId` to [manfest.json](manifest.json)

## Install 🚀

```
$ npm install bch-token-icons --save
```

You can then import the icons from `./node_modules/bch-token-icons`, for example `./node_modules/bch-token-icons/svg/icon/bch.svg`.

There's also a `manifest.json` file included in the package with a list of the currency symbol and name of the icons.
