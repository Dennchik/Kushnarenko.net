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
