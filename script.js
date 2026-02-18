const formLoadTime = Date.now();
let submitTimes = [];

const spamWords = ["free money", "buy now", "click here", "subscribe", "promo", "make money", "guaranteed", "winner", "lottery", "casino"];

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = msg ? "inline" : "none"; }
}

function setFeedback(msg, color) {
    const el = document.getElementById("formFeedback");
    if (el) { el.textContent = msg; el.style.color = color || "#e74c3c"; }
}

function highlightField(id, isValid) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = isValid ? "#2ecc71" : "#e74c3c";
}

function isRateLimited() {
    const now = Date.now();
    submitTimes = submitTimes.filter(t => now - t < 60000);
    if (submitTimes.length >= 3) return true;
    submitTimes.push(now);
    return false;
}

function isTooFast() {
    return (Date.now() - formLoadTime) / 1000 < 2;
}

function containsSpam(message) {
    const lower = message.toLowerCase();
    return spamWords.some(word => lower.includes(word));
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
    return name.trim().length >= 2 && name.trim().length <= 100;
}

function validateMessage(msg) {
    return msg.trim().length >= 10 && msg.trim().length <= 2000;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameField = document.getElementById("nameField");
    const emailField = document.getElementById("emailField");
    const messageField = document.getElementById("messageField");

    if (nameField) {
        nameField.addEventListener("input", function () {
            const valid = validateName(this.value);
            highlightField("nameField", valid);
            showError("nameError", valid ? "" : "Name must be 2–100 characters.");
        });
    }

    if (emailField) {
        emailField.addEventListener("input", function () {
            const valid = validateEmail(this.value);
            highlightField("emailField", valid);
            showError("emailError", valid ? "" : "Please enter a valid email address.");
        });
    }

    if (messageField) {
        messageField.addEventListener("input", function () {
            const valid = validateMessage(this.value);
            highlightField("messageField", valid);
            showError("messageError", valid ? "" : "Message must be 10–2000 characters.");
        });
    }

    form.addEventListener("submit", function (e) {
        let valid = true;

        showError("nameError", "");
        showError("emailError", "");
        showError("messageError", "");
        setFeedback("");

        const name = nameField ? nameField.value : "";
        const email = emailField ? emailField.value : "";
        const message = messageField ? messageField.value : "";

        if (!validateName(name)) {
            showError("nameError", "Name must be 2–100 characters.");
            highlightField("nameField", false);
            valid = false;
        } else {
            highlightField("nameField", true);
        }

        if (!validateEmail(email)) {
            showError("emailError", "Enter a valid email address (must contain @).");
            highlightField("emailField", false);
            valid = false;
        } else {
            highlightField("emailField", true);
        }

        if (!validateMessage(message)) {
            showError("messageError", "Message must be between 10 and 2000 characters.");
            highlightField("messageField", false);
            valid = false;
        } else {
            highlightField("messageField", true);
        }

        if (!valid) {
            e.preventDefault();
            setFeedback("Please fix the errors above before submitting.", "#e74c3c");
            return;
        }

        if (isTooFast()) {
            e.preventDefault();
            setFeedback("Submission was too fast. Please take a moment and try again.", "#e74c3c");
            return;
        }

        if (isRateLimited()) {
            e.preventDefault();
            setFeedback("Too many submissions. Please wait a minute before trying again.", "#e74c3c");
            return;
        }

        if (containsSpam(message)) {
            e.preventDefault();
            setFeedback("Your message contains blocked spam keywords. Please revise your message.", "#e74c3c");
            highlightField("messageField", false);
            return;
        }

        setFeedback("Sending your message...", "#27ae60");
    });
});
