const del = require("del")

const path = require('../../config/path.js')

const clear = () => {
  return del(path.rootDest)
}
module.exports = clear