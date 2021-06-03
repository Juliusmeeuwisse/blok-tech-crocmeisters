const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

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

// get userGenres from database
const getUserGenres = (userProfileID) => {
  let genres = []
  let userGenres = []
  const userGenreList = []
  const finalList = []

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
            if (userGenre.genreID === genre.id) {
              const userGenreListItem = {
                userID: userGenre.userID,
                genreID: genre.id,
                genreName: genre.name
              }
              userGenreList.push(userGenreListItem)
            }
          })
        })
        userGenreList.forEach(userGenreItem => {
          if (userProfileID === userGenreItem.userID) {
            finalList.push(userGenreItem.genreName)
          }
        })
      }

      return finalList
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getGenres,
  getUserGenres
}
