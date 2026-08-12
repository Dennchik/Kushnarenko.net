//* ✅ import Swiper bundle with all modules installed
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiperModules = [Navigation, Pagination];

//* ✅ Слайдер новостей на Главной странице
export function partnerSlide(slide) {
  if (slide) {
    new Swiper(slide, {
      modules: swiperModules,
      effect: 'slide',
      lazy: true,
      spaceBetween: 20,
      navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      },
      slidesPerView: 5,
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
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
  if (slide) {
    new Swiper(slide, {
      modules: swiperModules,
      effect: 'slide',
      lazy: true,
      spaceBetween: 20,
      slidesPerView: 2,
      speed: 800,

      noSwiping: true,
      noSwipingClass: 'video-no-swiping',

      // on: {
      //   click(swiper, event) {
      //     const playBtn = event.target.closest('.video-play-btn');

      //     if (!playBtn) return;

      //     const slide = playBtn.closest('.swiper-slide');
      //     const video = slide?.querySelector('.video-js');

      //     if (!video) return;

      //     video
      //       .play()
      //       .then(() => {
      //         const cover = slide.querySelector('.video-cover');

      //         playBtn.classList.add('hidden');
      //         cover?.classList.add('hidden');
      //       })
      //       .catch((error) => {
      //         console.error('Ошибка воспроизведения:', error);
      //       });
      //   },

      //   touchEnd(swiper, event) {
      //     const target = event.target;

      //     if (!target.closest('.video-js')) return;

      //     const video = target.closest('.video-js');

      //     if (!video) return;

      //     if (!video.paused) {
      //       video.pause();
      //     }
      //   },
      // },

      // navigation: {
      //   nextEl: '.btn-next',
      //   prevEl: '.btn-prev',
      // },
      // pagination: {
      //   el: '.swiper-pagination',
      //   dynamicBullets: true,
      // },
      // loop: true,
      // grabCursor: true,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },

        960: { slidesPerView: 2 },
      },
    });
  }
}

// export function promoSlide(slide) {
//   if (slide) {
//     new Swiper(slide, {
//       modules: swiperModules,
//       effect: 'slide',
//       lazy: true,
//       spaceBetween: 20,
//       slidesPerView: 2,
//       speed: 800,

//       // Отключаем свайп при клике
//       preventClicks: false,
//       preventClicksPropagation: false,

//       // Если используете тач-устройства, это не даст слайдеру блокировать touch-события кнопки
//       touchStartPreventDefault: false,

//       on: {
//         slideChange: function (swiper) {
//           // Ваш код остановки видео при перелистывании
//           swiper.slides.forEach((slide) => {
//             const video = slide.querySelector('video');
//             if (video) video.pause();
//           });
//         },
//       },
//       breakpoints: {
//         0: { slidesPerView: 1, spaceBetween: 10 },
//         960: { slidesPerView: 2 },
//       },
//     });
//   }
// }
