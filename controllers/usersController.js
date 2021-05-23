const { initParams } = require('request')
const { findById } = require('../models/users')
const Users = require('../models/users')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const sessionID = '1128bae9-5a62-4905-a404-2c9386e26df9' // Fake it sessionID for now
const heartIcon = '/images/icons/white heart.png'

const usersIndex = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          banner: mainBanner
        })
      } else {
        const myProfile = result.find((profile) => profile.id.includes(sessionID))
        const userProfiles = result.filter(
          (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
        )
        res.render('home', {
          heartIcon,
          banner: mainBanner,
          userProfile: userProfiles[0]
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const likeAndMatch = (req, res) => {
  Users.find({}).lean()
    .then(result => {
      if (result === undefined) {
        res.redirect('/')
      } else {
        const match = result[0].likes.includes(sessionID)
        const myProfile = result.find((profile) => profile.id.includes(sessionID))
        if (req.body.like === 'true' && match) {
          Users.likes.push(result[0].id)
          Users.matches.push(result[0].id)
        } else if (req.body === 'like') {
          Users.likes.push(result[0].id)
        } else {
          Users.dislikes.push(result[0].id)
        }
        Users.save()
          .then((result) => {
            res.redirect('/')
          })
          .catch((err) => (
            console.log(err)
          ))
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// router.post('/', (req, res) => {
//   users.find({}).toArray((err, profiles) => {
//     if (err) {
//       console.log(err)
//     } else {
//       const myProfile = profiles.find((profile) => profile.id.includes(sessionID))
//       const userProfiles = profiles.filter(
//         (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
//       )
//       const userProfile = userProfiles[0]

//       if (userProfile === undefined) {
//         res.render('home', {
//           banner: mainBanner,
//           heartIcon
//         })
//       } else {
//         const match = userProfile.likes.find((matches) => matches.includes(sessionID))
//         if (req.body.like === 'true' && match) {
//           users.updateOne(
//             { id: sessionID },
//             {
//               $push: {
//                 matches: userProfile.id,
//                 likes: userProfile.id
//               }
//             },
//             (err, res) => {
//               if (err) {
//                 console.log(err)
//               }
//             }
//           )
//         } else if (req.body.like === 'true') {
//           users.updateOne({ id: sessionID }, { $push: { likes: userProfile.id } }, (err, res) => {
//             if (err) {
//               console.log(err)
//             }
//           })
//         } else {
//           users.updateOne({ id: sessionID }, { $push: { dislikes: userProfile.id } }, (err, res) => {
//             if (err) {
//               console.log(err)
//             }
//           }
//           )
//         }
//       }
//     }
//   })
//   users.find({}).toArray((err, updatedProfiles) => {
//     if (err) {
//       console.log(err)
//     } else {
//       const myProfile = updatedProfiles.find((profile) => profile.id.includes(sessionID))
//       const nextUserProfile = updatedProfiles.filter(
//         (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
//       )
//       res.render('home', {
//         banner: mainBanner,
//         heartIcon,
//         userProfile: nextUserProfile[1]
//       })
//     }
//   })
// })

module.exports = {
  usersIndex,
  likeAndMatch
}
