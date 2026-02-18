const form = document.getElementById("contactForm");
const emailField = document.getElementById("emailField");
const messageField = document.getElementById("message");

form.addEventListener("submit", function (e) {
    if (!emailField.value.includes("@")) {
        alert("Enter a valid email");
        e.preventDefault();
        return;
    }

    if (isRateLimited()) {
        alert("Too many submissions. Please wait a minute.");
        e.preventDefault();
        return;
    }

    if (containsSpam(messageField.value)) {
        alert("Your message contains blocked spam keywords.");
        e.preventDefault();
        return;
    }
});

let submitTimes = []; 
function isRateLimited() {
    const now = Date.now();
    submitTimes = submitTimes.filter(time => now - time < 60000); // Filter last 60s
    if (submitTimes.length >= 3) {
        return true;
    }
    submitTimes.push(now);
    return false;
}


const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"];
function containsSpam(message) {
    const lowerMessage = message.toLowerCase();
    return spamWords.some(word => lowerMessage.includes(word));
}