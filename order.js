const API_BASE_URL = "https://retoolapi.dev/nuWlPr/data"; // Replace with your actual API base URL

// Function to generate OTP (for demonstration purposes, you can replace this with actual OTP generation logic)
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    document.getElementById('otp').value = otp;
}

// Function to handle the "Buy Now" button click and place the order
function buyNow() {
    const username = document.getElementById('username').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (!username || !address || !phone || !otp) {
        alert("Please fill out all the fields and generate OTP.");
        return;
    }

    // Create the order object
    const orderData = {
        username: username,
        address: address,
        phone: phone,
        otp: otp,
        status: "Ordered" // Initial status is "Ordered"
    };

    // Send the order data to the API
    fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to place the order");
        }
        return response.json();
    })
    .then(order => {
        alert("Order placed successfully!");
        // Optionally, display the status tracker
        showStatusTracker(order.id);
    })
    .catch(error => {
        console.error("Error placing order:", error);
        alert("Failed to place the order.");
    });
}

// Function to display the delivery status tracker
function showStatusTracker(orderId) {
    document.getElementById('status-tracker').classList.remove('hidden');
    
    // Update the status steps (you can customize this based on order status)
    const statusSteps = ["Ordered", "Packed", "Shipped", "Delivered"];
    const currentStatus = "Ordered"; // This should come from the actual order status from the API (use orderId to fetch the actual status)

    // Update each step based on the order's status
    statusSteps.forEach((status, index) => {
        const stepElement = document.getElementById(`step${index + 1}`);
        const bulletElement = stepElement.querySelector('.bullet');
        const labelElement = stepElement.querySelector('.status-label');

        if (status === currentStatus) {
            bulletElement.classList.add('active');
            labelElement.classList.add('active');
        }
    });
}
