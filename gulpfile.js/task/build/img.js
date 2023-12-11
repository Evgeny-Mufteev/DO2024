const {src, dest} = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const webp = require('gulp-webp')

const path = require('../../config/path.js')

const img = () => {
  return src(path.img.src)
    .pipe(newer(path.img.build))
    .pipe(webp())
    .pipe(dest(path.img.build))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.build))
    .pipe(imagemin({verbose: true}))
    .pipe(dest(path.img.build))
}

module.exports = img