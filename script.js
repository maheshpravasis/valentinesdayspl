let currentStep = 1;
let noClickCount = 0;
"No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "I'm gonna cry...",
    "Plsss? :(",
    "Don't do this to me 💔",
    "You are breaking my heart 💔"

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${currentStep}`).classList.add('hidden');

    currentStep = step;

    document.getElementById(`step-${currentStep}`).classList.remove('hidden');
    document.getElementById(`step-${currentStep}`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const successContent = document.getElementById('success-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isMusicPlaying = false;

    // Music Control
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🎵 Play Music";
        } else {
            bgMusic.play();
            musicBtn.innerText = "⏸ Pause Music";
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Music will only play when YES button is clicked

    const moveButton = () => {
        const container = document.querySelector('.container');
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = window.innerWidth - btnRect.width - 50;
        const maxY = window.innerHeight - btnRect.height - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        // Increase Yes button size
        let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        let currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);

        // Cap the size to prevent it from breaking the layout completely
        const maxSize = 80; // Max font size in px (reduced from 150)

        if (currentSize < maxSize) {
            let newSize = currentSize * 1.1; // Reduced growth rate from 1.2
            let newPadding = currentPadding * 1.1;
            yesBtn.style.fontSize = newSize + 'px';
            yesBtn.style.padding = newPadding + 'px ' + (newPadding * 2.5) + 'px';
        }

        // Change No button text
        const phraseIndex = noClickCount < noTexts.length ? noClickCount : Math.floor(Math.random() * noTexts.length);
        const newText = noTexts[phraseIndex];

        noBtn.innerText = newText;
        noClickCount++;

        // Remove H1 update logic to keep the proposal text visible
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    yesBtn.addEventListener('click', () => {
        // Start playing music when YES is clicked
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerText = "⏸ Pause Music";
            }).catch(error => {
                console.log("Music playback failed:", error);
            });
        }

        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        successContent.classList.remove('hidden');
        successContent.classList.add('active');

        var duration = 5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInOut(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        createFloatingHearts();
    });

    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
