const gulp = require("gulp"), 
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  prettyError = require('gulp-prettyerror');


gulp.task("sass", function() {
    gulp.src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    // .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp
    .watch('build/css/*.css')
    .on('change', browserSync.reload);
});

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser({
      keep_fnames: false,
      toplevel: true
    })) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task("watch", function() {
    gulp.watch(["./js/*.js", "index.html", "sass/*.scss"], gulp.series("scripts", "reload", "sass"));
  });
  
gulp.task('default', gulp.parallel('watch', 'browser-sync'));