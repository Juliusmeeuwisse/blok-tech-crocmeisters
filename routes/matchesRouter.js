const express = require('express')
const users = require('../models/users')
const router = express.Router()

// Global variables
const matchBanner = '/images/banners/Banner MMM-Match.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake it sessionID for now
const heartIcon = '/images/icons/green heart.png'

router.get('/match', (req, res) => {
  users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('match', {
          heartIcon,
          banner: matchBanner
        })
      } else {
        const myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
        const myMatches = result.filter((match) => myProfile.matches.includes(match.id))
        console.log(myProfile)
        res.render('match', {
          heartIcon,
          banner: matchBanner,
          matches: myMatches
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
