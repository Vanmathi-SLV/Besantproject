document.getElementById("registration-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://retoolapi.dev/Baqk59/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                username,
                password
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert("Registration successful!");
            // Save username to sessionStorage and redirect to login page
            sessionStorage.setItem("redirectedFromRegistration", "true");
            sessionStorage.setItem("username", username);
            window.location.href = "./login.html";
        } else {
            alert(`Registration failed: ${result.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register. Please try again.");
    }
});



const isUsernameTaken = async (username) => {
    const response = await fetch("https://retoolapi.dev/Baqk59/data");
    const users = await response.json();
    return users.some(user => user.username === username);
};

document.getElementById("registration-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;

    if (await isUsernameTaken(username)) {
        alert("Username is already taken. Please choose another one.");
        return;
    }

    // Proceed with registration if username is unique
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://retoolapi.dev/Baqk59/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, username, password })
        });

        if (response.ok) {
            alert("Registration successful!");
            sessionStorage.setItem("redirectedFromRegistration", "true");
            sessionStorage.setItem("username", username);
            window.location.href = "./login.html";
        } else {
            alert("Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to register. Please try again.");
    }
});

