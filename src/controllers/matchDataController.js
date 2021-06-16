const Users = require('../models/users')
const UserMatches = require('../models/userMatches')
const genresController = require('./genresController')

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'
const matchBanner = '/images/banners/Banner MMM-Match.png'

let myProfile = null
let matches = []
const finalMatches = []

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
      }
    })
    .catch((err) => {
      console.log(err)
    })

  if (matches.length < 1) {
    // Get all matches
    matches = await getUserMatches(myProfile.id)
    // Get all userGenres
    const userGenres = await genresController.getUsersGenres()
    let matchGenres = []
    matches.forEach(match => {
      matchGenres = []
      userGenres.forEach(userGenre => {
        // If match id is the same as the userGenre userID (so if the genre belongs to the match)...
        if (match.id === userGenre.userID) {
          // Add to matchGenres
          matchGenres.push(userGenre.genre)
        }
      })
      // Add match to match list
      finalMatches.push({
        id: match.id,
        picture: match.picture,
        name: match.name,
        genres: matchGenres
      })
    })
  }

  res.render('match', {
    heartIcon,
    banner: matchBanner,
    matches: finalMatches
  })
}

// Gets all songs
const getUserMatches = async (myProfileID) => {
  const userMatches = await UserMatches.find({})
  const users = await Users.find({})
  // Loop through all userMatches
  if (!(matches.length > 1)) {
    userMatches.forEach(userMatch => {
      // Get all the matches from the loggedinuser
      if (myProfileID === userMatch.userID) {
        users.forEach(user => {
          if (user.id === userMatch.matchedUserID) {
            // Add each user that matches with the loggedinuser
            matches.push(user)
          }
        })
      }
    })
  }
  return matches
}

// Add userMatch
const addUserMatch = async (myProfileID, matchUserID, liked) => {
  console.log('yo')
  const newUserMatch = await UserMatches.create({
    userID: myProfileID,
    matchedUserID: matchUserID,
    liked: liked
  })
  newUserMatch.save()
}

// Delete userMatch
const deleteUserMatch = async (matchUserID) => {
  const deletedUserMatch = await UserMatches.deleteOne({
    userID: myProfile.id,
    matchedUserID: matchUserID
  })
  deletedUserMatch.deleteOne()
}

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
  getSongsForMusicList,
  getUserMatches,
  addUserMatch
}
