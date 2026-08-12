export default function videoInView(videoSelector = '.video-js') {
  const videos = document.querySelectorAll(videoSelector);

  if (!videos.length) return;

  videos.forEach((video) => {
    const parent = video.parentElement;

    const playBtn = parent.querySelector('.video-play-btn');
    const cover = parent.querySelector('.video-cover');

    if (!playBtn || !cover) return;

    // Функция скрытия обложки и кнопки
    const hideCoverAndButton = () => {
      cover.classList.add('hidden');
      playBtn.classList.add('hidden');
    };

    // Функция показа обложки и кнопки
    const showCoverAndButton = () => {
      cover.classList.remove('hidden');
      playBtn.classList.remove('hidden');
    };

    // Запуск видео по клику на кнопку Play
    const startVideo = () => {
      video
        .play()
        .then(() => {
          // Скрытие произойдет также в обработчике 'play'
          // но на всякий случай
          hideCoverAndButton();
        })
        .catch((error) => {
          console.error('Ошибка воспроизведения:', error);
        });
    };

    // Обработчики Video.js / нативного video
    video.addEventListener('play', hideCoverAndButton);

    video.addEventListener('pause', () => {
      // При паузе показываем кнопку Play,
      // обложку оставляем скрытой
      playBtn.classList.remove('hidden');
    });

    video.addEventListener('ended', showCoverAndButton);

    playBtn.addEventListener('click', startVideo);
    video.addEventListener('pointerup', () => {
      if (!video.paused) {
        video.pause();
      }
    });
    // Если видео уже запущено
    if (!video.paused) {
      hideCoverAndButton();
    }
  });
}
