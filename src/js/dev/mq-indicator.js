const mqIndicator = document.createElement('div');
mqIndicator.style.position = 'fixed';
mqIndicator.style.bottom = '10px';
mqIndicator.style.right = '10px';
mqIndicator.style.padding = '5px 10px';
mqIndicator.style.background = 'rgba(0,0,0,0.7)';
mqIndicator.style.color = '#fff';
mqIndicator.style.fontSize = '12px';
mqIndicator.style.borderRadius = '4px';
mqIndicator.style.zIndex = '9999';
mqIndicator.style.pointerEvents = 'none';
mqIndicator.style.fontFamily = 'monospace';
document.body.appendChild(mqIndicator);

// медиа запросы с реальными условиями
const mediaQueries = [
  { query: '(max-width: 599px)' },
  { query: '(min-width: 600px) and (max-width: 1023px)' },
  { query: '(min-width: 1024px)' },
];

function updateIndicator() {
  const width = window.innerWidth;
  const active = mediaQueries.filter(
    (mq) => window.matchMedia(mq.query).matches
  );
  mqIndicator.textContent = `width: ${width}px | active query: ${active.map((a) => a.query).join(' , ')}`;
}

window.addEventListener('resize', updateIndicator);
updateIndicator();

// if (import.meta.env.DEV) {
//   import('./dev/mq-indicator.js');
// }
