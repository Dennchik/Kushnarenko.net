/**
 * ScrollFlow Anchor Scroller — Профессиональный плагин плавного скролла.
 * Без зависимостей (Vanilla JS), с поддержкой a11y, динамических отступов и истории.
 */
export default class AnchorScroller {
  constructor(options = {}) {
    this.config = {
      //* Селектор якорной шапки для динамического авто-расчета высоты
      headerSelector: options.headerSelector ?? '.offset-header',

      //* Селектор якорных ссылок
      selector: options.selector ?? '.anchor-link',

      //* Управление клавиатурным фокусом
      a11yFocus: options.a11yFocus ?? true,

      //* Безопасное обновление URL-хэша в истории браузера
      updateHash: options.updateHash ?? true,

      //* Подсветка ссылок в меню при скролле
      enableScrollspy: options.enableScrollspy ?? true,

      //* Коллбек для закрытия мобильного меню/сайдбара
      onCloseSidebar: options.onCloseSidebar ?? null,

      //* Коллбек для закрытия мобильного меню/кнопка
      onCloseButton: options.onCloseButton ?? null,
    };

    this.observer = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    const links = document.querySelectorAll(this.config.selector);
    if (!links.length) return;

    links.forEach((link) => {
      link.addEventListener('click', (e) => this.handleClick(e, link));
    });

    if (this.config.enableScrollspy) {
      this.initScrollspy(links);

      window.addEventListener(
        'resize',
        this.debounce(() => {
          this.initScrollspy(links);
        }, 200)
      );
    }
  }

  getOffset() {
    const header = document.querySelector(this.config.headerSelector);
    return header ? header.offsetHeight : 0;
  }

  scrollTo(target) {
    if (!target) return;

    const offset = this.getOffset();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    if (this.config.a11yFocus) {
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    }
  }

  handleClick(e, link) {
    const href = link.getAttribute('href');
    const url = new URL(href, window.location.href);

    if (url.pathname !== window.location.pathname) return;

    e.preventDefault();

    const targetId = url.hash.substring(1);
    const target = document.getElementById(targetId);

    if (!target) return;

    const sidebar =
      e.target.closest('.sidebar-menu') ||
      document.querySelector('.sidebar-menu');
    if (sidebar) {
      if (typeof this.config.onCloseSidebar === 'function') {
        this.config.onCloseSidebar(sidebar);
      }
      if (typeof this.config.onCloseButton === 'function') {
        this.config.onCloseButton(sidebar);
      }
    }

    this.scrollTo(target);

    if (this.config.updateHash) {
      history.pushState(null, null, `#${targetId}`);
    }
  }

  initScrollspy(links) {
    if (this.observer) {
      this.observer.disconnect();
    }

    const observedSections = new Map();

    links.forEach((link) => {
      const hrefAttr = link.getAttribute('href');
      if (hrefAttr && hrefAttr.startsWith('#')) {
        const hash = hrefAttr.split('#')[1];
        const section = document.getElementById(hash);
        if (section) {
          observedSections.set(section, link);
        }
      }
    });

    const offset = this.getOffset();

    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = observedSections.get(entry.target);
          links.forEach((l) => l.classList.remove('active-link'));
          if (activeLink) {
            activeLink.classList.add('active-link');
          }
        }
      });
    }, observerOptions);

    observedSections.forEach((_, section) => this.observer.observe(section));
  }

  debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
}
