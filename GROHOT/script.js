document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressContainer = document.getElementById('progressContainer');
    const progressFilled = document.getElementById('progressFilled');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    
    const vhsVideo = document.getElementById('vhsVideo');
    const vhsPlayer = document.getElementById('vhsPlayer');
    const vcrMode = document.getElementById('vcrMode');

    if (!vhsVideo) {
        console.error("Видеоэлемент не найден!");
        return;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    vhsVideo.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(vhsVideo.duration);
    });

    function togglePlay() {
        if (vhsVideo.paused) {
            vhsVideo.play();
            playPauseBtn.textContent = "⏸";
            if (vcrMode) vcrMode.textContent = "▶ PLAY";
        } else {
            vhsVideo.pause();
            playPauseBtn.textContent = "▶";
            if (vcrMode) vcrMode.textContent = "⏸ PAUSE";
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);
    vhsVideo.addEventListener('click', togglePlay);

    vhsVideo.addEventListener('timeupdate', () => {
        const percentage = (vhsVideo.currentTime / vhsVideo.duration) * 100;
        progressFilled.style.width = `${percentage}%`;
        currentTimeEl.textContent = formatTime(vhsVideo.currentTime);
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        vhsVideo.currentTime = clickPosition * vhsVideo.duration;
    });

    volumeSlider.addEventListener('input', (e) => {
        vhsVideo.volume = e.target.value;
        vhsVideo.muted = e.target.value === '0';
        muteBtn.textContent = vhsVideo.muted || vhsVideo.volume === 0 ? '🔇' : '🔊';
    });

    muteBtn.addEventListener('click', () => {
        if (vhsVideo.muted) {
            vhsVideo.muted = false;
            volumeSlider.value = vhsVideo.volume;
            muteBtn.textContent = '🔊';
        } else {
            vhsVideo.muted = true;
            volumeSlider.value = 0;
            muteBtn.textContent = '🔇';
        }
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            if (vhsPlayer.requestFullscreen) {
                vhsPlayer.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            vhsVideo.currentTime = 0;
            vhsVideo.play();
            playPauseBtn.textContent = "⏸";
            if (vcrMode) vcrMode.textContent = "↺ REWIND";
            
            setTimeout(() => {
                if (vcrMode && !vhsVideo.paused) vcrMode.textContent = "▶ PLAY";
            }, 800);
        });
    }
});