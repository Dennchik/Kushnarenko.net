//* app.js
import { buildSwiper } from './utils/build-swiper.js';
import { partnerSlide, promoSlide, reviewsSlide } from './components/slide.js';
import {
  smoother,
  applyParallax,
  tlFooterParallel,
  tlFooterParallelSecond,
  initHero,
  composition,
} from './animations/gsap-animations.jsx';
import AnchorScroller from './modules/AnchorScroller.js';
import fancyBox from './utils/fancyapps.js';

//* ----------------------------------------------------------------------------
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

function onDomReady() {
  buildSwiper();
  partnerSlide('.partners-slide');
  promoSlide('.promo-slide');
  reviewsSlide('.reviews-slide');
  fancyBox();

  if (!isMobile) {
    tlFooterParallel();
    tlFooterParallelSecond();
    initHero();
    composition();
  }
}
document.addEventListener('DOMContentLoaded', onDomReady);

let gsapSmoother = null;
//* ----------------------------------------------------------------------------
if (!isMobile) {
  smoother();
  //* Параллакс (если есть элементы с data-speed или класс .parallax)
  applyParallax('.parallax');
}
// ----------------------------------------------------------------------------
// //* AnchorScroller — всегда (и на мобилке, и на ПК)
// //* Здесь передаём smoother, чтобы он использовал правильный scrollTo с
// //* offset'ом
new AnchorScroller({
  headerSelector: '.offset-header',
  selector: '.anchor-link',
  //* раскомментируйте, если понадобится внутри навигатора
  // smoother: gsapSmoother,
  onCloseSidebar: (sidebar) => sidebar?.classList.remove('_show'),
  onCloseButton: (button) => button?.classList.remove('_open'),
});
// * Опционально: слушаем событие от навигатора (если нужно куда-то ещё)
window.addEventListener('activeSectionChanged', (e) => {
  console.log('Active section changed:', e.detail);
});
