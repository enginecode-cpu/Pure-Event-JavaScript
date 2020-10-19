const navSlide = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')
    
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
        });
        if (menuIcon.classList.contains('toggle')) {
            menuIcon.classList.remove('toggle')
        } else {
            menuIcon.classList.add('toggle');
        }
    });
}

navSlide();