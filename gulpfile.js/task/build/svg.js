const {src, dest} = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const newer = require('gulp-newer')

// Конфигурации
const path = require('../../config/path.js')

const svg = () => {
  return src(path.svg.src)
    .pipe(newer(path.svg.build))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill')
        $('[stroke]').removeAttr('stroke')
        $('[style]').removeAttr('style')
        $('[xmlns]').removeAttr('xmlns')
      },
      parserOptions: {xmlMode: false}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"
          }
        },
      }
    ))
    .pipe(dest(path.svg.build))
}

module.exports = svg