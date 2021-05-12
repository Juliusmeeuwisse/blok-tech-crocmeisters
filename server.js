// import dependecies
const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const handlebars = require('express-handlebars');
const { v4: uuidv4 } = require('uuid');
const { json } = require('body-parser');
require('dotenv').config()

const app = express()

const port = process.env.PORT
const url = process.env.DB_URL;

app.set('view engine', 'hbs');;
app.set('views', 'views');;
app.engine('hbs', handlebars({extname: 'hbs'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));




app.listen(port, () => {
  console.log(`😃😃Server running!😃😃`)
})

//connection with database
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  if (err){
    console.log(err)
  }
  else{
    users = client.db(process.env.DB_NAME).collection('users')
  }
})
// Global variables
let users = null;
let matches
let pictures;
let names;
let genres;
let myID = "1128bae9-5a62-4905-a404-2c9386e26df9" //Fake it for now, later this wil be the session id
let heartIconGreen = "/images/icons/green heart.png"
let heartIcon = "/images/icons/white heart.png"



app.get('/', (req, res) => {
  let banner = "/images/banners/Banner MMM-home.png"
  users.find({}).toArray( (err,profiles) =>{
    if(err){console.log(err)
    } else if(profiles == undefined){
      return
    }
    else{
      let myProfile = profiles.find(myProfile => myProfile.id.includes(myID))
      
      let likes = myProfile.likes
      let dislikes = myProfile.dislikes
      let userProfiles = profiles.filter(user => {return !likes.includes(user.id) 
        && !dislikes.includes(user.id)})
      let randomUserProfile = userProfiles[Math.floor(Math.random()* userProfiles.length)];  
      
      res.render('home', {
          heartIcon: heartIcon,
          banner: banner,
          userProfile: randomUserProfile,
        })
    }
  })
})






//page templates      
app.post('/', (req, res) => {
      let banner = "/images/banners/Banner MMM-home.png"
      users.find({}).toArray( (err,profiles) =>{
        if(err){console.log(err)
        } else{
          let myProfile = profiles.find(myProfile => myProfile.id.includes(myID))
          let userProfiles = profiles.filter(user => {return !myProfile.likes.includes(user.id) 
            && !myProfile.dislikes.includes(user.id)})
            if(!userProfiles){return}
          let randomUserProfile = userProfiles[Math.floor(Math.random()* userProfiles.length)];  
            let match = randomUserProfile.likes.find(match => match.includes(myID))
            if(req.body.like == 'true' && match){
                users.updateOne( {'id': myID}, {$push:{'matches': randomUserProfile.id, 'likes':randomUserProfile.id}},
                (err, res) => {
                  if(err){console.log(err)
                  } else{
                     console.log('MATCH🎉🥳🎉🥳🎉')
                  }
                })
            } else if(req.body.like == 'true'){
              users.updateOne( {'id': myID}, {$push:{'likes':randomUserProfile.id}},
              (err, res) => {
                if(err){console.log(err)
                } 
              })
            } else{
              users.updateOne( {'id': myID}, {$push:{'dislikes':randomUserProfile.id}},
              (err, res) => {
                if(err){console.log(err)
                } 
              })
            }
            
      res.render('home',{
        banner: banner,
        heartIcon: heartIcon,
        userProfile: randomUserProfile,
      })
        }
      })
    })
      



app.get('/profile', (req, res) =>{
  res.render('profile');
});

app.get('/musiclist', (req, res) => {
    let banner = "/images/banners/banner mmm-musiclist.png"
    res.render('musiclist', {
    heartIcon: heartIcon,
    banner: banner
  });
});

app.get('/settings', (req, res) =>{
  res.render('settings', {
    heartIcon: heartIcon
  })
})


app.get('/match', (req, res) => {
  let banner= "/images/banners/banner mmm-match.png"
  users.find({}).toArray( (err,profiles) =>{
    if(err){console.log(err)
    } else if(profiles == undefined){
      return
    }
    else{
      let myProfile = profiles.find(myProfile => myProfile.id.includes(myID))
      let myMatches = profiles.filter(match => { return myProfile.matches.includes(match.id)})

      res.render('match', {
          heartIcon: heartIcon,
          banner: banner,
          matches: myMatches
        })
    }
  })
})



app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 




