console.log('welcome to spotify');

let index = 0;
let audioElement = new Audio('./music/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let mastersong = document.getElementById('mastersong');

let songs = [
    { songname: 'Bohemian Rhapsody', filepath: './music/sample1.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Imagine', filepath: './music/sample2.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Hotel California', filepath: './music/sample3.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Billie Jean', filepath: './music/sample4.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Stairway to Heaven', filepath: './music/sample5.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Stairway to Heaven', filepath: './music/sample6.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Hotel California', filepath: './music/sample3.mp3', coverpath: 'cover1.jpg' },
    { songname: 'Billie Jean', filepath: './music/sample4.mp3', coverpath: 'cover1.jpg' }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
});

// HANDLE PLAY/PAUSE CLICK
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        mastersong.innerHTML=songs[index].songname;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        mastersong.innerHTML=songs[index].songname;
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// LISTEN TO EVENTS
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        let index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `./music/${index + 1}.mp3`;
        audioElement.currentTime = 0;
        mastersong.innerHTML=songs[index].songname;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});


document.getElementById('next').addEventListener('click', ()=>{
    if(index>=5){
        index = 0;
    }
    else{
        index += 1;
    }
    audioElement.src = `./music/${index+1}.mp3`;
    audioElement.currentTime=0;
    mastersong.innerHTML=songs[index].songname;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(index<=0){
        index = 0;
    }
    else{
        index -= 1;
    }
    audioElement.src = `./music/${index+1}.mp3`;
    audioElement.currentTime=0;
    mastersong.innerHTML=songs[index].songname;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
