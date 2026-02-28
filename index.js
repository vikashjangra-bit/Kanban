// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Sticky Header Effect
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.style.background = "#2e1b17";
    } else {
        header.style.background = "#3e2723";
    }
});

// Order Button Functionality
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement.querySelector("h3").innerText;
        alert("You ordered: " + item + " ☕");
    });
});

// Contact Form Validation
const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields.");
        return;
    }

    alert("Thank you " + name + "! Your message has been sent.");
    form.reset();
});