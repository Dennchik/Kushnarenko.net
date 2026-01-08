//* - [Переключение полей формы]
export function fieldSetsToggle() {
  const container = document.querySelector('.form-question__content');
  const fieldSets = document.querySelectorAll(
    '.form-question .form-question__fieldset-table'
  );
  let current = 0;

  const updateContainerHeight = () => {
    const active = container.querySelector(
      '.form-question__fieldset-table.active'
    );
    if (active) {
      const height = active.offsetHeight;
      container.style.height = `${height}px`;
    }
  };

  const showFieldset = (index) => {
    fieldSets.forEach((fs) => fs.classList.remove('active'));
    fieldSets[index].classList.add('active');
    updateContainerHeight();
  };

  document.querySelectorAll('._btn-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current < fieldSets.length - 1) {
        current++;
        showFieldset(current);
      }
    });
  });

  document.querySelectorAll('._btn-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showFieldset(current);
      }
    });
  });

  return {
    showFieldset, // 👈 экспортируем
  };
}
