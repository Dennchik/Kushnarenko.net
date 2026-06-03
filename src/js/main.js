import '../scss/main.scss';

import loadedTimer from './utils/loaded-timer.js';
import AnchorScroller from './modules/AnchorScroller.js';
import videoInView from './assets/videoInView.js';
import GraphitiNavigator from './modules/graf.js';
import { burgerMenu } from './assets/burger-button.js';

new AnchorScroller({
  headerSelector: '.offset-header',

  //* Коллбек срабатывает при клике на ссылку в сайдбаре:
  onCloseSidebar: (sidebar) => {
    sidebar.classList.remove('_show');
  },

  onCloseButton: (sidebar) => {
    sidebar.classList.remove('_open');
  },
});

videoInView();

document.addEventListener('DOMContentLoaded', burgerMenu);
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (!isMobile) {
  setTimeout(() => {
    GraphitiNavigator();
  }, 600);
}

import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
dynamicAdaptive();
import { logicLooping, shadowScrollHeader } from './layouts/layouts.js';

document.addEventListener('DOMContentLoaded', () => {
  logicLooping();
  shadowScrollHeader();
});

//* - [Utils] -
loadedTimer();

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
