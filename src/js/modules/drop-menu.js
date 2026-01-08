import ItcCollapse from '../assets/its-collapse.js';

//* ✅ - [ Drop down menu]
export function dropDownMenu(element) {
  const dropMenu = document.querySelector('.page__dropdown-menu');
  if (!dropMenu) return;
  const collapseEl = dropMenu.querySelector('._collapse');
  const menuLinks = document.querySelectorAll('.dropdown-menu__button');
  const header = document.querySelector('.page__header');
  const menuFloat = document.querySelector('.menu-float');
  const button = document.querySelector(element);
  const tabContents = dropMenu.querySelectorAll('.dropdown-menu__tab');

  if (!collapseEl || !header || !button || !collapseEl) return;

  // ✅  создаём collapse-instance
  dropMenu._collapseInstance = new ItcCollapse(collapseEl);

  // ✅ активируем первый элемент меню и первый таб
  if (menuLinks.length > 0) {
    menuLinks[0].classList.add('active');
    if (tabContents.length > 0) {
      tabContents[0].classList.add('active');
    }
  }

  let heightOffset = 0;
  let rectHeader = 0;
  let menuIsOpen = false;

  document.addEventListener('DOMContentLoaded', () => {
    function updateHeightOffset() {
      const rectFloat = menuFloat?.getBoundingClientRect().height || 0;
      rectHeader = header.getBoundingClientRect().height;
      heightOffset = rectHeader + rectFloat;
    }

    function applyMenuHeight() {
      dropMenu.style.height = `calc(100vh - ${heightOffset}px)`;
      dropMenu.style.top = `${rectHeader}px`;
      // tabsItem.style.height = `calc(100vh - 3rem - ${heightOffset}px)`;
      // ButtonsItem.style.height = `calc(100vh - 3rem - ${heightOffset}px)`;
    }

    // ❗ Пересчёт при загрузке
    updateHeightOffset();

    function resizeElement() {
      function setEvent() {
        eventButton();
      }

      return setEvent;
    }

    let resizeEl = resizeElement();

    // ✅ пересчёт при resize и scroll
    ['scroll', 'resize', 'click'].forEach((evt) => {
      window.addEventListener(evt, () => {
        updateHeightOffset();
        if (menuIsOpen) applyMenuHeight();
      });
    });

    resizeEl();

    function eventButton() {
      button.addEventListener('click', () => {
        const isOpening = !dropMenu.classList.contains('open');

        // ❗ обновляем размеры перед каждым кликом
        updateHeightOffset();
        document.body.classList.toggle('no-scroll', isOpening);
        dropMenu.classList.toggle('open', isOpening);
        dropMenu._collapseInstance.toggle();

        dropMenu.style.height = isOpening
          ? `calc(100vh - ${heightOffset}px)`
          : `0px`;

        // ❗ top всегда равен высоте шапки
        dropMenu.style.top = `${rectHeader}px`;
        menuIsOpen = isOpening;
      });
    }
  });

  // ✅ Навешиваем клики на все menuLinks
  menuLinks.forEach((menuLink, index) => {
    menuLink.addEventListener('click', () => {
      // ❗ If the clicked element is already active, we do nothing.
      if (menuLink.classList.contains('active')) return;

      // ❗ Removing active from all links and all tabs
      menuLinks.forEach((link) => link.classList.remove('active'));
      tabContents.forEach((tab) => tab.classList.remove('active'));

      // ❗ Добавляем active на кликнутый элемент и соответствующий tab
      menuLink.classList.add('active');
      if (tabContents[index]) tabContents[index].classList.add('active');
    });
  });
}

//* ✅ - [ Выпадающий список ]
export function collapseToggle() {
  const items = document.querySelectorAll('._slideToggle');
  const closeButton = document.querySelector('.widget__icon');
  items.forEach((item) => {
    const trigger = item.querySelector('._trigger');

    if (!trigger) return;
    //🔹 Создаём объект ItcCollapse один раз и сохраняем в элементе
    const collapseEl = item.querySelector('._collapse');
    if (!collapseEl) return;
    item._collapseInstance = new ItcCollapse(collapseEl);

    trigger.addEventListener('click', () => {
      //🔹 Закрываем другие элементы в том же аккордеоне
      const collapse = item.closest('.parent');
      if (collapse) {
        const opened = collapse.querySelector('._open');
        if (opened && opened !== item) {
          opened.classList.remove('_open');
          opened._collapseInstance.toggle();
        }
      }

      //🔹 Переключаем текущий
      item.classList.toggle('_open');
      item._collapseInstance.toggle();
    });

    if (!closeButton) return;
    closeButton.addEventListener('click', () => {
      item._collapseInstance.toggle();
    });
  });
}

export function collapseToggleOne() {
  const items = document.querySelectorAll('._slideToggleOne');

  items.forEach((item) => {
    const trigger = item.querySelector('._trigger');

    if (!trigger) return;
    //🔹 Создаём объект ItcCollapse один раз и сохраняем в элементе
    const collapseEl = item.querySelector('._collapse');
    if (!collapseEl) return;
    item._collapseInstance = new ItcCollapse(collapseEl);

    trigger.addEventListener('click', () => {
      //🔹 Переключаем текущий
      item.classList.toggle('_open');
      item._collapseInstance.toggle();
    });
  });
}
