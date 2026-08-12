//* app.js
import { partnerSlide } from './components/slide.js';
import { buildSwiper } from './utils/build-swiper.js';
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
  fancyBox();

  if (!isMobile) {
    tlFooterParallel();
    tlFooterParallelSecond();
    initHero();
    // fadeInColumn();
    composition();
  }
}
document.addEventListener('DOMContentLoaded', onDomReady);

let gsapSmoother = null;
//* ----------------------------------------------------------------------------
if (!isMobile || window.innerWidth >= 960) {
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
