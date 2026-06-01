export default function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    sidebarMenu.classList.add('_close-menu');
    setTimeout(() => {
      asideButton.style.opacity = '1';
      asideButton.style.transition = 'opacity 0.2s ease-in-out';
      asideButton.style.pointerEvents = 'all';
      document.body.classList.remove('no-scroll');
      sidebarMenu.style.transition = 'transform 0.2s ease-in-out';
      sidebarMenu.addEventListener(
        'transitionend',
        function transitionEndHandler() {
          sidebarMenu.style.transition = '';
          sidebarMenu.removeEventListener(
            'transitionend',
            transitionEndHandler
          );
        },
        { once: true }
      );
      sidebarMenu.classList.remove('_open-menu');
      sidebarMenu.classList.remove('_close-menu');
    }, 300);
  } else {
    asideButton.style.opacity = '0';
    asideButton.style.transition = 'opacity 0.2s ease-in-out';
    asideButton.style.pointerEvents = 'none';
    sidebarMenu.classList.add('_open-menu');
    document.body.classList.add('no-scroll');
    sidebarMenu.style.transition = 'transform 0.2s ease-in-out';
    sidebarMenu.addEventListener(
      'transitionend',
      function transitionEndHandler() {
        sidebarMenu.style.transition = '';
        sidebarMenu.removeEventListener('transitionend', transitionEndHandler);
      },
      { once: true }
    );
  }
}
