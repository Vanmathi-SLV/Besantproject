function toggleMenu(section) {
    const popupMenu = document.getElementById('popupMenu');
    const menuContent = document.getElementById('menuContent');

    
    menuContent.innerHTML = '';

   
    let items = [];
    switch (section) {
        case 'home':
            items = ['Overview', 'Latest Updates', 'Customer Reviews'];
            break;
        case 'services':
            items = ['Gas Delivery', 'Cylinder Refill', 'Scheduled Delivery'];
            break;
        case 'about':
            items = ['Our Story', 'Our Mission', 'Meet the Team'];
            break;
        case 'contact':
            items = ['Contact Us', 'Support', 'FAQs'];
            break;
    }

    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        menuContent.appendChild(li);
    });

   
    popupMenu.style.display = popupMenu.style.display === 'none' ? 'block' : 'none';
}



document.addEventListener("DOMContentLoaded", () => {
    const userSection = document.createElement("div");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        userSection.innerHTML = `
            <p>Welcome, ${loggedInUser.name} (${loggedInUser.username})</p>
            <button id="logout-button">Logout</button>
        `;
    } else {
        userSection.innerHTML = `<p>You are not logged in.!
        <a href="./login.html" style="font-size:bold; text-decoration:none; color:white;">Login here</a></p>`;
    }

    document.querySelector("header").appendChild(userSection);

    if (loggedInUser) {
        document.getElementById("logout-button").addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            location.reload();
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        document.querySelector(".order-btn1").addEventListener("click", (e) => {
            e.preventDefault();
            alert("You must be logged in to submit a review.");
        });
    }
});

