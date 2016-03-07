var gulp = require('gulp');
var typescript = require('gulp-typescript');
var plumber = require("gulp-plumber");

typescriptProject = typescript.createProject('tsconfig.json', function() {
  typescript: require('typescript')
});

gulp.task('ts', function() {
    gulp.src([
           './app/*/*.ts',
           '!./node_modules/**'//node_modules配下は除外する
         ])
        .pipe(plumber())
        .pipe(typescript(typescriptProject))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('app/*/*.ts', ['ts'])
});

gulp.task('default',function(){
    gulp.run('watch');
});
