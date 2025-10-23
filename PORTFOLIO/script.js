// ========== Smooth Scroll for Navbar Links ==========
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ========== Contact Form Submission Alert ==========
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents actual form submission
  alert("Thank you for reaching out, Ananya will get back to you soon!");
  form.reset(); // clears the form fields after submitting
});
