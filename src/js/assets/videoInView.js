export default function videoInView() {
  const videos = document.querySelectorAll('.video-js');

  console.log('Найдено видео:', videos.length);

  if (!videos.length) return;

  const cleanups = [];

  videos.forEach((video, index) => {
    console.log(`=== Видео ${index + 1} ===`);

    // Ищем в родителе
    const parent = video.parentElement;
    const cover = parent.querySelector('.video-cover__overlay');
    const playBtn = parent.querySelector('.video-play-btn');

    console.log('parent:', parent);
    console.log('cover найден?', !!cover);
    console.log('playBtn найден?', !!playBtn);

    if (!playBtn || !cover) {
      console.log(`❌ Видео ${index + 1} пропущено`);
      return;
    }

    const hideCoverAndButton = () => {
      cover.classList.add('hidden');
      playBtn.classList.add('hidden');
    };

    const showCoverAndButton = () => {
      cover.classList.remove('hidden');
      playBtn.classList.remove('hidden');
    };

    const startVideo = (e) => {
      console.log(`▶️ Кнопка нажата на видео ${index + 1}!`);
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      video
        .play()
        .then(() => {
          console.log(`✅ Видео ${index + 1} запущено`);
        })
        .catch((error) => {
          console.error(`❌ Ошибка на видео ${index + 1}:`, error);
        });
    };

    const handlePlay = () => {
      console.log(`🎬 Видео ${index + 1} играет`);
      hideCoverAndButton();
    };

    const handlePause = () => {
      console.log(`⏸️ Видео ${index + 1} на паузе`);
      playBtn.classList.remove('hidden');
    };

    const handleEnded = () => {
      console.log(`⏹️ Видео ${index + 1} закончилось`);
      showCoverAndButton();
    };

    const handleVideoClick = (e) => {
      console.log(`🖱️ Клик по видео ${index + 1}`);
      e.stopPropagation();
      if (video.paused) {
        startVideo(e);
      } else {
        video.pause();
        playBtn.classList.remove('hidden');
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('click', handleVideoClick);

    playBtn.addEventListener('click', startVideo);

    if (!video.paused) {
      hideCoverAndButton();
    }

    cleanups.push(() => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('click', handleVideoClick);
      playBtn.removeEventListener('click', startVideo);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
