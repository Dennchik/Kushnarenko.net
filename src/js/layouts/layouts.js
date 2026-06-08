//* ✅ - [ Hiding an element when scrolling ]
export function shadowScrollHeader() {
  const handleScroll = () => {
    const headerMain = document.querySelector('.page__header');
    const pageContainer = document.querySelector('.page__main-content');
    const pageContainerTop = pageContainer.getBoundingClientRect().top;

    if (headerMain) {
      if (pageContainerTop < -50) {
        headerMain.classList.add('with-shadow');
      } else if (pageContainerTop <= 0) {
        headerMain.classList.remove('with-shadow');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  //🔹 Очистка слушателя событий при размонтировании компонента
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
//* ✅ - [ Добавить в избранное ] -
export function addFavorites(className) {
  const els = document.querySelectorAll(className);
  els.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('like');
    });
  });
}
//* ✅ - [ Управление переключением меню ] -
export function sidebarMenuHandle() {
  const burgerButtons = document.querySelectorAll('.burger-button');
  const header = document.querySelector('.header');
  const sidebarMenu = document.querySelector('.sidebar-menu');

  burgerButtons.forEach((burgerButton) => {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('is-active');

      if (burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.add('with-shadow');
      } else if (!burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.remove('with-shadow');
      }
    });
  });

  window.addEventListener('resize', () => {
    burgerButtons.forEach((burgerButton) => {
      if (burgerButton.classList.contains('is-active')) {
        document.body.classList.remove('no-scroll');
        sidebarMenu.classList.remove('_open-menu');
        burgerButton.classList.remove('is-active');
      }
    });
  });
}
//* ✅ - [ Sidebar - Menu ]
export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    sidebarMenu.classList.remove('_open-menu');

    resetScrollbarOffset();
    document.body.classList.remove('no-scroll');
    resetTransitionOnce(sidebarMenu);

    if (asideButton) {
      setTimeout(() => {
        asideButton.style.opacity = '1';
        asideButton.style.transition = 'opacity 0.3s ease';
        asideButton.style.pointerEvents = 'all';
      }, 300);
    }
  } else {
    if (asideButton) {
      asideButton.style.opacity = '0';
      asideButton.style.transition = 'opacity 0.3s ease';
      asideButton.style.pointerEvents = 'none';
    }
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.add('_open-menu');

    document.body.classList.add('no-scroll');
    resetTransitionOnce(sidebarMenu);
  }

  function resetTransitionOnce(element) {
    function transitionEndHandler() {
      element.style.transition = '';
      element.removeEventListener('transitionend', transitionEndHandler);
    }

    element.addEventListener('transitionend', transitionEndHandler);
  }
}
//* ✅ - [ Hiding an element when scrolling ]
export function hideTopMenu() {
  let lastScrollTop = 0; // последняя позиция скролла
  const target = document.querySelector('.header__top-menu'); // элемент, которому добавляем/убираем класс

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
      target.classList.remove('active');
      // 📈 прокрутка вверх
    } else {
      // 📉 прокрутка вниз
      target.classList.add('active');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // защита от отрицательных значений
  });
}
//* ✅ - [ Показать еще ]
export function addToBlock() {
  document.addEventListener('DOMContentLoaded', function () {
    const contents = document.querySelectorAll('.content');

    contents.forEach((content) => {
      // ⚠️ Кнопка
      const button = content.querySelector('.show-more');

      if (button) {
        // ⚠️ Текст внутри кнопки
        const buttonText = button.querySelector('span');
        const backText = buttonText.textContent;
        // ⚠️ Сколько блоков видно изначально
        let visibleCount = 1;
        // Сколько блоков нужно показывать при каждом нажатии
        const blocksToShow = 1;

        // ⚠️ Показываем первые несколько блоков, остальные скрываем
        const showBlocks = content.querySelectorAll('.section');

        showBlocks.forEach((showBlock, index) => {
          if (index >= visibleCount) {
            // ⚠️ Скрываем все блоки, начиная с определенного
            showBlock.classList.add('hidden');
          }
        });

        // ⚠️ Функция для обновления стилей кнопки
        const updateButtonStyle = () => {
          // ⚠️ Проверка ширины экрана
          if (window.innerWidth >= 768) {
            if (visibleCount % 2 === 0) {
              // ⚠️ Добавляем класс для четного количества видимых блоков
              button.classList.add('seo-block__button--even');
            } else {
              // ⚠️ Удаляем класс для четного количества
              button.classList.remove('seo-block__button--even');
            }
          } else {
            // ⚠️ Удаляем класс, если ширина меньше 768px
            button.classList.remove('seo-block__button--even');
          }
        };

        // ⚠️ Проверяем стили кнопки сразу после загрузки
        updateButtonStyle();

        // ⚠️ Обработчик события для кнопки
        button.addEventListener('click', function () {
          if (visibleCount < showBlocks.length) {
            // ⚠️ Показываем следующие три блока
            for (let i = 0; i < blocksToShow; i++) {
              if (visibleCount < showBlocks.length) {
                // ⚠️ Показываем следующий блок
                showBlocks[visibleCount].classList.remove('hidden');
                // ⚠️ Увеличиваем счетчик видимых блоков
                visibleCount++;
              }
            }
            // ⚠️ Если все блоки показаны, меняем текст кнопки на "Свернуть"
            if (visibleCount === showBlocks.length) {
              // ⚠️ Меняем текст на "Свернуть"
              buttonText.textContent = 'Свернуть';
              // ⚠️ Добавляем класс для кнопки вращения
              button.classList.add('_rotate-button');
            }
          } else {
            // ⚠️ Если текст кнопки "Свернуть", возвращаем все блоки в исходное состояние
            showBlocks.forEach((showBlock, index) => {
              if (index >= 1) {
                showBlock.classList.add('hidden'); // Скрываем блоки снова
              }
            });
            // ⚠️ Сбрасываем видимое количество блоков
            visibleCount = 1;
            // ⚠️ Возвращаем текст кнопки обратно
            // buttonText.textContent = 'Показать еще';
            buttonText.textContent = backText;
            // ⚠️ Удаляем класс для кнопки вращения
            button.classList.remove('_rotate-button');
          }

          // ⚠️ Обновляем стили кнопки после клика
          updateButtonStyle();
        });
      }
    });
  });
}
//* ✅ - [ Управление открытием модальных окон ]
export function toggleModalOpen() {
  const modals = [
    {
      triggerSelector: '.login-button',
      modalSelector: '.page__form-login',
    },
    {
      triggerSelector: '.phone-call',
      modalSelector: '.page__order-call',
    },
  ];

  modals.forEach(({ triggerSelector, modalSelector }) => {
    const modal = document.querySelector(modalSelector);
    const triggers = document.querySelectorAll(triggerSelector);
    const closeBtn = modal.querySelector('.btn-close');

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        handleScrollbarOffset(modal);
        document.body.classList.add('no-scroll');
        modal.classList.add('is-open');

        if (modalSelector === '.questions-form') {
          const { showFieldset } = fieldSetsToggle(); // Получаем showFieldset
          showFieldset(0); // Активируем первый fieldset
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');

      if (modalSelector === '.questions-form') {
        const active = modal.querySelector(
          '.form-question__fieldset-table.active'
        );
        if (active) {
          active.classList.remove('active');
          console.log('Класс active удалён');
        } else {
          console.log('Нет активного fieldset');
        }
      }
    });
  });
}

//* ✅ - [ Управление оповещением cookies ] -
export function cookiesAccept(el, trigger) {
  const cookiesAccept = document.querySelector(el);
  const button = document.querySelector(trigger);

  if (!cookiesAccept) return;

  if (button) {
    cookiesAccept.style.transform = 'translateY(110%)';
    button.addEventListener('click', () => {
      cookiesAccept.style.transform = 'translateY(110%)';
      cookiesAccept.style.transition = 'transform 0.5s ease';
    });
  } else {
    console.log('кнопка не найдена');
  }

  setTimeout(() => {
    cookiesAccept.style.transform = 'translateY(0)';
    cookiesAccept.style.transition = 'transform 0.5s ease';
  }, 3000);
}

//* ✅ - [ JS — display logic and looping ]
// export function logicLooping() {
//   const container = document.querySelector('.js-rotator');
//   if (!container) return;

//   const items = container.querySelectorAll('span');
//   console.log(items);

//   const showTime = 4000;
//   let index = 0;

//   function showNext() {
//     items.forEach((el) => el.classList.remove('is-active'));
//     items[index].classList.add('is-active');
//     index = (index + 1) % items.length;
//   }

//   showNext();
//   setInterval(showNext, showTime);
// }
