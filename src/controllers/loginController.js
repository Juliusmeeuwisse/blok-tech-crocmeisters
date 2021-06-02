const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi
const authorizeURL = spotifyAuth.authorizeURL
const Users = require('../models/users')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const heartIcon = '/images/icons/white heart.png'

const getLogin = (req, res) => {
  res.render('login', {
    banner: mainBanner,
    heartIcon
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
          const source1 = data.body.items[0].preview_url

          const songName2 = data.body.items[1].name
          const artistName2 = data.body.items[1].artists[0].name
          const source2 = data.body.items[1].preview_url

          const songName3 = data.body.items[2].name
          const artistName3 = data.body.items[2].artists[0].name
          const source3 = data.body.items[2].preview_url
          console.log(data.body)
          // const songNames = []
          // data.body.items.forEach((item) => {
          //   const songNames = item.name
          //   const songArtists = item.artists[0]
          //   console.log(songNames)
          // })
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
                  { title: songName1, artist: artistName1, source: source1 },
                  { title: songName2, artist: artistName2, source: source2 },
                  { title: songName3, artist: artistName3, source: source3 }
                ]
              }
              Users.create(profile)
            })
        })

      res.redirect('/main')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getLogin,
  redirectToSpotifyLogin,
  setAccestokens
}
