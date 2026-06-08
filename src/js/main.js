import '../scss/main.scss';
import loaded from './utils/preloader.js';
import AnchorScroller from './modules/AnchorScroller.js';
import DynamicAdaptive from './modules/DynamicAdaptive.js';
import videoInView from './assets/videoInView.js';
import { buildSwiper } from './utils/build-swiper.js';
import { burgerMenu } from './assets/burger-button.js';
import { partnerSlide } from './components/slide.js';
import { shadowScrollHeader } from './layouts/layouts.js';
import animationScrolling from './animations/animationScrolling.js';
// import GraphitiNavigator from './modules/GraphitiNavigator.js';
import Rellax from 'rellax';
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

//* ----------------------------------------------------------------------------
import {
  animateHeader,
  composition,
  smoothScrollTitle,
} from './animations/anime-js.jsx';

import {
  smoother,
  applyParallax,
  fadeInColumn,
} from './animations/animations.jsx';

//* ----------------------------------------------------------------------------
function onDomReady() {
  DynamicAdaptive();
  buildSwiper();
  partnerSlide('.partners-slide');
  shadowScrollHeader();
  smoother();
  if (!isMobile) {
    animationScrolling();
    animateHeader();

    composition();
    fadeInColumn();
    // smoothScrollTitle('.el-item');
    applyParallax('.parallax');
    // logicLooping();
  }
}
//* ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', onDomReady);
//* ----------------------------------------------------------------------------
if (!isMobile) {
  document.addEventListener('DOMContentLoaded', function () {
    let rellax = new Rellax('.rellax');
  });
}

//* ----------------------------------------------------------------------------
loaded('.preloader');
document.addEventListener('DOMContentLoaded', burgerMenu);
videoInView();

//* Определяем мобильное устройство (для отключения ScrollSmoother на мобилках)

let gsapSmoother = null;
//* ----------------------------------------------------------------------------
if (!isMobile || window.innerWidth >= 960) {
  //* Параллакс (если есть элементы с data-speed или класс .parallax)
  // applyParallax('.parallax');
  //* GraphitiNavigator — только на ПК (эффекты + scrollspy)
  // GraphitiNavigator({
  //   headerSelector: '.offset-header',
  //   //* раскомментируйте, если понадобится внутри навигатора
  //   // smoother: gsapSmoother,
  // });
}
//* ----------------------------------------------------------------------------
//* AnchorScroller — всегда (и на мобилке, и на ПК)
//* Здесь передаём smoother, чтобы он использовал правильный scrollTo с offset'ом
new AnchorScroller({
  headerSelector: '.offset-header',
  selector: '.anchor-link',
  //* раскомментируйте, если понадобится внутри навигатора
  smoother: gsapSmoother,
  onCloseSidebar: (sidebar) => sidebar?.classList.remove('_show'),
  onCloseButton: (sidebar) => sidebar?.classList.remove('_open'),
});
// * Опционально: слушаем событие от навигатора (если нужно куда-то ещё)
window.addEventListener('activeSectionChanged', (e) => {
  console.log('Active section changed:', e.detail);
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
