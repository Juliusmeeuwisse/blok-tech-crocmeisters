const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userGenreSchema = new Schema({
  id: String,
  userID: String,
  genreID: String
})

const userGenres = mongoose.model('userGenres', userGenreSchema)

module.exports = userGenres
