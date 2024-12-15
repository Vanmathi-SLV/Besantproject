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
