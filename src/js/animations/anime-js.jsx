import {
  animate,
  createTimer,
  createTimeline,
  createScope,
  stagger,
  text,
  onScroll,
  utils,
} from 'animejs';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

//* ----------------------------------------------------------------------------
export function animateHeader() {
  // function loopAnimation() {
  //   document.querySelectorAll('.header-blink, .button-blink').forEach((el) => {
  //     animate(el, {
  //       left: ['-100%', '150%'],
  //       duration: 3000,
  //       easing: 'easeOutSine',
  //       direction: 'alternate',
  //       loop: false,
  //       complete: () => {
  //         setTimeout(loopAnimation, 6000); // Пауза между циклами
  //       },
  //     });
  //   });
  // }

  // loopAnimation();

  //* - [Анимация главного блока] -
  const timeline = createTimeline({
    defaults: { delay: 300, duration: 950 },
  });

  timeline
    .add('.tl-1', { x: { from: '15rem' }, opacity: [0, 1] })
    .add('.tl-2', { x: { from: '15rem' }, opacity: [0, 1] }, 600)
    .add('.tl-3', { x: { from: '20rem' }, opacity: [0, 1] }, 1200)
    .add('.tl-4', { x: { from: '15rem' }, opacity: [0, 1] }, 1900);
}
//* ----------------------------------------------------------------------------
export function fadeInItemRight(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        x: ['30%', '0%'],
        opacity: [0, 1],
        ease: 'linear',

        autoplay: onScroll({
          enter: 'bottom-=10 top',
          leave: 'bottom-=250 top',
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}
//* ----------------------------------------------------------------------------
export function fadeInItemLeft(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        x: ['-30%', '0%'],
        opacity: [0, 1],
        ease: 'liner',

        autoplay: onScroll({
          enter: 'bottom-=10 top',
          leave: 'bottom-=250 top',
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}
//* ----------------------------------------------------------------------------
export function fadeInItemCenter(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        y: ['30%', '0%'],
        opacity: [0, 1],
        ease: 'liner',

        autoplay: onScroll({
          enter: 'bottom-=10 top',
          leave: 'bottom-=250 top',
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}
//* ----------------------------------------------------------------------------
export function smoothScrollTitle(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        x: ['20%', '0%'],
        ease: 'inOut(1.675)',
        autoplay: onScroll({
          target: el,
          // debug: true,
        }),
      });
    }
  });
}

//* ----------------------------------------------------------------------------
export function composition() {
  const squares = utils.$('.square');
  const [$blend] = squares;

  // Animate each square with a different composition mode

  squares.forEach(($square) => {
    // 'none', 'replace', 'blend'
    const mode = $square.classList[1];
    animate($square, {
      scale: [0.5, 1],
      alternate: true,
      loop: true,
      duration: 750,
      composition: mode,
    });
  });

  // Common animation parameters

  const enter = { scale: 1.5, duration: 350 };
  const leave = { scale: 1.0, duration: 250 };

  // Composition blend animations

  const enterBlend = () =>
    animate($blend, {
      composition: 'blend',
      ...enter,
    });

  const leaveBlend = () =>
    animate($blend, {
      composition: 'blend',
      ...leave,
    });

  $blend.addEventListener('mouseenter', enterBlend);
  $blend.addEventListener('mouseleave', leaveBlend);
}
//* ----------------------------------------------------------------------------
export function animateLinks() {
  //* - [Анимация Links] -
  document.querySelectorAll('.header__link-key').forEach((el) => {
    createScope({
      root: el,
      defaults: {
        ease: 'outQuad',
        duration: 500,
      },
    }).add((scope) => {
      const { root, methods } = scope;

      // Разбиваем текст на символы
      text.split(root, {
        chars: {
          class: 'char',
          clone: 'left',
          wrap: 'clip',
        },
      });

      //* Создаём анимацию
      const rotateAnim = createTimeline({
        autoplay: false,
        defaults: { ease: 'inOutQuad', duration: 400 },
      }).add('.char > span', { x: '100%' }, stagger(5, { use: 'data-char' }));

      //* Обработчики наведения
      if (!isMobile) {
        scope.add('onEnter', () => animate(rotateAnim, { progress: 1 }));
        scope.add('onLeave', () => animate(rotateAnim, { progress: 0 }));
      }

      root.addEventListener(
        'pointerenter',
        /** @type {EventListener} */ (methods.onEnter)
      );
      root.addEventListener(
        'pointerleave',
        /** @type {EventListener} */ (methods.onLeave)
      );
    });
  });
}
//* ----------------------------------------------------------------------------
