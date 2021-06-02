// const request = require('request-promise-native')
require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node')

// Spotify authorization
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL
})

// const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

// scope defines which information the user can ask for
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
]

const authorizeURL = spotifyApi.createAuthorizeURL(scopes)

module.exports = {
  authorizeURL: authorizeURL,
  spotifyApi: spotifyApi
}
