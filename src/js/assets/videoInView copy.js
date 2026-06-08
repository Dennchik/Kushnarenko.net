//* ✅ - [ Manual play only ]
export default function videoInView(videoSelector = '#player-id') {
  const video = document.querySelector(videoSelector);
  const playBtn = document.querySelector('.video-play-btn');
  const cover = document.querySelector('.video-cover');

  if (!playBtn || !video || !cover) return;

  const startVideo = () => {
    video
      .play()
      .then(() => {
        cover.classList.add('hidden');
        playBtn.classList.add('hidden');
      })
      .catch((error) => console.error('Ошибка:', error));
  };

  // Управление по клику на само видео
  const handleVideoClick = () => {
    if (video.paused) {
      video
        .play()
        .then(() => {
          cover.classList.add('hidden');
          playBtn.classList.add('hidden');
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Не удалось воспроизвести видео:', err);
          }
        });
    } else {
      video.pause();
    }
  };

  // Запуск только по клику на кнопку Play
  playBtn.addEventListener('click', startVideo);
  // Дополнительно: клик по самому видео тоже управляет воспроизведением
  video.addEventListener('click', handleVideoClick);

  // Возврат функции очистки (опционально)
  return () => {
    video.removeEventListener('click', handleVideoClick);
    playBtn.removeEventListener('click', startVideo);
  };
}
