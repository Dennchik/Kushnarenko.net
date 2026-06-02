/**
 * GraphitiNavigator
 *
 * Эффект плавающей плашки и искр над ссылками с адаптивным скроллспаем.
 * Отвечает за всю визуальную часть и слежение за активными секциями при скролле.
 *
 * Логика:
 * - Скролл → IntersectionObserver подсвечивает активную секцию
 * - Клик → подсветка сразу на нужной ссылке, observer замолкает на 2 сек
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
  let observerBlocked = false;
  let blockTimeout = null;
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

  // ─────────────── БЛОКИРОВКА OBSERVER ПРИ КЛИКЕ ───────────────
  // Любой клик по якорной ссылке блокирует observer на 2 сек,
  // чтобы плавный скролл не дёргал подсветку.

  function blockObserver() {
    if (blockTimeout) clearTimeout(blockTimeout);
    observerBlocked = true;
    blockTimeout = setTimeout(() => {
      observerBlocked = false;
      blockTimeout = null;
    }, 2000);
  }

  // Единый обработчик на document — ловит ВСЕ якорные ссылки
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    const targetId = href.substring(1);

    // Обработка клика по #home
    if (targetId === 'home' || targetId === '') {
      const homeSection = document.getElementById('home');
      const homeLink = homeSection ? sectionToLink.get(homeSection) : null;

      if (homeLink) {
        // Home есть в меню — подсвечиваем его
        if (homeLink !== currentActiveEl) {
          activate(homeLink);
        }
      } else {
        // Home нет в меню — гасим подсветку
        deactivateAll();
      }

      blockObserver();
      return;
    }

    // Обработка клика по остальным якорям
    const section = document.getElementById(targetId);
    if (section) {
      const linkInMenu = sectionToLink.get(section);
      if (linkInMenu && linkInMenu !== currentActiveEl) {
        activate(linkInMenu);
      }
    }

    blockObserver();
  });

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
      threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
    };

    // Хранилище текущей видимости секций
    const visibilityMap = new Map();

    // Scroll-фолбэк: проверка видимости секций через getBoundingClientRect
    let scrollFallbackTimer = null;

    function checkVisibilityOnScroll() {
      if (scrollFallbackTimer) return;
      scrollFallbackTimer = setTimeout(() => {
        scrollFallbackTimer = null;

        if (observerBlocked) return;

        const offset = getOffset();
        let anySectionVisible = false;

        for (const section of sectionOrder) {
          const rect = section.getBoundingClientRect();
          // Секция считается видимой, если её верхняя граница прошла offset
          // и нижняя граница не ушла за нижний край экрана
          if (rect.bottom > offset && rect.top < window.innerHeight) {
            anySectionVisible = true;
            break;
          }
        }

        if (!anySectionVisible && currentActiveEl !== null) {
          deactivateAll();
          window.dispatchEvent(
            new CustomEvent('activeSectionChanged', {
              detail: { sectionId: null, label: '' },
            })
          );
        }
      }, 150);
    }

    // Подписываемся на scroll для фолбэка
    window.addEventListener('scroll', checkVisibilityOnScroll, {
      passive: true,
    });

    observer = new IntersectionObserver((entries) => {
      // Если observer заблокирован после клика — ничего не делаем
      if (observerBlocked) return;

      // Обновляем карту видимости
      entries.forEach((entry) => {
        visibilityMap.set(entry.target, entry.intersectionRatio);
      });

      // 1. Ищем секцию с максимальной видимостью
      let bestSection = null;
      let bestRatio = 0;

      visibilityMap.forEach((ratio, section) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestSection = section;
        }
      });

      // Если ни одна секция не видна (ratio < 35%) — гасим подсветку
      if (!bestSection || bestRatio < 0.35) {
        if (currentActiveEl !== null) {
          deactivateAll();
          window.dispatchEvent(
            new CustomEvent('activeSectionChanged', {
              detail: { sectionId: null, label: '' },
            })
          );
        }
        return;
      }

      // 2. Применяем результат
      const isHome = bestSection === homeSection;

      if (isHome) {
        const homeLink = sectionToLink.get(homeSection);

        if (!homeLink) {
          if (currentActiveEl !== null) {
            deactivateAll();
            window.dispatchEvent(
              new CustomEvent('activeSectionChanged', {
                detail: { sectionId: 'home', label: 'Введение' },
              })
            );
          }
        } else {
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
        const firstLink = nav.querySelector('.top-menu__item');
        if (firstLink) activate(firstLink);
      }
    } else {
      deactivateAll();
    }
  }, 200);
}
