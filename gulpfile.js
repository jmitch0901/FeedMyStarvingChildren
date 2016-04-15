//Dependencies

var Gulp = require('gulp'),
    GulpConcat = require('gulp-concat'),
    GulpUglify = require('gulp-uglify'),
    Autoprefixer = require('gulp-autoprefixer'),
    GulpRename = require('gulp-rename'),
    GulpNGAnnotate = require('gulp-ng-annotate'),
    Del = require('del'),
    MainBowerFiles = require('main-bower-files');

//Log errors
function errorlog(err){
  console.error(err.message);
  this.emit('end');
}

var config = {
  jsConcatFiles: [
    'public/scripts/**/*.js'
  ],
  distFoldersToRemove:[
    'dist/public/!(*.min.js)',
    'dist/public/!(*.min.css)',
    'dist/public/bower_components/**/*.js'
  ],
  serverFilesToCopy: [
    'certs/**/*',
    'configs/**/*',
    'factories/**/*',
    'routes/**/*',
    'schemas/**/*',
    'seeds/**/*',
    'img/releasable-image.png',
    'img/secret-image.png',
    'node_modules/**/*',
    'app.js'
  ]
};

//BUILD FOR DEPLOYMENT
Gulp.task('build',['build:server','build:client'],function(){
  console.log('BUILD');
});

Gulp.task('build:clean',function(cb){
  console.log('BUILD -> CLEAN');
  return Del([
    'dist/*'
  ],cb);
});

Gulp.task('build:server',['build:clean'],function(){
  console.log('BUILD -> SERVER');
  return Gulp.src(config.serverFilesToCopy,{base:'./'})
    .pipe(Gulp.dest('dist/'));
});

Gulp.task('build:client',['build:clean','build:client:styles','build:client:scripts','build:client:html'],function(){
  console.log('BUILD -> CLIENT');
  Gulp.src(['public/bower_components/**/*','public/img/**/*'],{base:'./'})
  .pipe(Gulp.dest('dist/'));
});

Gulp.task('build:client:styles',['build:clean'],function(){
  console.log('BUILD -> CLIENT -> STYLES');
  return Gulp.src('public/css/*.css')
  .pipe(Gulp.dest('dist/public/css'));
});

Gulp.task('build:client:scripts',['build:clean'],function(){
  console.log('BUILD -> CLIENT -> SCRIPTS');
  return Gulp.src(config.jsConcatFiles)
    .pipe(GulpConcat('app.min.js'))
    .pipe(GulpNGAnnotate())
    .pipe(GulpUglify())
      .on('error',errorlog)
    .pipe(Gulp.dest('./dist/public'));
});

Gulp.task('build:client:html',['build:clean'],function(){
  return Gulp.src(['./public/**/*.html'])
    .pipe(Gulp.dest('./dist/public/'));
});


//FOR DEBUGGING
Gulp.task('scripts',function(){
  return Gulp.src(config.jsConcatFiles)
    .pipe(GulpConcat('app.min.js'))
    .pipe(GulpNGAnnotate())
    .pipe(GulpUglify())
      .on('error',errorlog)
    .pipe(Gulp.dest('./public'));
});
