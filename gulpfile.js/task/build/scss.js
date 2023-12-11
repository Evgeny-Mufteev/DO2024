const {src, dest} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber')
const webpCss = require('gulp-webp-css')

const path = require('../../config/path.js')
const settings = require('../../config/notifyMessage.js')

const scss = () => {
  return src(path.scss.src)
    .pipe(plumber(settings.plumberNotify('SCSS')))
    .pipe(sass())
    .pipe(autoprefixer())
    // .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(dest(path.scss.build))
}

module.exports = scss