export function counterProduct() {
  const containers = document.querySelectorAll('[data-quantity-container]');
  if (!containers.length) return;

  containers.forEach((container) => {
    // При загрузке проверяем кнопки "-" и сразу считаем суммы
    container.querySelectorAll('.quantity').forEach((quantityBlock) => {
      const input = quantityBlock.querySelector('input');
      const removeBtn = quantityBlock.querySelector('.quantity-remove');
      if (Number(input.value) <= 0) {
        removeBtn.classList.add('_disabled');
      } else {
        removeBtn.classList.remove('_disabled');
      }
    });

    _totalSum(container);

    // Клик по кнопкам +/-
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.quantity__button');
      if (!btn) return;

      const quantityBlock = btn.closest('.quantity');
      const input = quantityBlock.querySelector('input');
      const removeBtn = quantityBlock.querySelector('.quantity-remove');

      let value = Number(input.value) || 0;

      if (btn.classList.contains('quantity-add')) {
        value++;
      } else {
        value--;
      }

      if (value <= 0) {
        value = 0;
        removeBtn.classList.add('_disabled');
      } else {
        removeBtn.classList.remove('_disabled');
      }

      input.value = value;
      _totalSum(container);
    });

    // Ввод вручную
    container.addEventListener('input', (e) => {
      const input = e.target.closest('.quantity input');
      if (!input) return;

      input.value = input.value.replace(/\D/g, '');

      const removeBtn = input
        .closest('.quantity')
        .querySelector('.quantity-remove');
      if (Number(input.value) <= 0) {
        removeBtn.classList.add('_disabled');
      } else {
        removeBtn.classList.remove('_disabled');
      }

      _totalSum(container);
    });
  });

  // Подсчёт суммы внутри конкретного контейнера
  function _totalSum(container) {
    const productPrices = container.querySelectorAll(
      // '.product-card__price span'
      '.price-product span'
    );
    let totalSum = 0;

    productPrices.forEach((priceEl) => {
      const valuePrice =
        parseFloat(priceEl.textContent.replace(/ /g, '').replace(',', '.')) ||
        0;
      const card = priceEl.closest('.product-card, .card-counter');
      const quantity = Number(card.querySelector('input').value) || 0;

      // Ищем блок суммы
      // const productSumWrap = card.querySelector('.product-card__sum span');
      const productSumWrap = card.querySelector('.product-sum span');
      if (!productSumWrap) return; // если нет — пропускаем

      // Считаем сумму по товару
      const productSum = valuePrice * quantity;

      // Обновляем сумму в span
      productSumWrap.innerHTML = `${productSum.toLocaleString()} <i class="icon-rub"></i>`;

      totalSum += productSum;
    });

    // Обновляем общий итог
    const totalEl = container.querySelector('.input-total');
    if (totalEl) {
      totalEl.innerHTML = `Итого: ${totalSum.toLocaleString()} <i class="icon-rub"></i>`;
    }
  }
}
