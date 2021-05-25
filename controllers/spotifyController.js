const base64Credentials = require('../models/spotify')
const request = require('request-promise-native')

const mainBanner = '/images/banners/Banner MMM-home.png'
// const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'

const searchSongs = async (req, res) => {
  const accessData = await request({
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
    json: true
  })

  if (accessData) {
    const token = accessData.access_token
    const searchInput = 'prince'
    const albumData = await request({
      method: 'GET',
      uri: `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=5&market=NL`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      json: true
    })
    const albumArt = albumData.tracks.items.map((albums) => albums.preview_url)
    const names = albumData.tracks.items.map((names) => names.artists[0].name)

    console.log(albumArt)
    res.render('test', {
      heartIcon,
      banner: mainBanner,
      data: names,
      albumArt
    })
    // const albums = (albumData && albumData.items) || []
    // console.log(albums.map(album => album.name))
  }
}

// search?q=${searchInput}&type=track&limit=20&market=NL

module.exports = {
  searchSongs
}
