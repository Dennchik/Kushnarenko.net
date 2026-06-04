export default function GraphitiNavigator(params = {}) {
  const nav = document.querySelector('.header__top-menu');
  if (!nav) {
    console.warn('GraphitiNavigator: .header__top-menu не найден');
    return;
  }

  const effectEl = document.querySelector('.effect.filter');
  const textEl = document.querySelector('.effect.text');
  const headerSelector = params.headerSelector ?? '.offset-header';

  let animationTime = 600;
  let pCount = 15;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];
  const timeVariance = 300;

  let currentActiveEl = null;
  let observerBlocked = false;
  let blockTimeout = null;

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

  function makeParticles($el) {
    if (!$el) return;
    const d = [90, 10];
    const r = 100;
    const bubbleTime = animationTime * 2 + timeVariance;
    $el.style.setProperty('--time', bubbleTime + 'ms');

    for (let i = 0; i < pCount; i++) {
      const t = animationTime * 2 + noise(timeVariance / 2);
      const p = createParticle(i, t, d, r);

      setTimeout(() => {
        const $particle = document.createElement('span');
        const $point = document.createElement('span');
        $particle.classList.add('particle');
        $particle.style.cssText = `
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
        $el.append($particle);

        requestAnimationFrame(() => {
          $el.classList.add('active-link');
        });

        setTimeout(() => {
          try {
            $el.removeChild($particle);
          } catch (e) {}
        }, t);
      }, 30);
    }
  }

  function createParticle(i, t, d, r) {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], pCount - i, pCount),
      end: getXY(d[1] + noise(7), pCount - i, pCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  }

  function updateEffectPosition(element) {
    if (!effectEl || !textEl || !element) return;

    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };

    Object.assign(effectEl.style, styles);
    Object.assign(textEl.style, styles);

    effectEl.classList.remove('hidden');
    textEl.classList.remove('hidden');

    const textNode = element.querySelector('.top-menu__link') || element;
    textEl.innerText = textNode.innerText || textNode.textContent;
  }

  function deactivateAll() {
    if (effectEl) {
      effectEl.classList.add('hidden');
      effectEl.style.left = '';
      effectEl.style.top = '';
      effectEl.style.width = '';
      effectEl.style.height = '';
      effectEl.querySelectorAll('.particle').forEach((p) => {
        try {
          p.remove();
        } catch (e) {}
      });
    }
    if (textEl) {
      textEl.classList.add('hidden');
      textEl.style.left = '';
      textEl.style.top = '';
      textEl.style.width = '';
      textEl.style.height = '';
      textEl.innerText = '';
      textEl.classList.remove('active-link');
    }
    nav
      .querySelectorAll('.top-menu__item')
      .forEach(($el) => $el.classList.remove('active-link'));
    currentActiveEl = null;
  }

  const activate = ($el) => {
    if (!$el || currentActiveEl === $el) return;

    updateEffectPosition($el);

    nav
      .querySelectorAll('.top-menu__item')
      .forEach((item) => item.classList.remove('active-link'));

    if (effectEl) {
      effectEl.querySelectorAll('.particle').forEach((p) => {
        try {
          p.remove();
        } catch (e) {}
      });
    }

    $el.classList.add('active-link');
    currentActiveEl = $el;

    if (textEl) {
      textEl.classList.remove('active-link');
      setTimeout(() => textEl.classList.add('active-link'), 100);
    }

    if (effectEl) makeParticles(effectEl);
  };

  function blockObserver(duration = 2000) {
    if (blockTimeout) clearTimeout(blockTimeout);
    observerBlocked = true;
    blockTimeout = setTimeout(() => {
      observerBlocked = false;
      blockTimeout = null;
    }, duration);
  }

  function setupAnchorClickHandlers() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetId = href.substring(1);

      if (targetId === 'home' || targetId === '') {
        const homeSection = document.getElementById('home');
        const homeLink = homeSection ? sectionToLink.get(homeSection) : null;

        if (homeLink) {
          if (homeLink !== currentActiveEl) activate(homeLink);
        } else {
          deactivateAll();
        }
        blockObserver();
        return;
      }

      const section = document.getElementById(targetId);
      if (section) {
        const linkInMenu = sectionToLink.get(section);
        if (linkInMenu && linkInMenu !== currentActiveEl) {
          activate(linkInMenu);
        }
      }
      blockObserver();
    });

    nav.querySelectorAll('.top-menu__item').forEach((el) => {
      el.addEventListener('click', () => {
        if (el !== currentActiveEl) activate(el);
        blockObserver(1800);
      });
    });
  }

  let observer = null;
  const sectionToLink = new Map();
  const sectionOrder = [];

  function initScrollspy() {
    if (observer) observer.disconnect();
    sectionToLink.clear();
    sectionOrder.length = 0;

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

    const homeSection = document.getElementById('home');
    if (homeSection && !sectionToLink.has(homeSection)) {
      sectionToLink.set(homeSection, null);
      sectionOrder.unshift(homeSection);
    }

    if (sectionOrder.length === 0) return;

    const offset = getOffset();

    const observerOptions = {
      root: null,
      rootMargin: `-${offset + 1}px 0px -20% 0px`,
      threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
    };

    const visibilityMap = new Map();

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

    window.addEventListener('scroll', checkVisibilityOnScroll, {
      passive: true,
    });

    observer = new IntersectionObserver((entries) => {
      if (observerBlocked) return;

      entries.forEach((entry) => {
        visibilityMap.set(entry.target, entry.intersectionRatio);
      });

      let bestSection = null;
      let bestRatio = 0;

      visibilityMap.forEach((ratio, section) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestSection = section;
        }
      });

      if (!bestSection || bestRatio < 0.05) {
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
        } else if (homeLink !== currentActiveEl) {
          activate(homeLink);
          window.dispatchEvent(
            new CustomEvent('activeSectionChanged', {
              detail: { sectionId: 'home', label: homeLink.textContent.trim() },
            })
          );
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

    sectionOrder.forEach((section) => observer.observe(section));
  }

  initScrollspy();
  setupAnchorClickHandlers();

  const resizeObserver = new ResizeObserver(() => {
    const activeEl = nav.querySelector('.top-menu__item.active-link');
    if (activeEl) updateEffectPosition(activeEl);
    initScrollspy();
  });
  resizeObserver.observe(document.body);

  function initActiveSection() {
    const offset = getOffset();
    let found = false;

    for (const section of sectionOrder) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom > offset && rect.top < window.innerHeight) {
        const link = sectionToLink.get(section);
        if (link && link !== currentActiveEl) {
          activate(link);
          found = true;
          break;
        }
      }
    }

    if (!found) deactivateAll();
  }

  if (document.readyState === 'complete') {
    initActiveSection();
  } else {
    window.addEventListener('load', initActiveSection, { once: true });
  }

  window.gravityNavigatorActive = true;

  return {
    activate: (el) => activate(el),
    deactivateAll,
    blockObserver,
    refresh: initScrollspy,
  };
}
