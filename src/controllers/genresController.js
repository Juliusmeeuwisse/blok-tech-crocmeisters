const { ObjectID } = require('mongodb')
const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

let genres = []
let userGenres = []
const currentUserGenres = []

// Gets all genres
const getGenres = async () => {
  genres = await Genres.find({}).lean()
  return genres
}

// Gets genres from all users
const getUsersGenres = async () => {
  userGenres = []
  getGenres()
  userGenres = await UserGenres.find({}).lean()
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
  userGenres = await UserGenres.find({}).lean()
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

// Add genre
const addGenre = async (genre) => {
  const id = ObjectID()
  const newGenre = await Genres.create({
    _id: id,
    name: genre.name
  })
  newGenre.save()
  return id
}

// Add userGenre
const addUserGenre = async (userGenre) => {
  const newUserGenre = await UserGenres.create({
    userID: userGenre.userID,
    genreID: userGenre.genreID
  })
  newUserGenre.save()
}

// Delete userGenre
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
  getUsersGenres,
  addGenre,
  addUserGenre,
  deleteUserGenre
}
