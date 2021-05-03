// import dependecies
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');
const request = require('request');
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://joeribouwman:brocoli12@mymusicmatch.y2o3q.mongodb.net/mymusicmatch?retryWrites=true&w=majority";
const client = new MongoClient(url);
//database i use
const dbName = "MyMusicMatch";

app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', handlebars({extname: 'hbs'}))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.listen(port, () => {
  console.log(`Server running!`)
})

async function run() {
  try {
       await client.connect();
       console.log("Connected correctly to server");
       const db = client.db(dbName);

       // Use the collection "people"
       const allUsers = db.collection("users");
       
       const users = await allUsers.find({}).toArray();
       
       //returns one random user from database
       fakeApi = () => {
        return users[randomUser(users.length)]
      }
       randomUser = (max) => {
        return Math.floor(Math.random() * max) 
      }
       // Print to the console
      } catch (err) {
       console.log(err.stack);
   }

   finally {
      await client.close();
  }
}

run().catch(console.dir);


let match = []

app.get('/', (req, res) => {
  res.render('home',{
    userProfile: fakeApi(),
  });
  });
  

  app.post('/',(req, res) => {
    let randomUser = fakeApi()
    randomUser.like = req.body.like
    // if(randomUser.like == 'true'){
    //   match.push(randomUser)
    // }
    res.render('home', {
      userProfile: randomUser,
      match: match,
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

 