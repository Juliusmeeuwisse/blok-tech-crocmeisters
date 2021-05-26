const Users = require('../models/users')

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'
const matchBanner = '/images/banners/Banner MMM-Match.png'

// get matches for session user from database
const getMatches = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('match', {
          heartIcon,
          banner: matchBanner
        })
      } else {
        const myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
        const myMatches = result.filter((match) => myProfile.matches.includes(match.id))
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
  getSongsForMusicList
}
