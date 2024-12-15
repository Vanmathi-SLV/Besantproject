// Store the username in session storage when the form is submitted
document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission for demonstration
    const username = document.getElementById("username").value;

    // Save the username in session storage
    sessionStorage.setItem("username", username);

    // Redirect to the home page or any other page
    window.location.href = "./home.html"; // Change this to your desired URL
});

// Pre-fill username in the login page (if needed)
document.getElementById("login-link").addEventListener("click", function (e) {
    sessionStorage.setItem("redirectedFromRegistration", "true");
});
