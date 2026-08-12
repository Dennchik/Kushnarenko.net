import '../scss/main.scss';
import BurgerMenu from './assets/burgerMenu.js';
import videoInView from './assets/videoInView.js';

import { shadowScrollHeader } from './layouts/layouts.js';
import DynamicAdaptive from './modules/DynamicAdaptive.js';
import loaded from './utils/preloader.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

shadowScrollHeader();

//* ----------------------------------------------------------------------------
function onDomReady() {
  DynamicAdaptive();
}

//* ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', onDomReady);
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
loaded('.preloader');

videoInView();

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

//* layouts
// cookiesAccept('.cookies-accept', '.cookies-accept__button');
// dropDownMenu('.main-menu__link');

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
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
