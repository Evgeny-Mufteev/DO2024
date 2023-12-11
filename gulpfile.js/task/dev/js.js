const {src, dest} = require('gulp')
const plumber = require('gulp-plumber')
const rigger = require("gulp-rigger")

const path = require('../../config/path.js')
const settings = require('../../config/notifyMessage.js')

const js = () => {
  return src(path.js.src, {sourcemaps: true})
    .pipe(plumber(settings.plumberNotify('JS')))
    .pipe(rigger())
    .pipe(dest(path.js.dest, {sourcemaps: true}))
}

module.exports = js