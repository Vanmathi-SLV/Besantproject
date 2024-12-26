document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://retoolapi.dev/Baqk59/data"; // Your API URL
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert("You need to log in first.");
        window.location.href = "./login.html"; // Redirect to login page if not logged in
        return;
    }

    const userId = loggedInUser.id; // Get user ID from localStorage

    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/${userId}`);
            if (response.ok) {
                const user = await response.json();
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone;
                document.getElementById('username').value = user.username;
                document.getElementById('password').value = user.password;
            } else {
                alert("Error fetching user details.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to update user details
    const updateUserDetails = async () => {
        try {
            const updatedUser = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            };

            const response = await fetch(`${apiUrl}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const updatedData = await response.json();
                alert("Profile updated successfully.");

                // Update localStorage with new data
                localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
            } else {
                alert("Error updating profile.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Cancel changes
    const cancelChanges = () => {
        fetchUserDetails(); // Reload the original user data
    };

    // Event Listeners
    document.getElementById('update-btn').addEventListener('click', updateUserDetails);
    document.getElementById('cancel-btn').addEventListener('click', cancelChanges);

    // Load user details on page load
    fetchUserDetails();
});
