const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(cb){
    gulp.src('./public/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            gulp.dest('./public/assets/css')
        );
        cb();
});

gulp.task(
    'default',
    gulp.series('sass', function(cb){
        gulp.watch('./public/assets/sass/**/*.scss', gulp.series('sass'));
        cb();        
    })
);