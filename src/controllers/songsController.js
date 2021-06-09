const Songs = require('../models/songs')
const UserSongs = require('../models/userSongs')

let songs = []
let userSongs = []
const allUserSongs = []
const givenUserSongs = []
const allSongs = []

// Gets all songs
const getSongs = async () => {
  await Songs.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Songs undefined')
      } else {
        songs = result
        songs.forEach(song => {
          allSongs.push(song)
        })
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
          allUserSongs.push(userSong)
          songs.forEach(song => {
            /* If current userSongs.songID is the same as the current song._id
              and userSong.userID is the same as the userID parameter, add to
              the givenUserSongs array
              */
            if (userSong.songID === song._id.toString() && userSong.userID === userID) {
              givenUserSongs.push(song)
            }
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const addSong = async (song) => {
  const newSong = await Songs.create({
    title: song.title,
    artist: song.artist,
    albumArt: song.albumArt,
    source: song.source
  })
  newSong.save()
}

const addUserSong = async (userSong) => {
  const newUserSong = await UserSongs.create({
    userID: userSong.userID,
    songID: userSong.songID
  })
  newUserSong.save()
}

const deleteUserSong = async (userSong) => {
  const deletedUserSong = await UserSongs.deleteOne({
    userID: userSong.userID,
    songID: userSong.songID
  })
  deletedUserSong.deleteOne()
}

module.exports = {
  getSongs,
  getUserSongs,
  givenUserSongs,
  addSong,
  addUserSong,
  deleteUserSong,
  songs,
  allSongs,
  allUserSongs
}
