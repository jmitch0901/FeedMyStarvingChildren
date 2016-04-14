//Dependencies

var Gulp = require('gulp'),
    GulpConcat = require('gulp-concat'),
    GulpUglify = require('gulp-uglify'),
    Autoprefixer = require('gulp-autoprefixer'),
    GulpRename = require('gulp-rename'),
    GulpNGAnnotate = require('gulp-ng-annotate'),
    Del = require('del');

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
    'dist/public/bower.json',
    'dist/public/!(*.min.js)',
    'dist/public/!(*.min.css)',
    'dist/public/bower_components/'
  ]
};

//BUILD FOR DEPLOYMENT
Gulp.task('build',['build:server','build:client']);

Gulp.task('build:server',function(){

});

Gulp.task('build:client',['build:client:styles','build:client:scripts'],function(){

});

Gulp.task('build:client:styles',function(cb){

  return cb();
});

Gulp.task('build:client:scripts',function(cb){

  return cb();
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






//Tasks
// Gulp.task('browser-sync',['nodemon'],function(){
//   BrowserSync.init(null,{
//     proxy:"http://localhost:8080",
//     port:8081,
//     notify:false
//   });
// });

// Gulp.task('nodemon',function(cb){
//   var started = false;
//     return Nodemon({
//       script: 'server.js',
//       ignore:[
//         'gulpfile.js',
//         'node_modules/',
//         'app/',
//         '.git/'
//       ]
//     })
//     .on('start',function(){
//       if(!started){
//         started = true;
//         cb();
//       }
//     })
//     .on('restart',function(){
//       Gulp.run(['scripts','styles','html']);
//     });
// });

//
// Gulp.task('styles',function(){
//   Gulp.src('app/scss/style.scss')
//   .pipe(Sass({outputStyle:'expanded'}))
//   .on('error',errorlog)
//   .pipe(Autoprefixer({
//     browsers:['last 3 versions'],
//     cascade:false
//   }))
//   .pipe(Gulp.dest('app/css'))
//   .pipe(BrowserSync.reload({stream:true}));
// });
//
// Gulp.task('html',function(){
//   Gulp.src('app/**/*.html')
//   .pipe(BrowserSync.reload({stream:true}));
// });
//
// Gulp.task('scripts',function(){
//   Gulp.src('app/js/**/*.js')
//   .pipe(BrowserSync.reload({stream:true}));
// });


//WATCH
// Gulp.task('watch',function(){
//   Gulp.watch('app/scss/**/*.scss',['styles']);
//   Gulp.watch('app/js/**/*.js',['scripts']);
//   Gulp.watch('app/**/*.html',['html']);
// });

//Gulp.task('default',['scripts','styles','html','browser-sync','watch']);
