// import dependecies
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');
const request = require('request');


app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', handlebars({extname: 'hbs'}))

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server running!`)
})

const users = [
  {
    name: 'John Frusciante',
    song1: {
      title: 'Maggot Brain',
      artist: 'Funkadelic'
    },
    song2:{
      title: 'The Musical Box',
      artist: 'Genesis'
    },
    song3: {
      title: 'Tiny Dancer',
      artist: 'Elton John'
    }
},
{
  name: 'Thom Yorke',
  song1: {
    title: 'Psycho Killer',
    artist: 'Talking Heads'
  },
  song2:{
    title: 'The Headmasters Ritual',
    artist: 'The Smiths'
  },
  song3: {
    title: 'Underworld',
    artist: 'Born Slippy'
  }
},
{
name: 'David Bowie',
song1: {
  title: 'Cosmic Dancer',
  artist: 'T-Rex'
},
song2:{
  title: 'Lust For Life',
  artist: 'Iggy Pop'
},
song3: {
  title: 'All Tommorows Parties',
  artist: 'Velvet Underground'
}
},
]

//fake objects to test
fakeApi = () => {
  return users[randomUser(3)]
}


randomUser = (max) => {
  return Math.floor(Math.random() * max) 
}

console.log(fakeApi());

app.get('/', (req, res) => {
  res.render('home',{
    userProfile: fakeApi()
  });
  });



app.get('/login', (req, res) => {
    res.render('login');
  });


app.get('/match', (req, res) => {
    res.render('match');

});


app.use(function (req, res, next) {
    res.status(404).send("404 Page not found")
  })

 