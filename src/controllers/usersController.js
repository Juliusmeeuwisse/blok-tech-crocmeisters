const Users = require('../models/users')
const session = require('express-session')
const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'

// get user profiles from database
const usersIndex = (req, res) => {
  spotifyApi.getMe()
    .then((data) => {
      const profileImg = data.body.images[0].url
      const loggedInUser = data.body
      req.session.data = data.body.id
      console.log(loggedInUser)
      Users.find({}).lean()
        .then((result) => {
          if (result === undefined) {
            res.render('home', {
              heartIcon,
              banner: mainBanner
            })
          } else {
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            const userProfiles = result.filter(
              (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
            )
            res.render('home', {
              heartIcon,
              banner: mainBanner,
              userProfile: userProfiles[0],
              profileImg
            })
          }
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

// update session user in database
const likeAndMatch = (req, res) => {
  Users.find({}).lean()
    .then(result => {
      if (result === undefined) {
        res.redirect('/main')
      } else {
        const myProfile = result.find((profile) => profile.id.includes(sessionID))
        const match = result[0].likes.includes(sessionID)
        const filtertUserProfiles = result.filter((user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id))

        if (req.body.like === 'true' && match) {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                matches: filtertUserProfiles[0].id,
                likes: filtertUserProfiles[0].id
              }
            })
            .then(
              res.render('newMatch', {
                heartIcon,
                userProfile: filtertUserProfiles[1],
                newMatch: filtertUserProfiles[0],
                banner: mainBanner
              }))
        } else if (req.body === 'like') {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                likes: filtertUserProfiles[0].id
              }
            })
            .then(res.redirect('/main'))
        } else {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                dislikes: filtertUserProfiles[0].id
              }
            })
            .then(res.redirect('/main'))
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  usersIndex,
  likeAndMatch
  // newMatch
}
