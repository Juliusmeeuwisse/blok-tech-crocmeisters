const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userMatchSchema = new Schema({
  userID: String,
  matchedUserID: String,
  liked: Boolean
})

const userMatches = mongoose.model('usermatches', userMatchSchema)

module.exports = userMatches
