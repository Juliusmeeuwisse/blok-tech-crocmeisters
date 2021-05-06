// import dependecies
const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const handlebars = require('express-handlebars');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const app = express()

const port = process.env.PORT
const url = process.env.DB_URL;
let users = null;
app.set('view engine', 'hbs');;
app.set('views', 'views');;
app.engine('hbs', handlebars({extname: 'hbs'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));




app.listen(port, () => {
  console.log(`Server running!`)
})

//connection with database
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  if (err){
    console.log(err)
  }
  else{
    users = client.db(process.env.DB_NAME).collection('users')
    db = client.db(process.env.DB_NAME).collection('user')
  }
})
// variables
let myID = "1128bae9-5a62-4905-a404-2c9386e26df9"
let heartIconGreen = "/images/icons/green heart.png"
let heartIcon = "/images/icons/white heart.png"

//page templates      
app.get('/', (req, res) => {
  //find random user from database
  users.aggregate([{$sample: {
    size: 1}}]).toArray( (err, result) => {
    if (err) throw err; 
    else{
      //render the user
      let banner = "/images/banners/Banner MMM-home.png"
      let userProfile = result[0]
      console.log()
        res.render('home', {
          heartIcon: heartIcon,
          banner: banner,
          userProfile: userProfile,
        })  
      }
    })
})

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
      users.findOneAndUpdate({'id':myID}, {$push: {likes: userProfile.id, seen: userProfile.id}}, 
      (err, user) => {
        if (err){console.log(err)}
        else if(userProfile.seen.includes(userID)){
          randomUser
        }
        else if(result[0].likes.includes(myID)){
          console.log('match🥳')
          users.findOneAndUpdate({'id':myID}, {$push: {matches: userProfile.id}},
          (err, res) =>{
            if(err){console.log(err)}
          })
        }
      })
      }
      else if(req.body.like == 'false'){
        users.findOneAndUpdate({'id':myID}, {$push: {seen: userProfile.id}},
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
  console.log(req.body)
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
  let banner = "/images/banners/Banner MMM-match.png"
  let users = undefined;
    res.render('match', {
      heartIcon: heartIconGreen,
      banner: banner,
      users: users
    });
});

app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 




