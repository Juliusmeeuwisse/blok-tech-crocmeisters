const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: String,
  name: String,
  age: Number,
  email: String,
  picture: String,
  likes: Array,
  dislikes: Array,
  matches: Array,
  songs: [
    { title: String, artist: String, source: String },
    { title: String, artist: String, source: String },
    { title: String, artist: String, source: String }
  ],
  genres: Array
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
