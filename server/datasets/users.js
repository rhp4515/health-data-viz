var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
  name: String,
  telephone: String,
  street: String,
  city: String,
  state: String,
  results: [{}]
});
