export function tabsPage() {
  document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container'); // основной блок со слайдами
    const container = document.getElementById('pagination-container');
    if (!container) return; // нет контейнера — нечего делать

    // защитимся от двойной инициализации
    if (container.dataset.paginationInit === '1') return;
    container.dataset.paginationInit = '1';

    const perPage = 8;
    let currentPage = 1;

    // выбираем слайды внутри dataContainer если он есть, иначе по всему документу
    const allSlides = dataContainer
      ? Array.from(dataContainer.querySelectorAll('.product-slide__slide'))
      : Array.from(document.querySelectorAll('.product-slide__slide'));

    // фильтр: убираем клонированные и пустые слайды
    const slides = allSlides.filter((slide) => {
      if (!slide) return false;
      // исключаем типичные классы клонированных слайдов (swiper/slick и т.п.)
      if (
        slide.classList.contains('swiper-slide-duplicate') ||
        slide.classList.contains('slick-cloned') ||
        slide.classList.contains('clone')
      )
        return false;
      // исключаем полностью пустые блоки (без текста, без img и без детей)
      if (
        slide.textContent.trim().length === 0 &&
        slide.querySelector('img') === null &&
        slide.children.length === 0
      )
        return false;
      return true;
    });

    // --- небольшая отладка (при необходимости можно посмотреть в консоли) ---
    // console.log('allSlides:', allSlides.length, 'filtered slides:', slides.length);

    function showPage(page) {
      const totalPages = Math.max(1, Math.ceil(slides.length / perPage));

      // если страниц <= 1 — прячем пагинацию и показываем все слайды
      if (totalPages <= 1) {
        slides.forEach((s) => (s.style.display = ''));
        container.innerHTML = '';
        container.style.display = 'none';
        return;
      } else {
        container.style.display = '';
      }

      // ограничим текущую страницу корректным диапазоном
      currentPage = Math.min(Math.max(1, page), totalPages);

      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      slides.forEach((slide, index) => {
        slide.style.display = index >= start && index < end ? '' : 'none';
      });

      renderPagination(currentPage);
    }

    function renderPagination(activePage) {
      const totalPages = Math.ceil(slides.length / perPage);

      if (totalPages <= 1) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
      }

      container.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = i;
        btn.className = i === activePage ? 'active' : '';
        btn.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
        });
        container.appendChild(btn);
      }
    }

    showPage(currentPage);
  });
}
