const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

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

module.exports = {
  getGenres,
  getUserGenres
}
