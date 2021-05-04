// import dependecies
const express = require('express')
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const handlebars = require('express-handlebars');
require('dotenv').config()

const app = express()
const urlencodedParser = bodyparser.urlencoded({
  extended: false
})

const port = process.env.PORT
const url = process.env.DB_URL;
let users = null;
// let users = null;
// let db = null;

app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', handlebars({extname: 'hbs'}))
app.use(express.static('public'))
app.use(express.json())
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
    // db = client.db(process.env.DB_NAME);
    // users = db.collection('users')
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
        let userProfile = result
        console.log(userProfile)
 
        res.render('home',{
          userProfile: userProfile[0],
        })
      }
    })
  })





app.get('/login', (req, res) => {
    res.render('login');
  });


app.get('/match', (req, res) => {
    res.render('match', {
      users: users
    });

});



app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 