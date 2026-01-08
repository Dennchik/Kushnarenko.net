//* ✅ import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

//* ✅ Слайдер карточки товара
export function cardSlide(slide = '.card-slide') {
  if (slide) {
    // ⚠️ Функция для определения количества слайдов на основе количества элементов
    function getSlidesPerView() {
      const thumbContainer = document.querySelector('.card-thumb');
      if (!thumbContainer) return 4;

      const slides = thumbContainer.querySelectorAll('.swiper-slide');
      const totalSlides = slides.length;

      // ⚠️ Показываем все если их 3 или меньше, иначе показываем 4
      return totalSlides <= 3 ? totalSlides : 4;
    }

    let swiper = new Swiper('.card-thumb', {
      spaceBetween: 15,
      speed: 800,
      slidesPerView: getSlidesPerView(),
      freeMode: true,
      watchSlidesProgress: true,
      updateOnWindowResize: true,
      navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      },
    });

    new Swiper('.card-product__slide', {
      spaceBetween: 22,
      speed: 800,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      updateOnWindowResize: true,

      thumbs: {
        swiper: swiper,
      },
    });

    // ⚠️ Обновляем при изменении DOM (если слайды могут динамически добавляться)
    const observer = new MutationObserver(() => {
      swiper.params.slidesPerView = getSlidesPerView();
      swiper.update();
    });

    const thumbContainer = document.querySelector('.card-thumb');
    if (thumbContainer) {
      observer.observe(thumbContainer, { childList: true, subtree: true });
    }
  }
}

//* ✅ Основные слайдеры
export function slide(slide) {
  document.querySelectorAll(slide).forEach((root) => {
    const swiperEl = root.matches('.swiper')
      ? root
      : root.querySelector('.swiper');

    // ❗ Пропускаем, если нет контейнера или он уже инициализирован
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

    // ❗ Пропускаем, если нет обязательной структуры
    if (
      !swiperEl.querySelector('.swiper-wrapper') ||
      !swiperEl.querySelector('.swiper-slide')
    ) {
      console.warn('Swiper: структура не готова для', swiperEl);
      return;
    }

    // ❗ Ищем общий контейнер для слайдера и кнопок
    const parent = swiperEl.parentElement || root;
    const nextEl = parent.querySelector('.navigation__next') || null;
    const prevEl = parent.querySelector('.navigation__prev') || null;

    new Swiper(swiperEl, {
      slidesPerView: 5,
      speed: 800,
      grabCursor: true,
      navigation: { nextEl, prevEl },
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 5 },
        // 540: { slidesPerView: 2 },
        786: { slidesPerView: 3, spaceBetween: 10 },
        1025: { slidesPerView: 4, spaceBetween: 20 },
        1289: { slidesPerView: 5, spaceBetween: 30 },
      },
    });
  });
}

//* ✅ Слайдер новостей на Главной странице
export function slidNews(slide) {
  if (slide) {
    new Swiper(slide, {
      effect: 'slide',
      lazy: true,

      navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      },
      slidesPerView: 3,
      speed: 800,

      loop: true,
      grabCursor: true,
      centeredSlides: false,
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 10 },
        690: { spaceBetween: 20 },
        960: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
  }
}

//* ✅ Слайдер каталога товаров
export function catalogSlide(slide) {
  if (slide) {
    new Swiper(slide, {
      slidesPerView: 1,
      lazy: true,
      speed: 800,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      centeredSlides: false,
      pagination: {
        el: '.slide-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      // navigation: {
      //   nextEl: '.slide__next',
      //   prevEl: '.slide__prev',
      // },
    });
  }
}

//* ✅ Слайдер новостей
export function newsSlide(slide) {
  if (slide) {
    new Swiper(slide, {
      slidesPerView: 1,
      lazy: true,
      speed: 800,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      centeredSlides: false,
      // pagination: {
      //   el: '.slide-pagination',
      //   clickable: true,
      //   renderBullet: function (index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + '</span>';
      //   },
      // },
    });
  }
}

// export function mainSlide(slide) {
//   if (slide) {
//     new Swiper(Slide, {
//       effect: 'slide',
//       lazy: true,
//       autoplay: {
//         delay: 1500,
//         disableOnInteraction: true,
//       },
//       speed: 800,
//       spaceBetween: 5,
//       loop: true,
//       grabCursor: true,
//       centeredSlides: false,
//       pagination: {
//         el: '.slide__pagination',
//         clickable: true,
//       },
//       navigation: {
//         nextEl: '.slide__next',
//         prevEl: '.slide__prev',
//       },
//       breakpoints: {
//         0: { slidesPerView: 3 },
//         1140: { slidesPerView: 3 },
//         1440: { slidesPerView: 3 },
//       },

//       on: {
//         init: function () {
//           updateSlideCounter(this);
//         },
//         slideChange: function () {
//           updateSlideCounter(this);
//         },
//       },
//     });
//   }

//   function updateSlideCounter(swiperInstance) {
//     const realIndex = swiperInstance.realIndex + 1;
//     const totalSlides = swiperInstance.slides.length;
//     const counterElement = document.querySelector(
//       '.slide__count .slide__value'
//     );

//     if (counterElement) {
//       counterElement.textContent = `${realIndex} / ${totalSlides}`;
//     } else {
//       console.warn('Элемент .slider-bottom__count .value не найден');
//     }
//   }
// }
