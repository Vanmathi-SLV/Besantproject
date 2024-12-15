
document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault(); 
    const username = document.getElementById("username").value;

    
    sessionStorage.setItem("username", username);

    
    window.location.href = "./home.html"; 
});


document.getElementById("login-link").addEventListener("click", function (e) {
    sessionStorage.setItem("redirectedFromRegistration", "true");
});
