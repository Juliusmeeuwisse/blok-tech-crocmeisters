const Users = require('../models/users')
const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now

// render profile
const getProfile = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          banner: mainBanner
        })
      } else {
        spotifyApi.getMe()
          .then((data) => {
            const profileImg = data.body.images[0].url
            const spotifyProfile = data.body
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            res.render('profile', {
              heartIcon,
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
    heartIcon
  })
}

// render settings
const getSettings = (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    heartIcon
  })
}

module.exports = {
  getProfile,
  getSettings,
  searchSongs
}
