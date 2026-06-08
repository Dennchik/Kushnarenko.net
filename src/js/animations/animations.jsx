import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//* ____________________ [Регистрация - (GSAP) plugins] ________________________
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

//* ____________________ [Конфигурация - ScrollTrigger] ________________________

//* ___________________________[ScrollSmoother] ________________________________
//? speed	Скорость реагирования скролла	0.5(медленно) → 2(быстро)
//? smooth	Плавность / инерция скролла	0.5 → 2
//? effects	Включает поддержку.effects()	true / false
//? smoothTouch	Плавность скролла на тач - устройствах	0 → 1;

export function smoother() {
  ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    speed: 1,
    smooth: 0.7,
    effects: true,
    // smoothTouch: 0.1,
  });
}

//* ___________________________ [applyParallax] ________________________________
export function applyParallax(element) {
  const smootherInstance = ScrollSmoother.get();
  smootherInstance.effects(element, {
    speed: () => 0.5,
  });
}

export function fadeInColumn() {
  const tlVertical1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.triger-1',
      start: 'top bottom-=50',
      endTrigger: '.triger-1',
      toggleActions: 'play none none reverse',
      // markers: true,
    },
  });
  tlVertical1.from(
    '.timeline-1',
    {
      y: 100,
      duration: 0.9,
      opacity: 0,
      ease: 'sine.inOut',
    },
    '-=0.5'
  );
  tlVertical1.from(
    '.timeline-2',
    {
      y: 100,
      duration: 0.9,
      opacity: 0,
      ease: 'sine.inOut',
    },
    '-=0.5'
  );
}
