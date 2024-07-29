document.addEventListener('DOMContentLoaded', function() {
    // Select all countdown timer elements
    const countdownTimers = document.querySelectorAll('.countdown-timer');

    // Iterate through each countdown timer element
    countdownTimers.forEach(timer => {
        // Get event date and time from data attributes
        const eventDate = timer.getAttribute('data-event-date');
        const eventTime = timer.getAttribute('data-event-time');
        
        // Validate event date and time
        if (!isValidDateTime(eventDate, eventTime)) {
            console.error(`Invalid date or time: ${eventDate} ${eventTime}`);
            return;
        }

        // Calculate target time for the event
        const targetTime = new Date(`${eventDate}T${eventTime}`).getTime();

        // Update timer immediately
        updateTimer(timer, targetTime);

        // Update timer every second
        setInterval(() => {
            updateTimer(timer, targetTime);
        }, 1000);
    });

    // Function to update countdown timer
    function updateTimer(timer, targetTime) {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
            timer.innerHTML = '<p>Event has ended!</p>'; // Optional: Handle event end
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update the HTML elements with the calculated time
            timer.innerHTML = `
                <p>
                    <span class="days">${days}</span> days 
                    <span class="hours">${hours}</span> hours 
                    <span class="minutes">${minutes}</span> minutes 
                    <span class="seconds">${seconds}</span> seconds
                </p>`;
        }
    }

    // Function to validate date and time format
    function isValidDateTime(date, time) {
        const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        return dateTimeRegex.test(`${date}T${time}`);
    }

    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
