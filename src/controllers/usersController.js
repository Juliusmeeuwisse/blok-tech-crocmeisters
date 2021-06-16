const Users = require('../models/users')
const songsController = require('./songsController')
const matchDataController = require('./matchDataController')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'

let userProfiles = []
let givenUserSongs = []
let myProfile
// get user profiles from database
const usersIndex = async (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          css: ['style.css'],
          banner: mainBanner
        })
      } else {
        myProfile = result.find((profile) => profile.id.includes(sessionID))
        userProfiles = result.filter(
          (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
        )
      }
    })
    .catch((err) => {
      console.log(err)
    })

  givenUserSongs = []
  if (userProfiles[0] !== undefined) {
    if (givenUserSongs.length < 1) {
    // Gets songs based on user
      givenUserSongs = await songsController.getUserSongs(userProfiles[0].id)
    }
  }

  res.render('home', {
    heartIcon,
    banner: mainBanner,
    userProfile: userProfiles[0],
    songs: givenUserSongs
  })
}

// update session user in database
const likeAndMatch = async (req, res) => {
  // let tempUsers = []
  const currentMatches = await matchDataController.getUserMatches(myProfile.id)

  let pos
  // Filter out loggedinuser
  pos = userProfiles.indexOf(myProfile)
  userProfiles.splice(pos, 1)
  // If currentMatches can be found in userProfiles, remove them from userProfiles
  currentMatches.forEach(currentMatch => {
    pos = userProfiles.indexOf(currentMatch)
    userProfiles.splice(pos, 1)
  })

  givenUserSongs = []
  if (userProfiles[0] !== undefined) {
    // Gets songs based on user
    givenUserSongs = await songsController.getUserSongs(userProfiles[1].id)
  }
  console.log(givenUserSongs)

  let lastUser = userProfiles[0]

  if (req.body.like === 'true') {
    console.log('1')
    matchDataController.addUserMatch(myProfile.id, userProfiles[0].id, true)/////////////////////////
      .then(
        userProfiles.shift(),
        lastUser = userProfiles[0],
        givenUserSongs = [],
        givenUserSongs = await songsController.getUserSongs(userProfiles[0].id).then(
          console.log(userProfiles[0].id),
          console.log(givenUserSongs),
          res.render('newMatch', {
            heartIcon,
            userProfile: userProfiles[0],
            newMatch: lastUser,
            banner: mainBanner,
            songs: givenUserSongs
          })))
  } else if (req.body.dislike === 'true') {
    console.log('2')
    lastUser = userProfiles[0]
    matchDataController.addUserMatch(myProfile.id, lastUser.id, false)
      .then(userProfiles.shift(), res.redirect('/'))
  } else {
    console.log('3')
    lastUser = userProfiles[0]
    matchDataController.addUserMatch(myProfile.id, lastUser.id, false)
      .then(userProfiles.shift(), res.redirect('/'))
  }
}

module.exports = {
  usersIndex,
  likeAndMatch
}
