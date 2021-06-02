const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const authorizeURL = spotifyAuth.authorizeURL
const test = (req, res) => {
  res.redirect(authorizeURL)
}

const test2 = (req, res) => {
  const { code } = req.query
  spotifyApi.authorizationCodeGrant(code)
    .then(
      (data) => {
        console.log('The token expires in ' + data.body.expires_in)
        console.log('The access token is ' + data.body.access_token)
        console.log('The refresh token is ' + data.body.refresh_token)

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body.access_token)
        spotifyApi.setRefreshToken(data.body.refresh_token)

        spotifyApi.searchAlbums('madman')
          .then((data) => { console.log(data.body.tracks.items) })
      }
    ).catch((err) => {
      console.log(err)
    })
}

module.exports = {
  test,
  test2
}
