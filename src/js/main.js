import '../scss/main.scss';
// import { maskPhone } from './assets/mask-phone.js';
// import { addCartAnimation } from './animations/add-cart-animation.jsx';
// import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
import {
  logicLooping,
  shadowScrollHeader,
  // videoInView,
  //   addFavorites,
  //   sidebarMenuHandle,
  //   hideTopMenu,
  //   addToBlock,
  //   cookiesAccept,
  //   toggleModalOpen,
} from './layouts/layouts.js';

document.addEventListener('DOMContentLoaded', () => {
  logicLooping();
  shadowScrollHeader();
});

// Дождитесь загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('player-id');

  if (video) {
    // Уберите автовоспроизведение на всякий случай
    video.removeAttribute('autoplay');

    // Промис для надежной паузы
    const pauseVideo = function () {
      if (!video.paused) {
        video.pause();
      }

      // Сбросить время на начало (если нужно)
      // video.currentTime = 0;
    };

    // Пауза при разных событиях
    video.addEventListener('loadedmetadata', pauseVideo);
    video.addEventListener('canplay', pauseVideo);
    video.addEventListener('play', pauseVideo);

    // Пауза сразу, если видео уже загружено
    if (video.readyState >= 2) {
      pauseVideo();
    }
  }
});
//* - [Utils] -
// loadedTimer();

//* - [ Animation ] -
// addCartAnimation();
// '.favourites',
// '.product-card__favourites',
// '.icon-heart-like',
// '.icon-heart-like',
// 'like'

//* layouts
// addToBlock();
// cookiesAccept('.cookies-accept', '.cookies-accept__button');
// dropDownMenu('.main-menu__link');
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');

    trigger.addEventListener('click', () => {
      // 1. Если хотим, чтобы открывался только один за раз - раскомментируй код ниже:

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
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
