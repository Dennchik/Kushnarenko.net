export default function videoInView() {
  const videos = document.querySelectorAll('.video-js');

  if (!videos.length) return;

  const cleanups = [];
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  videos.forEach((video) => {
    const parent = video.parentElement;
    const cover = parent.querySelector('.video-cover__overlay');
    const playBtn = parent.querySelector('.video-play-btn');

    if (!playBtn || !cover) return;

    const hideCoverAndButton = () => {
      cover.classList.add('hidden');
      playBtn.classList.add('hidden');
    };

    const showCoverAndButton = () => {
      cover.classList.remove('hidden');

      if (!isMobile) {
        playBtn.classList.remove('hidden');
      }
    };

    const startVideo = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      video.play().catch((error) => {
        console.error('Ошибка воспроизведения:', error);
      });
    };

    const handlePlay = () => {
      hideCoverAndButton();
    };

    const handlePause = () => {
      // На мобильном свою кнопку не показываем.
      if (isMobile) return;

      // На ПК показываем нашу кнопку.
      playBtn.classList.remove('hidden');
    };

    const handleEnded = () => {
      showCoverAndButton();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    playBtn.addEventListener('click', startVideo);

    if (!video.paused) {
      hideCoverAndButton();
    }

    cleanups.push(() => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);

      playBtn.removeEventListener('click', startVideo);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
