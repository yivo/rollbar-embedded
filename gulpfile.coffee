gulp      = require('gulp')
concat    = require('gulp-concat')
coffee    = require('gulp-coffee')
replace   = require('gulp-replace')
fs        = require('fs')
rollbarJS = fs.readFileSync('./vendor/rollbar.min.js').toString('UTF-8')

gulp.task 'build', ->
  gulp.src('source/rollbar-embedded.coffee')
    .pipe replace(/[ ]*\/\* rollbar\.js \*\//, rollbarJS)
    .pipe gulp.dest('build')
    .pipe coffee()
    .pipe gulp.dest('build')
