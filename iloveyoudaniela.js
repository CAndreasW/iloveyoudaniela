// Array of messages
const messages = [
    "I love the way you smile when you're happy.",
    "You're the most amazing person I've ever met.",
    "You make even the most boring days exciting.",
    "Every day with you is a new adventure.",
    "I admire your creativity and kindness.",
    "I feel so lucky to have you in my life.",
    "You are my favorite person in the world.",
    "I appreciate everything you do for me.",
    "You inspire me every single day.",
    "I'm so grateful for our time together."
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
