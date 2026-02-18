let now = new Date();
let hour = now.getHours();

function getGreeting() {
    if (hour >= 5 && hour < 12) {
        return "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon!";
    } else if (hour >= 17 && hour < 21) {
        return "Good Evening!";
    } else {
        return "Good Night!";
    }
}

window.onload = function () {
    alert(getGreeting() + " Welcome to Jared's Portfolio!");

    updateClock();
    setInterval(updateClock, 1000);
};

function updateClock() {
    let current = new Date();
    let h = current.getHours().toString().padStart(2, "0");
    let m = current.getMinutes().toString().padStart(2, "0");
    let s = current.getSeconds().toString().padStart(2, "0");
    let clockEl = document.getElementById("live-clock");
    if (clockEl) {
        clockEl.textContent = h + ":" + m + ":" + s;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let inputs = contactForm.querySelectorAll("input, textarea");
            let formData = {};

            inputs.forEach(function (input) {
                let label = input.placeholder || input.name || "field";
                formData[label] = input.value;
            });

            console.log("--- Contact Form Submitted ---");
            console.log("Name:", formData["Your Name"]);
            console.log("Email:", formData["Your Email Address"]);
            console.log("Subject:", formData["Subject"]);
            console.log("Message:", formData["How can I help you?"]);
            console.log("Full data:", formData);
        });
    }
});
