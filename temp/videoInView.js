//* ✅ - [ isVideoInView ]
export default function videoInView(videoSelector = '#player-id') {
  const video = document.querySelector(videoSelector);
  const playBtn = document.querySelector('.video-play-btn');
  const cover = document.querySelector('.video-cover');
  // if (!video) return;
  if (!playBtn || !video || !cover) return;
  // Проверка видимости видео
  const isVideoInView = () => {
    const videoTop = video.getBoundingClientRect().top;
    return videoTop > -300;
  };

  const startVideo = () => {
    video
      .play()
      .then(() => {
        cover.classList.add('hidden');
        playBtn.classList.add('hidden');
      })
      .catch((error) => console.error('Ошибка:', error));
  };

  // Управление по клику
  const handleVideoClick = () => {
    if (video.paused) {
      video.play().catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Не удалось воспроизвести видео:', err);
        }
      });
    } else {
      video.pause();
    }
  };

  // Управление при скролле
  const handleScroll = () => {
    const videoTop = video.getBoundingClientRect().top;

    if (videoTop < -100 && !video.paused) {
      video.pause();
    } else if (videoTop > -100 && video.paused) {
      video.play().catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Не удалось воспроизвести видео:', err);
        }
      });
    }
  };

  // Инициализация
  // playVideo();
  playBtn.addEventListener('click', startVideo);
  video.addEventListener('click', handleVideoClick);
  window.addEventListener('scroll', handleScroll);

  // Возврат функции очистки (опционально)
  return () => {
    video.removeEventListener('click', handleVideoClick);
    window.removeEventListener('scroll', handleScroll);
  };
}
