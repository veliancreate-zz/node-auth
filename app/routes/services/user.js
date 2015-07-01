var express = require('express');
var router = express.Router();
var User = require('../../models/user')
var passport = require('passport');
var fs = require('fs');
var gm = require('gm');

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
    var profileImageName = 'defaultimage.jpg';
  }
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').isEmail();  
  req.checkBody('username', 'User name field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  return {
    // validationErrors() comes from express-validator
    errors: req.validationErrors(),
    name: name,
    email: email,
    username: username,
    password: password,
    password2: password2,
    profileImage: profileImageName
  } 
}

exports.resizeImage = function(userCheck, callback){
  var imagePath = './uploads/' + userCheck.profileImage;
  gm(imagePath)
    .thumbnail(50, 50 + '^')
    .gravity('Center')
    .extent(50, 50)
    .write(imagePath, function (error) {
      if (error) console.log('Error - ', error);
      callback()
    });
}