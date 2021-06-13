const Genres = require('../models/genres')
const UserGenres = require('../models/userGenres')

const allGenres = []
let genres = []
let userGenres = []
const allUserGenres = []
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
        genres.forEach(genre => {
          allGenres.push(genre)
        })
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

        allUserGenres.push(genres)
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
      }
    })
    .catch((err) => {
      console.log(err)
    })
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
  allUserGenres,
  allGenres
}
