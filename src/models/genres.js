const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  name: String
})

const genres = mongoose.model('genres', genreSchema)

module.exports = genres
