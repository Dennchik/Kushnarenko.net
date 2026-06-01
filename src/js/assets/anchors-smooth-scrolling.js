// import { toggleSidebarMenu } from '../layouts/layouts.js';
/**
 * ScrollFlow Anchor Scroller — Профессиональный плагин плавного скролла.
 * Без зависимостей (Vanilla JS), с поддержкой a11y, динамических отступов и истории.
 */
export default class AnchorScroller {
  constructor(options = {}) {
    // Конфигурация по умолчанию с возможностью кастомизации
    this.config = {
      offsetDesktop: options.offsetDesktop ?? 70, // Отступ для ПК (>= 1024px)
      offsetTablet: options.offsetTablet ?? 80, // Отступ для планшетов (768px - 1023px)
      offsetMobile: options.offsetMobile ?? 60, // Отступ для мобильных (< 768px)
      selector: options.selector ?? '.anchor-link', // Селектор якорных ссылок
      a11yFocus: options.a11yFocus ?? true, // Управление клавиатурным фокусом
      updateHash: options.updateHash ?? true, // Безопасное обновление URL-хэша
      enableScrollspy: options.enableScrollspy ?? true, // Подсветка ссылок в меню при скролле
      onCloseSidebar: options.onCloseSidebar ?? null, // Коллбек закрытия мобильного меню
    };

    this.init();
  }

  init() {
    // Предотвращаем Layout Shift: ждем, пока документ будет готов к расчетам высоты
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    const links = document.querySelectorAll(this.config.selector);
    if (!links.length) return;

    // Вешаем слушатели на каждую якорную ссылку
    links.forEach((link) => {
      link.addEventListener('click', (e) => this.handleClick(e, link));
    });

    // Инициализируем нативный трекинг активных секций (Scrollspy)
    if (this.config.enableScrollspy) {
      this.initScrollspy(links);
    }

    // Корректно обрабатываем хэш в URL при прямой загрузке страницы
    this.handleOnLoadHash();
  }

  /**
   * Возвращает отступ на основе текущей ширины вьюпорта
   */
  getOffset() {
    const width = window.innerWidth;
    if (width >= 1024) return this.config.offsetDesktop;
    if (width >= 768) return this.config.offsetTablet;
    return this.config.offsetMobile;
  }

  /**
   * Выполняет плавную прокрутку к целевому элементу
   */
  scrollTo(target) {
    if (!target) return;

    const offset = this.getOffset();
    // getBoundingClientRect().top + window.scrollY гарантирует точные координаты
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Управление фокусом для скринридеров (Accessibility)
    if (this.config.a11yFocus) {
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      // preventScroll предотвращает повторный резкий скролл от нативного фокуса
      target.focus({ preventScroll: true });
    }
  }

  /**
   * Обработчик клика по ссылке
   */
  handleClick(e, link) {
    const href = link.getAttribute('href');
    // Создаем URL для проверки хоста и пути во избежание багов на мультистраничных сайтах
    const url = new URL(href, window.location.href);

    // Если якорь ведет на другую страницу — стандартное поведение браузера
    if (url.pathname !== window.location.pathname) return;

    e.preventDefault();

    const targetId = url.hash.substring(1);
    const target = document.getElementById(targetId);

    if (!target) return;

    // Безопасное закрытие мобильного меню через переданный коллбек
    const sidebar =
      e.target.closest('.sidebar-menu') ||
      document.querySelector('.sidebar-menu');
    if (sidebar && typeof this.config.onCloseSidebar === 'function') {
      this.config.onCloseSidebar(sidebar);
    }

    // Скроллим к секции
    this.scrollTo(target);

    // Обновляем хэш в истории без скачка экрана
    if (this.config.updateHash) {
      history.pushState(null, null, `#${targetId}`);
    }
  }

  /**
   * Intersection Observer для слежения за скроллом и подсветки активных ссылок
   */
  initScrollspy(links) {
    const observedSections = new Map();

    links.forEach((link) => {
      const hash = link.getAttribute('href').split('#')[1];
      const section = document.getElementById(hash);
      if (section) {
        observedSections.set(section, link);
      }
    });

    const observerOptions = {
      root: null, // Вьюпорт браузера
      rootMargin: `-${this.getOffset()}px 0px -60% 0px`, // Компенсируем шапку
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = observedSections.get(entry.target);

          // Сбрасываем активные классы
          links.forEach((l) => l.classList.remove('active-link', 'text-white'));

          // Подсвечиваем текущую активную ссылку
          if (activeLink) {
            activeLink.classList.add('active-link', 'text-white');
          }
        }
      });
    }, observerOptions);

    observedSections.forEach((_, section) => observer.observe(section));
  }

  /**
   * Мягкая отложенная обработка хэша при загрузке страницы
   */
  handleOnLoadHash() {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        // Сбрасываем моментальный дефолтный скачок
        window.scrollTo(0, 0);

        // Даем 120ms на рендеринг шрифтов и раскладки, после чего плавно скроллим
        setTimeout(() => {
          this.scrollTo(target);
        }, 120);
      }
    }
  }
}
