import wNumb from 'wnumb';
import noUiSlider from 'nouislider';

export function noUiSlide(element) {
  const priceSlider = document.querySelector(element);
  noUiSlider.create(priceSlider, {
    start: [0, 1000000],
    behaviour: 'drag',
    connect: true,
    // tooltips: [
    //   wNumb({ decimals: 0, thousand: ' ', suffix: ' (R)' }),
    //   wNumb({ decimals: 0, thousand: ' ', suffix: ' (R)' }),
    // ],
    range: {
      min: [0],
      max: [1000000],
    },
    format: wNumb({
      decimals: 0,
      thousand: ' ',
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return parseInt(value);
      },
    }),
  });
  const priceStart = document.getElementById('price-start');
  const priceEnd = document.getElementById('price-end');
  const inputs = [priceStart, priceEnd];
  priceSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
  });
  inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
      priceSlider.noUiSlider.setHandle(handle, this.value);
    });
  });

  // document
  //   .querySelector('.form-categories__button')
  //   .addEventListener('click', function (e) {
  //     e.preventDefault(); // предотвращаем стандартный reset, если нужно
  //     priceSlider.noUiSlider.set([0, 1000000]); // сбрасываем значения
  //     priceStart.value = 0;
  //     priceEnd.value = 1000000;
  //   });

  document
    .querySelector('.form-categories')
    .addEventListener('reset', function () {
      priceSlider.noUiSlider.set([0, 1000000]);
    });
}
