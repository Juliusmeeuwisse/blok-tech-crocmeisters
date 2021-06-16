const spotifyAuth = require('../models/spotify')
const spotifyApi = spotifyAuth.spotifyApi

const searchSong = async (query) => {
  const data = await spotifyApi.searchTracks(query, { limit: 5 })
  return data.body.tracks.items
}

module.exports = searchSong
