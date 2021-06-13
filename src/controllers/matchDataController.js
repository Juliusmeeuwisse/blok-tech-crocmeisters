const Users = require('../models/users')
const UserMatches = require('../models/userMatches')
const genresController = require('./genresController')

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'
const matchBanner = '/images/banners/Banner MMM-Match.png'

let myProfile = null
const matchesWithGenres = []
let genres = []

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
      }
    })
    .catch((err) => {
      console.log(err)
    })

  if (matchesWithGenres.length < 1) {
    for (let i = 0; i < matches.length; i++) {
      console.log(i)
      await genresController.getUserGenres(matches[i].id)
      genres = genresController.currentUserGenres
      console.log(genres)
      matchesWithGenres.push({
        id: matches[i].id,
        picture: matches[i].picture,
        name: matches[i].name,
        genres: genres
      })
    }
  }

  res.render('match', {
    heartIcon,
    banner: matchBanner,
    matches: matchesWithGenres
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
