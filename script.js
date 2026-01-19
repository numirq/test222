// Audio Logic
const audio = document.getElementById('bg-music');
const audioBtn = document.querySelector('.audio-btn');
const audioIcon = audioBtn.querySelector('i');
let isPlaying = false;
let autoPlayAttempted = false;

// Set volume and loop
if (audio) {
    audio.volume = 0.7;
    audio.loop = true;
}

function toggleMusic() {
    if (!audio) return;

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-music');
    } else {
        audio.play()
            .then(() => {
                isPlaying = true;
                audioIcon.classList.remove('fa-music');
                audioIcon.classList.add('fa-pause');
            })
            .catch((e) => {
                console.error("Audio play failed:", e);
                alert("Please click the music button again");
            });
    }

    // Add bounce animation
    audioBtn.classList.add('bounce');
    setTimeout(() => {
        audioBtn.classList.remove('bounce');
    }, 500);
}

// Auto-play attempt
function attemptAutoPlay() {
    if (!autoPlayAttempted && audio) {
        autoPlayAttempted = true;
        audio.play()
            .then(() => {
                isPlaying = true;
                audioIcon.classList.remove('fa-music');
                audioIcon.classList.add('fa-pause');
            })
            .catch(() => {
                console.log('Auto-play prevented, user needs to click music button');
                isPlaying = false;
            });
    }
}

document.addEventListener('click', attemptAutoPlay, { once: true });
audioBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering auto-play logic if clicking button directly
    toggleMusic();
});

// Button Sound Effect
function playButtonSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (error) {
        console.warn('Audio context not supported or failed:', error);
    }
}

// Add click sound to all buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn, .audio-btn') || e.target.closest('.btn') || e.target.closest('.audio-btn')) {
        playButtonSound();
    }
});

// Heart Background Logic
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    if (!heartsContainer) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 300);
}

createHearts();

// Navigation Logic
let currentPage = 0;
const pages = document.querySelectorAll('.page');

function navigateTo(pageIndex) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    if (pages[pageIndex]) {
        pages[pageIndex].classList.add('active');
        currentPage = pageIndex;
        
        // Add animations
        setTimeout(() => {
            if (pageIndex === 0) {
                const imageContainer = document.querySelector('.page1 .image-container');
                if (imageContainer) {
                    imageContainer.classList.add('bounce');
                    setTimeout(() => imageContainer.classList.remove('bounce'), 500);
                }
            } else if (pageIndex === 3) {
                const container = document.querySelector('.page4 .container');
                if (container) {
                    container.classList.add('pulse');
                    setTimeout(() => container.classList.remove('pulse'), 500);
                }
            }
        }, 50);
    }
}

// Button Animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('pulse');
        setTimeout(() => {
            btn.classList.remove('pulse');
        }, 500);
    });
});

// No Button Hover Effect
const noBtn = document.querySelector('.btn-green');
if (noBtn) {
    noBtn.addEventListener('mouseenter', () => {
        noBtn.classList.add('shake');
        setTimeout(() => {
            noBtn.classList.remove('shake');
        }, 500);
    });
}

// Initial Setup
document.body.style.backgroundImage = "url('background.jpg')";
