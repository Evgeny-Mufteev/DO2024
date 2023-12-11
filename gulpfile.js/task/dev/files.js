const {src, dest} = require('gulp')

const path = require("../../config/path")

const files = () => {
  return src(path.files.src)
    .pipe(dest(path.files.dest))
}

module.exports = files