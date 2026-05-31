export function burgerMenu(params) {
  document.querySelectorAll('.toggle-menu-3').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('_open');
    });
  });
}
