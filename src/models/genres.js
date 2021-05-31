const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  id: String,
  name: String,
  genreArt: String
})

const genres = mongoose.model('genres', genreSchema)

module.exports = genres
