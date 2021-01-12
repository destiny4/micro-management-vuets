// const importAll = require('./utils/base/importAll')
const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')

let maps, keys

function fileDisplay (filePath) {
  const files = fs.readdirSync(filePath)
  files.forEach(function (item) {
    const fPath = path.join(filePath, item)
    const stat = fs.statSync(fPath)
    if (stat.isDirectory() === true) {
      fileDisplay(fPath)
    }
    if (stat.isFile() === true) {
      maps.set(item.split('.')[0], fPath)
      keys.push(item.split('.')[0])
    }
  })
}

function importAll (base, business) {
  maps = new Map()
  keys = []
  const baseFilePath = path.resolve(__dirname, base)
  const businessFilePath = path.resolve(__dirname, business)
  fileDisplay(baseFilePath)
  fileDisplay(businessFilePath)
  return { maps, keys }
}

function myImoprt (basePath, businessPath, goalPath, templatePath) {
  const api = importAll(basePath, businessPath)
  goalPath = path.resolve(__dirname, goalPath)
  const str = fs.readFileSync(path.resolve(__dirname, templatePath), {
    encoding: 'utf-8'
  })
  const apiRender = ejs.render(str, { maps: api.maps, keys: api.keys })
  if (fs.pathExistsSync(goalPath)) fs.removeSync(goalPath)
  fs.outputFileSync(goalPath, apiRender)
}

module.exports = myImoprt
