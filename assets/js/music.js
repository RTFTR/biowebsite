const songs = ["default.mp3"];
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

audio.volume = 1.0;
audio.crossOrigin = "anonymous"; // CORS fix

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

function startMusicAfterInteraction() {
    if (isPlaying) return; // avoid multiple triggers
    isPlaying = true;

    audio.play().catch(error => {
        console.error("Music playback error:", error);
    });
}

function loadSong(index) {
    audio.src = `./assets/music/${shuffledSongs[index]}`;
    if (isPlaying) {
        audio.play().catch(error => console.error("Play error:", error));
    }
}

function nextSong() {
    currentSongIndex = Math.floor(Math.random() * shuffledSongs.length);
    loadSong(currentSongIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    shuffledSongs = shuffleArray([...songs]);
    initMusicPlayer();

    // Listen for any user interaction to start music
    const userInteractionEvents = ['click', 'keydown', 'touchstart'];
    const startMusicHandler = () => {
        startMusicAfterInteraction();
        // remove listeners after first interaction
        userInteractionEvents.forEach(event => document.removeEventListener(event, startMusicHandler));
    };
    userInteractionEvents.forEach(event => document.addEventListener(event, startMusicHandler));
});

window.MusicPlayer = {
    start: startMusicAfterInteraction,
    getAudio: () => audio
};
