const express = require('express')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// Spotify authentication routes
router.get('/', loginController.getLogin)
router.get('/login', loginController.redirectToSpotifyLogin, loginController.haltOnTimedout)
router.get('/callback', loginController.setAccestokens, loginController.haltOnTimedout)

// routes
router.get('/main', usersController.usersIndex, loginController.haltOnTimedout)
router.post('/main', usersController.likeAndMatch, loginController.haltOnTimedout)
router.get('/match', matchDataController.getMatches, loginController.haltOnTimedout)
router.get('/musiclist', matchDataController.getSongsForMusicList, loginController.haltOnTimedout)
router.get('/profile', profileAndSettingsController.getProfile, loginController.haltOnTimedout)
router.get('/settings', profileAndSettingsController.getSettings, loginController.haltOnTimedout)
router.get('/confirmProfile', loginController.getConfirmProfileData, loginController.haltOnTimedout)

module.exports = router
