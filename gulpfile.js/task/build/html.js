const {src, dest} = require('gulp')
const fileInclude = require('gulp-file-include')
const plumber = require('gulp-plumber')
const webpHtml = require('gulp-webp-html')

const path = require('../../config/path.js')
const settings = require('../../config/notifyMessage.js')

const html = () => {
  return src(path.html.src)
    .pipe(plumber(settings.plumberNotify('HTML')))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(dest(path.html.build))
}

module.exports = html