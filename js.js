const wrapper = document.querySelector(".wrapper"),
            musicImg = wrapper.querySelector("img"),
            musicName = wrapper.querySelector(".name"),
            musicArtist = wrapper.querySelector(".artist"),
            playPauseBtn = wrapper.querySelector(".play-pause"),
            prevBtn = wrapper.querySelector("#prev"),
            nextBtn = wrapper.querySelector("#next"),
            mainAudio = wrapper.querySelector("#main-audio"),
            progressArea = wrapper.querySelector(".progress-area"),
            progressBar = wrapper.querySelector(".progress-bar"),
            musicList = wrapper.querySelector(".music-list"),
            moreMusicBtn = wrapper.querySelector("#more-music"),
            closeMoreMusic = musicList.querySelector("#close"),
            ulTag = wrapper.querySelector("ul");
            const resetBtn = wrapper.querySelector("#reset-btn");
            let musicIndex = Math.floor((Math.random() * AllMusic.length) + 1);
            IsMusicPaused = true;

            window.addEventListener("load" , () => {
                loadMusic(musicIndex);

            });
            function loadMusic(indexNumb) {
                musicName.innerText = AllMusic[indexNumb - 1].name;
                musicArtist.innerText = AllMusic[indexNumb - 1].artist;
                musicImg.src = `Assets/image/${AllMusic[indexNumb - 1].img}.jpg`;
                mainAudio.src = `Assets/Songs/${AllMusic[indexNumb - 1].src}.mp3`;
            }

            function playMusic(){
                wrapper.classList.add("paused");
                musicImg.classList.add('rotate');
                playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
                mainAudio.play();
            }

            function pauseMusic(){
                wrapper.classList.remove("paused");
                musicImg.classList.remove('rotate');
                playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
                mainAudio.pause();
            }

            function prevMusic()
            {
                musicIndex--;
                musicIndex < 1 ? musicIndex = AllMusic.length : musicIndex = musicIndex;
                loadMusic(musicIndex);
                playMusic();


          }
            function nextMusic()
            {
                musicIndex++;
                musicIndex > AllMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
                loadMusic(musicIndex);
                playMusic();


          }

          playPauseBtn.addEventListener("click", () => {
            const isMusicplay = wrapper.classList.contains("paused");
            isMusicplay ? pauseMusic() : playMusic();
          })


          prevBtn.addEventListener("click", ()=> {
            prevMusic();
          })

          nextBtn.addEventListener("click", () => {
            nextMusic();
          }
          )


mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;

  if (duration) {
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
  }

  let musicCurrentTime = wrapper.querySelector(".current-time");
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


mainAudio.addEventListener("loadeddata", () => {
  let musicDuration = wrapper.querySelector(".max-duration");
  let mainAdDuration = mainAudio.duration;
  let totalMin = Math.floor(mainAdDuration / 60);
  let totalSec = Math.floor(mainAdDuration % 60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }
  musicDuration.innerText = `${totalMin}:${totalSec}`;
})


progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
})

mainAudio.addEventListener("ended", () => {
  nextMusic();
});
          


    moreMusicBtn.addEventListener("click", () => {
    musicList.classList.add("show");
                
});


    closeMoreMusic.addEventListener("click", () => {
    musicList.classList.remove("show");
                    });

                    for (let i = 0; i < AllMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${AllMusic[i].name}</span>
                        <p>${AllMusic[i].artist}</p>
                    </div>
                    <span id="${AllMusic[i].src}" class="audio-duration">3:30</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
}



function playingSong() {
    const allLiTags = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTags.length; j++) {
        
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
        }

        
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
        }

        
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}


function clicked(element) {
    
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = parseInt(getLiIndex); 
    
    loadMusic(musicIndex); 
    playMusic();           
    playingSong();         
}
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.add("show");
    playingSong(); 
});



resetBtn.addEventListener("click", () => {
    mainAudio.currentTime = 0; 
    pauseMusic();              
});
