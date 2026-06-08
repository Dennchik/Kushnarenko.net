/**
 * Функция добавляет CSS-класс 'active' к элементам с классом '.animate-items',
 * когда они появляются в области видимости при прокрутке страницы.
 * Если элемент уходит из области видимости, класс удаляется.
 *
 * Оптимизация: используется requestAnimationFrame, чтобы не блокировать поток.
 *
 * @returns {Function | undefined} Функция для удаления обработчика scroll (cleanup)
 */
export default function animationScrolling() {
  // Находим все DOM-элементы, которые нужно анимировать
  const animateItems = document.querySelectorAll('.animate-items');

  // Если на странице нет ни одного такого элемента, ничего не делаем
  if (animateItems.length === 0) return;

  /**
   * Вспомогательная функция: возвращает абсолютные координаты элемента (top, left)
   * относительно документа (с учётом прокрутки).
   * @param {HTMLElement} el
   * @returns {{top: number, left: number}}
   */
  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }

  /**
   * Основная логика: для каждого элемента проверяет, находится ли он в видимой области,
   * и добавляет или удаляет класс 'active'.
   */
  function animateOnScroll() {
    for (let i = 0; i < animateItems.length; i++) {
      const animateItem = animateItems[i];
      const animateItemHeight = animateItem.offsetHeight;
      const animateItemOffset = offset(animateItem).top;
      const animateStart = 5; // Чем больше число, тем позже сработает анимация

      // Точка срабатывания: когда верх элемента пересекает нижнюю границу окна (с учётом animateStart)
      let animateItemPoint =
        window.innerHeight - animateItemHeight / animateStart;

      // Если элемент выше окна, корректируем точку, чтобы он успел сработать
      if (animateItemHeight > window.innerHeight) {
        animateItemPoint =
          window.innerHeight - window.innerHeight / animateStart;
      }

      const scrollY = window.pageYOffset;

      // Условие видимости: элемент уже вошёл в зону и ещё не вышел из неё сверху
      const isVisible =
        scrollY > animateItemOffset - animateItemPoint &&
        scrollY < animateItemOffset + animateItemHeight;

      // Добавляем или удаляем класс (без точки в названии!)
      if (isVisible) {
        animateItem.classList.add('active');
      } else {
        if (!animateItem.classList.contains('animate-not-hide')) {
          animateItem.classList.remove('active');
        }
      }
    }
  }

  // Флаг для requestAnimationFrame – предотвращает создание лишних кадров
  let ticking = false;

  /**
   * Обработчик события scroll с оптимизацией через requestAnimationFrame.
   * Без этого обработчик вызывался бы сотни раз за прокрутку, тормозя страницу.
   */
  function onScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(() => {
        animateOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Подписываемся на событие прокрутки
  window.addEventListener('scroll', onScrollHandler);

  // Запускаем проверку один раз сразу после загрузки страницы
  // (на случай, если элемент уже виден без прокрутки)
  animateOnScroll();

  /**
   * Возвращаем функцию для отписки от события.
   * Это хорошая практика: если компонент с анимацией уничтожается,
   * вы можете вызвать эту функцию и удалить обработчик, чтобы избежать утечек памяти.
   */
  return function cleanup() {
    window.removeEventListener('scroll', onScrollHandler);
  };
}
/* Дополнительные сценарии (если у вас SPA с переходами без перезагрузки)
Если ваш сайт работает как одностраничное приложение (например, с динамической подгрузкой контента и сменой URL без перезагрузки страницы), то при переходе на другую страницу элементы .animate-items могут исчезнуть из DOM, но обработчик scroll останется висеть и будет понапрасну срабатывать. В этом случае нужно:

Сохранять функцию очистки при инициализации.

Вызывать очистку при уходе со страницы, а при возврате — снова вызывать animationScrolling().

Пример с простым роутингом: */

// main.js
/* import animationScrolling from './animations/animationScrolling.js';

let cleanupAnimation = null;

function initAnimation() {
  if (cleanupAnimation) cleanupAnimation(); // убираем старую анимацию
  cleanupAnimation = animationScrolling();   // запускаем новую
}

// При загрузке страницы
initAnimation();

// При переходе на другую страницу (например, по клику на ссылку)
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // ... логика перехода
    initAnimation(); // перенастраиваем анимацию для новой страницы
  });
}); */
