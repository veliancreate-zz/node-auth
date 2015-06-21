var express = require('express');
var router = express.Router();
var User = require('../../models/user')
var passport = require('passport');

exports.checkRegistration = function(req, next){
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

  return {
    errors: req.validationErrors(),
    name: name,
    email: email,
    password: password,
    password2: password2,
    profileImage: profileImageName
  } 
}