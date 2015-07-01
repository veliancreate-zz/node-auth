var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var userService = require('./services/user')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node app' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  userCheck = userService.checkRegistration(req, next);
  if(userCheck.errors){
    res.render('register', { errors: userCheck.errors });
  } else {
    User.createUser(userCheck, function(err, user){
      if(err) throw err;
      userService.resizeImage(userCheck, function(){
        req.login(user, function(err) {
          res.redirect('/');
        });
      });
    });
  }   
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', message: req.flash('error') } );
});

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/users/login', 
    failureFlash: true
  }) 
);

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You have logged out')
  res.redirect('/')
});

module.exports = router;