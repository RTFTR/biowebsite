document.addEventListener('DOMContentLoaded', function() {
    const videoBackground = document.getElementById('myVideo');
    const blurredBox = document.getElementById('blurred-box');
    const musicControls = document.getElementById('music-controls');

    // Create centered "Click anywhere!" overlay
    const clickOverlay = document.createElement('div');
    clickOverlay.id = 'click-to-start';
    clickOverlay.textContent = 'Click anywhere!';
    document.body.appendChild(clickOverlay);

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
        // Remove listeners and overlay
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('click', onClick);
        clickOverlay.remove();

        // Show UI
        blurredBox.style.display = 'block';
        musicControls.style.display = 'flex';
        document.body.classList.add('video-normal');

        // Play video
        videoBackground.play().catch(e => console.log('Video play error:', e));

        // Play music safely
        if (window.MusicPlayer) {
            const audio = window.MusicPlayer.getAudio();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                audio.muted = true; // iOS requires muted first
                audio.play()
                    .then(() => { audio.muted = false; })
                    .catch(err => console.error('Audio play error (mobile):', err));
            } else {
                audio.play().catch(err => console.error('Audio play error (desktop):', err));
            }
        }
    }

    function onKeyDown(e) { startExperience(e); }
    function onClick(e) { startExperience(e); }

    // Listen for first user interaction
    document.addEventListener('keydown', onKeyDown, { once: true });
    document.addEventListener('click', onClick, { once: true });
});
