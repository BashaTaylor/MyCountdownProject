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
function startCountdownTimer(endTime, elementId) {
    function updateCountdown() {
        const time = getTimeRemaining(endTime);
        const countdownElement = document.getElementById(elementId);

        if (!countdownElement) return;

        if (time.total < 0) {
            countdownElement.innerHTML = "EXPIRED";
        } else {
            countdownElement.innerHTML = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

// Initial function to load countdowns and start timers
function loadCountdowns() {
    const countdowns = document.querySelectorAll('.countdown-item');
    countdowns.forEach((countdown, index) => {
        const eventDate = countdown.querySelector('.event-date').textContent;
        const eventTime = countdown.querySelector('.event-time').textContent;
        const endTime = new Date(`${eventDate}T${eventTime}`);
        if (!isNaN(endTime.getTime())) {
            startCountdownTimer(endTime, `countdown-timer-${index}`);
        } else {
            console.error(`Invalid date or time: ${eventDate} ${eventTime}`);
        }
    });
}


// JavaScript to integrate Emoji Button
window.addEventListener('DOMContentLoaded', function () {
    const picker = newEmojiButton();
    const button = document.querySelector('#emoji-button');
    const input = document.querySelector('#id_event_emoji');

    picker.on('emoji', emoji => {
        button.textContent = emoji;
        input.value = emoji;
    });

    button.addEventListener('click', () => {
        picker.togglePicker(button);
    });
});



function displayCountdowns() {
    const countdownsContainer = document.getElementById('countdowns');
    countdownsContainer.innerHTML = '';

    countdownsData.forEach((countdown, index) => {
        const endTime = new Date(countdown.date);
        const time = getTimeRemaining(endTime);

        const formattedDate = endTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const countdownElem = document.createElement('div');
        countdownElem.classList.add('countdown-item');
        countdownElem.innerHTML = `
            <h3>${countdown.title}</h3>
            <div class="emoji">${countdown.emoji}</div>
            <p>${formattedDate}</p>
            <div class="notes"></div>
            <div class="countdown">
                <span class="days">${time.days}d</span>
                <span class="hours">${time.hours}h</span>
                <span class="minutes">${time.minutes}m</span>
                <span class="seconds">${time.seconds}s</span>
            </div>
            
        `;
        countdownsContainer.appendChild(countdownElem);

        displayNotes(countdownElem.querySelector('.notes'), index);

        
    });
}

// Function to display all countdowns on page 3
function displayAllCountdowns() {
    const allCountdownsContainer = document.getElementById('allCountdowns');
    allCountdownsContainer.innerHTML = '';

    countdownsData.forEach((countdown, index) => {
        const endTime = new Date(countdown.date);
        const time = getTimeRemaining(endTime);

        const formattedDate = endTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const countdownElem = document.createElement('div');
        countdownElem.classList.add('countdown-item3');
        countdownElem.innerHTML = `
            <div class="countdown-icon">
                <div class="icon-circle">
                    <span class="emoji">${countdown.emoji}</span>
                </div>
            </div>
            <div class="countdown-details">
                <h3 class="countdown-title">${countdown.title}</h3>
                <p class="countdown-note">${countdown.notes.length > 0 ? countdown.notes[0] : 'No notes'}</p>
                <p class="countdown-date-time">${formattedDate}</p>
            </div>
            <div class="countdown-days-left">
                <p class="days-number">${time.days}</p>
                <p class="days-text">days left</p>
            </div>
        `;
        allCountdownsContainer.appendChild(countdownElem);

        // Add click event listener to display this countdown on page 2
        countdownElem.addEventListener('click', () => displayCountdownOnPage2(index));
    });
}

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
        function startCountdownTimer(endTime, elementId) {
            function updateCountdown() {
                const time = getTimeRemaining(endTime);
                const countdownElement = document.getElementById(elementId);

                if (!countdownElement) return;

                if (time.total < 0) {
                    countdownElement.innerHTML = "EXPIRED";
                } else {
                    countdownElement.innerHTML = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
                    setTimeout(updateCountdown, 1000);
                }
            }

            updateCountdown();
        }


// Initial function to load countdowns and start timers
document.addEventListener('DOMContentLoaded', function() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((countdownItem, index) => {
        const eventDateElement = countdownItem.querySelector('.event-date');
        const eventTimeElement = countdownItem.querySelector('.event-time');

        if (eventDateElement && eventTimeElement) {
            const eventDate = eventDateElement.textContent.split('Date: ')[1];
            const eventTime = eventTimeElement.textContent.split('Time: ')[1];
            const endTime = new Date(`${eventDate}T${eventTime}`);

            if (!isNaN(endTime.getTime())) {
                startCountdownTimer(endTime, `countdown-timer-${index}`);
            } else {
                console.error(`Invalid date or time: ${eventDate} ${eventTime}`);
            }
        } else {
            console.error('Missing event date or time elements');
        }
    });
});
