const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userMatchSchema = new Schema({
  id: String,
  userID: String,
  matchedUserID: String,
  liked: Boolean
})

const userMatches = mongoose.model('userMatches', userMatchSchema)

module.exports = userMatches
