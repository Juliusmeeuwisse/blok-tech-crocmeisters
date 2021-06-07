const loginSection = document.getElementsByClassName('login')[0].className

if (loginSection === 'login') {
  document.querySelector('body').classList.add('bodyColor')
} else {
  document.querySelector('body').classList.remove('bodyColor')
}

// const changeButton = document.getElementById('changeSongs')
