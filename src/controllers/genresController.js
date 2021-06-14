const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

let genres = []
let userGenres = []
const currentUserGenres = []

// Gets all genres
const getGenres = async () => {
  genres = await Genres.find({})
  return genres
}

// Gets genres from all users
const getUsersGenres = async () => {
  userGenres = []
  getGenres()
  userGenres = await UserGenres.find({})
  userGenres.forEach(userGenre => {
    genres.forEach(genre => {
      /* If current userGenre.genreID is the same as the current genre.id, 
      add to the currentUserGenres array
      */
      if (userGenre.genreID.toString() === genre._id.toString()) {
        currentUserGenres.push({
          userID: userGenre.userID,
          genre: genre.name
        })
      }
    })
  })
  return currentUserGenres
}

// Gets genres based on given user
const getUserGenres = async (userID) => {
  userGenres = []
  getGenres()
  userGenres = await UserGenres.find({})
  userGenres.forEach(userGenre => {
    genres.forEach(genre => {
      /* If current userGenre.genreID is the same as the current genre.id
        and userGenre.userID is the same as the userID parameter, add to
        the currentUserGenres array
        */
      if (userGenre.genreID.toString() === genre._id.toString() && userGenre.userID === userID) {
        currentUserGenres.push(genre.name)
      }
    })
  })
  return currentUserGenres
}

const addGenre = async (genre) => {
  const newGenre = await Genres.create({
    name: genre.name
  })
  newGenre.save()
}

const addUserGenre = async (userGenre) => {
  const newUserGenre = await UserGenres.create({
    userID: userGenre.userID,
    genreID: userGenre.genreID
  })
  newUserGenre.save()
}

const deleteUserGenre = async (userGenre) => {
  const deletedUserSong = await UserGenres.deleteOne({
    userID: userGenre.userID,
    genreID: userGenre.genreID
  })
  deletedUserSong.deleteOne()
}

module.exports = {
  getGenres,
  getUserGenres,
  addGenre,
  addUserGenre,
  deleteUserGenre,
  currentUserGenres,
  getUsersGenres
}
