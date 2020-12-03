function smoothScroll(target, duration) {
    let $target = document.querySelector(target);
    let targetProsition = $target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetProsition - startPosition;
    let startTime = null;

    const ease = (t, a, b, c) => {
        t /= c / 2;
        if (t < 1) return b / 2 * (t**2) + a;
        t -= 1;
        return -b / 2 * (t * (t - 2) - 1) + a;
    }

    const animation = (currentTime) => {
        if (startTime === null) {
            startTime = currentTime;
        }
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);

    }

    requestAnimationFrame(animation);
}

let section1 = document.querySelector('.section1');
let section2 = document.querySelector('.section2');

section1.addEventListener('click', () => {
    smoothScroll('.section2', 1500);
})
section2.addEventListener('click', () => {
    smoothScroll('.section1', 1500);
})