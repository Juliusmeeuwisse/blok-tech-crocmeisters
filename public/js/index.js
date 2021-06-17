const music = document.querySelectorAll('audio')
const button = document.getElementsByClassName('play')
const icon = document.querySelectorAll('span')

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

// const searchForSongs = () => {
//   const form = document.getElementsByClassName('hiddenForm')
//   const hiddenForm = Array.from(form)
//   hiddenForm.forEach(element => element.classList.remove('hiddenForm'))
// }

// changeButton.addEventListener('click', searchForSongs)
