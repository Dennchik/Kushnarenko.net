/*
  Intersection Observer: anim-block 

  Наблюдатель за пересечением: анимационный блок
  - Изменяет угол поворота элемента с 60 градусов на 0 градусов, когда он попадает в область просмотра снизу.
  - Когда элемент покидает область просмотра вниз (прокрутка вниз), класс удаляется, и элемент "поворачивается обратно".
  - Повторяется каждый раз, когда элемент возвращается снизу.

  Использование:
  - Добавьте CSS (см. комментарий к CSS ниже) в свою таблицу стилей.
  - Добавьте класс "anim-block" к элементам, которые вы хотите анимировать.

*/

document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.anim-block');
  if (!blocks.length) return;

  // Храним предыдущие top значения элементов
  const lastTops = new WeakMap();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const root = entry.rootBounds || { top: 0, bottom: window.innerHeight };

        const currTop = rect.top;
        const prevTop = lastTops.get(entry.target) ?? currTop;
        lastTops.set(entry.target, currTop);

        const movedUp = currTop < prevTop; // элемент движется вверх относительно Viewport
        const movedDown = currTop > prevTop; // элемент движется вниз

        if (entry.isIntersecting) {
          // Если вошёл в экран снизу (двигается вверх)
          if (movedUp) {
            entry.target.classList.add('visible');
          }
        } else {
          // Если элемент вышел вниз за пределы экрана
          if (movedDown && currTop >= (root.bottom || window.innerHeight)) {
            entry.target.classList.remove('visible');
          }
        }
      });
    },
    {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  blocks.forEach((block) => observer.observe(block));
});
