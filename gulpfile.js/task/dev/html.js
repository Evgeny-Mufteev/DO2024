const {src, dest} = require('gulp')
const fileInclude = require('gulp-file-include')
const plumber = require('gulp-plumber')

const path = require('../../config/path.js')
const settings = require('../../config/notifyMessage.js')

const html = () => {
  return src(path.html.src)
    .pipe(plumber(settings.plumberNotify('HTML')))
    .pipe(fileInclude())
    .pipe(dest(path.html.dest))
}

module.exports = html