const express = require('express')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// Spotify authentication routes
router.get('/', loginController.getLogin)
router.get('/login', loginController.redirectToSpotifyLogin)
router.get('/callback', loginController.setAccestokens)

// routes
router.get('/main', usersController.usersIndex)
router.post('/main', usersController.likeAndMatch)
router.get('/match', matchDataController.getMatches)
router.get('/musiclist', matchDataController.getSongsForMusicList)
router.get('/profile', profileAndSettingsController.getProfile)
router.get('/settings', profileAndSettingsController.getSettings)
router.get('/confirmProfile', loginController.getConfirmProfileData)

module.exports = router
