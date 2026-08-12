import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
//* ____________________ [Регистрация - (GSAP) plugins] ________________________
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);

//* ____________________ [Конфигурация - ScrollTrigger] ________________________

//* ___________________________[ScrollSmoother] ________________________________
//? Speed	Скорость реагирования скролла	0.5(медленно) → 2(быстро)
//? Smooth	Плавность / инерция скролла	0.5 → 2
//? Effects	Включает поддержку.effects()	true / false
//? smoothTouch	Плавность скролла на тач - устройствах	0 → 1;

export function smoother() {
  ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    speed: 1,
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });
}

//* ___________________________ [applyParallax] ________________________________
export function applyParallax(element) {
  const smootherInstance = ScrollSmoother.get();
  smootherInstance.effects(element, {
    speed: () => 0.5,
  });
}

//* ----------------------------------------------------------------------------
export function initHero() {
  console.clear();

  function initIntro() {
    // Ждём загрузки шрифтов перед созданием SplitText
    document.fonts.ready.then(() => {
      const introTitle = new SplitText('.intro__title', {
        type: 'lines',
        linesClass: 'intro-line',
      });

      let tlImg = gsap.timeline({ delay: 0 });
      tlImg.from(
        '.intro-img',
        {
          opacity: 0,
          ease: 'power2',
          duration: 5,
        },
        0.1
      );

      let tl = gsap.timeline({ delay: 1 });
      tl.from('.intro-line', {
        x: 50,
        opacity: 0,
        ease: 'power4',
        duration: 3,
      })
        .from(
          '.intro-name',
          {
            x: -50,
            opacity: 0,
            ease: 'power4',
            duration: 3,
          },
          0.2
        )
        .from(
          '.intro-txt',
          {
            x: -50,
            opacity: 0,
            ease: 'power4',
            duration: 3,
          },
          0.3
        );
    });
  }

  function init() {
    initIntro();
  }

  init();
}

//* ----------------------------------------------------------------------------
export function tlFooterParallel() {
  const tlParallel = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-about__grid',
      start: 'top bottom',
      endTrigger: '.section-about__grid',
      end: 'bottom bottom+=500',
      scrub: 2,
      toggleActions: 'play none none reverse',
      // markers: true,
    },
  });
  tlParallel.from('.its-el-left', {
    x: -250,
    duration: 1,
    opacity: 0,
    ease: 'sine.inOut',
  });

  tlParallel.from(
    '.its-el-center',
    {
      // x: window.innerWidth <= 680 ? 350 : 0,
      y: window.innerWidth > 680 ? 150 : 0,
      duration: 1,
      opacity: 0,
      ease: 'sine.inOut',
    },
    '-=1'
  );

  tlParallel.from(
    '.its-el-right',
    {
      x: window.innerWidth <= 680 ? -350 : window.innerWidth > 680 ? 350 : 0,
      duration: 1,
      opacity: 0,
      ease: 'sine.inOut',
    },
    '-=1'
  );
}

//* ----------------------------------------------------------------------------

export function tlFooterParallelSecond() {
  const tlParallel = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-card--stats',
      start: 'top bottom',
      endTrigger: '.about-card--stats',
      end: 'bottom bottom+=10',
      scrub: 2,
      toggleActions: 'play none none reverse',
      // markers: true,
    },
  });
  tlParallel.from('.timeline-1', {
    x: -250,
    duration: 1,
    opacity: 0,
    ease: 'sine.inOut',
  });

  tlParallel.from(
    '.timeline-2',
    {
      x: window.innerWidth <= 680 ? -350 : window.innerWidth > 680 ? 350 : 0,
      duration: 1,
      opacity: 0,
      ease: 'sine.inOut',
    },
    '-=1'
  );
}

//* ----------------------------------------------------------------------------
export function composition() {
  const squares = document.querySelectorAll('.square');
  const animateInner = document.querySelectorAll('.animate-inner');
  const animateItems = document.querySelectorAll('.approach-item');
  const eventCards = document.querySelectorAll('.event-card');
  const priceCard = document.querySelectorAll('.price-card');
  const faqItem = document.querySelectorAll('.animate-items');

  if (
    !squares.length &&
    !animateInner.length &&
    !animateItems.length &&
    !eventCards.length &&
    !priceCard.length
  ) {
    return;
  }

  //* Каскадное появление - section-price
  if (priceCard.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-price',
        start: 'top+=200 bottom',
        endTrigger: '.section-price',
        end: 'bottom bottom',
        scrub: 2,
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    priceCard.forEach((item) => {
      tl.from(
        item,
        {
          opacity: 0,
          duration: 1,
          ease: 'sine.inOut',
        },
        '-=0.58'
      );
    });
  }

  //* Каскадное появление - event-card
  if (eventCards.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-events',
        start: 'top+=200 bottom',
        endTrigger: '.section-events',
        end: 'bottom-=200 bottom',
        scrub: 2,
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    eventCards.forEach((item) => {
      tl.from(
        item,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: 'sine.inOut',
        },
        '-=0.58'
      );
    });
  }

  //* Каскадное появление - approach-item
  if (animateItems.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-approach',
        start: 'top+=190 bottom',
        endTrigger: '.section-approach',
        end: 'bottom bottom',
        scrub: 2,
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    animateItems.forEach((item) => {
      tl.from(
        item,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: 'sine.inOut',
        },
        '-=0.58'
      );
    });
  }

  //* Каскадное появление - animate-inner
  if (animateInner.length) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.animate-inner',
        start: 'top+=150 bottom',
        endTrigger: '.animate-inner',
        end: 'bottom+=100 bottom',
        scrub: 2,
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    animateInner.forEach((item) => {
      tl.from(
        item,
        {
          x: 50,
          opacity: 0,
          duration: 2.5,
          ease: 'sine.inOut',
        },
        '-=0.58'
      );
    });
  }

  //* Пульсация квадратов
  squares.forEach((square) => {
    gsap.fromTo(
      square,
      {
        scale: 0.5,
      },
      {
        scale: 1,
        duration: 0.75,
        yoyo: true,
        repeat: -1,
        ease: 'none',

        scrollTrigger: {
          trigger: square,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play pause play pause',
        },
      }
    );
  });

  //* Каскадное появление - section-faq
  if (faqItem) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-faq',
        start: 'top+=250 bottom',
        endTrigger: '.section-faq',
        end: 'bottom+=50 bottom',
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    faqItem.forEach((item) => {
      tl.from(
        item,
        {
          ease: 'sine.inOut',
          opacity: 0,
          scale: 0,
          duration: 0.8,
        },
        '-=0.58'
      );
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      endTrigger: '.footer',
      end: 'bottom bottom',
      scrub: 2,
      toggleActions: 'play none none reverse',
      // markers: true,
    },
  });

  tl.from(
    '.footer',
    {
      opacity: 0,
      duration: 2.5,
      ease: 'sine.inOut',
    },
    '-=0.58'
  );
}
