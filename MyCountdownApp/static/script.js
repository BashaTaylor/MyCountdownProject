// Function to calculate time remaining
function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

// Function to start countdown timer
function startCountdownTimer(endTime, element) {
    function updateCountdown() {
        const time = getTimeRemaining(endTime);

        if (!element) return;

        if (time.total < 0) {
            element.querySelector('.days').textContent = 'EXPIRED';
            element.querySelector('.hours').textContent = '';
            element.querySelector('.minutes').textContent = '';
            element.querySelector('.seconds').textContent = '';
        } else {
            element.querySelector('.days').textContent = time.days;
            element.querySelector('.hours').textContent = time.hours;
            element.querySelector('.minutes').textContent = time.minutes;
            element.querySelector('.seconds').textContent = time.seconds;
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

// Initial function to load countdowns and start timers
document.addEventListener('DOMContentLoaded', function () {
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    console.log('Found countdown timers:', countdownTimers.length);

    countdownTimers.forEach((countdownTimer, index) => {
        const eventDate = countdownTimer.getAttribute('data-event-date');
        const eventTime = countdownTimer.getAttribute('data-event-time');
        console.log(`Countdown ${index}: Date - ${eventDate}, Time - ${eventTime}`);

        if (eventDate && eventTime) {
            const endTime = new Date(`${eventDate}T${eventTime}`);
            console.log(`Parsed end time: ${endTime}`);

            if (!isNaN(endTime.getTime())) {
                startCountdownTimer(endTime, countdownTimer);
            } else {
                console.error(`Invalid date or time: ${eventDate} ${eventTime}`);
            }
        } else {
            console.error(`Missing or invalid data attributes for countdown timer element`);
        }
    });

});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to change theme
function changeTheme() {
    const themeSelect = document.getElementById('theme-select');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const selectedTheme = themeSelect.value;

    if (selectedTheme === 'dark') {
        themeStylesheet.href = '/static/css/dark-theme.css';
    } else if (selectedTheme === 'medium') {
        themeStylesheet.href = '/static/css/medium-theme.css';

    } else if (selectedTheme === 'darkest') {
        themeStylesheet.href = '/static/css/darkest-theme.css';

    } else {
        themeStylesheet.href = '/static/css/light-theme.css';
    }
    
    // Save the selected theme to localStorage
    localStorage.setItem('selectedTheme', selectedTheme);
}

// Load the saved theme on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.getElementById('theme-select').value = savedTheme;
        changeTheme();
    }
});
