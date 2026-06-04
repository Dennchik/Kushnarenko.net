import '../scss/main.scss';

import loadedTimer from './utils/loaded-timer.js';
loadedTimer();
import { burgerMenu } from './assets/burger-button.js';
document.addEventListener('DOMContentLoaded', burgerMenu);
import videoInView from './assets/videoInView.js';
videoInView();

import GraphitiNavigator from './modules/GraphitiNavigator.js';
import { smoother, applyParallax } from './animations/animations.jsx';

//* Определяем мобильное устройство (для отключения ScrollSmoother на мобилках)
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
let gsapSmoother = null;
//* ----------------------------------------------------------------------------
if (!isMobile) {
  //* Создаём ScrollSmoother ТОЛЬКО на десктопе
  gsapSmoother = smoother();

  //* Параллакс (если есть элементы с data-speed или класс .parallax)
  applyParallax('.parallax');

  //* GraphitiNavigator — только на ПК (эффекты + scrollspy)
  GraphitiNavigator({
    headerSelector: '.offset-header',
    // smoother: gsapSmoother,   // раскомментируйте, если понадобится внутри навигатора
  });
}

//* AnchorScroller — всегда (и на мобилке, и на ПК)
//* Здесь передаём smoother, чтобы он использовал правильный scrollTo с offset'ом
import AnchorScroller from './modules/AnchorScroller.js';
new AnchorScroller({
  headerSelector: '.offset-header',
  selector: '.anchor-link',
  // smoother: gsapSmoother,
  onCloseSidebar: (sidebar) => sidebar?.classList.remove('_show'),
  onCloseButton: (sidebar) => sidebar?.classList.remove('_open'),
});
//* Опционально: слушаем событие от навигатора (если нужно куда-то ещё)
window.addEventListener('activeSectionChanged', (e) => {
  console.log('Active section changed:', e.detail);
});
//* ----------------------------------------------------------------------------
import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
dynamicAdaptive();
import { logicLooping, shadowScrollHeader } from './layouts/layouts.js';

document.addEventListener('DOMContentLoaded', () => {
  logicLooping();
  shadowScrollHeader();
});

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
