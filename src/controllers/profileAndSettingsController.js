const Users = require('../models/users')
const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')
const genresController = require('./genresController')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now

const currentUserGenres = []
let genres = []
let userGenres = []

const getGenres = async () => {
  await Genres.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Genres undefined')
      } else {
        genres = result
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const getUserGenres = async (userID) => {
  getGenres()
  await UserGenres.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('userGenres undefined')
      } else {
        userGenres = result

        userGenres.forEach(userGenre => {
          genres.forEach(genre => {
            if (userGenre.genreID === genre.id && userGenre.userID === userID) {
              currentUserGenres.push(genre.name)
            }
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

let myProfile
// render profile
const getProfile = async (req, res) => {
  console.log(myProfile)
  await getUserGenres('def757fc-5bfe-4ae1-9fe6-ce46fec2ebfe')

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

  console.log(currentUserGenres)

  res.render('profile', {
    heartIcon,
    banner: mainBanner,
    myProfile,
    currentUserGenres
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
  getGenres
}
