// iloveyoudaniela.js
/* needs to be done
-add more messages of the day
-password
*/

/*  minor additions
-mobile layout, its honestly not bad as is right now though
*/

/*  major additions
-remove things from database button with are you certain prompt
-send images in notes
-save videos in timeline and notes

-locked until certain date things, or write a message to future us
-daily compliment generator, todays compliment
-songs playing or even a playlist
-theme change
*/

/*  bugs
-when adding multiple files it doesnt fit, add scrollbar prob
-the distances seem a bit off for the timeline
-when adding new timeline events, things get messy, however upon reload it becomse correct
-adding a new event bugs the calendar until reload
-calendar event input dates dont fit
*/

// Special dates
const specialDate1 = new Date(2018, 8, 4, 18, 0); // 4 Sep 2018, 18:00 (Met)
const specialDate2 = new Date(2020, 2, 14); // 14 March 2020 (Got Together)

// Function to calculate time difference
function calculateTimeSince(startDate, includeTime = false) {
    const now = new Date();
    
    // Get total difference in milliseconds
    const diffMilliseconds = now - startDate;
    
    // Convert to meaningful units
    const totalDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth();
    const days = now.getDate() - startDate.getDate();
    
    // Adjust negative values
    let adjustedMonths = months;
    let adjustedYears = years;
    let adjustedDays = days;

    if (adjustedDays < 0) {
        adjustedMonths -= 1;
        adjustedDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (adjustedMonths < 0) {
        adjustedYears -= 1;
        adjustedMonths += 12;
    }

    let result = `${adjustedYears} years, ${adjustedMonths} months, ${adjustedDays} days (${totalDays} days total)`;

    return result;
}

// Display values in HTML
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timeSinceMet").textContent = `Time since we met: ${calculateTimeSince(specialDate1, true)}`;
    document.getElementById("timeSinceTogether").textContent = `Time since we got together: ${calculateTimeSince(specialDate2)}`;
});


// Array of messages
const messages = [
    // Romantic
    "I feel so lucky to have you today, just like every day.",
    "You make my world brighter just by being in it.",
    "Every day I love you more than the last.",
    "Your kindness and warmth make my life so much better.",
    "I can't believe I get to call you mine.",
    
    "You are the most adorable human, and this is a scientific fact.",
    "If loving you was a full-time job, I'd never need a vacation.",
    "If there was a national holiday for being cute, you’d be the mascot.",
    "You are my 5-star limited-time event character.",
    "I would romance you in every playthrough of my life.",

    "You are the slayest girl in the gal-axy."
];

// Function to get a consistent random number based on the date
function getDailyIndex() {
    const date = new Date();
    const seed = date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate(); // Unique number per day
    return seed % messages.length; // Keeps index within array bounds
}

// Display the message
document.addEventListener("DOMContentLoaded", () => {
    const messageElement = document.getElementById("message");
    const index = getDailyIndex();
    messageElement.textContent = messages[index];
});

document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settingsButton");
    const settingsPanel = document.getElementById("settingsPanel");
    const addButton = document.getElementById("addButton");
    const addPanel = document.getElementById("addPanel");

    /*const addNewGameCheckbox = document.getElementById("addNewGameToggle");
    const addNewGameContainer = document.getElementById("addNewGameContainer");
    const addNewDinnerCheckbox = document.getElementById("addNewDinnerToggle");
    const addNewDinnerContainer = document.getElementById("addNewDinnerContainer");
    const addNewRestaurantCheckbox = document.getElementById("addNewRestaurantToggle");
    const addNewRestaurantContainer = document.getElementById("addNewRestaurantContainer");
    const addNewEventCheckbox = document.getElementById("addNewEventToggle");
    const addNewEventContainer = document.getElementById("addNewEventContainer");
    const addNewTimelineEventCheckbox = document.getElementById("addNewTimelineEventToggle");
    const addNewTimelineEventContainer = document.getElementById("addNewTimelineEventContainer");*/

    // Toggle settings panel when button is clicked
    settingsButton.addEventListener("click", function () {
        if (settingsPanel.style.display === "none" || settingsPanel.style.display === "") {
            settingsPanel.style.display = "block";
            addPanel.style.display = "none";
        } else {
            settingsPanel.style.display = "none";
        }
    });

    // Toggle settings panel when button is clicked
    addButton.addEventListener("click", function () {
        if (addPanel.style.display === "none" || addPanel.style.display === "") {
            addPanel.style.display = "block";
            settingsPanel.style.display = "none";
        } else {
            addPanel.style.display = "none";
            /*addNewGameCheckbox.checked = false;
            addNewDinnerCheckbox.checked = false;
            addNewRestaurantCheckbox.checked = false;
            addNewEventCheckbox.checked = false;
            addNewTimelineEventCheckbox.checked = false;

            addNewGameContainer.style.display = "none";
            addNewDinnerContainer.style.display = "none";
            addNewRestaurantContainer.style.display = "none";
            addNewEventContainer.style.display = "none";
            addNewTimelineEventContainer.style.display = "none";*/
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const nextEventCheckbox = document.getElementById("nextEventToggle");
    const nextEventContainer = document.getElementById("nextEventContainer");
    const nextEventDetails = document.getElementById("nextEventDetails");

    function getNextUpcomingEvent() {
        const now = new Date(); // Get the current time
        // Do NOT modify specialEvents directly!
        //console.log("dbEvents", dbEvents);
        const upcomingEventStarts = dbEvents
            .map(event => {
                const parsedStart = new Date(event.start);
                return { ...event, parsedStart }; // Parse start time into Date object
            })
            .filter(event => event.parsedStart > now) // Only consider future events
            .sort((a, b) => a.parsedStart - b.parsedStart); // Sort by earliest start time
        
        // Log the filtered and sorted events to help debug
        //console.log("Upcoming events after filtering and sorting:", upcomingEventStarts);
    
        if (upcomingEventStarts.length === 0) {
            return null; // No upcoming events
        }
        
        // Get the next event's start and end time
        const nextEvent = upcomingEventStarts[0];
    
        // Log the next event to check its values
        //console.log("Next event:", nextEvent);
    
        return {
            title: nextEvent.title,
            start: nextEvent.parsedStart,  // Start time of the event
            end: new Date(nextEvent.end),  // End time of the event¨
            allDay: nextEvent.allDay
        };
    }

    function updateNextEventDisplay() {
        const nextEvent = getNextUpcomingEvent();
        //console.log(nextEvent);

        if (nextEvent) {
            let startDate, endDate;

            if (nextEvent.allDay) {
                // If it's an all-day event, show just the start date
                startDate = nextEvent.start.toLocaleDateString();
                nextEventDetails.innerHTML = `<strong>${nextEvent.title}</strong><br/>${startDate}<br/>All-Day`;
                
            } else {
                // If it's a timed event, show start and end time
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',hour12: false};
                startDate = nextEvent.start.toLocaleString(undefined, options);
                endDate = nextEvent.end.toLocaleString(undefined, options);
                nextEventDetails.innerHTML = `<strong>${nextEvent.title}</strong><br/>Starts: ${startDate}<br/>Ends: ${endDate}`;
            }

        } else {
            nextEventDetails.textContent = "No upcoming events!";
        }
    }

    nextEventCheckbox.addEventListener("change", function () {
        if (nextEventCheckbox.checked) {
            nextEventContainer.style.display = "block";
            updateNextEventDisplay();
        } else {
            nextEventContainer.style.display = "none";
        }
    });

    nextEventContainer.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const gamesCheckbox = document.getElementById("gamesToggle");
    const gamesContainer = document.getElementById("gamesContainer");
    const dinnersCheckbox = document.getElementById("dinnersToggle");
    const dinnersContainer = document.getElementById("dinnersContainer");
    const restaurantsCheckbox = document.getElementById("restaurantsToggle");
    const restaurantsContainer = document.getElementById("restaurantsContainer");
    const notesCheckbox = document.getElementById("notesToggle");
    const notesContainer = document.getElementById("savedNotesContainer");
    const notes = document.getElementById("notes");
    const timelineCheckbox = document.getElementById("timelineToggle");
    const timelineContainer = document.getElementById("timelineContainer");
    
    // Toggle games list display when checkbox is checked or unchecked
    gamesCheckbox.addEventListener("change", function () {
        if (gamesCheckbox.checked) {
            gamesContainer.style.display = "block"; // Show the games list
        } else {
            gamesContainer.style.display = "none"; // Hide the games list
        }
    });
    dinnersCheckbox.addEventListener("change", function () {
        if (dinnersCheckbox.checked) {
            dinnersContainer.style.display = "block"; // Show the games list
        } else {
            dinnersContainer.style.display = "none"; // Hide the games list
        }
    });
    restaurantsCheckbox.addEventListener("change", function () {
        if (restaurantsCheckbox.checked) {
            restaurantsContainer.style.display = "block"; // Show the games list
        } else {
            restaurantsContainer.style.display = "none"; // Hide the games list
        }
    });
    notesCheckbox.addEventListener("change", function () {
        if (notesCheckbox.checked) {
            notesContainer.style.display = "block"; // Show notes
            notes.scrollTop = notes.scrollHeight;
        } else {
            notesContainer.style.display = "none";
        }
    });
    
    timelineCheckbox.addEventListener("change", function () {
        if (timelineCheckbox.checked) {
            timelineContainer.style.display = "block"; // Show the games list
        } else {
            timelineContainer.style.display = "none"; // Hide the games list
        }
    });


    // Initially hide the games list when the page loads
    gamesContainer.style.display = "none";
    dinnersContainer.style.display = "none";
    restaurantsContainer.style.display = "none";
    notesContainer.style.display = "none";
    timelineContainer.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const addNewGameCheckbox = document.getElementById("addNewGameToggle");
    const addNewGameContainer = document.getElementById("addNewGameContainer");
    const addNewDinnerCheckbox = document.getElementById("addNewDinnerToggle");
    const addNewDinnerContainer = document.getElementById("addNewDinnerContainer");
    const addNewRestaurantCheckbox = document.getElementById("addNewRestaurantToggle");
    const addNewRestaurantContainer = document.getElementById("addNewRestaurantContainer");
    const addNewEventCheckbox = document.getElementById("addNewEventToggle");
    const addNewEventContainer = document.getElementById("addNewEventContainer");
    const addNewTimelineEventCheckbox = document.getElementById("addNewTimelineEventToggle");
    const addNewTimelineEventContainer = document.getElementById("addNewTimelineEventContainer");

    // Toggle games list display when checkbox is checked or unchecked
    addNewGameCheckbox.addEventListener("change", function () {
        if (addNewGameCheckbox.checked) {
            addNewGameContainer.style.display = "block"; // Show the games list

            addNewDinnerCheckbox.checked = false;
            addNewRestaurantCheckbox.checked = false;
            addNewEventCheckbox.checked = false;
            addNewTimelineEventCheckbox.checked = false;

            addNewDinnerContainer.style.display = "none";
            addNewRestaurantContainer.style.display = "none";
            addNewEventContainer.style.display = "none";
            addNewTimelineEventContainer.style.display = "none";
        } else {
            addNewGameContainer.style.display = "none"; // Hide the games list
        }
    });
    addNewDinnerCheckbox.addEventListener("change", function () {
        if (addNewDinnerCheckbox.checked) {
            addNewDinnerContainer.style.display = "block"; // Show the games list

            addNewGameCheckbox.checked = false;
            addNewRestaurantCheckbox.checked = false;
            addNewEventCheckbox.checked = false;
            addNewTimelineEventCheckbox.checked = false;

            addNewGameContainer.style.display = "none";
            addNewRestaurantContainer.style.display = "none";
            addNewEventContainer.style.display = "none";
            addNewTimelineEventContainer.style.display = "none";

        } else {
            addNewDinnerContainer.style.display = "none"; // Hide the games list
        }
    });
    addNewRestaurantCheckbox.addEventListener("change", function () {
        if (addNewRestaurantCheckbox.checked) {
            addNewRestaurantContainer.style.display = "block"; // Show the games list

            addNewGameCheckbox.checked = false;
            addNewDinnerCheckbox.checked = false;
            addNewEventCheckbox.checked = false;
            addNewTimelineEventCheckbox.checked = false;

            addNewGameContainer.style.display = "none";
            addNewDinnerContainer.style.display = "none";
            addNewEventContainer.style.display = "none";
            addNewTimelineEventContainer.style.display = "none";
        } else {
            addNewRestaurantContainer.style.display = "none"; // Hide the games list
        }
    });
    addNewEventCheckbox.addEventListener("change", function () {
        if (addNewEventCheckbox.checked) {
            addNewEventContainer.style.display = "block"; // Show the games list

            addNewGameCheckbox.checked = false;
            addNewDinnerCheckbox.checked = false;
            addNewRestaurantCheckbox.checked = false;
            addNewTimelineEventCheckbox.checked = false;

            addNewGameContainer.style.display = "none";
            addNewDinnerContainer.style.display = "none";
            addNewRestaurantContainer.style.display = "none";
            addNewTimelineEventContainer.style.display = "none";
        } else {
            addNewEventContainer.style.display = "none"; // Hide the games list
        }
    });
    addNewTimelineEventCheckbox.addEventListener("change", function () {
        if (addNewTimelineEventCheckbox.checked) {
            addNewTimelineEventContainer.style.display = "block"; // Show the games list

            addNewGameCheckbox.checked = false;
            addNewDinnerCheckbox.checked = false;
            addNewRestaurantCheckbox.checked = false;
            addNewEventCheckbox.checked = false;

            addNewGameContainer.style.display = "none";
            addNewDinnerContainer.style.display = "none";
            addNewRestaurantContainer.style.display = "none";
            addNewEventContainer.style.display = "none";
        } else {
            addNewTimelineEventContainer.style.display = "none"; // Hide the games list
        }
    });


    // Initially hide the games list when the page loads
    addNewGameContainer.style.display = "none";
    addNewDinnerContainer.style.display = "none";
    addNewRestaurantContainer.style.display = "none";
    addNewEventContainer.style.display = "none";
});

// Handle the image upload and add another input for the next image
function handleImageUpload(event) {
    const fileInput = event.target;

    // Check if the current file input is used
    if (fileInput.files && fileInput.files.length > 0) {
        // Dynamically create a new file input
        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.accept = 'image/*';
        newFileInput.classList.add('timelineImageInput'); // Optionally add a class for styling
        newFileInput.setAttribute('onchange', 'handleImageUpload(event)'); // Same function for handling file change

        // Insert the new file input just before the save button
        const saveButton = document.getElementById('saveTimelineEvent');
        const addPanel = document.getElementById('addNewTimelineEventContainer');
        
        // Insert the new file input before the save button
        addPanel.insertBefore(newFileInput, saveButton);
    }
}

// Function to convert image file to base64
function convertImageToBase64(imageFile, callback) {
    const reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result); // Get the base64 string after the file is read
    };
    reader.readAsDataURL(imageFile); // Start reading the file as a data URL (base64)
}

function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return `${day}th`; // Special case for 11th, 12th, 13th
    }
    switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}

function attachImageClickListeners(imageContainer) {
    let images = [];
    let currentIndex = 0;

    // ✅ Ensure only ONE image viewer exists
    let imageViewer = document.querySelector(".image-viewer");
    if (!imageViewer) {
        imageViewer = document.createElement("div");
        imageViewer.classList.add("image-viewer");
        imageViewer.innerHTML = `
            <button class="nav-button left-button">&larr;</button>
            <img class="fullscreen-image" />
            <button class="nav-button right-button">&rarr;</button>
        `;
        document.body.appendChild(imageViewer);
    }

    const fullscreenImage = imageViewer.querySelector(".fullscreen-image");
    const leftButton = imageViewer.querySelector(".left-button");
    const rightButton = imageViewer.querySelector(".right-button");

    function updateImage(index) {
        if (images.length === 0) return;
        currentIndex = (index + images.length) % images.length; // Circular navigation
        fullscreenImage.src = images[currentIndex].src;
    }

    function openImageViewer(clickedImage) {
        // ✅ Reset `images` to ONLY include images from the clicked event
        const eventPopup = clickedImage.closest(".popup"); 
        if (!eventPopup) return;

        images = Array.from(eventPopup.querySelectorAll(".eventImage")); // Get only images from this event
        currentIndex = images.indexOf(clickedImage); // Get the clicked image's index
        updateImage(currentIndex);
        imageViewer.style.display = "flex";

        // ✅ Update button event listeners **inside** `openImageViewer`
        leftButton.onclick = () => updateImage(currentIndex - 1);
        rightButton.onclick = () => updateImage(currentIndex + 1);

        // ✅ Enable keyboard navigation while the viewer is open
        document.addEventListener("keydown", handleKeyPress);
    }

    function closeImageViewer() {
        imageViewer.style.display = "none";

        // ✅ Remove keyboard event listener when the viewer is closed
        document.removeEventListener("keydown", handleKeyPress);
    }

    function handleKeyPress(event) {
        if (event.key === "ArrowLeft") {
            updateImage(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            updateImage(currentIndex + 1);
        } else if (event.key === "Escape") {
            closeImageViewer(); // Close on ESC key
        }
    }

    imageViewer.onclick = (e) => {
        if (e.target === imageViewer) closeImageViewer();
    };

    // ✅ Attach event listeners to images *once they are added*
    imageContainer.querySelectorAll(".eventImage").forEach((img) => {
        img.addEventListener("click", () => openImageViewer(img));
    });
}






