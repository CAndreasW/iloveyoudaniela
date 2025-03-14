// firebase.js
// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyCawCr-my7hFbCpsik9kFBCBI0y2F5tKJc",
    authDomain: "iloveyoudaniela-a4a3d.firebaseapp.com",
    projectId: "iloveyoudaniela-a4a3d",
    storageBucket: "iloveyoudaniela-a4a3d.appspot.com",  // 🔹 Fixed here!
    messagingSenderId: "240043727028",
    appId: "1:240043727028:web:9c5377c66d9d5592e8dfe1",
    measurementId: "G-XWPX7T3C9F",
    databaseURL: "https://iloveyoudaniela-a4a3d-default-rtdb.europe-west1.firebasedatabase.app/"
};

let dbGames = []; // This will store the loaded games
let dbEvents = [];

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    function saveGameToDatabase() {
        const gameTitle = document.getElementById("gameTitle").value; // Get the game title
    
        if (gameTitle.trim() === "") {
            console.error("Game title cannot be empty");
            return;
        }
    
        const newGame = {
            title: gameTitle
        };
    
        db.collection("games")  // Save to "games" collection
            .add(newGame)
            .then(() => {
                //console.log("Game saved to Firebase");
                document.getElementById("gameTitle").value = ""; // Clear the input field after saving
                loadGamesFromDatabase(); // Reload the games after saving
            })
            .catch((error) => {
                console.error("Error saving game: ", error);
            });
    }
    
    // Function to load all games from the Firestore database and sort by name
    function loadGamesFromDatabase() {
        db.collection("games")  // Access the "games" collection
            .get()  // Retrieve all documents in the collection
            .then((querySnapshot) => {
                const gamesList = document.getElementById("gamesList");
                gamesList.innerHTML = ""; // Clear any existing list items before adding new ones

                // Create an array to store all the games
                let gamesArray = [];

                querySnapshot.forEach((doc) => {
                    const game = doc.data();
                    gamesArray.push(game); // Push each game into the gamesArray
                });

                // Sort the games array by title (case-insensitive)
                gamesArray.sort((a, b) => {
                    const titleA = a.title.toLowerCase(); // Convert titles to lowercase for case-insensitive comparison
                    const titleB = b.title.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });

                // Loop through the sorted array and create an li element for each game
                gamesArray.forEach((game) => {
                    const li = document.createElement("li");
                    li.textContent = game.title; // Set the game title as the text for the li element
                    gamesList.appendChild(li); // Append the li to the gamesList
                });
            })
            .catch((error) => {
                console.error("Error loading games: ", error);
            });
    }

    function saveDinnerToDatabase() {
        const dinnerTitle = document.getElementById("dinnerTitle").value; // Get the dinner title
    
        if (dinnerTitle.trim() === "") {
            console.error("Dinner title cannot be empty");
            return;
        }
    
        const newDinner = {
            title: dinnerTitle
        };
    
        db.collection("dinners")  // Save to "dinners" collection
            .add(newDinner)
            .then(() => {
                //console.log("Dinner saved to Firebase");
                document.getElementById("dinnerTitle").value = ""; // Clear the input field after saving
                loadDinnersFromDatabase(); // Reload the dinners after saving
            })
            .catch((error) => {
                console.error("Error saving dinner: ", error);
            });
    }
    
    function loadDinnersFromDatabase() {
        db.collection("dinners")  // Access the "dinners" collection
            .get()  // Retrieve all documents in the collection
            .then((querySnapshot) => {
                const dinnersList = document.getElementById("dinnersList");
                dinnersList.innerHTML = ""; // Clear any existing list items before adding new ones
    
                // Create an array to store all the dinners
                let dinnersArray = [];
    
                querySnapshot.forEach((doc) => {
                    const dinner = doc.data();
                    dinnersArray.push(dinner); // Push each dinner into the dinnersArray
                });
    
                // Sort the dinners array by title (case-insensitive)
                dinnersArray.sort((a, b) => {
                    const titleA = a.title.toLowerCase(); // Convert titles to lowercase for case-insensitive comparison
                    const titleB = b.title.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });
    
                // Loop through the sorted array and create an li element for each dinner
                dinnersArray.forEach((dinner) => {
                    const li = document.createElement("li");
                    li.textContent = dinner.title; // Set the dinner title as the text for the li element
                    dinnersList.appendChild(li); // Append the li to the dinnersList
                });
            })
            .catch((error) => {
                console.error("Error loading dinners: ", error);
            });
    }
    
    function saveRestaurantToDatabase() {
        const restaurantTitle = document.getElementById("restaurantTitle").value; // Get the restaurant title
    
        if (restaurantTitle.trim() === "") {
            console.error("Restaurant title cannot be empty");
            return;
        }
    
        const newRestaurant = {
            title: restaurantTitle
        };
    
        db.collection("restaurants")  // Save to "restaurants" collection
            .add(newRestaurant)
            .then(() => {
                //console.log("Restaurant saved to Firebase");
                document.getElementById("restaurantTitle").value = ""; // Clear the input field after saving
                loadRestaurantsFromDatabase(); // Reload the restaurants after saving
            })
            .catch((error) => {
                console.error("Error saving restaurant: ", error);
            });
    }
    
    function loadRestaurantsFromDatabase() {
        db.collection("restaurants")  // Access the "restaurants" collection
            .get()  // Retrieve all documents in the collection
            .then((querySnapshot) => {
                const restaurantsList = document.getElementById("restaurantsList");
                restaurantsList.innerHTML = ""; // Clear any existing list items before adding new ones
    
                // Create an array to store all the restaurants
                let restaurantsArray = [];
    
                querySnapshot.forEach((doc) => {
                    const restaurant = doc.data();
                    restaurantsArray.push(restaurant); // Push each restaurant into the restaurantsArray
                });
    
                // Sort the restaurants array by title (case-insensitive)
                restaurantsArray.sort((a, b) => {
                    const titleA = a.title.toLowerCase(); // Convert titles to lowercase for case-insensitive comparison
                    const titleB = b.title.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });
    
                // Loop through the sorted array and create an li element for each restaurant
                restaurantsArray.forEach((restaurant) => {
                    const li = document.createElement("li");
                    li.textContent = restaurant.title; // Set the restaurant title as the text for the li element
                    restaurantsList.appendChild(li); // Append the li to the restaurantsList
                });
            })
            .catch((error) => {
                console.error("Error loading restaurants: ", error);
            });
    }      
      
    function saveEventToDatabase() {
        const title = document.getElementById("eventTitle").value;
        const start = document.getElementById("eventStart").value;
        const end = document.getElementById("eventEnd").value;
        const isAllDay = document.getElementById("allDay").checked;
    
        if (!title.trim() || !start) {
            console.error("⚠️ Event title and start date are required!");
            return;
        }
    
        let startDate = new Date(start);
        let endDate = end ? new Date(end) : startDate;
    
        if (endDate < startDate) {
            console.warn("⚠️ End date is before start date. Adjusting end date to match start.");
            endDate = startDate;
        }
    
        const newEvent = {
            title: title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            allDay: isAllDay,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
    
        db.collection("events")
            .add(newEvent)
            .then(() => {
                console.log("✅ Event saved successfully!");
                loadEventsFromDatabase(); // 🔥 Reload all events instead of adding manually
    
                // Clear input fields after saving
                document.getElementById("eventTitle").value = "";
                document.getElementById("eventStart").value = "";
                document.getElementById("eventEnd").value = "";
                document.getElementById("allDay").checked = false;
    
            })
            .catch((error) => {
                console.error("❌ Error saving event:", error);
            });
    }
    
    function loadEventsFromDatabase() {
        //console.log("running loadevents...")
        db.collection("events")
            .orderBy("createdAt")
            .get()
            .then((querySnapshot) => {
                let newEvents = [];
    
                querySnapshot.forEach((doc) => {
                    const event = doc.data();
                    //console.log(event);
                    // ✅ Force conversion of string dates to JavaScript Date objects
                    let startDate = new Date(event.start);
                    let endDate = event.end ? new Date(event.end) : startDate;
    
                    newEvents.push({
                        id: doc.id,
                        title: event.title,
                        start: startDate,
                        end: endDate,
                        allDay: event.allDay ?? false,
                    });
                });
                dbEvents = newEvents; // 🔹 Store in dbEvents globally
                //console.log(dbEvents);
                if (calendar) {
                    calendar.removeAllEvents();
                    calendar.render(); // 🔥 Force re-render
                    setTimeout(() => {
                        calendar.addEventSource(newEvents);
                        calendar.refetchEvents();
                        //console.log("✅ Loaded fresh events into FullCalendar:", newEvents);
                        //console.log("📅 FullCalendar Events After Adding:", calendar.getEvents());
                    }, 10);
                } else {
                    //console.warn("⚠️ Calendar not initialized yet, retrying...");
                    setTimeout(loadEventsFromDatabase, 1000);
                }
            })
            .catch((error) => {
                console.error("❌ Error loading events:", error);
            });
    }

    function saveNoteToDatabase() {
        const text = document.getElementById("noteInput").value;
        const timestamp = firebase.firestore.FieldValue.serverTimestamp(); // Get the current timestamp
    
        db.collection("notes").add({
            content: text,
            timestamp: timestamp
        }).then(() => {
            //console.log("Note saved!");
            loadNotesFromDatabase();  // Reload all notes after saving a new one
        }).catch((error) => {
            console.error("Error saving note: ", error);
        });
    }
       
    function loadNotesFromDatabase() {
        const notesContainer = document.getElementById("notes");
    
        if (!notesContainer) {
            console.error("Notes container not found!");
            return;
        }
    
        db.collection("notes")
            .orderBy("timestamp")
            .get()
            .then((querySnapshot) => {
                notesContainer.innerHTML = ''; // Clear existing notes
    
                querySnapshot.forEach((doc) => {
                    const noteContent = doc.data().content;
                    const noteTimestamp = doc.data().timestamp.toDate();
    
                    const noteElement = document.createElement("div");
                    noteElement.classList.add("note");
    
                    const contentElement = document.createElement("span");
                    contentElement.classList.add("note-content");
                    contentElement.textContent = noteContent;
    
                    const timestampElement = document.createElement("span");
                    timestampElement.classList.add("note-timestamp");
                    timestampElement.textContent = `${noteTimestamp.toLocaleString()}`;
    
                    noteElement.appendChild(timestampElement);
                    noteElement.appendChild(document.createElement("br"));
                    noteElement.appendChild(contentElement);
    
                    notesContainer.appendChild(noteElement);
                });
    
                notesContainer.scrollTop = notesContainer.scrollHeight;
            })
            .catch((error) => {
                console.error("Error loading notes: ", error);
            });
    }
    
    function saveTimelineEventToDatabase() {
        const title = document.getElementById("timelineEventTitle").value;
        const date = document.getElementById("timelineEventDate").value;
        const description = document.getElementById("timelineEventDescription").value;
        const imageFiles = document.querySelectorAll('.timelineImageInput:not(:last-of-type)');
        
        // Save the event to Firestore first
        const newTimelineEvent = {
            title: title,
            date: date,
            description: description,
        };
    
        firebase.firestore().collection("timelineEvents").add(newTimelineEvent)
            .then((docRef) => {
                const eventId = docRef.id;  // Get the event ID
    
                // Now upload the images to Realtime Database and associate with the event ID
                console.log("imageFiles", imageFiles);
                if (imageFiles.length > 0) {
                    Array.from(imageFiles).forEach((input) => {
                        //console.log("input", input);
                        const imageFile = input.files[0];
                        
                        if (imageFile) {
                            console.log("Selected image file:", imageFile);
                            // Only process files that have been selected
                            convertImageToBase64(imageFile, (base64Image) => {
                                // Save the image in Realtime Database under the event ID
                                const imageRef = firebase.database().ref(`timelineEvents/${eventId}/images`).push();
                                imageRef.set({
                                    imageData: base64Image,  // Store the base64 image
                                    imageUrl: base64Image    // Optionally, save base64 as a URL
                                }).then(() => {
                                    //console.log("Image saved to Realtime Database");
                                });
                            });
                        } else {
                            console.log("No image selected for this input.");
                        }
                    });
                }
                loadTimelineEventsFromDatabase();
                document.getElementById("timelineEventTitle").value = "";
                document.getElementById("timelineEventDate").value = "";
                document.getElementById("timelineEventDescription").value = ""; // Clear the input field after saving
                document.querySelectorAll(".timelineImageInput").forEach((input, index) => {
                    if (index === 0) {
                        input.value = ""; // Keep the first one, but empty it
                    } else {
                        input.remove(); // Remove all additional inputs
                    }
                });
                
                //console.log("Timeline Event saved to Firestore");
            })
            .catch((error) => {
                console.error("Error saving event to Firestore: ", error);
            });
    }
    
    function loadTimelineEventsFromDatabase() {
        db.collection("timelineEvents")
            .orderBy("date")
            .get()
            .then((querySnapshot) => {
                const timeline = document.getElementById("timeline");
                timeline.innerHTML = ""; // Clear previous events
    
                let eventsArray = [];
    
                querySnapshot.forEach((doc) => {
                    const event = doc.data();
                    const eventDate = new Date(event.date);
    
                    eventsArray.push({
                        id: doc.id,
                        title: event.title,
                        description: event.description,
                        date: eventDate
                    });
                });
    
                if (eventsArray.length > 0) {
                    const firstEventDate = eventsArray[0].date;
                    const lastEventDate = eventsArray[eventsArray.length - 1].date;
                    const totalDuration = lastEventDate - firstEventDate;
    
                    eventsArray.forEach((event) => {
                        const eventElement = document.createElement("div");
                        eventElement.classList.add("timelineEvent");
    
                        const eventPosition = ((event.date - firstEventDate) / totalDuration) * 100;
                        const eventDateString = event.date.toISOString().split('T')[0];
    
                        // Event Dot
                        const dotElement = document.createElement("div");
                        dotElement.classList.add("timelineEventDot");
                        dotElement.style.left = `${eventPosition}%`;
    
                        // Popup
                        const popupElement = document.createElement("div");
                        popupElement.classList.add("popup");
                        popupElement.style.left = `${eventPosition}%`;
    
                        popupElement.innerHTML = `
                            <div class="timelineEventTitle">${event.title}</div>
                            <div class="timelineEventDescription">${event.description}</div>
                            <div class="timelineEventDate">${eventDateString}</div>
                            <div class="imageContainer"></div> <!-- Image container -->
                        `;
    
                        const imageContainer = popupElement.querySelector(".imageContainer");
    
                        // Load images from Firebase and attach listeners immediately
                        firebase.database().ref(`timelineEvents/${event.id}/images`).once("value")
                            .then((imageSnapshot) => {
                                if (imageSnapshot.exists()) {
                                    imageSnapshot.forEach((imageData) => {
                                        const imageElement = document.createElement("img");
                                        imageElement.src = imageData.val().imageUrl;
                                        imageElement.classList.add("eventImage");
    
                                        imageContainer.appendChild(imageElement);
                                    });
    
                                    // 🔥 Attach click listeners immediately after images are added
                                    attachImageClickListeners(imageContainer);
                                }
                            })
                            .catch((error) => console.error("Error loading images: ", error));
    
                        eventElement.appendChild(dotElement);
                        eventElement.appendChild(popupElement);
                        timeline.appendChild(eventElement);
                    });
                }
            })
            .catch((error) => console.error("Error loading timeline events: ", error));
    }
    
    
    

    
    
    loadGamesFromDatabase();
    loadDinnersFromDatabase();
    loadRestaurantsFromDatabase();
    loadEventsFromDatabase();
    loadNotesFromDatabase();
    loadTimelineEventsFromDatabase();

    // Attach function to the button (Make sure button exists before attaching)
    document.getElementById("saveGame").addEventListener("click", saveGameToDatabase);
    document.getElementById("saveDinner").addEventListener("click", saveDinnerToDatabase);
    document.getElementById("saveRestaurant").addEventListener("click", saveRestaurantToDatabase);
    document.getElementById("saveEvent").addEventListener("click", saveEventToDatabase);
    document.getElementById("saveButton").addEventListener("click", saveNoteToDatabase);
    document.getElementById("saveTimelineEvent").addEventListener("click", saveTimelineEventToDatabase);
});
