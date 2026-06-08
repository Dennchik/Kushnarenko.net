export function validateForm() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('._order-form').forEach((form, index) => {
      // Находим элементы, но не прерываем выполнение если какие-то отсутствуют
      const name = form.querySelector('input.name');
      const phone = form.querySelector('input.phone');
      const email = form.querySelector('input.email');
      const password = form.querySelector('input.password');
      const checkbox = form.querySelector('.check-box__input');
      const sendButton = form.querySelector('.send-button');
      const buttonContainer = sendButton
        ? sendButton.closest('.button-container')
        : null;

      console.log(`Форма ${index + 1}:`, {
        password,
        email,
        name,
        phone,
        checkbox,
        sendButton,
        buttonContainer,
      });

      /**
       * @param {HTMLElement} el — элемент или его контейнер для анимации
       * @param {Object} options
       * @param {number} options.maxSpread  — максимальный «размах» тени (px)
       * @param {number} options.duration   — общее время анимации (ms)
       * @param {number} options.pulses     — количество «туда‑обратно» за это
       */
      function animateError(
        el,
        { maxSpread = 12, duration = 1000, pulses = 3 } = {}
      ) {
        if (!el) return;

        const container = el.closest('.button-container') || el.parentElement;
        if (!container) return;

        let startTime = null;
        const totalTime = duration;

        function frame(ts) {
          if (!startTime) startTime = ts;
          const elapsed = ts - startTime;
          const progress = Math.min(elapsed / totalTime, 1);
          const wave = Math.abs(Math.sin(progress * pulses * Math.PI));
          const spread = maxSpread * wave;
          const alarmColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--alarm-color')
            .trim();

          container.style.boxShadow = `0 0 ${spread}px ${spread / 2}px ${alarmColor}`;

          if (elapsed < totalTime) {
            requestAnimationFrame(frame);
          } else {
            container.style.boxShadow = '';
          }
        }

        requestAnimationFrame(frame);
      }

      function validateFormFields() {
        // Проверяем только существующие поля
        let isValid = true;
        if (password) {
          const passwordVal = password.value.trim();
          if (passwordVal.length < 3) isValid = false;
        }
        if (email) {
          const emailVal = email.value.trim();
          if (emailVal.length < 3) isValid = false;
        }
        if (name) {
          const nameVal = name.value.trim();
          if (nameVal.length < 3) isValid = false;
        }

        if (phone) {
          const phoneVal = phone.value.trim();
          if (phoneVal.length !== 18) isValid = false;
        }

        if (checkbox) {
          if (!checkbox.checked) isValid = false;
        }

        // Обновляем состояние только если контейнер и кнопка существуют
        if (buttonContainer) {
          buttonContainer.classList.toggle('is-disabled', !isValid);
        }

        if (sendButton) {
          sendButton.disabled = !isValid;
        }

        return isValid;
      }

      function showValidationErrors() {
        if (password && password.value.trim().length < 3)
          animateError(password);
        if (email && email.value.trim().length < 3) animateError(email);
        if (name && name.value.trim().length < 3) animateError(name);
        if (phone && phone.value.trim().length !== 18) animateError(phone);
        if (checkbox && !checkbox.checked) animateError(checkbox);
      }

      // Добавляем обработчики только для существующих элементов
      if (password) password.addEventListener('input', validateFormFields);
      if (email) email.addEventListener('input', validateFormFields);
      if (name) name.addEventListener('input', validateFormFields);
      if (phone) phone.addEventListener('input', validateFormFields);
      if (checkbox) checkbox.addEventListener('change', validateFormFields);

      // Инициализируем валидацию
      validateFormFields();

      // Обработчик клика по контейнеру (если существует)
      if (buttonContainer) {
        buttonContainer.addEventListener('click', (e) => {
          if (buttonContainer.classList.contains('is-disabled')) {
            e.preventDefault();
            console.warn(`⚠️ [Форма ${index + 1}] Невалидная попытка отправки`);
            showValidationErrors();
          }
        });
      }

      // Обработчик отправки формы (если кнопка существует)
      if (sendButton) {
        sendButton.addEventListener('click', () => {
          if (
            !sendButton.disabled &&
            (!buttonContainer ||
              !buttonContainer.classList.contains('is-disabled'))
          ) {
            // Получаем название цели для аналитики из кнопки
            let goalName = '';
            if (sendButton) {
              goalName = sendButton.getAttribute('goal-name') || '';
            }

            // Собираем данные из формы
            const formData = new FormData();
            formData.append('action', 'send_telegram_message');

            // Получаем номер телефона (если есть)
            if (phone && phone.value) {
              formData.append('phone', phone.value.trim());
            }

            // Получаем имя (если есть)
            if (name && name.value) {
              formData.append('name', name.value.trim());
            }

            // Добавляем имя цели (если есть)
            formData.append('goalName', goalName);

            // Отправляем данные через AJAX
            fetch(localizedVars.ajax_url, {
              method: 'POST',
              headers: {
                'X-WP-Nonce': localizedVars.ajax_nonce,
              },
              body: formData,
            })
              .then((response) => response.text())
              .then((responseText) => {
                alert('Ваш запрос отправлен.');
                console.log('Ответ сервера:', responseText);

                // Очищаем существующие поля
                if (email) email.value = '';
                if (phone) phone.value = '';
                if (name) name.value = '';
                if (checkbox) checkbox.checked = false;

                // Обновляем состояние формы
                validateFormFields();
              })
              .catch((error) => {
                console.error('Ошибка при отправке:', error);
                alert('Произошла ошибка при отправке данных.');
              });
          }
        });
      }
    });
  });
}
