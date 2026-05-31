export function burgerMenu(params) {
  document.querySelectorAll('.toggle-menu').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('_open');
      const mobileMenu = document.querySelector('.mobile-menu');
      mobileMenu.classList.toggle('_show');
    });
  });
}
