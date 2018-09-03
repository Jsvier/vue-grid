const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () =>
    gulp.src('src/apimakro.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('distribucion/'))
);

gulp.task('watch', () =>
    gulp.watch('src/*.js',['default'])
);