const fs = require('fs')
const _ = require('lodash')
const async = require('async')
const path = require('path')
const request = require('request')
const recursive = require('recursive-readdir')
const markdownTable = require('markdown-table')

const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0'

async.autoInject({
  files: (cb) => recursive(path.join(__dirname, '../svg/'), cb),
  crypto: (cb) => request(url, (err, res, body) => cb(err, body)),
  table: (files, crypto, cb) => {
    const coins = JSON.parse(crypto)
    const headers = {}
    const table = _.chain(files)
      .map(file => {
        const pathArray = file.split(path.sep)
        const folder = pathArray[pathArray.length - 2]
        headers[folder] = true
        const fileName = path.basename(file, '.svg')
        const coin = coins.find(coin => coin.symbol.toLowerCase() === fileName)
        return {
          symbol: fileName,
          name: coin ? coin.name : '?',
          [folder]: 'yes'
        }
      })
      .groupBy(e => e.symbol)
      .reduce((a, b) => [...a, b.reduce((m, n) => Object.assign({}, m, n))], [])
      .value()
    const header = ['symbol', 'name', ...Object.keys(headers)]
    const tableOfArrays = table.map((coin) => header.map(h => coin[h]))
    const markdown = markdownTable([header, ...tableOfArrays])

    const readmePath = path.join(__dirname, '../README.md')
    const readme =  fs.readFileSync(readmePath, 'utf-8')
    const updatedReadme = readme.replace(/<!---start--->[^\0]*?<!---end--->/, `<!---start--->\n${markdown}\n<!---end--->`)
    fs.writeFile(readmePath, updatedReadme, cb)
  }
})