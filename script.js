// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function() {
    

    const contactForm = document.getElementById("contactForm");
    
    const spamWords = ["free money", "buy now", "click here", "subscribe", "promo", "lottery"]; [cite: 74]
    let submitTimes = []; // Store timestamps of recent submissions [cite: 35]
    const formLoadTime = Date.now(); // Record when the page loaded [cite: 59]


    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            

            const emailField = contactForm.querySelector('input[type="email"]');
            const messageField = contactForm.querySelector('textarea');
            const email = emailField ? emailField.value : "";
            const message = messageField ? messageField.value.toLowerCase() : "";
            const now = Date.now();


            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
                e.preventDefault();
                return;
            }

            const hasSpam = spamWords.some(word => message.includes(word));
            if (hasSpam) {
                alert("Error: Your message contains blocked spam keywords.");
                e.preventDefault();
                return;
            }

     
            if ((now - formLoadTime) < 2000) {
                alert("Error: Submission too fast. Are you a robot?");
                e.preventDefault();
                return;
            }

  
            submitTimes = submitTimes.filter(time => now - time < 60000); [cite: 39]
            
            if (submitTimes.length >= 3) {
                alert("Error: Too many submissions. Please wait a minute.");
                e.preventDefault();
                return;
            }
            
       
            submitTimes.push(now); [cite: 45]
            
            // If all checks pass, the form will submit naturally to FormSubmit
        });
    } else {
        console.error("Form with id 'contactForm' not found!");
    }
});
