const express = require('express')
const router = express.Router()

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

router.get('/settings', (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    heartIcon
  })
})

module.exports = router
