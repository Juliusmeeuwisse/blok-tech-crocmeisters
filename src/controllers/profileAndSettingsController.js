const Users = require('../models/users')
const genresController = require('./genresController')
const songsController = require('./songsController')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now

let currentUserGenres = []
let currentUserSongs = []
let songs = []

let myProfile
// render profile
const getProfile = async (req, res) => {
  await Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Result is undefined')
      } else {
        myProfile = result.find((profile) => profile.id.includes(sessionID))
      }
    })
    .catch((err) => {
      console.log(err)
    })

  if (!(currentUserGenres.length > 0)) {
    // Gets genres based on loggedin user
    await genresController.getUserGenres(myProfile.id)
    // genre array data from the genresController goes in currentUserGenres
    currentUserGenres = genresController.currentUserGenres
  }

  if (!(currentUserSongs.length > 0)) {
    // Gets songs based on loggedin user
    await songsController.getUserSongs(myProfile.id)
    // song array data from the songsController goes in currentUserSongs
    currentUserSongs = songsController.currentUserSongs
  }

  songsController.postSong({
    title: 'titleTest',
    artist: 'artistTest',
    albumArt: 'albumArtTest',
    source: 'sourceTest'
  })

  // TODO: Get 1 specific song
  // this time based on just created song 
  songsController.getSongs()
  console.log('here songs')
  songs = songsController.songs
  console.log(songs)


  // NEW
  // songsController.getSong(newSong)
  // const songTest = songsController.song
  // console.log(songTest)
  // songsController.postUserSong({
  //   userID: myProfile.id,
  //   songID: songs.find(element => element === song.id)
  // })

  res.render('profile', {
    heartIcon,
    banner: mainBanner,
    myProfile,
    currentUserGenres,
    currentUserSongs
  })
}

const getLogin = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    heartIcon
  })
}

const searchSongs = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    heartIcon
  })
}

// render settings
const getSettings = (req, res) => {
  res.render('settings', {
    banner: mainBanner,
    heartIcon
  })
}

module.exports = {
  getProfile,
  getLogin,
  getSettings,
  searchSongs
}
