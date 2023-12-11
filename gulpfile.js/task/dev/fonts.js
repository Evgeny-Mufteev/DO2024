const {src, dest} = require('gulp')
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const tf2woff2 = require('gulp-ttf2woff2')

const path = require('../../config/path.js')

const fonts = () => {
  return src(path.fonts.src)
    .pipe(newer(path.fonts.dest))
    .pipe(fonter({
      formats: ["ttf", "woff", "eot"]
    }))
    .pipe(dest(path.fonts.dest))
    .pipe(tf2woff2())
    .pipe(dest(path.fonts.dest))
}

module.exports = fonts