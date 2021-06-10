const express = require('express')
const session = require('express-session')
const usersController = require('../controllers/usersController')
const matchDataController = require('../controllers/matchDataController')
const profileAndSettingsController = require('../controllers/profileAndSettingsController')
const loginController = require('../controllers/loginController')

const router = express.Router()

// const checkSession = (req, res, next) => {
//   if (!req.session) {
//     console.log(req.session)
//     res.redirect('/')
//   } else {
//     next()
//   }
// }

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
router.post('/confirmProfile', loginController.confirmProfile)

module.exports = router
