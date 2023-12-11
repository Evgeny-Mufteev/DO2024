const {src, dest} = require('gulp')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const rigger = require("gulp-rigger")

const path = require('../../config/path.js')
const settings = require('../../config/notifyMessage.js')

const js = () => {
  return src(path.js.src)
    .pipe(plumber(settings.plumberNotify('JS')))
    .pipe(rigger())
    .pipe(babel())
    .pipe(dest(path.js.build))
}

module.exports = js