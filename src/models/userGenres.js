const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userGenreSchema = new Schema({
  userID: String,
  genreID: String
})

const userGenres = mongoose.model('usergenres', userGenreSchema)

module.exports = userGenres
