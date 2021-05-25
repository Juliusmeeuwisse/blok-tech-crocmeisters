// const request = require('request-promise-native')
require('dotenv').config()

// Spotify authorization
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

module.exports = base64Credentials
