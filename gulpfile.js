//Dependencies

// TODO - update the rest of script to be compatible with Gulp v4

var Gulp = require('gulp'),
  GulpConcat = require('gulp-concat'),
  GulpUglify = require('gulp-uglify'),
  GulpNGAnnotate = require('gulp-ng-annotate'),
  GulpNoLogs = require('gulp-removelogs'),
  Del = require('del'),
  Nodemon = require('gulp-nodemon'),
  BrowserSync = require('browser-sync').create();

//Log errors
function errorlog(err) {
  console.error(err.message);
  this.emit('end');
}

var config = {
  jsConcatFiles: ['public/scripts/**/*.js'],
  distFoldersToRemove: [
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
    'img/*.png',
    '.bowerrc',
    'bower.json',
    'package.json',
    'app.js'
  ]
};

Gulp.task('scripts', function() {
  return (
    Gulp.src(config.jsConcatFiles)
      .pipe(GulpConcat('app.min.js'))
      // .pipe(GulpNGAnnotate())
      // .pipe(GulpUglify())
      .on('error', errorlog)
      .pipe(Gulp.dest('./public'))
      .pipe(BrowserSync.reload({ stream: true }))
  );
});

// FOR DEBUGGING
// Gulp.task(
//   'browser-sync',
//   Gulp.series('nodemon', function() {
//     return BrowserSync.init(null, {
//       proxy: 'https://localhost:3000',
//       port: 3001,
//       notify: false
//     });
//   })
// );

// Gulp.task(
//   'nodemon',
//   Gulp.series('scripts', 'styles', 'html', function(cb) {
//     var started = false;
//     return Nodemon({
//       script: 'app.js',
//       ignore: [
//         'gulpfile.js',
//         'node_modules/',
//         'public/**/*',
//         '.git/',
//         '.gitignore'
//       ]
//     })
//       .on('start', function() {
//         if (!started) {
//           started = true;
//           cb();
//         }
//       })
//       .on('restart', function() {
//         Gulp.run(['scripts', 'styles', 'html']);
//       });
//   })
// );

// Gulp.task('styles', function() {
//   return Gulp.src('public/css/**/*.css').pipe(
//     BrowserSync.reload({ stream: true })
//   );
// });

// Gulp.task('html', function() {
//   return Gulp.src('public/**/*.html').pipe(
//     BrowserSync.reload({ stream: true })
//   );
// });

// Gulp.task(
//   'watch',
//   Gulp.series('scripts', 'styles', 'html', function() {
//     Gulp.watch('public/**/*.html', ['html']);
//     Gulp.watch('public/css/*.css', ['styles']);
//     Gulp.watch('public/**/*.js', ['scripts']);
//   })
// );

// Gulp.task(
//   'default',
//   Gulp.series('scripts', 'styles', 'html', 'browser-sync', 'watch')
// );

// //BUILD FOR DEPLOYMENT

// Gulp.task(
//   'build',
//   Gulp.series('build:clean', 'build:server', 'build:client', function() {
//     console.log('BUILD');
//   })
// );

// Gulp.task('build:clean', function(cb) {
//   console.log('BUILD -> CLEAN');
//   return Del(['dist/**/*'], cb);
// });

// Gulp.task(
//   'build:server',
//   Gulp.series('build:clean', function() {
//     console.log('BUILD -> SERVER');
//     return Gulp.src(config.serverFilesToCopy, { base: './' }).pipe(
//       Gulp.dest('dist/')
//     );
//   })
// );

// Gulp.task(
//   'build:client',
//   Gulp.series(
//     'build:clean',
//     'build:client:styles',
//     'build:client:scripts',
//     'build:client:html',
//     function() {
//       console.log('BUILD -> CLIENT');
//       Gulp.src(['public/bower_components/**/*', 'public/img/**/*'], {
//         base: './'
//       }).pipe(Gulp.dest('dist/'));
//     }
//   )
// );

// Gulp.task(
//   'build:client:styles',
//   Gulp.series('build:clean', function() {
//     console.log('BUILD -> CLIENT -> STYLES');
//     return Gulp.src('public/css/*.css').pipe(Gulp.dest('dist/public/css'));
//   })
// );

// Gulp.task(
//   'build:client:scripts',
//   Gulp.series('build:clean', function() {
//     console.log('BUILD -> CLIENT -> SCRIPTS');
//     return Gulp.src(config.jsConcatFiles)
//       .pipe(GulpConcat('app.min.js'))
//       .pipe(GulpNoLogs())
//       .pipe(GulpNGAnnotate())
//       .pipe(GulpUglify())
//       .on('error', errorlog)
//       .pipe(Gulp.dest('./dist/public'));
//   })
// );

// Gulp.task(
//   'build:client:html',
//   Gulp.series('build:clean', function() {
//     return Gulp.src(['./public/**/*.html']).pipe(Gulp.dest('./dist/public/'));
//   })
// );
