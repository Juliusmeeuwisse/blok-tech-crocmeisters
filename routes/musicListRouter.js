const express = require('express')
const users = require('../models/users')
const router = express.Router()

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake it sessionID for now
const heartIcon = '/images/icons/white heart.png'

router.get('/musiclist', (req, res) => {
  users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('musiclist', {
          heartIcon,
          banner: musicListBanner
        })
      } else {
        const myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
        const myMatches = result.filter((match) => myProfile.matches.includes(match.id))
        const mySongs = myMatches.map((song) => song.songs).flat()
        res.render('musiclist', {
          heartIcon,
          banner: musicListBanner,
          songs: mySongs
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
