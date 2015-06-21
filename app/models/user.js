var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String, index: true
  },
  password: {
    type: String, required: true, bcrypt: true
  },
  profileimage: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(submittedPassword, hash, callback){
  bcrypt.compare(submittedPassword, hash, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  })
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.createUser = function(newUser, callback){
  bcrypt.hash(newUser.password, 10, function(err, hash){
    if(err) throw err;
    newUser.password = hash;
    newUser.save(callback)  
  });
}
