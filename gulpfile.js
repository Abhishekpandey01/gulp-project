var gulp = require("gulp");
var sass = require("gulp-sass"); // importing gulp-sass plugin.
autoprefixer = require("gulp-autoprefixer");
minifycss = require("gulp-minify-css");
rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

// Gulp Sass Task
gulp.task("sass", function() {
  return gulp               
    .src("assets/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("assets/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Gulp Watch Task
gulp.task("watch", function() {
  gulp.watch("assets/scss/*.scss", gulp.series("sass"));
});

// Gulp browserSync Task
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: './'
      },
    });
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./assets/js/*.js").on("change", browserSync.reload);
})

// Default Gulp Task
gulp.task(
  "default", gulp.parallel("watch", "sass", "browserSync", function() {})
);
       
