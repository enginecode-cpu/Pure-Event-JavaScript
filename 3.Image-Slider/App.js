const carouselSilde = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// 버튼
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// 카운터
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSilde.style.transform = `translateX(${-size * counter}px)`;

// Button Listener
nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSilde.style.transition = `transform .4s ease-in-out`;
    counter += 1;
    carouselSilde.style.transform = `translateX(${-size * counter}px)`;
    
});
prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSilde.style.transition = `transform .4s ease-in-out`;
    counter -= 1;
    carouselSilde.style.transform = `translateX(${-size * counter}px)`;
});

carouselSilde.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSilde.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSilde.style.transform = `translateX(${-size * counter}px)`;
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSilde.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSilde.style.transform = `translateX(${-size * counter}px)`;
    }
})