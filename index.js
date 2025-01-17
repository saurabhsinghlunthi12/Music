const image=document.querySelector('img'); //artist image element
const title=document.getElementById('title'); //name of song
const artist=document.getElementById('artist'); //artist name
const prevBtn=document.getElementById('prev'); //to play previous song
const music=document.getElementById('music'); // Audio element
const playBtn=document.getElementById('play'); //to play a song
const nextBtn=document.getElementById('next'); //to play next song
const albumImage=document.getElementById('albumImage'); //Artist Image
const currentTime=document.getElementById('currentTime'); 
const progressContainer=document.getElementById('progressContainer');
const progress=document.getElementById('progress');
const playTime=document.getElementById('playTime');
const totalDuration=document.getElementById('totalDuration');
const volumeContainer=document.getElementById('volumeContainer');
const volumeProgress=document.getElementById('volumeProgress');
const volumeIcon=document.getElementById('volumeIcon');
const repeatIcon=document.getElementById('repeatIcon');
const heartIcon=document.getElementById('heartIcon');

// Array of object that has Songs details
const songs=[
    {
        songImage:'local train banner',
        songName:'Choo Lo',
        songSrc:'Choo Lo',
        artist:'The Local Train',

    },
    {
        songImage:'znmd',
        songName:'Dil Dhadakne Do',
        songSrc:'Dil Dhadakne Do',
        artist:'Zindagi Na Milegi Dobara',  
    },
    {
        songImage:'Rock On',
        songName:'Rock On',
        songSrc:'Rock On',
        artist:'Farhan AKhtar',
    },
    {
        songImage:'Bhaag Milkha Bhaag',
        songName:'Bhaag Milkha Bhaag',
        songSrc:'Bhaag Milkha Bhaag',
        artist:'Shankar Ehsaan Loy',
    },
];

let isPlaying=false;
let songIndex=0;
let isRepeat= false;
let isLiked=false;


function loadSong(song){
  
    title.textContent=song.songName;
    artist.textContent=song.artist;
    image.src=`./${song.songImage}.jpg`;
    music.src=`./${song.songSrc}.mp3`;
   

}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    songs[songIndex];
    
    loadSong(songs[songIndex]);
    playSong();  
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    songs[songIndex];
    
    loadSong(songs[songIndex]);
    playSong();  
}


// Function to play song
function playSong(){
    isPlaying=true;

    // if a song was paused while it was playing, player will play from the same point
    if(music.currentTime>0){
        music.play();
    }

    // Otherwise, player will play from start
    else{
    loadSong(songs[songIndex]);
    music.play();}

    // Changing the play icon to Pause using fontawesome icons
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause')
    
}
function pauseSong(){
    isPlaying=false;
    music.pause();

    // Changing the pause icon to Play using fontawesome icons
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play')

}

// Default song , ready to be played
// function defaultLoad(song){
    
//     title.textContent=song.songName;
//     artist.textContent=song.artist;
//     image.src=`./${song.songImage}.jpg`;
//     music.src=`./${song.songSrc}.mp3`; 

// }
// defaultLoad(songs[0]);
loadSong(songs[0]);



// updating  progress bar
function updateProgressBar(e){
    // if(isPlaying){
        const {currentTime,duration}=e.srcElement;
        // console.log(currentTime, duration); // checking currentTime and duration
        const progressPercent=currentTime/duration*100;
        progress.style.width=`${progressPercent}%`;
        
        //updating Duration of Songs 
        const durationMinutes=Math.floor(duration/60);
        const durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds};`
        }
        if(durationMinutes){
        totalDuration.textContent=`${durationMinutes}:${durationSeconds}`;
        }

        // updating current Time
        let playMinutes=Math.floor(currentTime/60);
        // console.log(playMinutes);
        let playSeconds=Math.floor(currentTime%60);
        if(playSeconds<10){
            playSeconds=`0${playSeconds}`;
        }
        playTime.textContent=`${playMinutes}:${playSeconds}`;
        

    // }
}
function setProgress(e){
    
       const clickX=e.offsetX;
       const width=this.clientWidth;
       
       const { duration }=music;
       music.currentTime=(clickX/width)*duration;
}

let lastVolume=1;

// setting VOlume

     function setVolume(e){
         console.log(e);
         let volume=e.offsetX/volumeContainer.offsetWidth;
         if(volume<0.1)
         {
            volume=0;
         }
         if(volume>0.9)
         {
            volume=1;
         }

         music.volume=volume;
         volumeProgress.style.width=`${volume*100}%`;
         console.log(volume);

         volumeIcon.className=" ";

        if(volume>0.7)
        {
            volumeIcon.classList.add('fas','fa-volume-up');
        }
        else if(volume<0.7 && volume>0)
        {
            volumeIcon.classList.add('fas','fa-volume-down');
        }
        else{
            volumeIcon.classList.add('fas','fa-volume-off');
        }

        lastVolume=volume;

     }


     function toggleMute(){
        // lastVolume=music.volume; 
        if(music.volume){
        lastVolume=music.volume;    
        music.volume=0;
        volumeIcon.classList.toggle('fa-volume-xmark');
        volumeIcon.setAttribute('title','Unmute');
        volumeProgress.style.width="0%";
    }

        else{
            music.volume=lastVolume;
            volumeProgress.style.width=`${lastVolume*100}%`;
            volumeIcon.classList.replace('fa-volume-xmark','fa-volume-low');
        }
    

        }

// Repeat the same song
function repeatSong(){
  
    // console.log("repeat song");
    isRepeat=true;
    music.loop=true;
    repeatIcon.style.filter="brightness(70%)";
    repeatIcon.setAttribute('title','stop repeat');

    

}
// switching off repeat
function noRepeat(){
    // console.log("repeat is removed");
    // console.log(music.duration);
    // console.log(music.currentTime);
    isRepeat=false;
    repeatIcon.style.filter="brightness(100%)";
    repeatIcon.setAttribute('title','repeat');
    music.loop=false;
    
        
   
}

// Liking song

function likedSong(){
    isLiked=true;
    heartIcon.style.color="#cf0426";
}
  
function unLikedSong(){
    isLiked=false;
    heartIcon.style.color="rgb(129, 129, 129)";
}
     
// Event Listeners
playBtn.addEventListener('click',()=> isPlaying? pauseSong():playSong());
nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);
progressContainer.addEventListener('click',setProgress);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
volumeContainer.addEventListener('click',setVolume);
volumeIcon.addEventListener('click',toggleMute);
repeatIcon.addEventListener('click',()=> isRepeat? noRepeat():repeatSong());
heartIcon.addEventListener('click',()=> isLiked? unLikedSong():likedSong());



