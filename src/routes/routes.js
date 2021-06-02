const express = require('express')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// routes
router.get('/', usersController.usersIndex)
router.post('/', usersController.likeAndMatch)
router.get('/match', matchDataController.getMatches)
router.get('/musiclist', matchDataController.getSongsForMusicList)
router.get('/profile', profileAndSettingsController.getProfile)
router.get('/settings', profileAndSettingsController.getSettings)
router.get('/login', profileAndSettingsController.getLogin)

// Spotify authentication routes
const spotifyController = require('../controllers/spotifyController')
router.post('/profile', spotifyController.searchSongs)
router.get('/spotify', loginController.test)
router.get('/callback', loginController.test2)

module.exports = router
