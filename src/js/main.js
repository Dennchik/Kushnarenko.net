import '../scss/main.scss';
import BurgerMenu from './assets/burgerMenu.js';
import videoInView from './assets/videoInView.js';
import { maskPhone } from './utils/mask-phone.js';
import { shadowScrollHeader, cookiesAccept } from './layouts/layouts.js';
import DynamicAdaptive from './modules/DynamicAdaptive.js';
import loaded from './utils/preloader.js';
import { initFormValidation } from './assets/validate-form.js';
import { returnToSavedPosition } from './assets/returnToSavedPosition.js';
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

shadowScrollHeader();

//* ----------------------------------------------------------------------------
function onDomReady() {
  DynamicAdaptive();
  videoInView();
  returnToSavedPosition();
  maskPhone('.phone');
  initFormValidation();
  cookiesAccept('.cookies-accept', '.cookies-accept__button');
}
document.addEventListener('DOMContentLoaded', onDomReady);
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
loaded('.preloader');

//* Определяем мобильное устройство (для отключения ScrollSmoother на мобилках)

const burgerMenu = new BurgerMenu();

// Если нужно закрыть меню из другого места
// burgerMenu.close();

// Если нужно уничтожить меню (удалить обработчики)
// burgerMenu.destroy();

// Пример: закрываем меню при переходе по ссылкам
document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', () => {
    if (burgerMenu) {
      burgerMenu.close();
    }
  });
});

//* ----------------------------------------------------------------------------

//* - [ Animation ] -
// addCartAnimation();

//* ----------------- [ Блок часто задаваемые вопросы ] ------------------------
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');

    trigger.addEventListener('click', () => {
      // 1. Если хотим, чтобы открывался только один за раз - раскомментируй
      // код ниже:

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-active');
        }
      });

      // 2. Переключаем класс на текущем элементе
      item.classList.toggle('is-active');
    });
  });
});

//* ----------------------------------------------------------------------------
function initPromoSlider() {
  const slide = document.querySelector('.section-promo__video-slide');

  if (!slide) return;

  const videoBoxes = slide.querySelectorAll('.section-promo__video-box');
  const videoCount = videoBoxes.length;

  console.log(`Найдено видео-боксов: ${videoCount}`);

  // Если блоков 2 и более
  if (videoCount >= 2) {
    // Добавляем класс swiper к .section-promo__video-slide
    slide.classList.add('swiper');

    // Ищем .navigation внутри slide и добавляем класс show
    const navigation = document.querySelector('.navigation');
    if (navigation) {
      navigation.classList.add('show');
    }
  }
}

initPromoSlider();
//* ----------------------------------------------------------------------------
// function inirReviewsSlide(params) {
//   const slide = document.querySelector('.section-reviews__wrapper');

//   // Если блоков 2 и более
//   if (videoCount >= 5) {
//     // Добавляем класс swiper к .section-promo__video-slide
//     slide.classList.add('swiper');

//     // Ищем .navigation внутри slide и добавляем класс show
//     const navigation = document.querySelector('.reviews-navigation');
//     if (navigation) {
//       navigation.classList.add('show');
//     }
//   }
// }
// inirReviewsSlide();
//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
