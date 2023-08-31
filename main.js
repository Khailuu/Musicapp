const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const btnPlay = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const app = {
  currentIndex: 0,
  isPlaying: false,
  song: [
    {
      name: "Mot Ngan Noi Dau",
      singer: "Trung Quan idol",
      path: "./assets/music/song1.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Vi mot nguoi ra di mai",
      singer: "Ung Hoang Phuc",
      path: "./assets/music/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      name: "Chieu nay khong co mua bay",
      singer: "Trung Quan idol",
      path: "./assets/music/song3.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Tha vao mua",
      singer: "Trung Quan idol",
      path: "./assets/music/song4.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Dau mua",
      singer: "Trung Quan idol",
      path: "./assets/music/song5.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Trot yeu",
      singer: "Trung Quan idol",
      path: "./assets/music/song6.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Chua bao gio",
      singer: "Trung Quan idol",
      path: "./assets/music/song3.mp3",
      image: "./assets/img/song1.jpg",
    },
  ],
  render: function () {
    const htmls = this.song.map((song) => {
      return `
      <div class="song">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
        </div>
        <div class="option">
        <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
    `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.song[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    // xu ly cd animate
    const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
    ],{
        duration: 10000, //10s
        iteration: Infinity 
    })
    cdThumbAnimate.pause();

    // xu ly phong to thu nho cd
    document.onscroll = function () {
      const scrollTop = window.scrollY;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // xu ly click play
    btnPlay.onclick = function(){
        if(_this.isPlaying){
            audio.pause();
        } else {
            audio.play();
        }
    }
    // khi play song 
    audio.onplay = function() {
        _this.isPlaying = true;
        player.classList.add('playing');
        cdThumbAnimate.play();
    }
    // khi pause song
    audio.onpause = function(){
        _this.isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();

    }
    // khi tien do bai hat thay doi
    audio.ontimeupdate = function() {
        if(audio.duration){
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercent;
        }
    }

    // xu ly khi tua 
    progress.onchange = function(e) {
        const seekTime = audio.duration / 100 * e.target.value;
        audio.currentTime = seekTime;  
    }
  },
  loadCurrentSong: function () {
    // console.log(heading, cdThumb, audio)

    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    //dinh nghia cac thuoc tinh cho object
    this.defineProperties();
    // lang nghe xu ly su kien
    this.handleEvent();
    // tai thong tin bai hat vao UI khi play app
    this.loadCurrentSong();
    //render play list
    this.render();
  },
};

app.start();
