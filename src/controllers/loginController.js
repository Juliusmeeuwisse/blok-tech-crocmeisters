const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const authorizeURL = spotifyAuth.authorizeURL
const Users = require('../models/users')
const sendEmail = require('../utils/sendEmail')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '//images/icons/white heart.png'

const getLogin = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    javaScript: 'js/login.js'
  })
}

const redirectToSpotifyLogin = (req, res) => {
  res.redirect(authorizeURL)
}

const setAccestokens = (req, res) => {
  const { code } = req.query
  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token)
      spotifyApi.setRefreshToken(data.body.refresh_token)
      spotifyApi.getMyTopTracks({ limit: 3 })
        .then((data) => {
          const songName1 = data.body.items[0].name
          const artistName1 = data.body.items[0].artists[0].name
          const albumArt1 = data.body.items[0].album.images[0].url
          const source1 = data.body.items[0].preview_url

          const songName2 = data.body.items[1].name
          const artistName2 = data.body.items[1].artists[0].name
          const albumArt2 = data.body.items[1].album.images[0].url
          const source2 = data.body.items[1].preview_url

          const songName3 = data.body.items[2].name
          const artistName3 = data.body.items[2].artists[0].name
          const albumArt3 = data.body.items[2].album.images[0].url
          const source3 = data.body.items[2].preview_url

          spotifyApi.getArtists([data.body.items[0].artists[0].id, data.body.items[1].artists[0].id, data.body.items[2].artists[0].id])
            .then((data) => {
              const genres1 = data.body.artists[0].genres
              const genres2 = data.body.artists[1].genres
              const genres3 = data.body.artists[2].genres
              const genres = genres1.concat(genres2, genres3)
              const filtertGenres = [...new Set(genres)]

              spotifyApi.getMe()
                .then((data) => {
                  const profile = {
                    id: data.body.id,
                    name: data.body.display_name,
                    email: data.body.email,
                    picture: data.body.images[0].url,
                    likes: Array,
                    dislikes: [data.body.id],
                    matches: Array,
                    songs: [
                      { title: songName1, artist: artistName1, albumArt: albumArt1, source: source1 },
                      { title: songName2, artist: artistName2, albumArt: albumArt2, source: source2 },
                      { title: songName3, artist: artistName3, albumArt: albumArt3, source: source3 }
                    ],
                    genres: filtertGenres
                  }
                  Users.find({}).lean()
                    .then((result) => {
                      const myProfile = result.find((profile) => profile.id.includes(data.body.id))
                      if (!myProfile) {
                        const mailOptions = {
                          from: 'My MusicMatch <dev.mymusicmatch@gmail.com>',
                          to: 'test.mymusicmatch@gmail.com',
                          subject: 'A new user has logged in!',
                          text: `
                          Een nieuwe gebruiker heeft zich aangemeld voor MyMusicMatch.
                          
                          Naam: ${profile.name} 
                          Email: ${profile.email} 
                        `
                        }
                        sendEmail(mailOptions)
                        Users.create(profile)
                      }
                    })
                })
            })
        })
      res.redirect('main')
    })
    .catch((err) => {
      console.log(err)
    })
}

const getConfirmProfileData = (req, res) => {
  spotifyApi.getMyTopTracks({ limit: 3 })
    .then((data) => {
      const songName1 = data.body.items[0].name
      const artistName1 = data.body.items[0].artists[0].name
      const albumArt1 = data.body.items[0].album.images[0].url
      const source1 = data.body.items[0].preview_url

      const songName2 = data.body.items[1].name
      const artistName2 = data.body.items[1].artists[0].name
      const albumArt2 = data.body.items[1].album.images[0].url
      const source2 = data.body.items[1].preview_url

      const songName3 = data.body.items[2].name
      const artistName3 = data.body.items[2].artists[0].name
      const albumArt3 = data.body.items[2].album.images[0].url
      const source3 = data.body.items[2].preview_url

      spotifyApi.getArtists([data.body.items[0].artists[0].id, data.body.items[1].artists[0].id, data.body.items[2].artists[0].id])
        .then((data) => {
          const genres1 = data.body.artists[0].genres
          const genres2 = data.body.artists[1].genres
          const genres3 = data.body.artists[2].genres
          const genres = genres1.concat(genres2, genres3)
          const filtertGenres = [...new Set(genres)]

          spotifyApi.getMe()
            .then((data) => {
              const profileImg = data.body.images[0].url
              const profileData = {
                id: data.body.id,
                name: data.body.display_name,
                email: data.body.email,
                picture: data.body.images[0].url,
                likes: Array,
                dislikes: [data.body.id],
                matches: Array,
                songs: [
                  { title: songName1, artist: artistName1, albumArt: albumArt1, source: source1 },
                  { title: songName2, artist: artistName2, albumArt: albumArt2, source: source2 },
                  { title: songName3, artist: artistName3, albumArt: albumArt3, source: source3 }
                ],
                genres: filtertGenres
              }
              res.render('confirmProfile', {
                banner: mainBanner,
                heartIcon,
                profileImg,
                myProfile: profileData,
                javaScript: 'js/login.js'
              })
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next()
}

module.exports = {
  getLogin,
  redirectToSpotifyLogin,
  setAccestokens,
  haltOnTimedout,
  getConfirmProfileData
}
