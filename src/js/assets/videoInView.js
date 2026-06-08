export default function videoInView(videoSelector = '#player-id') {
  const video = document.querySelector(videoSelector);
  const playBtn = document.querySelector('.video-play-btn');
  const cover = document.querySelector('.video-cover');

  if (!playBtn || !video || !cover) return;

  // Функция скрытия обложки и кнопки
  const hideCoverAndButton = () => {
    cover.classList.add('hidden');
    playBtn.classList.add('hidden');
  };

  // Функция показа обложки и кнопки (если нужно при паузе)
  const showCoverAndButton = () => {
    cover.classList.remove('hidden');
    playBtn.classList.remove('hidden');
  };

  // Запуск видео по клику на кнопку Play
  const startVideo = () => {
    video
      .play()
      .then(() => {
        // скрытие произойдет также в обработчике 'play'
        // но на всякий случай
        hideCoverAndButton();
      })
      .catch((error) => console.error('Ошибка воспроизведения:', error));
  };

  // Обработчики событий Video.js (или нативного видео)
  video.addEventListener('play', hideCoverAndButton);
  video.addEventListener('pause', () => {
    // При паузе показываем кнопку play а обложку оставляем скрытой.

    playBtn.classList.remove('hidden');
  });

  // Также при завершении видео (ended) можно показать кнопку play заново
  video.addEventListener('ended', () => {
    showCoverAndButton(); // или только playBtn
  });

  playBtn.addEventListener('click', startVideo);

  // Если видео уже запущено (например, после скролла — но мы убрали скролл), то скрываем элементы
  if (!video.paused) {
    hideCoverAndButton();
  }

  // Возврат функции очистки
  return () => {
    video.removeEventListener('play', hideCoverAndButton);
    video.removeEventListener('pause', showCoverAndButton); // нужно сохранить ссылку
    video.removeEventListener('ended', showCoverAndButton);
    playBtn.removeEventListener('click', startVideo);
  };
}
