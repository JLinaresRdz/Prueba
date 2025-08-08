

/* Carrusel */
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.event-carousel .carousel');
    if (!carousel) return;

    const slidesContainer = carousel.querySelector('.slides');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const indicators = Array.from(carousel.querySelectorAll('.indicator'));

    let current = 0;
    let interval = null;
    const total = slides.length;
    const AUTO_DELAY = 5000; // 5s

    function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((btn, i) => btn.classList.toggle('active', i === index));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

    indicators.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = Number(btn.getAttribute('data-index'));
            goTo(idx);
            resetAuto();
        });
    });

    function startAuto() {
        stopAuto();
        interval = setInterval(next, AUTO_DELAY);
    }
    function stopAuto() { if (interval) clearInterval(interval); }
    function resetAuto() { stopAuto(); startAuto(); }

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // iniciar
    goTo(0);
    startAuto();
});
