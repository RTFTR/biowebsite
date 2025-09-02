const songs = [
    "default.mp3"
];
let currentSongIndex = 0;
let isPlaying = false;
let userInteracted = false; // 사용자 상호작용 여부 추적
const audio = new Audio();
audio.volume = 1.0;

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

let shuffledSongs = shuffleArray(songs);

// 사용자 상호작용을 감지하는 함수
function enableAudioContext() {
    if (!userInteracted) {
        userInteracted = true;
        // 오디오 컨텍스트를 활성화하기 위해 무음으로 재생 시도
        audio.muted = true;
        audio.play().then(() => {
            audio.muted = false;
            audio.pause();
            audio.currentTime = 0;
        }).catch(e => {
            console.log("Audio context activation failed:", e);
        });
    }
}

// 다양한 사용자 상호작용 이벤트 리스너 추가
function addUserInteractionListeners() {
    const events = ['click', 'touchstart', 'keydown'];
    
    events.forEach(event => {
        document.addEventListener(event, enableAudioContext, { once: true });
    });
}

function initMusicPlayer() {
    loadSong(currentSongIndex);
    audio.addEventListener('ended', nextSong);
    addUserInteractionListeners(); // 사용자 상호작용 감지 시작
}

function startMusicAfterTerminal() {
    // script.js에서 이 함수가 호출될 때는 이미 사용자가 상호작용(Enter 키 또는 클릭)했음
    userInteracted = true;
    isPlaying = true;
    
    // 짧은 지연 후 음악 재생 (비디오 재생과 겹치지 않도록)
    setTimeout(() => {
        audio.play()
            .then(() => {
                console.log("음악 재생 시작됨");
            })
            .catch(error => {
                console.error("Music playback error:", error);
                // 재생 실패 시 한 번 더 시도
                setTimeout(() => {
                    audio.play().catch(e => console.error("재시도 실패:", e));
                }, 500);
            });
    }, 200);
}

function loadSong(index) {
    audio.src = `./assets/music/${shuffledSongs[index]}`;
    
    if (isPlaying && userInteracted) {
        audio.play().catch(error => console.error("Play error:", error));
    }
}

function nextSong() {
    currentSongIndex = Math.floor(Math.random() * shuffledSongs.length);
    loadSong(currentSongIndex);
}

// 수동 음악 제어 함수들 추가
function playMusic() {
    if (!userInteracted) {
        enableAudioContext();
    }
    
    isPlaying = true;
    audio.play()
        .then(() => {
            console.log("음악 재생됨");
        })
        .catch(error => {
            console.error("재생 오류:", error);
        });
}

function pauseMusic() {
    isPlaying = false;
    audio.pause();
}

function toggleMusic() {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    shuffledSongs = shuffleArray([...songs]);
    initMusicPlayer();
});

window.MusicPlayer = {
    start: startMusicAfterTerminal,
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    getAudio: () => audio,
    isUserInteracted: () => userInteracted
};