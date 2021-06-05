const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const Users = require('../models/users')

// Global variables
const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const heartIcon = '/images/icons/white heart.png'
const matchBanner = '/images/banners/Banner MMM-Match.png'

// get matches for session user from database
const getMatches = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (!result) {
        res.render('match', {
          heartIcon,
          banner: matchBanner
        })
      } else {
        spotifyApi.getMe()
          .then((data) => {
            const sessionID = data.body.id
            const myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
            const myMatches = result.filter((match) => myProfile.matches.includes(match.id))
            res.render('match', {
              heartIcon,
              banner: matchBanner,
              matches: myMatches
            })
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
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
      if (!result) {
        res.render('musiclist', {
          heartIcon,
          banner: musicListBanner
        })
      } else {
        spotifyApi.getMe()
          .then((data) => {
            const sessionID = data.body.id
            const myProfile = result.find((myProfile) => myProfile.id.includes(sessionID))
            const myMatches = result.filter((match) => myProfile.matches.includes(match.id))
            const mySongs = myMatches.map((song) => song.songs).flat()
            res.render('musiclist', {
              heartIcon,
              banner: musicListBanner,
              songs: mySongs
            })
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
