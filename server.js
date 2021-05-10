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
    } else{
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


let getMatches = () =>{
  users.findOne({'id':myID}, (err, match) =>{
    if(err){console.log(err)
    } else{
      matches = match.likes
      match.likes.forEach(match => {
        names = match.name
        pictures = match.picture
        genres = match.genres
      });
    }
  })
}



//page templates      



app.post('/', (req, res) => {
  //returns one random user
  let randomUser = users.aggregate([{$sample: {
        size: 1}}]).toArray( (err, result) => {

    let userID = result[0].id;
    if(err) throw(err);
    else{
      let userProfile = result[0]
      console.log(userProfile.seen)
      let banner = "/images/banners/Banner MMM-home.png"
      if(req.body.like == 'true'){
      users.findOneAndUpdate({'id':'def757fc-5bfe-4ae1-9fe6-ce46fec2ebfe'}, {$push: {likes: userProfile, seen: userProfile}}, 
      (err, user) => {
        if (err){console.log(err)}
        else if(userProfile.seen.includes(userID)){
          randomUser
        }
        else if(result[0].likes.includes(myID)){
          console.log('match🥳')
          matches.inserOne(userProfile,
          (err, res) =>{
            if(err){console.log(err)}
          })
        }
      })
      }
      else if(req.body.like == 'false'){
        users.findOneAndUpdate({'id':myID}, {$push: {seen: userProfile}},
        (err, res) => {
          if(err){
            console.log(err)
          }         
          else if(userProfile.seen.includes(userID)){
            randomUser
          }
          else{
            console.log('no match')
          }
        })
      }
      res.render('home',{
        banner: banner,
        heartIcon: heartIcon,
        userProfile: userProfile,
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
      getMatches()
  let banner= "/images/banners/banner mmm-match.png"
  res.render('match', {
    heartIcon: heartIconGreen,
    banner: banner,
    match: matches,
    picture: pictures,
    name: names,
    genre: genres
  })
})



app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 




