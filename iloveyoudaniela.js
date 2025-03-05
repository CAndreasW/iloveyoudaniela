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
