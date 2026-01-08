import '../scss/main.scss';
// import { buildSwiper } from './utils/build-swiper.js';
// import { slide, slidNews } from './components/slide.js';
// import { maskPhone } from './assets/mask-phone.js';
// import { loadedTimer } from './utils/loaded-timer.js';
// import { addCartAnimation } from './animations/add-cart-animation.jsx';
// import { counterProduct } from './components/counter.js';
// import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
// import { validateForm } from './assets/validate-form.js';
import {
  logicLooping,
  //   addFavorites,
  //   sidebarMenuHandle,
  //   hideTopMenu,
  //   addToBlock,
  //   cookiesAccept,
  //   toggleModalOpen,
} from './layouts/layouts.js';
// import {
//   dropDownMenu,
//   collapseToggle,
//   collapseToggleOne,
// } from './modules/drop-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  logicLooping();
  //   slide('.product-slide');
  //   slidNews('.slide-news');
  //   maskPhone('.phone');
  //   toggleModalOpen();
  //   counterProduct();
  //   hideTopMenu();
  //   collapseToggle();
  //   collapseToggleOne();
  //   addFavorites('.product-card__favourites');
  //   sidebarMenuHandle();
  //   dynamicAdaptive();
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

//* - [ Components ] -
// buildSwiper();
// validateForm();
//* layouts
// addToBlock();
// cookiesAccept('.cookies-accept', '.cookies-accept__button');
// dropDownMenu('.main-menu__link');

document.querySelectorAll('.product-card__label').forEach((priceBlock) => {
  const span = priceBlock.querySelector('span');

  if (!span || !span.textContent.trim()) {
    priceBlock.style.display = 'none';
  }
});

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
import { tabsPage } from './components/tabs-page.js';
tabsPage();
