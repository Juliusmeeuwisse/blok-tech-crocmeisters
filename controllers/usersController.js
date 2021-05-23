// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
// const matchBanner = '/images/banners/Banner MMM-Match.png'
// const musicListBanner = '/images/banners/banner mmm-musiclist.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake it sessionID for now
const heartIcon = '/images/icons/white heart.png'
const users = require('../models/users.js')

exports.liking = (req, res) => {
  users.find({}).toArray((err, profiles) => {
    if (err) {
      console.log(err)
    } else {
      const myProfile = profiles.find((profile) => profile.id.includes(sessionID))
      const userProfiles = profiles.filter(
        (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
      )
      const userProfile = userProfiles[0]

      if (userProfile === undefined) {
        res.render('home', {
          banner: mainBanner,
          heartIcon
        })
      } else {
        const match = userProfile.likes.find((matches) => matches.includes(sessionID))
        if (req.body.like === 'true' && match) {
          users.updateOne(
            { id: sessionID },
            {
              $push: {
                matches: userProfile.id,
                likes: userProfile.id
              }
            },
            (err, res) => {
              if (err) {
                console.log(err)
              }
            }
          )
        } else if (req.body.like === 'true') {
          users.updateOne({ id: sessionID }, { $push: { likes: userProfile.id } }, (err, res) => {
            if (err) {
              console.log(err)
            }
          })
        } else {
          users.updateOne({ id: sessionID }, { $push: { dislikes: userProfile.id } }, (err, res) => {
            if (err) {
              console.log(err)
            }
          }
          )
        }
      }
    }
  })
  users.find({}).toArray((err, updatedProfiles) => {
    if (err) {
      console.log(err)
    } else {
      const myProfile = updatedProfiles.find((profile) => profile.id.includes(sessionID))
      const nextUserProfile = updatedProfiles.filter(
        (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
      )
      res.render('home', {
        banner: mainBanner,
        heartIcon,
        userProfile: nextUserProfile[1]
      })
    }
  })
}
