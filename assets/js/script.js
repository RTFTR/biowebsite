document.addEventListener('DOMContentLoaded', function() {
    const videoBackground = document.getElementById('myVideo');
    const blurredBox = document.getElementById('blurred-box');
    const musicControls = document.getElementById('music-controls');

    // Create overlay text
    const clickOverlay = document.createElement('div');
    clickOverlay.id = 'click-to-start';
    clickOverlay.textContent = 'Click anywhere!';
    document.body.appendChild(clickOverlay);

    // Center overlay with CSS
    clickOverlay.style.position = 'fixed';
    clickOverlay.style.top = '50%';
    clickOverlay.style.left = '50%';
    clickOverlay.style.transform = 'translate(-50%, -50%)';
    clickOverlay.style.fontFamily = "'Inter', sans-serif";
    clickOverlay.style.fontSize = '32px';
    clickOverlay.style.color = 'white';
    clickOverlay.style.textShadow = '0 0 10px black';
    clickOverlay.style.zIndex = '9999';
    clickOverlay.style.cursor = 'pointer';
    clickOverlay.style.textAlign = 'center';

    function startExperience(event) {
        // Only trigger once
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('click', onClick);
        clickOverlay.remove();

        // Show video and UI
        blurredBox.style.display = 'block';
        musicControls.style.display = 'flex';
        document.body.classList.add('video-normal');

        // Play video
        videoBackground.play().catch(e => console.log('Video play error:', e));

        // Play music safely on mobile
        if (window.MusicPlayer) {
            const audio = window.MusicPlayer.getAudio();
            audio.muted = true; // start muted for iOS
            audio.play()
                .then(() => {
                    audio.muted = false; // unmute immediately
                })
                .catch(err => console.error('Audio play error:', err));
        }
    }

    function onKeyDown(e) { startExperience(e); }
    function onClick(e) { startExperience(e); }

    // Listen for first user interaction
    document.addEventListener('keydown', onKeyDown, { once: true });
    document.addEventListener('click', onClick, { once: true });
});
