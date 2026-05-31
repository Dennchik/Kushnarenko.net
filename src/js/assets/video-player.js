export function initVideoPlayer() {
  const playBtn = document.querySelector('.video-play-btn');
  const video = document.getElementById('player-id');
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

  playBtn.addEventListener('click', startVideo);
}
