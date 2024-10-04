let currentStep = 1;
let statusTimers = [];

function generateOTP() {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    alert('Your OTP is: ' + otp);

    // Enable OTP input field and allow the user to enter OTP
    const otpInput = document.getElementById('otp');
    otpInput.disabled = false;
    otpInput.value = otp;
}

function buyNow() {
    const username = document.getElementById('username').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (username === '' || address === '' || phone === '' || otp === '') {
        alert('Please fill in all fields and generate OTP.');
        return;
    }

    // Hide form and show status tracker
    document.querySelector('.order-section').classList.add('hidden');
    document.getElementById('status-tracker').classList.remove('hidden');

    // Set the first status to "Ordered"
    updateStatus('Ordered');
    
    // Change status after delays
    statusTimers.push(setTimeout(() => updateStatus('Packed'), 2 * 60 * 1000)); // After 2 minutes
    statusTimers.push(setTimeout(() => updateStatus('Shipped'), 5 * 60 * 1000)); // After 5 minutes
    statusTimers.push(setTimeout(() => updateStatus('Delivered'), 4 * 60 * 60 * 1000)); // After 4 hours
}

function updateStatus(status) {
    switch (status) {
        case 'Ordered':
            moveToStep(1);
            break;
        case 'Packed':
            moveToStep(2);
            break;
        case 'Shipped':
            moveToStep(3);
            break;
        case 'Delivered':
            moveToStep(4);
            break;
    }
}

function moveToStep(step) {
    if (currentStep <= step) {
        // Mark all steps up to the current one as completed
        for (let i = 1; i <= step; i++) {
            document.getElementById(`step${i}`).classList.add('completed');
        }
        currentStep = step;
    }
}
