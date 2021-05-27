const music = document.querySelectorAll('audio')
const button = document.getElementsByClassName('play')
const icon = document.querySelectorAll('span')
// const myID = document.getElementsByClassName('matchID')[1].innerHTML
// const matchArray = document.getElementsByClassName('matchID')[0].innerHTML.split(',')
// const match = matchArray.find((id) => id.includes(myID))
// const likeButton = document.querySelectorAll('form button')[0]
// const changeButton = document.getElementById('changeSongs')

let a = true

// play music and change play button
for (let i = 0; i < button.length; i++) {
  const playMusic = () => {
    if (a === true) {
      music[i].play()
      icon[i].classList.add('pause')
      a = false
    } else {
      music[i].pause()
      a = true
      icon[i].classList.remove('pause')
    }
  }
  button[i].addEventListener('click', playMusic)
}
// matching
// const matching = () => {
//   if (match) {
//     alert('You Have A New Match🎉\nSee your new match in the matches page or listen to their favourite songs in your music list')
//   }
// }

// likeButton.addEventListener('click', matching)

// const searchForSongs = () => {
//   const form = document.getElementsByClassName('hiddenForm')
//   const hiddenForm = Array.from(form)
//   hiddenForm.forEach(element => element.classList.remove('hiddenForm'))
// }

// changeButton.addEventListener('click', searchForSongs)
