document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    // Populate fields with user data
    if (loggedInUser) {
        document.getElementById("username").value = loggedInUser.username;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("password").value = loggedInUser.password;
    }

    // Handle form submission
    document.getElementById("deactivate-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const userId = loggedInUser.id; // Assuming 'id' is part of the user data
        const reason = document.getElementById("reason").value;

        if (confirm("Are you sure you want to deactivate your account?")) {
            try {
                const response = await fetch(`https://retoolapi.dev/Baqk59/data/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Your account has been successfully deactivated.");
                    localStorage.removeItem("loggedInUser"); // Remove user data from local storage
                    window.location.href = "./login.html"; // Redirect to login page
                } else {
                    alert("Failed to deactivate account. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while deactivating your account.");
            }
        }
    });
});
