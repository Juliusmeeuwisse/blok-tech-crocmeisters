// import dependecies
const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const handlebars = require('express-handlebars');
require('dotenv').config()

const app = express()

const port = process.env.PORT
const url = process.env.DB_URL;
let users = null;
let collection = null;
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
    
       
let match = []

app.get('/', (req, res) => {
  users.findOne(function(error, result){
    if(error) {
      console.log(error)
    } 
    else{
      let userProfile = result
      res.render('home',{
        userProfile: userProfile,
      })
    }
  })
})
  
  app.post('/', (req, res) => {
    
    //returns one random user
    users.aggregate([{$sample: {size: 1}}]).toArray(function(error, result){
      if(error) {
        console.log(error)
      } 
      else{
        let userProfile = result[0]
        console.log(userProfile._id)
        if(req.body.like == 'true' ){
        db.findOneAndUpdate({"name":"joeri"}, {$push: {likes: userProfile._id}}, (err, user) => {
          if (err){
            console.log(err)
          }
          else{
            console.log('update succesfull🥳')
          }
        })
        }
        res.render('home',{
          userProfile: userProfile,
        })
      }
    })
  })





app.get('/login', (req, res) => {
    res.render('login');
  });

app.post('/login/', (req, res) =>{
  console.log(req.body)
  res.render('login')
})

app.get('/match', (req, res) => {
    res.render('match', {
      users: users
    });

});

app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 