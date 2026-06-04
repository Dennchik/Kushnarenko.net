import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ____________________ [Регистрация - (GSAP) plugins] ________________________
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export function smoother() {
  const instance = ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    smooth: 1.2,
    effects: true,
    // Дополнительные рекомендации для лучшей совместимости:
    normalizeScroll: true, // помогает с touch и fixed элементами
    smoothTouch: 0.1,
    ignoreMobileResize: true,
  });

  // Делаем доступным глобально на всякий случай
  window.smoother = instance;

  return instance;
}

export function applyParallax(element) {
  const smootherInstance = ScrollSmoother.get();
  if (!smootherInstance) {
    console.warn('ScrollSmoother is not initialized. Call smoother() first.');
    return;
  }
  smootherInstance.effects(element, { speed: 0.5 });
}
