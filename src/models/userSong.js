const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSongSchema = new Schema({
  id: String,
  userID: String,
  songID: String
})

const userSongs = mongoose.model('userSongs', userSongSchema)

module.exports = userSongs
