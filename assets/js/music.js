const songs = ["default.mp3", "default2.mp3", "default3.mp3"]; // add more songs here
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
audio.volume = 1.0;
audio.crossOrigin = "anonymous";

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

let shuffledSongs = shuffleArray(songs);

function initMusicPlayer() {
    loadSong(currentSongIndex);

    audio.addEventListener('ended', () => {
        nextSong();
        audio.play().catch(err => console.error('Play error on loop:', err));
    });
}

function loadSong(index) {
    audio.src = `./assets/music/${shuffledSongs[index]}`;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % shuffledSongs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play().catch(console.error);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + shuffledSongs.length) % shuffledSongs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play().catch(console.error);
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
    } else {
        audio.play().catch(err => console.error('Play error:', err));
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
    }
}

function startMusicAfterTerminal() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play().catch(err => console.error('Music playback error:', err));
        playPauseBtn.textContent = "⏸";
    }
}

// DOM stuff
document.addEventListener('DOMContentLoaded', () => {
    shuffledSongs = shuffleArray([...songs]);
    initMusicPlayer();

    const prevBtn = document.getElementById("prev-btn");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const volumeSlider = document.getElementById("volume-slider");

    prevBtn.addEventListener("click", prevSong);
    playPauseBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextSong);

    volumeSlider.addEventListener("input", (e) => {
        audio.volume = e.target.value;
    });
});

window.MusicPlayer = {
    start: startMusicAfterTerminal,
    getAudio: () => audio
};
