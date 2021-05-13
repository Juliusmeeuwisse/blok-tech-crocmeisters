const music = document.querySelectorAll('audio')
const button = document.getElementsByClassName('play')
const icon = document.querySelectorAll('span')


for (let i = 0; i < button.length; i++) {
    const x = playMusic();
    button[i].addEventListener('click', x) 
    
    function playMusic() {
        let a = true;
        function closure(){
        
            if(a == true){
                music[i].play()
                icon[i].classList.add('pause')
                a = false;
            } else{
                music[i].pause()
                a = true
                icon[i].classList.remove('pause')
            }
        }
    return closure;
    }
}
