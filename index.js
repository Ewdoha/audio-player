const audio = new Audio();
let cover = document.querySelector('.cover-img');
const buttonPrewContainer = document.querySelector('.player-button-prew');
const buttonPlayContainer = document.querySelector('.player-button-play');
const buttonPauseContainer = document.querySelector('.player-button-pause');
const buttonNextContainer = document.querySelector('.player-button-next');
let title = document.querySelector('.title-text');
const timeline = document.querySelector(".progress-container");
let progress = document.querySelector('.progress');
let player = document.querySelector('.player');
let playlistOnPage = document.querySelector('.playlist-container');
let labelsInput = document.querySelectorAll('label');
let input0 = document.querySelector('.input-0');
let input1 = document.querySelector('.input-1');
let input2 = document.querySelector('.input-2');
let input3 = document.querySelector('.input-3');
let input4 = document.querySelector('.input-4');
let input5 = document.querySelector('.input-5');
let input6 = document.querySelector('.input-6');
let input7 = document.querySelector('.input-7');
let input8 = document.querySelector('.input-8');
let input9 = document.querySelector('.input-9'); 
let playlist = [
                'As Moendas -  Patungurugundum.mp3',
                'beyonce.mp3',
                'dontstartnow.mp3',
                'Fly 3 Project -  Blue Nile.mp3',
                'Fly 3 Project -  Khamsa.mp3',
                'Ludovico Einaudi -  Nazzu nazzu.mp3',
                'Mama Marjas -  Il pollo.mp3',
                'Rocca-Benigni Duo,Lucilla Galeazzi -  Te possino dà tante cortellate.mp3',
                'Saba Anglana -  Gabriel.mp3',
                'The Chalga Band -  Mazo mazo.mp3'
];
let isPlay = false;
let playNum = 0;




audio.addEventListener('timeupdate', () => getTime());
buttonPlayContainer.addEventListener('click', () => clickPlayButton());
buttonPauseContainer.addEventListener('click', () => clickPauseButton ());
buttonPrewContainer.addEventListener('click', () => clickPrewButton ());
buttonNextContainer.addEventListener('click', () => clickNextButton()); 
playlistOnPage.addEventListener('click', (event) => clickPlaylistPlay(event));
timeline.addEventListener("click", event => getTimeline(event));



function clickPlaylistPlay(event) {
    let target = event.target.value;
    clickPlayButton(audio.src = `./assets/audio/${target}`);
    title.textContent = `${target}`;
     let indexSongInPlaylist = 0;
    if ([...playlistOnPage.children].indexOf(event.target) !== -1) {
        indexSongInPlaylist = [...playlistOnPage.children].indexOf(event.target);
        if (indexSongInPlaylist === 0) {
            cover.src = `./assets/img/${indexSongInPlaylist + 4}.png`;
            playNum = indexSongInPlaylist;
        } else {
            cover.src = `./assets/img/${indexSongInPlaylist}.png`;
            playNum = indexSongInPlaylist;
        }
        
    }
}

function clickPlayButton() {
    if (!isPlay) {
        playAudio();
    } else if (audio.paused) {
        audio.play();
    }
    changeCurrentInput();
    buttonPlayContainer.classList.remove('button-visible');
    buttonPauseContainer.classList.add('button-visible');
    cover.classList.add('cover-animate');
    isPlay = true; 
}
        
function clickPauseButton() {
    audio.pause();
    buttonPauseContainer.classList.remove('button-visible');
    buttonPlayContainer.classList.add('button-visible');
    cover.classList.remove('cover-animate');
}    

function clickPrewButton() {
    playNum -= 1; 
    playAudio();
    buttonPlayContainer.classList.remove('button-visible');
    buttonPauseContainer.classList.add('button-visible');
    cover.classList.add('cover-animate');
    changeCurrentInput(); 
}

function clickNextButton() {
    playNum += 1; 
    playAudio();
    buttonPlayContainer.classList.remove('button-visible');
    buttonPauseContainer.classList.add('button-visible');
    cover.classList.add('cover-animate');
    changeCurrentInput();
     
}

function playAudio() { 
    if (playNum < 0) {
       playNum = 9;
       audio.src = `./assets/audio/${playlist[9]}`;  
    } else if (playNum > 9) {
       playNum = 0;
       audio.src = `./assets/audio/${playlist[0]}`; 
    } else {
        audio.src = `./assets/audio/${playlist[playNum]}`;
    }
    audio.play();
    title.textContent = `${playlist[playNum]}`;
    cover.src = `./assets/img/${playNum}.png`;  
}


function getTime() {
    let curMinutes = Math.floor(audio.currentTime / 60);
    let curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
    let durMinutes = Math.floor(audio.duration / 60);
    let durSeconds = Math.floor(audio.duration - durMinutes * 60);
    let length = document.querySelector('.length');
    let current = document.querySelector('.current');
    length.textContent = `${durMinutes}:${durSeconds}`;
    current.textContent = `${curMinutes}:${curSeconds}`;
    progress.style.width = audio.currentTime / audio.duration * 100 + "%";
    if (curSeconds * curMinutes === durSeconds * durMinutes) {
        clickNextButton();
    }

    if (curSeconds < 10) {
         current.textContent = `${curMinutes}:0${curSeconds}`;
    }

    if (durSeconds < 10) {
         length.textContent = `${durMinutes}:0${durSeconds}`;
    }
}

function changeCurrentInput() {
    if (playNum === 0) {
        input0.checked = true;
    } else if (playNum === 1) {
        input1.checked = true;
    } else if (playNum === 2) {
        input2.checked = true;
    } else if (playNum === 3) {
        input3.checked = true;
    } else if (playNum === 4) {
        input4.checked = true;
    } else if (playNum === 5) {
        input5.checked = true;
    } else if (playNum === 6) {
        input6.checked = true;
    } else if (playNum === 7) {
        input7.checked = true;
    } else if (playNum === 8) {
        input8.checked = true;
    } else if (playNum === 9) {
        input9.checked = true;
    }
}

function getTimeline(event) {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}





