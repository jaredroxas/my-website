// 1. Time-based Filtering: Record when the page loads
const formLoadTime = Date.now();

// Select the form and inputs
const form = document.querySelector("#contactForm");
const emailField = document.querySelector("input[name='email']");
const messageField = document.querySelector("#message");

// Define spam keywords to block
const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"];

form.addEventListener("submit", function (e) {
    // --- VALIDATION 1: Check Email Format ---
    if (!emailField.value.includes("@")) {
        alert("Please enter a valid email address.");
        e.preventDefault();
        return;
    }

    // --- SPAM FILTER 1: Time-based Filtering ---
    // If the user submits in less than 2 seconds, it's likely a bot.
    const submitTime = Date.now();
    const secondsTaken = (submitTime - formLoadTime) / 1000;
    
    if (secondsTaken < 2) {
        alert("Submission was too fast. Are you a robot?");
        e.preventDefault();
        return;
    }

    // --- SPAM FILTER 2: Keyword Detection ---
    // Check if the message contains any blocked words.
    const message = messageField.value.toLowerCase();
    const containsSpam = spamWords.some(word => message.includes(word));

    if (containsSpam) {
        alert("Your message contains blocked spam keywords.");
        e.preventDefault();
        return;
    }

    // If all checks pass, the form submits to FormSubmit normally.
});
