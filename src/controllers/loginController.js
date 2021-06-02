const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const authorizeURL = spotifyAuth.authorizeURL
// const profileImg = null

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

const getLogin = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    heartIcon
  })
}

const login = (req, res) => {
  res.redirect(authorizeURL)
}

const getMe = (req, res) => {
  const { code } = req.query

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token)
      spotifyApi.setRefreshToken(data.body.refresh_token)

      res.redirect('/main')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  login,
  getMe,
  getLogin
}
