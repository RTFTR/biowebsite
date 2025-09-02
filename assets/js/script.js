document.addEventListener('DOMContentLoaded', function() {
    const videoBackground = document.getElementById('myVideo');
    const blurredBox = document.getElementById('blurred-box');
    const musicControls = document.getElementById('music-controls');

    // Create overlay text
    const clickOverlay = document.createElement('div');
    clickOverlay.id = 'click-to-start';
    clickOverlay.textContent = 'To see my bio, Click anywhere!';
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

    blurredBox.style.display = 'block';
    musicControls.style.display = 'flex';
    document.body.classList.add('video-normal');

    videoBackground.play().catch(e => console.log('Video play error:', e));

      if (window.MusicPlayer) {
        const audio = window.MusicPlayer.getAudio();
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            audio.muted = true;
            audio.play().then(() => {
                audio.muted = false;
            }).catch(err => console.error('Audio play error:', err));
        } else {
            // Desktop: just play normally
            audio.play().catch(err => console.error('Audio play error:', err));
        }
    }
}


    function onKeyDown(e) { startExperience(e); }
    function onClick(e) { startExperience(e); }

    // Listen for first user interaction
    document.addEventListener('keydown', onKeyDown, { once: true });
    document.addEventListener('click', onClick, { once: true });
});
