const selectAll = (e) => document.querySelectorAll(e);

const slides = selectAll('.slide-content');
function initParallax() {
  slides.forEach((slide, i) => {
    console.log(`=== Слайд ${i} ===`);
    console.log('Сам слайд:', slide);
    console.log('HTML слайда:', slide.innerHTML);
    let imageWrappers = slide.querySelectorAll('._container');
    console.log(imageWrappers);

    // Проверяем, есть ли элементы
    if (imageWrappers.length === 0) {
      console.log('Найдено ._container:', imageWrappers);
      console.log('Количество:', imageWrappers.length);
      console.warn(`Нет элементов .container в слайде ${i}`);
      return;
    }

    console.log(`Найдено ${imageWrappers.length} элементов в слайде ${i}`);
    gsap.fromTo(
      imageWrappers,
      {
        y: '-20vh',
      },
      {
        y: '10vh',
        scrollTrigger: {
          trigger: slide,
          scrub: true,
          start: 'top bottom', // position of trigger meets the scroller position
          snap: {
            snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
            duration: 1,
            ease: 'power4.inOut',
          },
        },
        ease: 'none',
      }
    );
  });
}
