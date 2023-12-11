const {src, dest} = require('gulp')

const path = require("../../config/path")

const plugins = () => {
  return src(path.plugins.src)
    .pipe(dest(path.plugins.dest))
}

module.exports = plugins
