// const Users = require('../models/users')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

const getProfile = (req, res) => {
  res.render('profile', {
    banner: mainBanner,
    heartIcon
  })
    .catch((err) => {
      console.log(err)
    })
}

const getSettings = (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    heartIcon
  })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getProfile,
  getSettings
}
