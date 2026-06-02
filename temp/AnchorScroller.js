// import toggleSidebarMenu from '../src/js/modules/toggleSidebarMenu';
/**
 * ScrollFlow Anchor Scroller — Профессиональный плагин плавного скролла.
 * Без зависимостей (Vanilla JS), с поддержкой a11y, динамических отступов и истории.
 */
export default class AnchorScroller {
  constructor(options = {}) {
    //* Конфигурация по умолчанию с возможностью кастомизации
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

    //* Переменная для хранения инстанса IntersectionObserver
    this.observer = null;
    this.init();
  }

  init() {
    //* Предотвращаем Layout Shift: ждем готовности документа к расчету высот элементов
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    const links = document.querySelectorAll(this.config.selector);
    if (!links.length) return;

    //* Вешаем слушатели на каждую якорную ссылку
    links.forEach((link) => {
      link.addEventListener('click', (e) => this.handleClick(e, link));
    });

    //* Инициализируем нативный трекинг активных секций (Scrollspy)
    if (this.config.enableScrollspy) {
      this.initScrollspy(links);

      //* При ресайзе окна пересчитываем Scrollspy-координаты из-за возможного изменения высоты шапки
      window.addEventListener(
        'resize',
        this.debounce(() => {
          this.initScrollspy(links);
        }, 200)
      );
    }

    //* Корректно обрабатываем хэш в URL при прямой загрузке страницы
    this.handleOnLoadHash();
  }

  //* Динамически возвращает высоту шапки на основе переданного селектора
  getOffset() {
    const header = document.querySelector(this.config.headerSelector);
    if (header) {
      //* Получаем точную физическую высоту элемента шапки на данный момент
      return header.offsetHeight;
    }

    //* Дефолтный фолбек: если шапка отсутствует на странице, отступ равен 0
    return 0;
  }

  //* Выполняет плавную прокрутку к целевому элементу с учетом динамического отступа
  scrollTo(target) {
    if (!target) return;

    const offset = this.getOffset();
    //* getBoundingClientRect().top + window.scrollY гарантирует точные координаты
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    //* Управление фокусом для скринридеров (Accessibility)
    if (this.config.a11yFocus) {
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }

      //* preventScroll предотвращает повторный резкий скролл от нативного фокуса
      target.focus({ preventScroll: true });
    }
  }

  //* Обработчик клика по ссылке
  handleClick(e, link) {
    const href = link.getAttribute('href');
    //* Создаем URL для проверки хоста и пути во избежание багов на мультистраничных сайтах
    const url = new URL(href, window.location.href);

    //* Если якорь ведет на другую страницу — стандартное поведение браузера
    if (url.pathname !== window.location.pathname) return;

    e.preventDefault();

    const targetId = url.hash.substring(1);
    const target = document.getElementById(targetId);

    if (!target) return;

    //* Безопасное закрытие мобильного меню через переданный коллбек
    const sidebar =
      e.target.closest('.sidebar-menu') ||
      document.querySelector('.sidebar-menu');
    if (sidebar && typeof this.config.onCloseSidebar === 'function') {
      this.config.onCloseSidebar(sidebar);
    }

    const burgerbutton = document.querySelector('.burger-button');
    if (burgerbutton && typeof this.config.onCloseButton === 'function') {
      this.config.onCloseButton(burgerbutton);
    }

    //* Скроллим к секции
    this.scrollTo(target);

    //* Обновляем хэш в истории без скачка экрана
    if (this.config.updateHash) {
      history.pushState(null, null, `#${targetId}`);
    }
  }

  //* Intersection Observer для слежения за скроллом и подсветки активных ссылок

  initScrollspy(links) {
    //* Если наблюдатель уже создан — отключаем его перед обновлением
    if (this.observer) {
      this.observer.disconnect();
    }

    const observedSections = new Map();

    links.forEach((link) => {
      const hash = link.getAttribute('href').split('#')[1];
      const section = document.getElementById(hash);
      if (section) {
        observedSections.set(section, link);
      }
    });

    const offset = this.getOffset();

    const observerOptions = {
      //* Вьюпорт браузера
      root: null,
      //* Динамически компенсируем высоту шапки
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = observedSections.get(entry.target);

          // Сбрасываем активные классы
          links.forEach((l) => {
            l.classList.remove('active-link');
            // l.classList.add('text-slate-400');
          });
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeLink = observedSections.get(entry.target);

              links.forEach((l) => l.classList.remove('active-link'));

              if (activeLink) {
                const targetHref = activeLink.getAttribute('href');
                links.forEach((l) => {
                  if (l.getAttribute('href') === targetHref) {
                    l.classList.add('active-link');
                  }
                });
              }
            }
          });
        }
      });
    }, observerOptions);

    observedSections.forEach((_, section) => this.observer.observe(section));
  }

  //* Мягкая отложенная обработка хэша при загрузке страницы
  handleOnLoadHash() {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      //* Пропускаем прокрутку к первой секции/домой при загрузке, чтобы избежать скачков
      if (!targetId || targetId === 'home') return;
      const target = document.getElementById(targetId);
      if (target) {
        //* Сбрасываем моментальный дефолтный скачок
        window.scrollTo(0, 0);

        //* Даем 120ms на рендеринг шрифтов и раскладки, после чего плавно скроллим
        setTimeout(() => {
          this.scrollTo(target);
        }, 120);
      }
    }
  }

  //* Вспомогательная функция дебаунса для оптимизации нагрузки при resize
  debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
}
