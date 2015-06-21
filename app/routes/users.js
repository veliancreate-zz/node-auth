var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  if( req.files.profileimage ) {
    var profileImageOriginalName = req.files.profileimage.originalname;
    var profileImageName = req.files.profileimage.name;
    var profileImageMime = req.files.profileimage.mimetype;
    var profileImagePath = req.files.profileimage.path;
    var profileImageExt = req.files.profileimage.extension;
    var profileImageSize = req.files.profileimage.size
  } else {
    var profileImageName = 'defaultimage.png';
  }
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').isEmail();  
  req.checkBody('username', 'User name field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  if(errors){
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileImage: profileImageName
    });
    User.createUser(newUser, function(err, user){
      if(err) throw err;
    });
    req.flash('success', 'You registered successfully! Please login.');
    res.location('/');
    res.redirect('/');
  }   
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', 
                      {
                        failureRedirect: '/users/login', 
                        failureFlash: 'Invalid username or password'
                      }), 
  function(req, res){
    console.log('Auth seccess!');
    req.flash('success', 'You are logged in');
    res.redirect('/');
});

module.exports = router;