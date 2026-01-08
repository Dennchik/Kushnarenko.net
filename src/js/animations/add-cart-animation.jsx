//* ✅ Animation target, add item to target

export function addCartAnimation(targetEl, trigger, itemEl, itemTarget, mod) {
  const targetElement = document.querySelector(targetEl);
  const itemValue = document.querySelector(`${targetEl} span`);
  const speedAnimation = 500;
  // ⚠️ Объявляем переменную в начале
  const itemTargetElement = document.querySelector(itemTarget);
  if (!targetElement) return;
  document.addEventListener('click', function (e) {
    const triggerElement = e.target;

    if (
      triggerElement.closest(trigger) &&
      triggerElement.closest(trigger).classList.contains(mod)
    ) {
      const parent = triggerElement.closest(trigger);
      const item = parent.querySelector(itemEl);
      const itemFly = item.cloneNode(true);

      const targetElementPos = {
        left: targetElement.getBoundingClientRect().right,
        top: targetElement.getBoundingClientRect().top,
      };
      itemFly.style.cssText = `
        position:fixed;
        left:${item.getBoundingClientRect().left}px;
        top:${item.getBoundingClientRect().bottom}px;
        width:${item.offsetWidth}px;
        height:${item.offsetHeight}px;
        transition: all ${speedAnimation}ms ease;
        z-index: 1000;
      `;
      document.body.append(itemFly);
      setTimeout(() => {
        itemFly.style.left = `${targetElementPos.left}px`;
        itemFly.style.top = `${targetElementPos.top}px`;
        itemFly.style.width = `0px`;
        itemFly.style.height = `0px`;
        itemFly.style.opacity = `0.5`;
      }, 0);
      setTimeout(() => {
        itemValue.textContent = parseInt(itemValue.textContent, 10) + 1;
        itemFly.remove();
        if (parseInt(itemValue.textContent, 10) > 0) {
          itemTargetElement.style.transform = 'scale(1)';
        }
      }, speedAnimation);
    }
    if (
      triggerElement.closest(trigger) &&
      !triggerElement.closest(trigger).classList.contains(mod)
    ) {
      setTimeout(() => {
        itemValue.textContent = parseInt(itemValue.textContent, 10) - 1;
      });
    }
    setTimeout(() => {
      if (parseInt(itemValue.textContent, 10) <= 0) {
        itemTargetElement.style.transform = 'scale(0)';
      }
    });
  });
}
