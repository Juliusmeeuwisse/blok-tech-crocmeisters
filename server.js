// import dependecies
const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const handlebars = require('express-handlebars');
const { ObjectID } = require('bson');
require('dotenv').config()

const app = express()

const port = process.env.PORT
const url = process.env.DB_URL;
let users = null;
let idCheck;
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
    
//page templates      
let match = []
let heartIconGreen = "/images/icons/green heart.png"
let heartIcon = "/images/icons/white heart.png"

app.get('/', (req, res) => {
  //find the session user, fake it for now
  users.findOne({"name":"joeri"},(err, joeri) =>{
    if(err){
      console.log(err)
    }
    else{
      //find random user from database
      let randomUser = users.aggregate([{$sample: {
            size: 1},}]).toArray( (err, result) =>{
        
        let userID = result[0]._id.toString();
        idCheck = joeri.seen;

        if(err) {
          console.log(err)
        }
        //if already saw the random user get new user from database
        else if(userID == idCheck[0]){
          randomUser
          console.log('check')
        }
        // render the random user
        else{
          let banner = "/images/banners/Banner MMM-home.png"
          let userProfile = result[0]
          res.render('home',{
            heartIcon: heartIcon,
            banner: banner,
            userProfile: userProfile,
          })
        }
      })
    }
  })
})
  
  app.post('/', (req, res) => {
    //returns one random user
    let randomUser = users.aggregate([{$sample: {
          size: 1}}]).toArray( (err, result) => {

      let userID = result[0]._id.toString();
      if(err) {
        console.log(err)
      }
      else{
        let userProfile = result[0]
        let banner = "/images/banners/Banner MMM-home.png"
        if(req.body.like == 'true'){
        users.findOneAndUpdate({"name":"joeri"}, {$push: {likes: userProfile._id, seen: userProfile._id}}, 
        (err, user) => {
          if (err){
            console.log(err)
          }
          else if(userID === idCheck[0]){
            randomUser
          }
          else{
            console.log(user + 'update succesfull🥳')
          }
        })
        }
        else if(req.body.like == 'false'){
          users.findOneAndUpdate({"name":"joeri"}, {$push: {seen: userProfile._id}},
          (err, res) => {
            if(err){
              console.log(err)
            }         
            else if(userID === idCheck[0]){
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

 