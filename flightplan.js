var plan = require('flightplan');



plan.target('production',{
  host:'feedmystarvingpixels.com',
  username:'deploy',
  agent: process.env.SSH_AUTH_SOCK
});


plan.local(function(local){

  


});
