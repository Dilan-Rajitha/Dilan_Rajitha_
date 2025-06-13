document.addEventListener('DOMContentLoaded', function() {
    // Menu button functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if(!menuOpen) {
                menuBtn.classList.add('open');
                navLinks.classList.add('active');
                document.body.classList.add('menu-open');
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuOpen = false;
            }
        });
    }

    // Close menu when clicking a link
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuOpen = false;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-btn')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuOpen = false;
        }
    });
});