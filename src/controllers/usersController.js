const Users = require('../models/users')
const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

// get user profiles from database
const usersIndex = (req, res) => {
  spotifyApi.getMe()
    .then((data) => {
      let profileImg = null
      if (!data.body.images[0]) {
        profileImg = '/images/unknownImg.png'
      } else {
        profileImg = data.body.images[0].url
      }
      const sessionID = data.body.id
      Users.find({}).lean()
        .then((result) => {
          if (!result) {
            res.render('home', {
              heartIcon,
              banner: mainBanner
            })
          } else {
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            const userProfiles = result.filter(
              (user) => !myProfile?.likes.includes(user.id) && !myProfile?.dislikes.includes(user.id)
            )
            res.render('home', {
              heartIcon,
              javaScript: 'js/index.js',
              check: 'check',
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
      if (!result) {
        res.redirect('/main')
      } else {
        spotifyApi.getMe()
          .then((data) => {
            const sessionID = data.body.id
            // console.log(sessionID)
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            const filtertUserProfiles = result.filter((user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id))
            const match = filtertUserProfiles[0].likes.includes(sessionID)
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
                    javaScript: 'js/index.js',
                    check: 'check',
                    userProfile: filtertUserProfiles[1],
                    newMatch: filtertUserProfiles[0],
                    banner: mainBanner
                  }))
            } else if (req.body.like === 'like') {
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
          })
      }
    })

    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  usersIndex,
  likeAndMatch
}
