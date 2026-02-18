const contactForm = document.getElementById("contactForm");
const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"]; // [cite: 74]
let submitTimes = []; 

contactForm.addEventListener("submit", function (e) {
    const message = contactForm.querySelector("textarea").value.toLowerCase();
    const email = contactForm.querySelector('input[type="email"]').value;
    const now = Date.now();


    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        e.preventDefault();
        return;
    }

 
    const hasSpam = spamWords.some(word => message.includes(word));
    if (hasSpam) {
        alert("Your message contains blocked spam keywords.");
        e.preventDefault();
        return;
    }

   
    submitTimes = submitTimes.filter(time => now - time < 60000); // [cite: 39]
    if (submitTimes.length >= 3) {
        alert("Too many submissions. Please wait a minute.");
        e.preventDefault();
        return;
    }
    submitTimes.push(now);
});
