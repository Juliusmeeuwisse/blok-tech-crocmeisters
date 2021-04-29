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
    picture: '/images/john frusciante.jpeg',
    song1: {
      title: 'Maggot Brain',
      artist: 'Funkadelic',
      albumArt: '/images/albumArt/maggot brain.jpeg'
    },
    song2:{
      title: 'The Musical Box',
      artist: 'Genesis',
      albumArt: '/images/albumArt/nursery cryme.jpeg'
    },
    song3: {
      title: 'Tiny Dancer',
      artist: 'Elton John',
      albumArt: '/images/albumArt/madman across the water.jpeg'
    }
},
{
  name: 'Thom Yorke',
  picture: '/images/thom yorke.jpg',
  song1: {
    title: 'Psycho Killer',
    artist: 'Talking Heads',
    albumArt: '/images/albumArt/77.jpg'
  },
  song2:{
    title: 'The Headmasters Ritual',
    artist: 'The Smiths',
    albumArt: '/images/albumArt/meat is murder.jpg'
  },
  song3: {
    title: 'Underworld',
    artist: 'Born Slippy',
    albumArt: '/images/albumArt/born slippy.jpg'
  }
},
{
name: 'David Bowie',
picture: '/images/david bowie.jpg',
song1: {
  title: 'Cosmic Dancer',
  artist: 'T-Rex',
  albumArt: '/images/albumArt/cosmic danser.jpg'
},
song2:{
  title: 'Lust For Life',
  artist: 'Iggy Pop',
  albumArt: '/images/albumArt/lust for life.jpg'
},
song3: {
  title: 'All Tommorows Parties',
  artist: 'Velvet Underground',
  albumArt: '/images/albumArt/velvet underground.jpg'

}
}
]

//fake objects to test
fakeApi = () => {
  return users[randomUser(users.length)]
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

 