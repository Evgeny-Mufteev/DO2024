const {src, dest} = require('gulp')

const path = require('../../config/path.js')

const img = () => {
  return src(path.img.src)
    .pipe(dest(path.img.dest))
}

module.exports = img