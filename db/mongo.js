const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(`mongodb://${config.mongoPath}`);

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
