const Users = require('../models/users')
const UserMatches = require('../models/userMatches')
const genresController = require('./genresController')

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'
const matchBanner = '/images/banners/Banner MMM-Match.png'

let myProfile = null

// get matches for session user from database
const getMatches = async (req, res) => {
  await Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('match', {
          heartIcon,
          banner: matchBanner
        })
      } else {
        myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
        getUserMatches()
        genresController.getUserGenres()
        matches.forEach(match => {
          getUserMatchGenre(match.id)
          matchUserGenres = []
        })
        console.log(userGenres)
      }
    })
    .catch((err) => {
      console.log(err)
    })

  res.render('match', {
    heartIcon,
    banner: matchBanner,
    matches: matches
  })
}

let users = []
const getUsers = async () => {
  await Users.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Users undefined')
      } else {
        users = result
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const matches = []
const userGenres = []
// Gets all songs
const getUserMatches = async () => {
  let userMatches = []
  await UserMatches.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('UserMatches undefined')
      } else {
        userMatches = result
      }
    })
    .catch((err) => {
      console.log(err)
    })

  getUsers()
  // Loop through all userMatches
  if (!(matches.length > 1)) {
    userMatches.forEach(userMatch => {
      // Get all the matches from the loggedinuser
      if (myProfile.id === userMatch.userID) {
        users.forEach(user => {
          if (user.id === userMatch.matchedUserID) {
            // Add each user that matches with the loggedinuser
            matches.push(user)
          }
        })
      }
    })
  }
}

let matchUserGenres = []
const getUserMatchGenre = async (userID) => {
  // If user has already been added, do nothing
  const hasUserBeenAdded = matchUserGenres.find(x => x.userID === userID)
  if (hasUserBeenAdded === undefined) {
    // Get genres from match
    await genresController.getUserGenres(userID)
    matchUserGenres = genresController.currentUserGenres
    const userObj = {
      userID: userID,
      genres: matchUserGenres
    }
    console.log(userObj)
    // Add matchgenres to list
    // userGenres.push(userObj)
  }
}

// const deleteMatch = () => {
//   Users.find({}).lean()
//     .then((result) => {
//       console.log(result)
//     })
// }

// get favourite songs from session users matches from database
const getSongsForMusicList = (req, res) => {
  Users.find({}).lean()
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
}

module.exports = {
  getMatches,
  getSongsForMusicList
}
