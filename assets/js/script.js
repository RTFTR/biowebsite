document.addEventListener('DOMContentLoaded', function() {
    const videoBackground = document.getElementById('myVideo');
    const blurredBox = document.getElementById('blurred-box');
    const musicControls = document.getElementById('music-controls');
    const clickText = document.getElementById('click-to-start'); // new

    function startExperience(event) {
        // Only trigger once
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('click', onClick);

        // Hide the overlay text
        clickText.style.display = 'none';

        // Start video and music
        videoBackground.play();
        blurredBox.style.display = 'block';
        musicControls.style.display = 'flex';

        if (window.MusicPlayer) {
            window.MusicPlayer.start(); // safe autoplay
        }

        document.body.classList.add('video-normal');
    }

    function onKeyDown(e) { startExperience(e); }
    function onClick(e) { startExperience(e); }

    // Listen for first user interaction
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
});
