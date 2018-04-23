const mongoose = require('mongoose')
// const config = require('../config')

mongoose.connect(`mongodb://finda-poliz:finda-poliz@ds261128.mlab.com:61128/finda-poliz`);

const post = new mongoose.Schema({
  coords: String,
  id: String,
  userName: String,
  text: String,
  address: String,
  time: String,
  photoLinks: String
})

const postModel = mongoose.model('posts', post)

module.exports = postModel
