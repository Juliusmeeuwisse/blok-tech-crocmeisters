
const music = document.querySelectorAll('audio')
const button = document.getElementsByClassName('play')
const icon = document.querySelectorAll('span')

for (let i = 0; i < button.length; i++) {
  const x = playMusic()
  button[i].addEventListener('click', x)

  function playMusic () {
    let a = true
    function closure () {
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
    return closure
  }
}

const myID = document.getElementsByClassName('matchID')[1].innerHTML
const matchArray = document.getElementsByClassName('matchID')[0].innerHTML.split(',')
const match = matchArray.find((id) => id.includes(myID))
const likeButton = document.querySelectorAll('form button')[0]

const matching = () => {
  if (match) {
    alert('You Have A New Match🎉\nSee your new match in the matches page or listen to their favourite songs in your music list')
  }
}

likeButton.addEventListener('click', matching)
