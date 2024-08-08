document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("play-pause");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const seekBar = document.getElementById("seek-bar");
    const volumeBar = document.getElementById("volume-bar");
    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");
    const titleEl = document.getElementById("title");
    const artistEl = document.getElementById("artist");
    const coverImg = document.getElementById("cover-img");

    let isPlaying = false;

    const tracks = [
        {
            title: "Pawankhind",
            artist: "Chhtrapati Shivaji Maharaj Songs",
            src:"Shwasat Raja Dhyasat Raja.mp3"
        },
        {
            title: "Pawankhind",
            artist: "Chhtrapati Shivaji Maharaj Songs",
            src: "Yugat Mandali.mp3"
        }
    ];
    let currentTrackIndex = 0;

    const loadTrack = (index) => {
        const track = tracks[index];
        audio.src = track.src;
        titleEl.textContent = track.title;
        artistEl.textContent = track.artist;
        audio.load();
    };

    loadTrack(currentTrackIndex);

    playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = "&#9654;";
            coverImg.classList.remove("rotating");
        } else {
            audio.play();
            playPauseBtn.innerHTML = "&#10074;&#10074;";
            coverImg.classList.add("rotating");
        }
        isPlaying = !isPlaying;
    });

    prevBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseBtn.innerHTML = "&#10074;&#10074;";
        coverImg.classList.add("rotating");
        isPlaying = true;
    });

    nextBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseBtn.innerHTML = "&#10074;&#10074;";
        coverImg.classList.add("rotating");
        isPlaying = true;
    });

    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            seekBar.value = (audio.currentTime / audio.duration) * 100;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    seekBar.addEventListener("input", () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    volumeBar.addEventListener("input", () => {
        audio.volume = volumeBar.value / 100;
    });

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return ${minutes}:${seconds};
    };

    audio.addEventListener("ended", () => {
        nextBtn.click();
    });
});