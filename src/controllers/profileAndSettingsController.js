const Users = require('../models/users')
const genresController = require('./genresController')
const songsController = require('./songsController')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now

let currentUserGenres = []
let givenUserSongs = []
let songs = []
let genres = []
let allUserSongs = []
let allUserGenres = []

let myProfile
// render profile
const getProfile = async (req, res) => {
  await Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('match', {
          heartIcon,
          banner: mainBanner
        })
      } else {
        myProfile = result.find((profile) => profile.id.includes(sessionID))
      }
    })
    .catch((err) => {
      console.log(err)
    })

  // Get all songs for the add and delete methods
  songsController.getSongs()
  songs = songsController.allSongs

  // Display songs based on loggedInUser
  if (!(givenUserSongs.length > 0)) {
    // Gets songs based on loggedin user
    await songsController.getUserSongs(myProfile.id)
    givenUserSongs = songsController.givenUserSongs
  }

  // Display genres based on loggedInUser
  if (!(currentUserGenres.length > 0)) {
    // Gets genres based on loggedin user
    await genresController.getUserGenres(myProfile.id)
    // genre array data from the genresController goes in currentUserGenres
    currentUserGenres = genresController.currentUserGenres
  }

  // Get available genre data
  const genreToBeAdded = {
    name: 'Progressive Housesss'
  }

  // Get all userGenres that belong to the logged in user
  allUserGenres = genresController.allUserGenres

  await genresController.getGenres
  genres = await genresController.allGenres
  const doesGenreExist = await genres.find(x => x.name === genreToBeAdded.name)
  let doesUserGenreExist = null
  // If genre exists, find the userGenre with the userID and genreID
  doesUserGenreExist = await allUserGenres.find(x => x.userID === myProfile.id && x.genreID.toString() === doesGenreExist._id.toString())

  // If genreToBeAdded already exists in the database...
  if (doesGenreExist !== undefined && doesUserGenreExist === undefined) {
    // Create userGenre
    genresController.addUserGenre({
      userID: myProfile.id,
      genreID: doesGenreExist._id
    })
  } else {
    try {
      // If the given genre doesn't exist in the database, add the genre
      genresController.addGenre({
        name: genreToBeAdded.name
      })
      // Get genres
      await genresController.getGenres
      genres = genresController.allGenres
      // Get the genreID from the just created genre
      const newGenre = await genres.find(x => x.name === genreToBeAdded.name)
      console.log(newGenre)
      // // Create userGenre to connect the new genre with the user
      await genresController.addUserGenre({
        userID: myProfile.id,
        genreID: newGenre.id///////////////////////////////////
      })
    } catch (error) {
      console.log(error)
    }
  }

  res.render('profile', {
    heartIcon,
    banner: mainBanner,
    myProfile,
    currentUserGenres,
    givenUserSongs
  })
}

const addUserSong = (req, res) => {
  // Get available song data
  const songToBeAdded = {
    title: req.body.title,
    artist: req.body.artist
  }

  // Get all userSongs that belong to the logged in user
  allUserSongs = songsController.allUserSongs

  const doesSongExist = songs.find(x => x.title === songToBeAdded.title && x.artist === songToBeAdded.artist)
  let doesUserSongExist = null
  // If songs exists, find the userSong with the userID and songID
  if (doesSongExist !== undefined) {
    doesUserSongExist = allUserSongs.find(x => x.userID === myProfile.id && x.songID.toString() === doesSongExist._id.toString())
  }

  // If songToBeAdded already exists in the database...
  if (doesSongExist !== undefined && doesUserSongExist === undefined) {
    // Create userSong
    songsController.addUserSong({
      userID: myProfile.id,
      songID: doesSongExist._id
    })
  } else {
    // If the given song doesn't exist in the database, add the song
    const newSong = songsController.addSong({
      title: req.body.title,
      artist: req.body.artist,
      // WIP needs to be retrieved from Spotify API
      albumArt: req.body.albumArt,
      source: req.body.source
    })

    // Get the songID from the just created song
    const newSongID = songs.find(x => x.id === newSong.id)._id
    // Create userSong to connect the new song with the user
    songsController.addUserSong({
      userID: myProfile.id,
      songID: newSongID
    })
  }
}

const deleteUserSong = (req, res) => {
  // Get available song data
  const songToBeDeleted = {
    title: req.body.title,
    artist: req.body.artist
  }

  // Find the song that has the same title & artist, and return the songID
  const songID = songs.find(x => x.title === songToBeDeleted.title && x.artist === songToBeDeleted.artist)._id
  // Delete userSong based on loggedInUser and given songID
  songsController.deleteUserSong({
    userID: myProfile.id,
    songID: songID
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
  searchSongs,
  addUserSong,
  deleteUserSong
}
