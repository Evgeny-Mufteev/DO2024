const notify = require('gulp-notify');

module.exports.plumberNotify = (title) => ({
  errorHandler: notify.onError({
    title: title,
    message: 'error <%= error.message %>',
    sound: false
  })
})