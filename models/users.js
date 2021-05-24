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

// const { MongoClient } = require('mongodb')
// require('dotenv').config()

// const url = process.env.DB_URL
// let users = null

// // Connection with database
// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.log(err)
//   } else {
//     users = client.db(process.env.DB_NAME).collection('users')
//   }
// })
