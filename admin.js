// Check if the user is logged in as admin
const adminLoggedIn = localStorage.getItem("adminLoggedIn");

// no user login,then go to login page
if (!adminLoggedIn) {
    window.location.href = "./login.html";  // go to login page
}

// Fetch all user details
function fetchUsers() {
    fetch("https://retoolapi.dev/Baqk59/data")
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById("user-list");
            users.forEach(user => {
                const userItem = document.createElement("div");
                userItem.classList.add("user-item");
                userItem.innerHTML = `
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <button onclick="viewOrderHistory('${user.username}')">View Order History</button>
                `;
                userList.appendChild(userItem);
            });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
}

function viewOrderHistory(username) {
    fetch(`https://retoolapi.dev/ge9oTT/ordergas?username=${username}`) // Replace with correct URL for orders
        .then(response => response.json())
        .then(orders => {
            const orderHistoryTableBody = document.getElementById("order-history");
            orderHistoryTableBody.innerHTML = ''; // Clear any previous content

            if (orders.length > 0) {
                orders.forEach(order => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.gasType}</td>
                        <td>1</td> <!-- Assuming quantity is always 1 -->
                        <td>${order.status || 'Pending'}</td> <!-- Default status to Pending if undefined -->
                    `;
                    orderHistoryTableBody.appendChild(row);
                });
            } else {
                const noDataRow = document.createElement("tr");
                noDataRow.innerHTML = `
                    <td colspan="4" class="text-center">No orders found for this user.</td>
                `;
                orderHistoryTableBody.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error("Error fetching order history:", error);
        });
}

// Initialize and fetch user details when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        // Fetch and display order history for the logged-in user
        viewOrderHistory(loggedInUser.username);
    } else {
        console.error("No logged-in user found.");
    }
});
