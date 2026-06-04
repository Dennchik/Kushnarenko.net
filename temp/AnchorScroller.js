/**
 * modules/AnchorScroller.js
 * Класс плавного скролла к якорным ссылкам с динамическим расчетом высоты шапки.
 * Отвечает исключительно за перемещение к соответствующему блоку и закрытие меню.
 */
export default class AnchorScroller {
  constructor(options = {}) {
    this.config = {
      headerSelector: options.headerSelector ?? '.offset-header', // Класс шапки для авто-замера высоты
      selector: options.selector ?? '.anchor-link', // Селектор якорных ссылок
      a11yFocus: options.a11yFocus ?? true, // Передача фокуса скринридерам
      updateHash: options.updateHash ?? true, // Обновление URL истории хэша
      onCloseSidebar: options.onCloseSidebar ?? null, // Коллбек закрытия сайдбара
      onCloseButton: options.onCloseButton ?? null, // Альтернативный коллбек кнопки бургер
    };

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
  }

  /**
   * Динамически возвращает высоту элемента шапки
   */
  getOffset() {
    const header = document.querySelector(this.config.headerSelector);
    return header ? header.offsetHeight : 0;
  }

  scrollTo(target) {
    if (!target) return;

    const offset = this.getOffset();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - offset;

    // Устанавливаем глобальный флаг активного программного скролла для блокировки визуальных эффектов при перелетах
    window.isAnchorScrolling = true;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Ждем окончания скролла для сброса флага блокировки
    let scrollTimeout;
    const checkScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.isAnchorScrolling = false;

        // Обновляем состояние в UI дебаг-панели
        const mutexStatus = document.getElementById('mutex-status');
        if (mutexStatus) {
          mutexStatus.textContent = 'СВОБОДЕН (АКТИВЕН)';
          mutexStatus.className = 'text-cyan-400 font-bold';
        }

        window.removeEventListener('scroll', checkScrollEnd);
      }, 100);
    };
    window.addEventListener('scroll', checkScrollEnd);

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

    // Вызов переданных коллбеков на закрытие мобильного меню
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
}
