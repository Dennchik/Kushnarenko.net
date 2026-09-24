//* ✅ import Swiper bundle with all modules installed
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiperModules = [Navigation, Pagination];

//* ✅ Слайдер раздел-партнеры на Главной странице
export function partnerSlide(slide) {
  if (slide) {
    new Swiper(slide, {
      modules: swiperModules,
      effect: 'slide',
      lazy: true,
      spaceBetween: 20,

      slidesPerView: 5,
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
      // loop: true,
      grabCursor: true,
      centeredSlides: false,
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 10 },
        490: { slidesPerView: 3, spaceBetween: 15 },
        690: { slidesPerView: 4, spaceBetween: 15 },
        960: { slidesPerView: 5 },
      },
    });
  }
}

//* ✅ Слайдер Ролики на Главной странице
export function promoSlide(slide) {
  if (!slide) return;

  // Функция для управления видимостью пагинации
  const updatePaginationVisibility = (swiper) => {
    const paginationEl = swiper.pagination?.el;
    if (!paginationEl) return;

    paginationEl.style.display =
      swiper.params.slidesPerView === 2 ? 'none' : '';
  };

  let promoSlides = new Swiper(slide, {
    modules: swiperModules,
    effect: 'slide',
    // lazy: true,
    spaceBetween: 20,
    speed: 800,
    noSwipingClass: 'video-no-swiping',

    pagination: {
      el: '.promo-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      960: {
        slidesPerView: 2,
      },
    },

    on: {
      breakpoint: function () {
        updatePaginationVisibility(this);
      },
      init: function () {
        updatePaginationVisibility(this);
      },
    },
  });
}

//* ✅ Слайдер с Отзывами на Главной странице
export function reviewsSlide(slide) {
  if (!slide) return;

  let promoSlides = new Swiper(slide, {
    modules: swiperModules,
    effect: 'slide',
    // lazy: true,
    spaceBetween: 5,
    speed: 800,
    noSwipingClass: 'video-no-swiping',

    pagination: {
      el: '.reviews-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.reviews-btn-next',
      prevEl: '.reviews-btn-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 2,
      },
      690: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 4,
      },
    },
  });
}
