/**
 * GraphitiNavigator
 *
 * Эффект плавающей плашки и искр над ссылками с адаптивным скроллспаем.
 * Отвечает за всю визуальную часть и слежение за активными секциями при скролле.
 */

export function GraphitiNavigator(params = {}) {
  const nav = document.querySelector('.header__top-menu');
  const effectEl = document.querySelector('.effect.filter');
  const textEl = document.querySelector('.effect.text');
  const headerSelector = params.headerSelector ?? '.offset-header';

  let animationTime = 600;
  let pCount = 15;
  const minDistance = 20;
  const maxDistance = 42;
  const maxRotate = 75;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];
  const timeVariance = 300;

  let currentActiveEl = null;
  let isScrollingManually = false;
  let scrollDirection = 'down';
  let lastScrollY = window.scrollY;

  // ─────────────── Утилиты ───────────────

  function noise(n = 1) {
    return n / 2 - Math.random() * n;
  }

  function getXY(distance, pointIndex, totalPoints) {
    const x =
      distance *
      Math.cos((((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180);
    const y =
      distance *
      Math.sin((((360 + noise(8)) / totalPoints) * pointIndex * Math.PI) / 180);
    return [x, y];
  }

  function getOffset() {
    const header = document.querySelector(headerSelector);
    return header ? header.offsetHeight : 0;
  }

  // ─────────────── Частицы ───────────────

  function makeParticles($el) {
    const d = [90, 10];
    const r = 100;

    const bubbleTime = animationTime * 2 + timeVariance;
    $el.style.setProperty('--time', bubbleTime + 'ms');

    for (let i = 0; i < pCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      const $place = $el;
      if ($place) {
        $place.classList.remove('active-link');
        setTimeout(() => {
          const $particle = document.createElement('span');
          const $point = document.createElement('span');
          $particle.classList.add('particle');
          $particle.style = `
              --start-x: ${p.start[0]}px;
              --start-y: ${p.start[1]}px;
              --end-x: ${p.end[0]}px;
              --end-y: ${p.end[1]}px;
              --time: ${p.time}ms;
              --scale: ${p.scale};
              --color: var(--color-${p.color}, white);
              --rotate: ${p.rotate}deg;
            `;
          $point.classList.add('point');
          $particle.append($point);
          $place.append($particle);
          requestAnimationFrame(() => {
            $place.classList.add('active-link');
          });
          setTimeout(() => {
            try {
              $place.removeChild($particle);
            } catch (e) {}
          }, t);
        }, 30);
      }
    }
  }

  function createParticle(i, t, d, r) {
    let rotate = noise(r / 10);
    let minDistance = d[0];
    let maxDistance = d[1];
    return {
      start: getXY(minDistance, pCount - i, pCount),
      end: getXY(maxDistance + noise(7), pCount - i, pCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  }

  // ─────────────── Позиционирование плашки ───────────────

  function updateEffectPosition(element) {
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };

    Object.assign(effectEl.style, styles);
    Object.assign(textEl.style, styles);
    textEl.classList.remove('hidden');
    textEl.innerText = element.innerText;
  }

  // ─────────────── Деактивация ───────────────

  function deactivateAll() {
    effectEl.classList.add('hidden');
    textEl.classList.add('hidden');
    effectEl.style.left = '';
    effectEl.style.top = '';
    effectEl.style.width = '';
    effectEl.style.height = '';
    textEl.style.left = '';
    textEl.style.top = '';
    textEl.style.width = '';
    textEl.style.height = '';
    textEl.innerText = '';

    nav.querySelectorAll('.top-menu__item').forEach(($el) => {
      $el.classList.remove('active-link');
    });
    currentActiveEl = null;

    effectEl.querySelectorAll('.particle').forEach(($el) => {
      effectEl.removeChild($el);
    });
  }

  // ─────────────── Активация ссылки ───────────────

  const activate = ($el) => {
    if (currentActiveEl === $el) return;

    updateEffectPosition($el);

    if (!$el.classList.contains('active-link')) {
      nav.querySelectorAll('.top-menu__item').forEach(($el) => {
        $el.classList.remove('active-link');
      });
      effectEl.querySelectorAll('.particle').forEach(($el) => {
        effectEl.removeChild($el);
      });
      $el.classList.add('active-link');
      currentActiveEl = $el;

      textEl.classList.remove('active-link');

      setTimeout(() => {
        textEl.classList.add('active-link');
      }, 100);

      makeParticles(effectEl);
    }
  };

  // ─────────────── БЛОКИРОВКА OBSERVER'А ПОСЛЕ КЛИКА ───────────────

  /**
   * Блокирует observer на всё время плавного скролла после клика.
   * Использует scrollend (современное API) или fallback с проверкой
   * стабильности позиции.
   */
  function blockObserverUntilScrollEnd() {
    // isScrollingManually уже установлен в true перед вызовом этой функции

    if ('onscrollend' in window) {
      const onScrollEnd = () => {
        isScrollingManually = false;
        window.removeEventListener('scrollend', onScrollEnd);
      };
      window.addEventListener('scrollend', onScrollEnd);
    } else {
      // Fallback: проверяем, что скролл стабилен 3 раза подряд (≈450ms)
      let stableScrollY = window.scrollY;
      let stableCount = 0;
      const STABLE_THRESHOLD = 3;

      const onScroll = () => {
        const currentY = window.scrollY;
        if (currentY === stableScrollY) {
          stableCount++;
          if (stableCount >= STABLE_THRESHOLD) {
            isScrollingManually = false;
            window.removeEventListener('scroll', onScroll);
          }
        } else {
          stableScrollY = currentY;
          stableCount = 0;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  // ─────────────── КЛИК ПО ССЫЛКАМ ───────────────

  nav.querySelectorAll('.top-menu__item').forEach(($el) => {
    const link = $el.querySelector('.top-menu__link');
    $el.addEventListener('click', () => {
      // Сначала блокируем observer, чтобы он не переключил
      // подсветку на промежуточные секции во время плавного скролла
      isScrollingManually = true;
      // Сразу подсвечиваем нужную ссылку
      activate($el);
      // Блокируем observer до конца скролла
      blockObserverUntilScrollEnd();
    });
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        isScrollingManually = true;
        activate($el);
        blockObserverUntilScrollEnd();
      }
    });
  });

  // ─────────────── ТРЕКИНГ НАПРАВЛЕНИЯ СКРОЛЛА ───────────────

  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // ═══════════════════════════════════════════════════════════════
  //  IntersectionObserver — СКРОЛЛСПАЙ (scroll spy)
  // ═══════════════════════════════════════════════════════════════

  let observer = null;
  const sectionToLink = new Map();
  const sectionOrder = [];

  function initScrollspy() {
    if (observer) observer.disconnect();

    sectionToLink.clear();
    sectionOrder.length = 0;

    // Собираем все секции из href у пунктов меню
    nav.querySelectorAll('.top-menu__item').forEach(($el) => {
      const href = $el.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          sectionToLink.set(section, $el);
          sectionOrder.push(section);
        }
      }
    });

    // Секция #home — для сброса активной подсветки в самом верху
    const homeSection = document.getElementById('home');
    if (homeSection) {
      // Добавляем home, только если её нет в меню
      if (!sectionToLink.has(homeSection)) {
        sectionToLink.set(homeSection, null);
        sectionOrder.unshift(homeSection);
      }
    }

    if (sectionOrder.length === 0) return;

    const offset = getOffset();

    const observerOptions = {
      root: null,
      rootMargin: `-${offset + 1}px 0px -10% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    // Хранилище текущей видимости секций
    const visibilityMap = new Map();

    observer = new IntersectionObserver((entries) => {
      // Обновляем карту видимости
      entries.forEach((entry) => {
        visibilityMap.set(entry.target, entry.intersectionRatio);
      });

      // Если сейчас ручной скролл после клика — ничего не делаем
      if (isScrollingManually) return;

      // 1. Ищем секцию с максимальной видимостью
      let bestSection = null;
      let bestRatio = 0;

      visibilityMap.forEach((ratio, section) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestSection = section;
        }
      });

      // 2. Если ничего не видно — определяем по направлению скролла
      if (!bestSection || bestRatio === 0) {
        if (scrollDirection === 'down') {
          // Скроллим вниз — берём первую секцию, которая ниже текущего положения
          for (const section of sectionOrder) {
            const rect = section.getBoundingClientRect();
            if (rect.top > offset) {
              bestSection = section;
              break;
            }
          }
          if (!bestSection) bestSection = sectionOrder[sectionOrder.length - 1];
        } else {
          // Скроллим вверх — берём последнюю секцию, которая выше текущего положения
          for (let i = sectionOrder.length - 1; i >= 0; i--) {
            const section = sectionOrder[i];
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset + 50) {
              bestSection = section;
              break;
            }
          }
          if (!bestSection) bestSection = sectionOrder[0];
        }
      }

      // 3. Применяем результат
      if (bestSection) {
        const isHome = bestSection === homeSection;

        if (isHome) {
          const homeLink = sectionToLink.get(homeSection);

          if (!homeLink) {
            // Home нет в меню — сбрасываем подсветку, плашку прячем
            if (currentActiveEl !== null) {
              deactivateAll();
              window.dispatchEvent(
                new CustomEvent('activeSectionChanged', {
                  detail: { sectionId: 'home', label: 'Введение' },
                })
              );
            }
          } else {
            // Home есть в меню — подсвечиваем его как обычную секцию
            if (homeLink !== currentActiveEl) {
              activate(homeLink);
              window.dispatchEvent(
                new CustomEvent('activeSectionChanged', {
                  detail: {
                    sectionId: 'home',
                    label: homeLink.textContent.trim(),
                  },
                })
              );
            }
          }
          return;
        }

        const targetLink = sectionToLink.get(bestSection);
        if (targetLink && targetLink !== currentActiveEl) {
          activate(targetLink);
          window.dispatchEvent(
            new CustomEvent('activeSectionChanged', {
              detail: {
                sectionId: bestSection.id,
                label: targetLink.textContent.trim(),
              },
            })
          );
        }
      }
    }, observerOptions);

    // Начинаем наблюдение
    sectionOrder.forEach((section) => observer.observe(section));
  }

  // Запуск скроллспая
  initScrollspy();

  // ─────────────── Resize Observer ───────────────

  const resizeObserver = new ResizeObserver(() => {
    const activeEl = nav.querySelector('.top-menu__item.active-link');
    if (activeEl) {
      updateEffectPosition(activeEl);
    }
    // Пересоздаём observer при изменении размеров шапки
    initScrollspy();
  });

  resizeObserver.observe(document.body);

  // ─────────────── Стартовая активация ───────────────

  setTimeout(() => {
    if (window.scrollY > getOffset() + 50) {
      // Если страница не в самом верху — ищем активную секцию по скроллспаю
      // Принудительно прокрутим IntersectionObserver, найдя видимую секцию
      let found = false;
      for (const section of sectionOrder) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= getOffset() + 50 && rect.bottom >= getOffset()) {
          const link = sectionToLink.get(section);
          if (link) {
            activate(link);
            found = true;
            break;
          }
        }
      }
      if (!found && sectionOrder.length > 0) {
        // Если не нашли — активируем первую ссылку из меню (не home)
        const firstLink = nav.querySelector('.top-menu__item');
        if (firstLink) activate(firstLink);
      }
    } else {
      // В самом верху — подсветка не нужна
      deactivateAll();
    }
  }, 200);
}
