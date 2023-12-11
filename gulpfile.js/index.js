const {watch, series, parallel} = require('gulp')
const browserSync = require('browser-sync').create()

// Пути
const path = require('./config/path.js')

// Импорт задач для DEV
const clearDev = require(path.taskDev + 'clear'),
  htmlDev = require(path.taskDev + 'html'),
  scssDev = require(path.taskDev + 'scss'),
  jsDev = require(path.taskDev + 'js'),
  imgDev = require(path.taskDev + 'img'),
  fontsDev = require(path.taskDev + 'fonts'),
  svgDev = require(path.taskDev + 'svg'),
  pluginsDev = require(path.taskDev + 'plugins')
  filesDev = require(path.taskDev + 'files')

// Импорт задач для PROD
const clearBuild = require(path.taskBuild + 'clear'),
  htmlBuild = require(path.taskBuild + 'html'),
  scssBuild = require(path.taskBuild + 'scss'),
  jsBuild = require(path.taskBuild + 'js'),
  imgBuild = require(path.taskBuild + 'img'),
  fontsBuild = require(path.taskBuild + 'fonts'),
  svgBuild = require(path.taskBuild + 'svg'),
  pluginsBuild = require(path.taskBuild + 'plugins')
  filesBuild = require(path.taskBuild + 'files')

// Просмотр билда для PROD
const preview = () => {
  browserSync.init({
    server: {
      baseDir: path.rootBuild
    }
  })
}

// Слежение за файлами DEV
const watcher = () => {
  browserSync.init({
    server: {
      baseDir: path.rootDest
    }
  })
  watch(path.html.watch, htmlDev).on("all", browserSync.reload)
  watch(path.scss.watch, scssDev).on("all", browserSync.reload)
  watch(path.js.watch, jsDev).on("all", browserSync.reload)
  watch(path.img.watch, imgDev).on("all", browserSync.reload)
  watch(path.fonts.watch, fontsDev).on("all", browserSync.reload)
  watch(path.svg.watch, svgDev).on("all", browserSync.reload)
  watch(path.plugins.watch, pluginsDev).on("all", browserSync.reload)
  watch(path.files.watch, filesDev).on("all", browserSync.reload)
}

// Экспорт задач отдельно для DEV
exports.htmlDev = htmlDev
exports.scssDev = scssDev
exports.jsDev = jsDev
exports.imgDev = imgDev
exports.fontsDev = fontsDev
exports.svgDev = svgDev
exports.watchDev = watcher
exports.clearDev = clearDev
exports.pluginsDev = pluginsDev
exports.filesDev = filesDev

// Экспорт задач отдельно для PROD
exports.htmlBuild = htmlBuild
exports.scssBuild = scssBuild
exports.jsBuild = jsBuild
exports.imgBuild = imgBuild
exports.fontsBuild = fontsBuild
exports.svgBuild = svgBuild
exports.clearBuild = clearBuild
exports.pluginsBuild = pluginsBuild
exports.filesBuild = filesBuild

// Процессы DEV версии
const dev = series(
  clearDev,
  parallel(htmlDev, scssDev, jsDev, imgDev, fontsDev, svgDev, pluginsDev, filesDev),
  watcher
)

// Процессы PROD версии
const build = series(
  clearBuild,
  parallel(htmlBuild, scssBuild, jsBuild, imgBuild, fontsBuild, svgBuild, pluginsBuild, filesBuild),
  preview
)

exports.default = dev // DEV: Запуск через "gulp"
exports.docs = build  // PROD: Запуск через "gulp docs"

