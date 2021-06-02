const express = require('express')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// Spotify authentication routes
const spotifyController = require('../controllers/spotifyController')
router.post('/profile', spotifyController.searchSongs)
router.get('/', loginController.getLogin)
router.get('/login', loginController.login)
router.get('/callback', loginController.getMe)

// routes
router.get('/main', usersController.usersIndex)
router.post('/main', usersController.likeAndMatch)
router.get('/match', matchDataController.getMatches)
router.get('/musiclist', matchDataController.getSongsForMusicList)
router.get('/profile', profileAndSettingsController.getProfile)
router.get('/settings', profileAndSettingsController.getSettings)

module.exports = router
