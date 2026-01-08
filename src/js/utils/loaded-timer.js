export function loadedTimer() {
  const loader = document.querySelector('.loader');
  const loaderTimer = document.querySelector('.loader__timer');
  const startTime = performance.now();
  if (!loader) return;

  window.addEventListener('load', () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    let currentTime = 0;
    const step = 16; // примерно 60FPS

    const timer = setInterval(() => {
      currentTime += step;

      if (currentTime > loadTime) currentTime = loadTime;

      const seconds = Math.floor(currentTime / 1000);
      const milliseconds = Math.floor(currentTime % 1000);
      loaderTimer.textContent = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;

      if (currentTime >= loadTime) {
        clearInterval(timer);

        // Анимация масштабирования
        setTimeout(() => {
          loaderTimer.style.transform = 'scale(2)';
          setTimeout(() => {
            loaderTimer.style.transform = 'scale(1)';
            setTimeout(() => {
              loader.remove();
            }, 500);
          }, 300);
        }, 100);
      }
    }, step);
  });
}
