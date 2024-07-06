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
document.addEventListener('DOMContentLoaded', function() {
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    console.log('Found countdown timers:', countdownTimers.length);

    countdownTimers.forEach((countdownTimer, index) => {
        const eventDateElement = countdownTimer.dataset.eventDate;
        const eventTimeElement = countdownTimer.dataset.eventTime;

        if (eventDateElement && eventTimeElement) {
            const endTime = new Date(`${eventDateElement}T${eventTimeElement}`);

            if (!isNaN(endTime.getTime())) {
                startCountdownTimer(endTime, countdownTimer);
            } else {
                console.error(`Invalid date or time: ${eventDateElement} ${eventTimeElement}`);
            }
        } else {
            console.error(`Missing or invalid data attributes for countdown timer element`);
        }
    });
});



// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}