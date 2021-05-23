const express = require('express')
const router = express.Router()

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

router.get('/profile', (req, res) => {
  res.render('profile', {
    banner: mainBanner,
    heartIcon
  })
})

module.exports = router
