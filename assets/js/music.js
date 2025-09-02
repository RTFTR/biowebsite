const songs = ["default.mp3"];
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
audio.volume = 1.0;
audio.crossOrigin = "anonymous"; // in case of CORS issues

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
    audio.addEventListener('ended', nextSong);
}

function loadSong(index) {
    audio.src = `./assets/music/${shuffledSongs[index]}`;
    if (isPlaying) {
        audio.play().catch(err => console.error("Play error:", err));
    }
}

function nextSong() {
    currentSongIndex = Math.floor(Math.random() * shuffledSongs.length);
    loadSong(currentSongIndex);
}

function startMusicAfterTerminal() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play().catch(err => {
            console.error("Music playback error:", err);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    shuffledSongs = shuffleArray([...songs]);
    initMusicPlayer();
});

window.MusicPlayer = {
    start: startMusicAfterTerminal,
    getAudio: () => audio
};
