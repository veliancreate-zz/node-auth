module.exports = function(){ 
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy
  var User = require('../app/models/user');

  passport.use(new LocalStrategy(function(username, password, done){
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        console.log('unknown user');
        return done(null, false, {message: 'Unknown user'});  
      }
    });
  }));
};  