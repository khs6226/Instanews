var gulp = require('gulp'), 
  terser = require('gulp-terser'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglifycss');


  gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
       .pipe(sass())
       .pipe(autoprefixer({
          browsers: ['last 2 versions']
       }))
       .pipe(uglify())
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest('./build/css'))
 });

gulp.task('browser-sync', function() {
  browserSync.init({
     server: {
        baseDir: './'
     }
  });
  gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('scripts', function() {
  return gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser({
      keep_fnames: false,
      toplevel: true
    }))
    .pipe(rename({ extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
  });


gulp.task('watch', function() {
  gulp.watch(['./js/*.js', 'sass/*.scss'], gulp.series('scripts', 'sass'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
