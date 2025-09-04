const songs = [
    "HKLS - Homewave Resonance.mp3",
    "LAKEY INSPIRED - Better Days.mp3",
    "Joo Won - Fly Me to the Moon.mp3",
    "Clair de Lune (Studio Version).mp3",
    "The War Still Rages Within .mp3",
    "092. Reunited (UNDERTALE Soundtrack) - Toby Fox.mp3"
];

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
    updateNowPlaying(shuffledSongs[index]);
}

function playSong(index) {
    currentSongIndex = (index + shuffledSongs.length) % shuffledSongs.length;
    loadSong(currentSongIndex);
    audio.play().catch(err => console.error("Error playing song:", err));
    isPlaying = true;
    updatePlayIcon();
}

function nextSong() {
    playSong(currentSongIndex + 1);
}

function prevSong() {
    playSong(currentSongIndex - 1);
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        audio.play().catch(err => console.error('Play error:', err));
        isPlaying = true;
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
}

function startMusicAfterTerminal() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play().catch(err => console.error('Music playback error:', err));
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
}

function updateNowPlaying(filename) {
    const nowPlaying = document.getElementById('now-playing');
    if (nowPlaying) {
        const title = filename.replace(/\.[^/.]+$/, ""); // strip extension
        nowPlaying.textContent = `Now Playing: ${title}`;
    }
}

// DOM setup
document.addEventListener('DOMContentLoaded', () => {
    shuffledSongs = shuffleArray([...songs]);
    initMusicPlayer();

    window.prevBtn = document.getElementById("prev-btn");
    window.playPauseBtn = document.getElementById("play-pause-btn");
    window.nextBtn = document.getElementById("next-btn");
    const volumeSlider = document.getElementById("volume-slider");

    prevBtn.addEventListener("click", prevSong);
    playPauseBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextSong);

    volumeSlider.addEventListener("input", (e) => {
        audio.volume = parseFloat(e.target.value);
    });

    updateNowPlaying(shuffledSongs[currentSongIndex]);
});

window.MusicPlayer = {
    start: startMusicAfterTerminal,
    getAudio: () => audio
};
