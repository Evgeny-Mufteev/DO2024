const {src, dest} = require('gulp')
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const tf2woff2 = require('gulp-ttf2woff2')

const path = require('../../config/path.js')

const fonts = () => {
  return src(path.fonts.src)
    .pipe(newer(path.fonts.build))
    .pipe(fonter({
      formats: ["ttf", "woff", "eot"]
    }))
    .pipe(dest(path.fonts.build))
    .pipe(tf2woff2())
    .pipe(dest(path.fonts.build))
}

module.exports = fonts