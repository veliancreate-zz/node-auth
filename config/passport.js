module.exports = function(){ 
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy
  var User = require('../app/models/user');

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(function(username, password, done){
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        console.log('unknown user');
        return done(null, false, {message: 'Username not recognised, please try again'});  
      } 
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          console.log('Invalid password');
          return done(null, false, { message: 'Password not recognised, please try again' });
        }
      });
    });
  }));
};  