const Songs = require('../models/songs')
const UserSongs = require('../models/userSongs')

let songs = []
let userSongs = []
const currentUserSongs = []

// Gets all songs
const getSongs = async () => {
  await Songs.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Songs undefined')
      } else {
        songs = result
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// Gets songs based on given user
const getUserSongs = async (userID) => {
  getSongs()
  await UserSongs.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('userSongs undefined')
      } else {
        userSongs = result

        userSongs.forEach(userSong => {
          songs.forEach(song => {
            /* If current userSongs.songID is the same as the current song._id
              and userSong.userID is the same as the userID parameter, add to
              the currentUserSongs array
              */
            if (userSong.songID === song._id.toString() && userSong.userID === userID) {
              currentUserSongs.push(song)
            }
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getSongs,
  getUserSongs,
  currentUserSongs
}
