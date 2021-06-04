const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

let genres = []
let userGenres = []
const currentUserGenres = []

// Gets all genres
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

// Gets genres based on given user
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
            /* If current userGenre.genreID is the same as the current genre.id
            and userGenre.userID is the same as the userID parameter, add to
            the currentUserGenres array
            */
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
  getUserGenres,
  currentUserGenres
}
