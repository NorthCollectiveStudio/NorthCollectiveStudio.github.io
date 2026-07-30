/* --- VCR / VHS INTERACTIVE SIMULATION SCRIPT --- */

document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('playBtn');
    const rewBtn = document.getElementById('rewBtn');
    const glitchBtn = document.getElementById('glitchBtn');
    const screenContent = document.getElementById('screenContent');
    const timecode = document.querySelector('.timecode');
    const vcrMode = document.querySelector('.vcr-mode');

    let seconds = 433; // 01:07:13
    
    // Update timecode timer
    setInterval(() => {
        seconds++;
        let hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        let mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        let secs = String(seconds % 60).padStart(2, '0');
        if (timecode) {
            timecode.textContent = `${hrs}:${mins}:${secs}`;
        }
    }, 1000);

    // Play button action
    playBtn.addEventListener('click', () => {
        vcrMode.textContent = "▶ PLAY";
        screenContent.style.filter = "none";
        screenContent.innerHTML = `
            <div style="text-align: center; color: #fff; padding: 20px;">
                <p style="color: #00ffcc; font-size: 1.2rem; margin-bottom: 10px; font-weight: bold;">[ АРХИВНАЯ ЗАПИСЬ ЗАГРУЖЕНА ]</p>
                <p style="font-size: 0.95rem; color: #b0a8c2;">Арт-проект «ЦОКОЛЬ» • 4-5 августа 2026</p>
                <p style="font-size: 0.85rem; margin-top: 15px; color: var(--accent-magenta);">North Collective Studio Production</p>
            </div>
        `;
    });

    // Rewind button action
    rewBtn.addEventListener('click', () => {
        vcrMode.textContent = "⏪ REW 32x";
        screenContent.style.filter = "blur(2px) contrast(200%)";
        screenContent.innerHTML = `
            <div style="color: #fff; font-family: monospace; font-size: 1.5rem; letter-spacing: 5px;">
                &lt;&lt; REWINDING TAPE &lt;&lt;
            </div>
        `;
        setTimeout(() => {
            screenContent.style.filter = "none";
            vcrMode.textContent = "▶ PLAY";
            screenContent.innerHTML = `
                <div class="play-prompt">▶ НАЖМИТЕ ДЛЯ ВОСПРОИЗВЕДЕНИЯ АРХИВА</div>
            `;
        }, 1500);
    });

    // Glitch effect button
    glitchBtn.addEventListener('click', () => {
        vcrMode.textContent = "⚡ TRACKING ERROR";
        screenContent.style.filter = "invert(1) hue-rotate(90deg) contrast(300%)";
        
        // Add random glitch lines
        for(let i=0; i<5; i++) {
            let glitchLine = document.createElement('div');
            glitchLine.style.position = 'absolute';
            glitchLine.style.top = Math.random() * 100 + '%';
            glitchLine.style.left = '0';
            glitchLine.style.width = '100%';
            glitchLine.style.height = (Math.random() * 10 + 2) + 'px';
            glitchLine.style.background = Math.random() > 0.5 ? '#fff' : '#00ffcc';
            glitchLine.style.opacity = '0.8';
            screenContent.appendChild(glitchLine);
            setTimeout(() => glitchLine.remove(), 400);
        }

        setTimeout(() => {
            screenContent.style.filter = "none";
            vcrMode.textContent = "▶ PLAY";
        }, 600);
    });
});
