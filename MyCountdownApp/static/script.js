let countdownsData = [];

// Function to calculate time remaining
function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
}

// Function to display notes for a specific countdown
function displayNotes(notesContainer, index) {
    notesContainer.innerHTML = ''; // Clear existing notes
    countdownsData[index].notes.forEach(note => {
        const noteElem = document.createElement('p');
        noteElem.textContent = note;
        notesContainer.appendChild(noteElem);
    });
}

// Function to display countdowns on page 2
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
            <div class="button-row">
                <button class="add-note-btn" data-index="${index}">Add a Note</button>
                <button class="archive-btn" data-index="${index}">Archive</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </div>
        `;
        countdownsContainer.appendChild(countdownElem);

        displayNotes(countdownElem.querySelector('.notes'), index);

        // Add event listeners
        countdownElem.querySelector('.add-note-btn').addEventListener('click', () => addNoteToCountdown(index));
        countdownElem.querySelector('.archive-btn').addEventListener('click', () => archiveCountdown(index));
        countdownElem.querySelector('.delete-btn').addEventListener('click', () => deleteCountdown(index));
        countdownElem.querySelector('.edit-btn').addEventListener('click', () => editCountdown(index));
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

// Function to display a specific countdown on page 2
function displayCountdownOnPage2(index) {
    const selectedCountdown = countdownsData[index];
    showPage('page2');
    displaySingleCountdown(selectedCountdown);
}

// Function to display a single countdown on page 2
function displaySingleCountdown(countdown) {
    const countdownContainer = document.getElementById('countdowns');
    countdownContainer.innerHTML = '';

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
        <div class="button-row">
            <button class="add-note-btn">Add a Note</button>
            <button class="archive-btn">Archive</button>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>
    `;
    countdownContainer.appendChild(countdownElem);

    displayNotes(countdownElem.querySelector('.notes'), countdownsData.indexOf(countdown));

    // Add event listeners
    countdownElem.querySelector('.add-note-btn').addEventListener('click', () => addNoteToCountdown(countdownsData.indexOf(countdown)));
    countdownElem.querySelector('.archive-btn').addEventListener('click', () => archiveCountdown(countdownsData.indexOf(countdown)));
    countdownElem.querySelector('.delete-btn').addEventListener('click', () => deleteCountdown(countdownsData.indexOf(countdown)));
    countdownElem.querySelector('.edit-btn').addEventListener('click', () => editCountdown(countdownsData.indexOf(countdown)));
}

// Function to handle form submission
document.getElementById('addCountdownForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventEmoji = document.getElementById('eventEmoji').value;

    const eventDateTime = `${eventDate}T${eventTime}`;

    countdownsData.push({
        title: eventTitle,
        date: eventDateTime,
        emoji: eventEmoji,
        notes: []
    });

    saveCountdownsToLocalStorage();
    showPage('page2');
    displayCountdowns();
    document.getElementById('addCountdownForm').reset();
});

// Function to handle countdown editing
function editCountdown(index) {
    const editedCountdown = countdownsData[index];
    const confirmEdit = confirm(`Do you want to edit "${editedCountdown.title}"?`);

    if (confirmEdit) {
        const newTitle = prompt('Enter new title:', editedCountdown.title);
        const newDate = prompt('Enter new date:', editedCountdown.date.split('T')[0]);
        const newTime = prompt('Enter new time:', editedCountdown.date.split('T')[1]);

        countdownsData[index] = {
            title: newTitle || editedCountdown.title,
            date: newDate ? `${newDate}T${newTime}` : editedCountdown.date,
            emoji: editedCountdown.emoji,
            notes: editedCountdown.notes
        };

        saveCountdownsToLocalStorage();
        displayCountdowns();
        displayAllCountdowns();
    }
}

// Function to add a note to a countdown
function addNoteToCountdown(index) {
    const countdownTitle = countdownsData[index].title;
    const noteText = prompt(`Add a note to "${countdownTitle}":`);

    if (noteText) {
        countdownsData[index].notes.push(noteText);
        saveCountdownsToLocalStorage();
        displayCountdowns();
        displayAllCountdowns();
    }
}

// Function to archive a countdown
function archiveCountdown(index) {
    const confirmArchive = confirm(`Do you want to archive "${countdownsData[index].title}"?`);

    if (confirmArchive) {
        alert(`"${countdownsData[index].title}" archived.`);
        countdownsData.splice(index, 1);
        saveCountdownsToLocalStorage();
        displayCountdowns();
        displayAllCountdowns();
    }
}

// Function to delete a countdown
function deleteCountdown(index) {
    const confirmDelete = confirm(`Do you want to delete "${countdownsData[index].title}"?`);

    if (confirmDelete) {
        countdownsData.splice(index, 1);
        saveCountdownsToLocalStorage();
        displayCountdowns();
        displayAllCountdowns();
    }
}

// Function to handle back button click
document.getElementById('backButton').addEventListener('click', () => showPage('page1'));

// Function to handle view all button click on page 1
document.getElementById('viewAllButtonPage1').addEventListener('click', () => {
    showPage('page3');
    displayAllCountdowns();
});

// Function to handle view all button click on page 2
document.getElementById('viewAllButtonPage2').addEventListener('click', () => {
    showPage('page3');
    displayAllCountdowns();
});

// Function to handle back to page 2 button click from page 3
document.getElementById('backToPage2').addEventListener('click', () => showPage('page2'));

// Function to handle back to page 1 button click from page 3
document.getElementById('backToPage1').addEventListener('click', () => showPage('page1'));

// Function to switch between pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Initialize Twemoji for emoji support
document.addEventListener('DOMContentLoaded', () => twemoji.parse(document.body));

// Load countdowns from localStorage on page load
function loadCountdownsFromLocalStorage() {
    const storedCountdowns = localStorage.getItem('countdownsData');
    if (storedCountdowns) {
        countdownsData = JSON.parse(storedCountdowns);
    }
}

// Save countdowns to localStorage
function saveCountdownsToLocalStorage() {
    localStorage.setItem('countdownsData', JSON.stringify(countdownsData));
}

// Call function to load countdowns from localStorage on page load
loadCountdownsFromLocalStorage();

// Call this to start updating countdowns
function updateCountdowns() {
    displayCountdowns();
    setTimeout(updateCountdowns, 1000); // Update every second
}

// Initial display (page 1)
showPage('page1');

// Start updating countdowns every second
updateCountdowns();

function validateForm() {
    var eventName = document.forms["countdownForm"]["event_name"].value;
    var eventDate = document.forms["countdownForm"]["event_date"].value;
    
    if (eventName === "" || eventDate === "") {
        alert("Please fill out all fields.");
        return false;
    }
    return true;  // Form submission proceeds if all fields are filled out
}