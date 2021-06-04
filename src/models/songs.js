const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
  id: String,
  title: String,
  name: String,
  albumArt: String,
  source: String
})

const songs = mongoose.model('songs', songSchema)

module.exports = songs
