const Users = require('../models/users')
const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')
// const genresController = require('./genresController')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now

// get genres from database
const getGenres = () => {
  Genres.find({})
    .lean()
    .then((result) => {
      if (result === undefined) {
        console.log('Genres undefined')
      } else {
        const genres = result
        return genres
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const currentUserGenres = []

// render profile
const getProfile = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          banner: mainBanner
        })
      } else {
        const myProfile = result.find((profile) => profile.id.includes(sessionID))

        let genres = []
        let userGenres = []
        Genres.find({})
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

        UserGenres.find({})
          .lean()
          .then((result) => {
            if (result === undefined) {
              console.log('userGenres undefined')
            } else {
              userGenres = result

              userGenres.forEach(userGenre => {
                genres.forEach(genre => {
                  if (userGenre.genreID === genre.id && userGenre.userID === 'def757fc-5bfe-4ae1-9fe6-ce46fec2ebfe') {
                    currentUserGenres.push(genre.name)
                  }
                })
              })
              console.log('Filled array')
              console.log(currentUserGenres)
            }
          })
          .catch((err) => {
            console.log(err)
          })

        console.log('Empty array')
        console.log(currentUserGenres)

        res.render('profile', {
          heartIcon,
          banner: mainBanner,
          myProfile,
          currentUserGenres
        })
      }
    })
    .catch((err) => {
      console.log(err)
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
