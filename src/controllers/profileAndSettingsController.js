const Users = require('../models/users')
const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

// render profile
const getProfile = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          javaScript: 'js/index.js',
          check: 'check',
          banner: mainBanner
        })
      } else {
        spotifyApi.getMe()
          .then((data) => {
            let profileImg = null
            if (!data.body.images[0]) {
              profileImg = '/images/unknownImg.png'
            } else {
              profileImg = data.body.images[0].url
            }
            const spotifyProfile = data.body
            const sessionID = data.body.id
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            res.render('profile', {
              heartIcon,
              check: 'check',
              javaScript: 'js/index.js',
              banner: mainBanner,
              myProfile,
              spotifyProfile,
              profileImg
            })
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const searchSongs = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    javaScript: 'js/index.js',
    check: 'check',
    heartIcon
  })
}

// render settings
const getSettings = (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    javaScript: 'js/index.js',
    check: 'check',
    heartIcon
  })
}

module.exports = {
  getProfile,
  getSettings,
  searchSongs
}
