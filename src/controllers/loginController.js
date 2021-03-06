const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const authorizeURL = spotifyAuth.authorizeURL
const Users = require('../models/users')
const sendEmail = require('../utils/sendEmail')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'

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

      spotifyApi.getMe()
        .then((data) => {
          Users.find({}).lean()
            .then((result) => {
              const myProfile = result.find((profile) => profile.id.includes(data.body.id))
              if (!myProfile) {
                req.session.user = {
                  sessionID: data.body.id,
                  name: data.body.display_name,
                  email: data.body.email
                }
                res.redirect('confirmProfile')
              } else {
                req.session.user = {
                  sessionID: data.body.id,
                  name: data.body.display_name,
                  email: data.body.email
                }
                res.redirect('main')
              }
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

// checkauth next() routes aanpassen

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
              let profileImg = null
              if (!data.body.images[0]) {
                profileImg = '/images/unknownImg.png'
              } else {
                profileImg = data.body.images[0].url
              }
              const profileData = {
                id: data.body.id,
                name: data.body.display_name,
                email: data.body.email,
                picture: profileImg,
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
                profileImg,
                myProfile: profileData,
                javaScript: 'js/index.js'
              })
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

const confirmProfile = (req, res) => {
  if (req.body.confirm === 'true') {
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
                let profileImg = null
                if (!data.body.images[0]) {
                  profileImg = '/images/unknownImg.png'
                } else {
                  profileImg = data.body.images[0].url
                }
                const profileData = {
                  id: data.body.id,
                  name: data.body.display_name,
                  email: data.body.email,
                  picture: profileImg,
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
                        to: data.body.email,
                        cc: 'test.mymusicmatch@gmail.com',
                        subject: 'A new user has logged in!',
                        text: `
                        Hey! ${data.body.display_name} 
                        Thank you for joining MyMusicMatch
                        We are super excited to have you on board!
                      `
                      }
                      sendEmail(mailOptions)
                      Users.create(profileData)
                    }
                  })
              })
          })
      })
      .catch((err) => {
        console.log(err)
      })
    res.redirect('main')
  } else {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    })
  }
}

const getDelete = (req, res) => {
  res.render('deleteAccount', {
    banner: mainBanner,
    javaScript: 'js/login.js'
  })
}

const remove = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('login', {
          javaScript: 'js/index.js',
          banner: mainBanner
        })
      } else {
        spotifyApi.getMe()
          .then((data) => {
            const sessionID = data.body.id
            const myProfile = result.find((profile) => profile.id.includes(sessionID))
            const userId = myProfile._id
            Users.findOneAndDelete({ _id: userId }).exec()
            res.render('login', {
              javaScript: 'js/index.js',
              banner: mainBanner
            }
            )
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getLogin,
  redirectToSpotifyLogin,
  setAccestokens,
  getConfirmProfileData,
  confirmProfile,
  getDelete,
  remove
}
