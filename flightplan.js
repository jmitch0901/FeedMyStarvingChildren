var plan = require('flightplan');

var appName = 'fmsc';
var username = 'deploy';
var startFile = './app.js';

plan.target('production',{
  host:'feedmystarvingpixels.com',
  username:username,
  agent: process.env.SSH_AUTH_SOCK
});


var tmpDir = 'fmsc-' + new Date().getTime();

plan.local(function(local){

  local.log('Running GULP BUILD!');
  local.exec('gulp build');
  var files = local.exec('ls ./dist/**/*',{silent:true});
  local.transfer(files,'/tmp/' + tmpDir);

});

plan.remote(function(remote){

  remote.log('Move to Web Root folder!');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});

  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});

  remote.exec('sudo restart node-app');

  // remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
  // remote.exec('forever start ~/'+appName+'/'+startFile);

});
