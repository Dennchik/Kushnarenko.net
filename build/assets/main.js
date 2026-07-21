function Id(s) {
  window.onload = function () {
    (document.querySelector(s).classList.add('preloader-remove'),
      document.documentElement.classList.add('loaded'));
  };
}
class Rd {
  constructor(e = {}) {
    ((this.headerSelector = e.headerSelector ?? '.offset-header'),
      (this.selector = e.selector ?? '.anchor-link'),
      (this.smoother = e.smoother ?? null),
      (this.onCloseSidebar = e.onCloseSidebar ?? null),
      (this.onCloseButton = e.onCloseButton ?? null),
      (this.sidebarSelector =
        e.sidebarSelector ?? '.sidebar, .mobile-menu, [data-sidebar]'),
      this.init());
  }
  getOffset() {
    const e = document.querySelector(this.headerSelector);
    return e ? e.offsetHeight : 80;
  }
  findSidebar() {
    return document.querySelector(this.sidebarSelector);
  }
  scrollToTarget(e, t) {
    if (e)
      if (this.smoother && typeof this.smoother.scrollTo == 'function')
        this.smoother.scrollTo(e, !0, `top ${t}px`);
      else {
        const n = e.getBoundingClientRect().top + window.pageYOffset - t;
        window.scrollTo({ top: Math.max(0, n), behavior: 'smooth' });
      }
  }
  init() {
    document.querySelectorAll(this.selector).forEach((t) => {
      t.addEventListener(
        'click',
        (r) => {
          const i = t.getAttribute('href');
          if (!i || !i.startsWith('#')) return;
          const n = i.substring(1);
          if (!n) return;
          const a = document.getElementById(n);
          if (!a) {
            this.closeSidebars();
            return;
          }
          r.preventDefault();
          const o = this.getOffset();
          (this.scrollToTarget(a, o), this.closeSidebars());
        },
        { passive: !1 }
      );
    });
  }
  closeSidebars() {
    const e = this.findSidebar(),
      t = document.querySelector(
        '.sidebar-close, .burger-button, [data-close-sidebar]'
      );
    (this.onCloseSidebar && e && this.onCloseSidebar(e),
      this.onCloseButton && t && this.onCloseButton(t));
  }
}
function zd() {
  let s = [],
    e = document.querySelectorAll('[data-da]'),
    t = [],
    r = [];
  if (e.length > 0) {
    let l = 0;
    for (let u = 0; u < e.length; u++) {
      const p = e[u],
        m = p.getAttribute('data-da'),
        h = p.hasAttribute('data-da-position')
          ? p.getAttribute('data-da-position')
          : 'last',
        f = p.hasAttribute('data-da-resolution')
          ? p.getAttribute('data-da-resolution')
          : 768;
      (p.setAttribute('data-da-index', l),
        (s[l] = { parent: p.parentNode, index: a(p) }),
        (t[l] = {
          element: p,
          destination: document.querySelector('.' + m),
          place: h,
          breakpoint: f,
        }),
        l++);
    }
    c(t);
    for (let u = 0; u < t.length; u++) {
      const m = t[u].breakpoint,
        f = window.matchMedia(`(max-width: ${m}px)`);
      (r.push(f), f.addEventListener('change', i));
    }
  }
  function i() {
    for (let l = 0; l < t.length; l++) {
      const u = t[l],
        p = u.element,
        m = u.destination,
        h = u.place,
        d = '_dynamic_adapt_' + u.breakpoint;
      if (r[l].matches) {
        if (!p.classList.contains(d)) {
          let g = o(m)[h];
          (h === 'first'
            ? (g = o(m)[0])
            : h === 'last' && (g = o(m)[o(m).length]),
            m.insertBefore(p, m.children[g]),
            p.classList.add(d));
        }
      } else p.classList.contains(d) && (n(p), p.classList.remove(d));
    }
  }
  i();
  function n(l) {
    const u = l.getAttribute('data-da-index'),
      p = s[u],
      m = p.parent,
      h = p.index,
      f = o(m, !0)[h];
    m.insertBefore(l, m.children[f]);
  }
  function a(l) {
    return Array.prototype.slice.call(l.parentNode.children).indexOf(l);
  }
  function o(l, u) {
    const p = l.children,
      m = [];
    for (let h = 0; h < p.length; h++) {
      const f = p[h];
      (u || f.getAttribute('data-da') == null) && m.push(h);
    }
    return m;
  }
  function c(l) {
    (l.sort(function (u, p) {
      return u.breakpoint > p.breakpoint ? -1 : 1;
    }),
      l.sort(function (u, p) {
        return u.place > p.place ? 1 : -1;
      }));
  }
}
function $d(s = '#player-id') {
  const e = document.querySelector(s),
    t = document.querySelector('.video-play-btn'),
    r = document.querySelector('.video-cover');
  if (!t || !e || !r) return;
  const i = () => {
      (r.classList.add('hidden'), t.classList.add('hidden'));
    },
    n = () => {
      (r.classList.remove('hidden'), t.classList.remove('hidden'));
    },
    a = () => {
      e.play()
        .then(() => {
          i();
        })
        .catch((o) => console.error('Ошибка воспроизведения:', o));
    };
  return (
    e.addEventListener('play', i),
    e.addEventListener('pause', () => {
      t.classList.remove('hidden');
    }),
    e.addEventListener('ended', () => {
      n();
    }),
    t.addEventListener('click', a),
    e.paused || i(),
    () => {
      (e.removeEventListener('play', i),
        e.removeEventListener('pause', n),
        e.removeEventListener('ended', n),
        t.removeEventListener('click', a));
    }
  );
}
function Nd() {
  let s = document.querySelectorAll('.swiper');
  if (s)
    for (let e = 0; e < s.length; e++) {
      let t = s[e];
      if (!t.classList.contains('swiper-build')) {
        let r = t.children;
        if (r)
          for (let a = 0; a < r.length; a++) r[a].classList.add('swiper-slide');
        let i = t.innerHTML,
          n = document.createElement('div');
        (n.classList.add('swiper-wrapper'),
          (n.innerHTML = i),
          (t.innerHTML = ''),
          t.appendChild(n),
          t.classList.add('swiper-build'));
      }
    }
}
function Bd(s) {
  document.querySelectorAll('.toggle-menu').forEach((e) => {
    e.addEventListener('click', () => {
      (e.classList.toggle('_open'),
        document.querySelector('.mobile-menu').classList.toggle('_show'));
    });
  });
}
function El(s) {
  return (
    s !== null &&
    typeof s == 'object' &&
    'constructor' in s &&
    s.constructor === Object
  );
}
function Vo(s, e) {
  (s === void 0 && (s = {}), e === void 0 && (e = {}));
  const t = ['__proto__', 'constructor', 'prototype'];
  Object.keys(e)
    .filter((r) => t.indexOf(r) < 0)
    .forEach((r) => {
      typeof s[r] > 'u'
        ? (s[r] = e[r])
        : El(e[r]) &&
          El(s[r]) &&
          Object.keys(e[r]).length > 0 &&
          Vo(s[r], e[r]);
    });
}
const kc = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
};
function bt() {
  const s = typeof document < 'u' ? document : {};
  return (Vo(s, kc), s);
}
const Fd = {
  document: kc,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(s) {
    return typeof setTimeout > 'u' ? (s(), null) : setTimeout(s, 0);
  },
  cancelAnimationFrame(s) {
    typeof setTimeout > 'u' || clearTimeout(s);
  },
};
function Ke() {
  const s = typeof window < 'u' ? window : {};
  return (Vo(s, Fd), s);
}
function li(s) {
  return (
    s === void 0 && (s = ''),
    s
      .trim()
      .split(' ')
      .filter((e) => !!e.trim())
  );
}
function Yd(s) {
  const e = s;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function bs(s, e) {
  return (e === void 0 && (e = 0), setTimeout(s, e));
}
function Sr() {
  return Date.now();
}
function Vd(s) {
  const e = Ke();
  let t;
  return (
    e.getComputedStyle && (t = e.getComputedStyle(s, null)),
    !t && s.currentStyle && (t = s.currentStyle),
    t || (t = s.style),
    t
  );
}
function lo(s, e) {
  e === void 0 && (e = 'x');
  const t = Ke();
  let r, i, n;
  const a = Vd(s);
  return (
    t.WebKitCSSMatrix
      ? ((i = a.transform || a.webkitTransform),
        i.split(',').length > 6 &&
          (i = i
            .split(', ')
            .map((o) => o.replace(',', '.'))
            .join(', ')),
        (n = new t.WebKitCSSMatrix(i === 'none' ? '' : i)))
      : ((n =
          a.MozTransform ||
          a.OTransform ||
          a.MsTransform ||
          a.msTransform ||
          a.transform ||
          a
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (r = n.toString().split(','))),
    e === 'x' &&
      (t.WebKitCSSMatrix
        ? (i = n.m41)
        : r.length === 16
          ? (i = parseFloat(r[12]))
          : (i = parseFloat(r[4]))),
    e === 'y' &&
      (t.WebKitCSSMatrix
        ? (i = n.m42)
        : r.length === 16
          ? (i = parseFloat(r[13]))
          : (i = parseFloat(r[5]))),
    i || 0
  );
}
function Vs(s) {
  return (
    typeof s == 'object' &&
    s !== null &&
    s.constructor &&
    Object.prototype.toString.call(s).slice(8, -1) === 'Object'
  );
}
function Xd(s) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? s instanceof HTMLElement
    : s && (s.nodeType === 1 || s.nodeType === 11);
}
function or() {
  const s = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ['__proto__', 'constructor', 'prototype'];
  for (let t = 1; t < arguments.length; t += 1) {
    const r = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (r != null && !Xd(r)) {
      const i = Object.keys(Object(r)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, a = i.length; n < a; n += 1) {
        const o = i[n],
          c = Object.getOwnPropertyDescriptor(r, o);
        c !== void 0 &&
          c.enumerable &&
          (Vs(s[o]) && Vs(r[o])
            ? r[o].__swiper__
              ? (s[o] = r[o])
              : or(s[o], r[o])
            : !Vs(s[o]) && Vs(r[o])
              ? ((s[o] = {}), r[o].__swiper__ ? (s[o] = r[o]) : or(s[o], r[o]))
              : (s[o] = r[o]));
      }
    }
  }
  return s;
}
function Xs(s, e, t) {
  s.style.setProperty(e, t);
}
function Ic(s) {
  let { swiper: e, targetPosition: t, side: r } = s;
  const i = Ke(),
    n = -e.translate;
  let a = null,
    o;
  const c = e.params.speed;
  ((e.wrapperEl.style.scrollSnapType = 'none'),
    i.cancelAnimationFrame(e.cssModeFrameID));
  const l = t > n ? 'next' : 'prev',
    u = (m, h) => (l === 'next' && m >= h) || (l === 'prev' && m <= h),
    p = () => {
      ((o = new Date().getTime()), a === null && (a = o));
      const m = Math.max(Math.min((o - a) / c, 1), 0),
        h = 0.5 - Math.cos(m * Math.PI) / 2;
      let f = n + h * (t - n);
      if ((u(f, t) && (f = t), e.wrapperEl.scrollTo({ [r]: f }), u(f, t))) {
        ((e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            ((e.wrapperEl.style.overflow = ''),
              e.wrapperEl.scrollTo({ [r]: f }));
          }),
          i.cancelAnimationFrame(e.cssModeFrameID));
        return;
      }
      e.cssModeFrameID = i.requestAnimationFrame(p);
    };
  p();
}
function Ji(s) {
  return (
    s.querySelector('.swiper-slide-transform') ||
    (s.shadowRoot && s.shadowRoot.querySelector('.swiper-slide-transform')) ||
    s
  );
}
function Ct(s, e) {
  e === void 0 && (e = '');
  const t = Ke(),
    r = [...s.children];
  return (
    t.HTMLSlotElement &&
      s instanceof HTMLSlotElement &&
      r.push(...s.assignedElements()),
    e ? r.filter((i) => i.matches(e)) : r
  );
}
function Hd(s, e) {
  const t = [e];
  for (; t.length > 0; ) {
    const r = t.shift();
    if (s === r) return !0;
    t.push(
      ...r.children,
      ...(r.shadowRoot ? r.shadowRoot.children : []),
      ...(r.assignedElements ? r.assignedElements() : [])
    );
  }
}
function Gd(s, e) {
  const t = Ke();
  let r = e.contains(s);
  return (
    !r &&
      t.HTMLSlotElement &&
      e instanceof HTMLSlotElement &&
      ((r = [...e.assignedElements()].includes(s)), r || (r = Hd(s, e))),
    r
  );
}
function ua(s) {
  try {
    console.warn(s);
    return;
  } catch {}
}
function pr(s, e) {
  e === void 0 && (e = []);
  const t = document.createElement(s);
  return (t.classList.add(...(Array.isArray(e) ? e : li(e))), t);
}
function da(s) {
  const e = Ke(),
    t = bt(),
    r = s.getBoundingClientRect(),
    i = t.body,
    n = s.clientTop || i.clientTop || 0,
    a = s.clientLeft || i.clientLeft || 0,
    o = s === e ? e.scrollY : s.scrollTop,
    c = s === e ? e.scrollX : s.scrollLeft;
  return { top: r.top + o - n, left: r.left + c - a };
}
function qd(s, e) {
  const t = [];
  for (; s.previousElementSibling; ) {
    const r = s.previousElementSibling;
    (e ? r.matches(e) && t.push(r) : t.push(r), (s = r));
  }
  return t;
}
function Wd(s, e) {
  const t = [];
  for (; s.nextElementSibling; ) {
    const r = s.nextElementSibling;
    (e ? r.matches(e) && t.push(r) : t.push(r), (s = r));
  }
  return t;
}
function di(s, e) {
  return Ke().getComputedStyle(s, null).getPropertyValue(e);
}
function hn(s) {
  let e = s,
    t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function Yi(s, e) {
  const t = [];
  let r = s.parentElement;
  for (; r; )
    (e ? r.matches(e) && t.push(r) : t.push(r), (r = r.parentElement));
  return t;
}
function Qs(s, e) {
  function t(r) {
    r.target === s && (e.call(s, r), s.removeEventListener('transitionend', t));
  }
  e && s.addEventListener('transitionend', t);
}
function co(s, e, t) {
  const r = Ke();
  return (
    s[e === 'width' ? 'offsetWidth' : 'offsetHeight'] +
    parseFloat(
      r
        .getComputedStyle(s, null)
        .getPropertyValue(e === 'width' ? 'margin-right' : 'margin-top')
    ) +
    parseFloat(
      r
        .getComputedStyle(s, null)
        .getPropertyValue(e === 'width' ? 'margin-left' : 'margin-bottom')
    )
  );
}
function Ee(s) {
  return (Array.isArray(s) ? s : [s]).filter((e) => !!e);
}
function Sa(s) {
  return (e) =>
    Math.abs(e) > 0 &&
    s.browser &&
    s.browser.need3dFix &&
    Math.abs(e) % 90 === 0
      ? e + 0.001
      : e;
}
function ei(s, e) {
  (e === void 0 && (e = ''),
    typeof trustedTypes < 'u'
      ? (s.innerHTML = trustedTypes
          .createPolicy('html', { createHTML: (t) => t })
          .createHTML(e))
      : (s.innerHTML = e));
}
let ka;
function Ud() {
  const s = Ke(),
    e = bt();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      'scrollBehavior' in e.documentElement.style,
    touch: !!(
      'ontouchstart' in s ||
      (s.DocumentTouch && e instanceof s.DocumentTouch)
    ),
  };
}
function Rc() {
  return (ka || (ka = Ud()), ka);
}
let Ia;
function jd(s) {
  let { userAgent: e } = s === void 0 ? {} : s;
  const t = Rc(),
    r = Ke(),
    i = r.navigator.platform,
    n = e || r.navigator.userAgent,
    a = { ios: !1, android: !1 },
    o = r.screen.width,
    c = r.screen.height,
    l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let u = n.match(/(iPad).*OS\s([\d_]+)/);
  const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    m = !u && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = i === 'Win32';
  let f = i === 'MacIntel';
  const d = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810',
  ];
  return (
    !u &&
      f &&
      t.touch &&
      d.indexOf(`${o}x${c}`) >= 0 &&
      ((u = n.match(/(Version)\/([\d.]+)/)),
      u || (u = [0, 1, '13_0_0']),
      (f = !1)),
    l && !h && ((a.os = 'android'), (a.android = !0)),
    (u || m || p) && ((a.os = 'ios'), (a.ios = !0)),
    a
  );
}
function zc(s) {
  return (s === void 0 && (s = {}), Ia || (Ia = jd(s)), Ia);
}
let Ra;
function Kd() {
  const s = Ke(),
    e = zc();
  let t = !1;
  function r() {
    const o = s.navigator.userAgent.toLowerCase();
    return (
      o.indexOf('safari') >= 0 &&
      o.indexOf('chrome') < 0 &&
      o.indexOf('android') < 0
    );
  }
  if (r()) {
    const o = String(s.navigator.userAgent);
    if (o.includes('Version/')) {
      const [c, l] = o
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((u) => Number(u));
      t = c < 16 || (c === 16 && l < 2);
    }
  }
  const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      s.navigator.userAgent
    ),
    n = r(),
    a = n || (i && e.ios);
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: a,
    isWebView: i,
  };
}
function $c() {
  return (Ra || (Ra = Kd()), Ra);
}
function Zd(s) {
  let { swiper: e, on: t, emit: r } = s;
  const i = Ke();
  let n = null,
    a = null;
  const o = () => {
      !e || e.destroyed || !e.initialized || (r('beforeResize'), r('resize'));
    },
    c = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((n = new ResizeObserver((p) => {
          a = i.requestAnimationFrame(() => {
            const { width: m, height: h } = e;
            let f = m,
              d = h;
            (p.forEach((g) => {
              let { contentBoxSize: w, contentRect: _, target: v } = g;
              (v && v !== e.el) ||
                ((f = _ ? _.width : (w[0] || w).inlineSize),
                (d = _ ? _.height : (w[0] || w).blockSize));
            }),
              (f !== m || d !== h) && o());
          });
        })),
        n.observe(e.el));
    },
    l = () => {
      (a && i.cancelAnimationFrame(a),
        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)));
    },
    u = () => {
      !e || e.destroyed || !e.initialized || r('orientationchange');
    };
  (t('init', () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < 'u') {
      c();
      return;
    }
    (i.addEventListener('resize', o),
      i.addEventListener('orientationchange', u));
  }),
    t('destroy', () => {
      (l(),
        i.removeEventListener('resize', o),
        i.removeEventListener('orientationchange', u));
    }));
}
function Qd(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = [],
    a = Ke(),
    o = function (u, p) {
      p === void 0 && (p = {});
      const m = a.MutationObserver || a.WebkitMutationObserver,
        h = new m((f) => {
          if (e.__preventObserver__) return;
          if (f.length === 1) {
            i('observerUpdate', f[0]);
            return;
          }
          const d = function () {
            i('observerUpdate', f[0]);
          };
          a.requestAnimationFrame
            ? a.requestAnimationFrame(d)
            : a.setTimeout(d, 0);
        });
      (h.observe(u, {
        attributes: typeof p.attributes > 'u' ? !0 : p.attributes,
        childList: e.isElement || (typeof p.childList > 'u' ? !0 : p).childList,
        characterData: typeof p.characterData > 'u' ? !0 : p.characterData,
      }),
        n.push(h));
    },
    c = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const u = Yi(e.hostEl);
          for (let p = 0; p < u.length; p += 1) o(u[p]);
        }
        (o(e.hostEl, { childList: e.params.observeSlideChildren }),
          o(e.wrapperEl, { attributes: !1 }));
      }
    },
    l = () => {
      (n.forEach((u) => {
        u.disconnect();
      }),
        n.splice(0, n.length));
    };
  (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    r('init', c),
    r('destroy', l));
}
var Jd = {
  on(s, e, t) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof e != 'function') return r;
    const i = t ? 'unshift' : 'push';
    return (
      s.split(' ').forEach((n) => {
        (r.eventsListeners[n] || (r.eventsListeners[n] = []),
          r.eventsListeners[n][i](e));
      }),
      r
    );
  },
  once(s, e, t) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof e != 'function') return r;
    function i() {
      (r.off(s, i), i.__emitterProxy && delete i.__emitterProxy);
      for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
        a[o] = arguments[o];
      e.apply(r, a);
    }
    return ((i.__emitterProxy = e), r.on(s, i, t));
  },
  onAny(s, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof s != 'function') return t;
    const r = e ? 'unshift' : 'push';
    return (
      t.eventsAnyListeners.indexOf(s) < 0 && t.eventsAnyListeners[r](s),
      t
    );
  },
  offAny(s) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(s);
    return (t >= 0 && e.eventsAnyListeners.splice(t, 1), e);
  },
  off(s, e) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        s.split(' ').forEach((r) => {
          typeof e > 'u'
            ? (t.eventsListeners[r] = [])
            : t.eventsListeners[r] &&
              t.eventsListeners[r].forEach((i, n) => {
                (i === e || (i.__emitterProxy && i.__emitterProxy === e)) &&
                  t.eventsListeners[r].splice(n, 1);
              });
        }),
      t
    );
  },
  emit() {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsListeners) return s;
    let e, t, r;
    for (var i = arguments.length, n = new Array(i), a = 0; a < i; a++)
      n[a] = arguments[a];
    return (
      typeof n[0] == 'string' || Array.isArray(n[0])
        ? ((e = n[0]), (t = n.slice(1, n.length)), (r = s))
        : ((e = n[0].events), (t = n[0].data), (r = n[0].context || s)),
      t.unshift(r),
      (Array.isArray(e) ? e : e.split(' ')).forEach((c) => {
        (s.eventsAnyListeners &&
          s.eventsAnyListeners.length &&
          s.eventsAnyListeners.forEach((l) => {
            l.apply(r, [c, ...t]);
          }),
          s.eventsListeners &&
            s.eventsListeners[c] &&
            s.eventsListeners[c].forEach((l) => {
              l.apply(r, t);
            }));
      }),
      s
    );
  },
};
function ef() {
  const s = this;
  let e, t;
  const r = s.el;
  (typeof s.params.width < 'u' && s.params.width !== null
    ? (e = s.params.width)
    : (e = r.clientWidth),
    typeof s.params.height < 'u' && s.params.height !== null
      ? (t = s.params.height)
      : (t = r.clientHeight),
    !((e === 0 && s.isHorizontal()) || (t === 0 && s.isVertical())) &&
      ((e =
        e -
        parseInt(di(r, 'padding-left') || 0, 10) -
        parseInt(di(r, 'padding-right') || 0, 10)),
      (t =
        t -
        parseInt(di(r, 'padding-top') || 0, 10) -
        parseInt(di(r, 'padding-bottom') || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(s, {
        width: e,
        height: t,
        size: s.isHorizontal() ? e : t,
      })));
}
function tf() {
  const s = this;
  function e(E, I) {
    return parseFloat(E.getPropertyValue(s.getDirectionLabel(I)) || 0);
  }
  const t = s.params,
    { wrapperEl: r, slidesEl: i, size: n, rtlTranslate: a, wrongRTL: o } = s,
    c = s.virtual && t.virtual.enabled,
    l = c ? s.virtual.slides.length : s.slides.length,
    u = Ct(i, `.${s.params.slideClass}, swiper-slide`),
    p = c ? s.virtual.slides.length : u.length;
  let m = [];
  const h = [],
    f = [];
  let d = t.slidesOffsetBefore;
  typeof d == 'function' && (d = t.slidesOffsetBefore.call(s));
  let g = t.slidesOffsetAfter;
  typeof g == 'function' && (g = t.slidesOffsetAfter.call(s));
  const w = s.snapGrid.length,
    _ = s.slidesGrid.length;
  let v = t.spaceBetween,
    y = -d,
    b = 0,
    P = 0;
  if (typeof n > 'u') return;
  (typeof v == 'string' && v.indexOf('%') >= 0
    ? (v = (parseFloat(v.replace('%', '')) / 100) * n)
    : typeof v == 'string' && (v = parseFloat(v)),
    (s.virtualSize = -v),
    u.forEach((E) => {
      (a ? (E.style.marginLeft = '') : (E.style.marginRight = ''),
        (E.style.marginBottom = ''),
        (E.style.marginTop = ''));
    }),
    t.centeredSlides &&
      t.cssMode &&
      (Xs(r, '--swiper-centered-offset-before', ''),
      Xs(r, '--swiper-centered-offset-after', '')));
  const T = t.grid && t.grid.rows > 1 && s.grid;
  T ? s.grid.initSlides(u) : s.grid && s.grid.unsetSlides();
  let O;
  const S =
    t.slidesPerView === 'auto' &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (E) => typeof t.breakpoints[E].slidesPerView < 'u'
    ).length > 0;
  for (let E = 0; E < p; E += 1) {
    O = 0;
    let I;
    if (
      (u[E] && (I = u[E]),
      T && s.grid.updateSlide(E, I, u),
      !(u[E] && di(I, 'display') === 'none'))
    ) {
      if (t.slidesPerView === 'auto') {
        S && (u[E].style[s.getDirectionLabel('width')] = '');
        const A = getComputedStyle(I),
          k = I.style.transform,
          x = I.style.webkitTransform;
        if (
          (k && (I.style.transform = 'none'),
          x && (I.style.webkitTransform = 'none'),
          t.roundLengths)
        )
          O = s.isHorizontal() ? co(I, 'width') : co(I, 'height');
        else {
          const L = e(A, 'width'),
            $ = e(A, 'padding-left'),
            M = e(A, 'padding-right'),
            D = e(A, 'margin-left'),
            z = e(A, 'margin-right'),
            C = A.getPropertyValue('box-sizing');
          if (C && C === 'border-box') O = L + D + z;
          else {
            const { clientWidth: W, offsetWidth: ae } = I;
            O = L + $ + M + D + z + (ae - W);
          }
        }
        (k && (I.style.transform = k),
          x && (I.style.webkitTransform = x),
          t.roundLengths && (O = Math.floor(O)));
      } else
        ((O = (n - (t.slidesPerView - 1) * v) / t.slidesPerView),
          t.roundLengths && (O = Math.floor(O)),
          u[E] && (u[E].style[s.getDirectionLabel('width')] = `${O}px`));
      (u[E] && (u[E].swiperSlideSize = O),
        f.push(O),
        t.centeredSlides
          ? ((y = y + O / 2 + b / 2 + v),
            b === 0 && E !== 0 && (y = y - n / 2 - v),
            E === 0 && (y = y - n / 2 - v),
            Math.abs(y) < 1 / 1e3 && (y = 0),
            t.roundLengths && (y = Math.floor(y)),
            P % t.slidesPerGroup === 0 && m.push(y),
            h.push(y))
          : (t.roundLengths && (y = Math.floor(y)),
            (P - Math.min(s.params.slidesPerGroupSkip, P)) %
              s.params.slidesPerGroup ===
              0 && m.push(y),
            h.push(y),
            (y = y + O + v)),
        (s.virtualSize += O + v),
        (b = O),
        (P += 1));
    }
  }
  if (
    ((s.virtualSize = Math.max(s.virtualSize, n) + g),
    a &&
      o &&
      (t.effect === 'slide' || t.effect === 'coverflow') &&
      (r.style.width = `${s.virtualSize + v}px`),
    t.setWrapperSize &&
      (r.style[s.getDirectionLabel('width')] = `${s.virtualSize + v}px`),
    T && s.grid.updateWrapperSize(O, m),
    !t.centeredSlides)
  ) {
    const E = [];
    for (let I = 0; I < m.length; I += 1) {
      let A = m[I];
      (t.roundLengths && (A = Math.floor(A)),
        m[I] <= s.virtualSize - n && E.push(A));
    }
    ((m = E),
      Math.floor(s.virtualSize - n) - Math.floor(m[m.length - 1]) > 1 &&
        m.push(s.virtualSize - n));
  }
  if (c && t.loop) {
    const E = f[0] + v;
    if (t.slidesPerGroup > 1) {
      const I = Math.ceil(
          (s.virtual.slidesBefore + s.virtual.slidesAfter) / t.slidesPerGroup
        ),
        A = E * t.slidesPerGroup;
      for (let k = 0; k < I; k += 1) m.push(m[m.length - 1] + A);
    }
    for (let I = 0; I < s.virtual.slidesBefore + s.virtual.slidesAfter; I += 1)
      (t.slidesPerGroup === 1 && m.push(m[m.length - 1] + E),
        h.push(h[h.length - 1] + E),
        (s.virtualSize += E));
  }
  if ((m.length === 0 && (m = [0]), v !== 0)) {
    const E =
      s.isHorizontal() && a ? 'marginLeft' : s.getDirectionLabel('marginRight');
    u.filter((I, A) =>
      !t.cssMode || t.loop ? !0 : A !== u.length - 1
    ).forEach((I) => {
      I.style[E] = `${v}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let E = 0;
    (f.forEach((A) => {
      E += A + (v || 0);
    }),
      (E -= v));
    const I = E > n ? E - n : 0;
    m = m.map((A) => (A <= 0 ? -d : A > I ? I + g : A));
  }
  if (t.centerInsufficientSlides) {
    let E = 0;
    (f.forEach((A) => {
      E += A + (v || 0);
    }),
      (E -= v));
    const I = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (E + I < n) {
      const A = (n - E - I) / 2;
      (m.forEach((k, x) => {
        m[x] = k - A;
      }),
        h.forEach((k, x) => {
          h[x] = k + A;
        }));
    }
  }
  if (
    (Object.assign(s, {
      slides: u,
      snapGrid: m,
      slidesGrid: h,
      slidesSizesGrid: f,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    (Xs(r, '--swiper-centered-offset-before', `${-m[0]}px`),
      Xs(
        r,
        '--swiper-centered-offset-after',
        `${s.size / 2 - f[f.length - 1] / 2}px`
      ));
    const E = -s.snapGrid[0],
      I = -s.slidesGrid[0];
    ((s.snapGrid = s.snapGrid.map((A) => A + E)),
      (s.slidesGrid = s.slidesGrid.map((A) => A + I)));
  }
  if (
    (p !== l && s.emit('slidesLengthChange'),
    m.length !== w &&
      (s.params.watchOverflow && s.checkOverflow(),
      s.emit('snapGridLengthChange')),
    h.length !== _ && s.emit('slidesGridLengthChange'),
    t.watchSlidesProgress && s.updateSlidesOffset(),
    s.emit('slidesUpdated'),
    !c && !t.cssMode && (t.effect === 'slide' || t.effect === 'fade'))
  ) {
    const E = `${t.containerModifierClass}backface-hidden`,
      I = s.el.classList.contains(E);
    p <= t.maxBackfaceHiddenSlides
      ? I || s.el.classList.add(E)
      : I && s.el.classList.remove(E);
  }
}
function rf(s) {
  const e = this,
    t = [],
    r = e.virtual && e.params.virtual.enabled;
  let i = 0,
    n;
  typeof s == 'number'
    ? e.setTransition(s)
    : s === !0 && e.setTransition(e.params.speed);
  const a = (o) => (r ? e.slides[e.getSlideIndexByData(o)] : e.slides[o]);
  if (e.params.slidesPerView !== 'auto' && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((o) => {
        t.push(o);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const o = e.activeIndex + n;
        if (o > e.slides.length && !r) break;
        t.push(a(o));
      }
  else t.push(a(e.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < 'u') {
      const o = t[n].offsetHeight;
      i = o > i ? o : i;
    }
  (i || i === 0) && (e.wrapperEl.style.height = `${i}px`);
}
function sf() {
  const s = this,
    e = s.slides,
    t = s.isElement
      ? s.isHorizontal()
        ? s.wrapperEl.offsetLeft
        : s.wrapperEl.offsetTop
      : 0;
  for (let r = 0; r < e.length; r += 1)
    e[r].swiperSlideOffset =
      (s.isHorizontal() ? e[r].offsetLeft : e[r].offsetTop) -
      t -
      s.cssOverflowAdjustment();
}
const Cl = (s, e, t) => {
  e && !s.classList.contains(t)
    ? s.classList.add(t)
    : !e && s.classList.contains(t) && s.classList.remove(t);
};
function nf(s) {
  s === void 0 && (s = (this && this.translate) || 0);
  const e = this,
    t = e.params,
    { slides: r, rtlTranslate: i, snapGrid: n } = e;
  if (r.length === 0) return;
  typeof r[0].swiperSlideOffset > 'u' && e.updateSlidesOffset();
  let a = -s;
  (i && (a = s), (e.visibleSlidesIndexes = []), (e.visibleSlides = []));
  let o = t.spaceBetween;
  typeof o == 'string' && o.indexOf('%') >= 0
    ? (o = (parseFloat(o.replace('%', '')) / 100) * e.size)
    : typeof o == 'string' && (o = parseFloat(o));
  for (let c = 0; c < r.length; c += 1) {
    const l = r[c];
    let u = l.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (u -= r[0].swiperSlideOffset);
    const p =
        (a + (t.centeredSlides ? e.minTranslate() : 0) - u) /
        (l.swiperSlideSize + o),
      m =
        (a - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - u) /
        (l.swiperSlideSize + o),
      h = -(a - u),
      f = h + e.slidesSizesGrid[c],
      d = h >= 0 && h <= e.size - e.slidesSizesGrid[c],
      g =
        (h >= 0 && h < e.size - 1) ||
        (f > 1 && f <= e.size) ||
        (h <= 0 && f >= e.size);
    (g && (e.visibleSlides.push(l), e.visibleSlidesIndexes.push(c)),
      Cl(l, g, t.slideVisibleClass),
      Cl(l, d, t.slideFullyVisibleClass),
      (l.progress = i ? -p : p),
      (l.originalProgress = i ? -m : m));
  }
}
function af(s) {
  const e = this;
  if (typeof s > 'u') {
    const u = e.rtlTranslate ? -1 : 1;
    s = (e && e.translate && e.translate * u) || 0;
  }
  const t = e.params,
    r = e.maxTranslate() - e.minTranslate();
  let { progress: i, isBeginning: n, isEnd: a, progressLoop: o } = e;
  const c = n,
    l = a;
  if (r === 0) ((i = 0), (n = !0), (a = !0));
  else {
    i = (s - e.minTranslate()) / r;
    const u = Math.abs(s - e.minTranslate()) < 1,
      p = Math.abs(s - e.maxTranslate()) < 1;
    ((n = u || i <= 0), (a = p || i >= 1), u && (i = 0), p && (i = 1));
  }
  if (t.loop) {
    const u = e.getSlideIndexByData(0),
      p = e.getSlideIndexByData(e.slides.length - 1),
      m = e.slidesGrid[u],
      h = e.slidesGrid[p],
      f = e.slidesGrid[e.slidesGrid.length - 1],
      d = Math.abs(s);
    (d >= m ? (o = (d - m) / f) : (o = (d + f - h) / f), o > 1 && (o -= 1));
  }
  (Object.assign(e, { progress: i, progressLoop: o, isBeginning: n, isEnd: a }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      e.updateSlidesProgress(s),
    n && !c && e.emit('reachBeginning toEdge'),
    a && !l && e.emit('reachEnd toEdge'),
    ((c && !n) || (l && !a)) && e.emit('fromEdge'),
    e.emit('progress', i));
}
const za = (s, e, t) => {
  e && !s.classList.contains(t)
    ? s.classList.add(t)
    : !e && s.classList.contains(t) && s.classList.remove(t);
};
function of() {
  const s = this,
    { slides: e, params: t, slidesEl: r, activeIndex: i } = s,
    n = s.virtual && t.virtual.enabled,
    a = s.grid && t.grid && t.grid.rows > 1,
    o = (p) => Ct(r, `.${t.slideClass}${p}, swiper-slide${p}`)[0];
  let c, l, u;
  if (n)
    if (t.loop) {
      let p = i - s.virtual.slidesBefore;
      (p < 0 && (p = s.virtual.slides.length + p),
        p >= s.virtual.slides.length && (p -= s.virtual.slides.length),
        (c = o(`[data-swiper-slide-index="${p}"]`)));
    } else c = o(`[data-swiper-slide-index="${i}"]`);
  else
    a
      ? ((c = e.find((p) => p.column === i)),
        (u = e.find((p) => p.column === i + 1)),
        (l = e.find((p) => p.column === i - 1)))
      : (c = e[i]);
  (c &&
    (a ||
      ((u = Wd(c, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !u && (u = e[0]),
      (l = qd(c, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !l === 0 && (l = e[e.length - 1]))),
    e.forEach((p) => {
      (za(p, p === c, t.slideActiveClass),
        za(p, p === u, t.slideNextClass),
        za(p, p === l, t.slidePrevClass));
    }),
    s.emitSlidesClasses());
}
const Kn = (s, e) => {
    if (!s || s.destroyed || !s.params) return;
    const t = () => (s.isElement ? 'swiper-slide' : `.${s.params.slideClass}`),
      r = e.closest(t());
    if (r) {
      let i = r.querySelector(`.${s.params.lazyPreloaderClass}`);
      (!i &&
        s.isElement &&
        (r.shadowRoot
          ? (i = r.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              r.shadowRoot &&
                ((i = r.shadowRoot.querySelector(
                  `.${s.params.lazyPreloaderClass}`
                )),
                i && i.remove());
            })),
        i && i.remove());
    }
  },
  $a = (s, e) => {
    if (!s.slides[e]) return;
    const t = s.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute('loading');
  },
  uo = (s) => {
    if (!s || s.destroyed || !s.params) return;
    let e = s.params.lazyPreloadPrevNext;
    const t = s.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const r =
        s.params.slidesPerView === 'auto'
          ? s.slidesPerViewDynamic()
          : Math.ceil(s.params.slidesPerView),
      i = s.activeIndex;
    if (s.params.grid && s.params.grid.rows > 1) {
      const a = i,
        o = [a - e];
      (o.push(...Array.from({ length: e }).map((c, l) => a + r + l)),
        s.slides.forEach((c, l) => {
          o.includes(c.column) && $a(s, l);
        }));
      return;
    }
    const n = i + r - 1;
    if (s.params.rewind || s.params.loop)
      for (let a = i - e; a <= n + e; a += 1) {
        const o = ((a % t) + t) % t;
        (o < i || o > n) && $a(s, o);
      }
    else
      for (let a = Math.max(i - e, 0); a <= Math.min(n + e, t - 1); a += 1)
        a !== i && (a > n || a < i) && $a(s, a);
  };
function lf(s) {
  const { slidesGrid: e, params: t } = s,
    r = s.rtlTranslate ? s.translate : -s.translate;
  let i;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < 'u'
      ? r >= e[n] && r < e[n + 1] - (e[n + 1] - e[n]) / 2
        ? (i = n)
        : r >= e[n] && r < e[n + 1] && (i = n + 1)
      : r >= e[n] && (i = n);
  return (t.normalizeSlideIndex && (i < 0 || typeof i > 'u') && (i = 0), i);
}
function cf(s) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: r, params: i, activeIndex: n, realIndex: a, snapIndex: o } = e;
  let c = s,
    l;
  const u = (h) => {
    let f = h - e.virtual.slidesBefore;
    return (
      f < 0 && (f = e.virtual.slides.length + f),
      f >= e.virtual.slides.length && (f -= e.virtual.slides.length),
      f
    );
  };
  if ((typeof c > 'u' && (c = lf(e)), r.indexOf(t) >= 0)) l = r.indexOf(t);
  else {
    const h = Math.min(i.slidesPerGroupSkip, c);
    l = h + Math.floor((c - h) / i.slidesPerGroup);
  }
  if ((l >= r.length && (l = r.length - 1), c === n && !e.params.loop)) {
    l !== o && ((e.snapIndex = l), e.emit('snapIndexChange'));
    return;
  }
  if (c === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = u(c);
    return;
  }
  const p = e.grid && i.grid && i.grid.rows > 1;
  let m;
  if (e.virtual && i.virtual.enabled && i.loop) m = u(c);
  else if (p) {
    const h = e.slides.find((d) => d.column === c);
    let f = parseInt(h.getAttribute('data-swiper-slide-index'), 10);
    (Number.isNaN(f) && (f = Math.max(e.slides.indexOf(h), 0)),
      (m = Math.floor(f / i.grid.rows)));
  } else if (e.slides[c]) {
    const h = e.slides[c].getAttribute('data-swiper-slide-index');
    h ? (m = parseInt(h, 10)) : (m = c);
  } else m = c;
  (Object.assign(e, {
    previousSnapIndex: o,
    snapIndex: l,
    previousRealIndex: a,
    realIndex: m,
    previousIndex: n,
    activeIndex: c,
  }),
    e.initialized && uo(e),
    e.emit('activeIndexChange'),
    e.emit('snapIndexChange'),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (a !== m && e.emit('realIndexChange'), e.emit('slideChange')));
}
function uf(s, e) {
  const t = this,
    r = t.params;
  let i = s.closest(`.${r.slideClass}, swiper-slide`);
  !i &&
    t.isElement &&
    e &&
    e.length > 1 &&
    e.includes(s) &&
    [...e.slice(e.indexOf(s) + 1, e.length)].forEach((o) => {
      !i && o.matches && o.matches(`.${r.slideClass}, swiper-slide`) && (i = o);
    });
  let n = !1,
    a;
  if (i) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === i) {
        ((n = !0), (a = o));
        break;
      }
  }
  if (i && n)
    ((t.clickedSlide = i),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            i.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (t.clickedIndex = a));
  else {
    ((t.clickedSlide = void 0), (t.clickedIndex = void 0));
    return;
  }
  r.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var df = {
  updateSize: ef,
  updateSlides: tf,
  updateAutoHeight: rf,
  updateSlidesOffset: sf,
  updateSlidesProgress: nf,
  updateProgress: af,
  updateSlidesClasses: of,
  updateActiveIndex: cf,
  updateClickedSlide: uf,
};
function ff(s) {
  s === void 0 && (s = this.isHorizontal() ? 'x' : 'y');
  const e = this,
    { params: t, rtlTranslate: r, translate: i, wrapperEl: n } = e;
  if (t.virtualTranslate) return r ? -i : i;
  if (t.cssMode) return i;
  let a = lo(n, s);
  return ((a += e.cssOverflowAdjustment()), r && (a = -a), a || 0);
}
function pf(s, e) {
  const t = this,
    { rtlTranslate: r, params: i, wrapperEl: n, progress: a } = t;
  let o = 0,
    c = 0;
  const l = 0;
  (t.isHorizontal() ? (o = r ? -s : s) : (c = s),
    i.roundLengths && ((o = Math.floor(o)), (c = Math.floor(c))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? o : c),
    i.cssMode
      ? (n[t.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = t.isHorizontal()
          ? -o
          : -c)
      : i.virtualTranslate ||
        (t.isHorizontal()
          ? (o -= t.cssOverflowAdjustment())
          : (c -= t.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${o}px, ${c}px, ${l}px)`)));
  let u;
  const p = t.maxTranslate() - t.minTranslate();
  (p === 0 ? (u = 0) : (u = (s - t.minTranslate()) / p),
    u !== a && t.updateProgress(s),
    t.emit('setTranslate', t.translate, e));
}
function hf() {
  return -this.snapGrid[0];
}
function mf() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function gf(s, e, t, r, i) {
  (s === void 0 && (s = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    r === void 0 && (r = !0));
  const n = this,
    { params: a, wrapperEl: o } = n;
  if (n.animating && a.preventInteractionOnTransition) return !1;
  const c = n.minTranslate(),
    l = n.maxTranslate();
  let u;
  if (
    (r && s > c ? (u = c) : r && s < l ? (u = l) : (u = s),
    n.updateProgress(u),
    a.cssMode)
  ) {
    const p = n.isHorizontal();
    if (e === 0) o[p ? 'scrollLeft' : 'scrollTop'] = -u;
    else {
      if (!n.support.smoothScroll)
        return (
          Ic({ swiper: n, targetPosition: -u, side: p ? 'left' : 'top' }),
          !0
        );
      o.scrollTo({ [p ? 'left' : 'top']: -u, behavior: 'smooth' });
    }
    return !0;
  }
  return (
    e === 0
      ? (n.setTransition(0),
        n.setTranslate(u),
        t && (n.emit('beforeTransitionStart', e, i), n.emit('transitionEnd')))
      : (n.setTransition(e),
        n.setTranslate(u),
        t && (n.emit('beforeTransitionStart', e, i), n.emit('transitionStart')),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (m) {
              !n ||
                n.destroyed ||
                (m.target === this &&
                  (n.wrapperEl.removeEventListener(
                    'transitionend',
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  (n.animating = !1),
                  t && n.emit('transitionEnd')));
            }),
          n.wrapperEl.addEventListener(
            'transitionend',
            n.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var vf = {
  getTranslate: ff,
  setTranslate: pf,
  minTranslate: hf,
  maxTranslate: mf,
  translateTo: gf,
};
function _f(s, e) {
  const t = this;
  (t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${s}ms`),
    (t.wrapperEl.style.transitionDelay = s === 0 ? '0ms' : '')),
    t.emit('setTransition', s, e));
}
function Nc(s) {
  let { swiper: e, runCallbacks: t, direction: r, step: i } = s;
  const { activeIndex: n, previousIndex: a } = e;
  let o = r;
  (o || (n > a ? (o = 'next') : n < a ? (o = 'prev') : (o = 'reset')),
    e.emit(`transition${i}`),
    t && o === 'reset'
      ? e.emit(`slideResetTransition${i}`)
      : t &&
        n !== a &&
        (e.emit(`slideChangeTransition${i}`),
        o === 'next'
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`)));
}
function wf(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    { params: r } = t;
  r.cssMode ||
    (r.autoHeight && t.updateAutoHeight(),
    Nc({ swiper: t, runCallbacks: s, direction: e, step: 'Start' }));
}
function yf(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    { params: r } = t;
  ((t.animating = !1),
    !r.cssMode &&
      (t.setTransition(0),
      Nc({ swiper: t, runCallbacks: s, direction: e, step: 'End' })));
}
var bf = { setTransition: _f, transitionStart: wf, transitionEnd: yf };
function Tf(s, e, t, r, i) {
  (s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == 'string' && (s = parseInt(s, 10)));
  const n = this;
  let a = s;
  a < 0 && (a = 0);
  const {
    params: o,
    snapGrid: c,
    slidesGrid: l,
    previousIndex: u,
    activeIndex: p,
    rtlTranslate: m,
    wrapperEl: h,
    enabled: f,
  } = n;
  if (
    (!f && !r && !i) ||
    n.destroyed ||
    (n.animating && o.preventInteractionOnTransition)
  )
    return !1;
  typeof e > 'u' && (e = n.params.speed);
  const d = Math.min(n.params.slidesPerGroupSkip, a);
  let g = d + Math.floor((a - d) / n.params.slidesPerGroup);
  g >= c.length && (g = c.length - 1);
  const w = -c[g];
  if (o.normalizeSlideIndex)
    for (let T = 0; T < l.length; T += 1) {
      const O = -Math.floor(w * 100),
        S = Math.floor(l[T] * 100),
        E = Math.floor(l[T + 1] * 100);
      typeof l[T + 1] < 'u'
        ? O >= S && O < E - (E - S) / 2
          ? (a = T)
          : O >= S && O < E && (a = T + 1)
        : O >= S && (a = T);
    }
  if (
    n.initialized &&
    a !== p &&
    ((!n.allowSlideNext &&
      (m
        ? w > n.translate && w > n.minTranslate()
        : w < n.translate && w < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        w > n.translate &&
        w > n.maxTranslate() &&
        (p || 0) !== a))
  )
    return !1;
  (a !== (u || 0) && t && n.emit('beforeSlideChangeStart'),
    n.updateProgress(w));
  let _;
  a > p ? (_ = 'next') : a < p ? (_ = 'prev') : (_ = 'reset');
  const v = n.virtual && n.params.virtual.enabled;
  if (!(v && i) && ((m && -w === n.translate) || (!m && w === n.translate)))
    return (
      n.updateActiveIndex(a),
      o.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      o.effect !== 'slide' && n.setTranslate(w),
      _ !== 'reset' && (n.transitionStart(t, _), n.transitionEnd(t, _)),
      !1
    );
  if (o.cssMode) {
    const T = n.isHorizontal(),
      O = m ? w : -w;
    if (e === 0)
      (v &&
        ((n.wrapperEl.style.scrollSnapType = 'none'),
        (n._immediateVirtual = !0)),
        v && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              h[T ? 'scrollLeft' : 'scrollTop'] = O;
            }))
          : (h[T ? 'scrollLeft' : 'scrollTop'] = O),
        v &&
          requestAnimationFrame(() => {
            ((n.wrapperEl.style.scrollSnapType = ''),
              (n._immediateVirtual = !1));
          }));
    else {
      if (!n.support.smoothScroll)
        return (
          Ic({ swiper: n, targetPosition: O, side: T ? 'left' : 'top' }),
          !0
        );
      h.scrollTo({ [T ? 'left' : 'top']: O, behavior: 'smooth' });
    }
    return !0;
  }
  const P = $c().isSafari;
  return (
    v && !i && P && n.isElement && n.virtual.update(!1, !1, a),
    n.setTransition(e),
    n.setTranslate(w),
    n.updateActiveIndex(a),
    n.updateSlidesClasses(),
    n.emit('beforeTransitionStart', e, r),
    n.transitionStart(t, _),
    e === 0
      ? n.transitionEnd(t, _)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (O) {
            !n ||
              n.destroyed ||
              (O.target === this &&
                (n.wrapperEl.removeEventListener(
                  'transitionend',
                  n.onSlideToWrapperTransitionEnd
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(t, _)));
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function xf(s, e, t, r) {
  (s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == 'string' && (s = parseInt(s, 10)));
  const i = this;
  if (i.destroyed) return;
  typeof e > 'u' && (e = i.params.speed);
  const n = i.grid && i.params.grid && i.params.grid.rows > 1;
  let a = s;
  if (i.params.loop)
    if (i.virtual && i.params.virtual.enabled) a = a + i.virtual.slidesBefore;
    else {
      let o;
      if (n) {
        const m = a * i.params.grid.rows;
        o = i.slides.find(
          (h) => h.getAttribute('data-swiper-slide-index') * 1 === m
        ).column;
      } else o = i.getSlideIndexByData(a);
      const c = n
          ? Math.ceil(i.slides.length / i.params.grid.rows)
          : i.slides.length,
        { centeredSlides: l } = i.params;
      let u = i.params.slidesPerView;
      u === 'auto'
        ? (u = i.slidesPerViewDynamic())
        : ((u = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
          l && u % 2 === 0 && (u = u + 1));
      let p = c - o < u;
      if (
        (l && (p = p || o < Math.ceil(u / 2)),
        r && l && i.params.slidesPerView !== 'auto' && !n && (p = !1),
        p)
      ) {
        const m = l
          ? o < i.activeIndex
            ? 'prev'
            : 'next'
          : o - i.activeIndex - 1 < i.params.slidesPerView
            ? 'next'
            : 'prev';
        i.loopFix({
          direction: m,
          slideTo: !0,
          activeSlideIndex: m === 'next' ? o + 1 : o - c + 1,
          slideRealIndex: m === 'next' ? i.realIndex : void 0,
        });
      }
      if (n) {
        const m = a * i.params.grid.rows;
        a = i.slides.find(
          (h) => h.getAttribute('data-swiper-slide-index') * 1 === m
        ).column;
      } else a = i.getSlideIndexByData(a);
    }
  return (
    requestAnimationFrame(() => {
      i.slideTo(a, e, t, r);
    }),
    i
  );
}
function Sf(s, e, t) {
  e === void 0 && (e = !0);
  const r = this,
    { enabled: i, params: n, animating: a } = r;
  if (!i || r.destroyed) return r;
  typeof s > 'u' && (s = r.params.speed);
  let o = n.slidesPerGroup;
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (o = Math.max(r.slidesPerViewDynamic('current', !0), 1));
  const c = r.activeIndex < n.slidesPerGroupSkip ? 1 : o,
    l = r.virtual && n.virtual.enabled;
  if (n.loop) {
    if (a && !l && n.loopPreventsSliding) return !1;
    if (
      (r.loopFix({ direction: 'next' }),
      (r._clientLeft = r.wrapperEl.clientLeft),
      r.activeIndex === r.slides.length - 1 && n.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          r.slideTo(r.activeIndex + c, s, e, t);
        }),
        !0
      );
  }
  return n.rewind && r.isEnd
    ? r.slideTo(0, s, e, t)
    : r.slideTo(r.activeIndex + c, s, e, t);
}
function Ef(s, e, t) {
  e === void 0 && (e = !0);
  const r = this,
    {
      params: i,
      snapGrid: n,
      slidesGrid: a,
      rtlTranslate: o,
      enabled: c,
      animating: l,
    } = r;
  if (!c || r.destroyed) return r;
  typeof s > 'u' && (s = r.params.speed);
  const u = r.virtual && i.virtual.enabled;
  if (i.loop) {
    if (l && !u && i.loopPreventsSliding) return !1;
    (r.loopFix({ direction: 'prev' }),
      (r._clientLeft = r.wrapperEl.clientLeft));
  }
  const p = o ? r.translate : -r.translate;
  function m(_) {
    return _ < 0 ? -Math.floor(Math.abs(_)) : Math.floor(_);
  }
  const h = m(p),
    f = n.map((_) => m(_)),
    d = i.freeMode && i.freeMode.enabled;
  let g = n[f.indexOf(h) - 1];
  if (typeof g > 'u' && (i.cssMode || d)) {
    let _;
    (n.forEach((v, y) => {
      h >= v && (_ = y);
    }),
      typeof _ < 'u' && (g = d ? n[_] : n[_ > 0 ? _ - 1 : _]));
  }
  let w = 0;
  if (
    (typeof g < 'u' &&
      ((w = a.indexOf(g)),
      w < 0 && (w = r.activeIndex - 1),
      i.slidesPerView === 'auto' &&
        i.slidesPerGroup === 1 &&
        i.slidesPerGroupAuto &&
        ((w = w - r.slidesPerViewDynamic('previous', !0) + 1),
        (w = Math.max(w, 0)))),
    i.rewind && r.isBeginning)
  ) {
    const _ =
      r.params.virtual && r.params.virtual.enabled && r.virtual
        ? r.virtual.slides.length - 1
        : r.slides.length - 1;
    return r.slideTo(_, s, e, t);
  } else if (i.loop && r.activeIndex === 0 && i.cssMode)
    return (
      requestAnimationFrame(() => {
        r.slideTo(w, s, e, t);
      }),
      !0
    );
  return r.slideTo(w, s, e, t);
}
function Cf(s, e, t) {
  e === void 0 && (e = !0);
  const r = this;
  if (!r.destroyed)
    return (
      typeof s > 'u' && (s = r.params.speed),
      r.slideTo(r.activeIndex, s, e, t)
    );
}
function Mf(s, e, t, r) {
  (e === void 0 && (e = !0), r === void 0 && (r = 0.5));
  const i = this;
  if (i.destroyed) return;
  typeof s > 'u' && (s = i.params.speed);
  let n = i.activeIndex;
  const a = Math.min(i.params.slidesPerGroupSkip, n),
    o = a + Math.floor((n - a) / i.params.slidesPerGroup),
    c = i.rtlTranslate ? i.translate : -i.translate;
  if (c >= i.snapGrid[o]) {
    const l = i.snapGrid[o],
      u = i.snapGrid[o + 1];
    c - l > (u - l) * r && (n += i.params.slidesPerGroup);
  } else {
    const l = i.snapGrid[o - 1],
      u = i.snapGrid[o];
    c - l <= (u - l) * r && (n -= i.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, i.slidesGrid.length - 1)),
    i.slideTo(n, s, e, t)
  );
}
function Pf() {
  const s = this;
  if (s.destroyed) return;
  const { params: e, slidesEl: t } = s,
    r = e.slidesPerView === 'auto' ? s.slidesPerViewDynamic() : e.slidesPerView;
  let i = s.getSlideIndexWhenGrid(s.clickedIndex),
    n;
  const a = s.isElement ? 'swiper-slide' : `.${e.slideClass}`,
    o = s.grid && s.params.grid && s.params.grid.rows > 1;
  if (e.loop) {
    if (s.animating) return;
    ((n = parseInt(s.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      e.centeredSlides
        ? s.slideToLoop(n)
        : i >
            (o
              ? (s.slides.length - r) / 2 - (s.params.grid.rows - 1)
              : s.slides.length - r)
          ? (s.loopFix(),
            (i = s.getSlideIndex(
              Ct(t, `${a}[data-swiper-slide-index="${n}"]`)[0]
            )),
            bs(() => {
              s.slideTo(i);
            }))
          : s.slideTo(i));
  } else s.slideTo(i);
}
var Af = {
  slideTo: Tf,
  slideToLoop: xf,
  slideNext: Sf,
  slidePrev: Ef,
  slideReset: Cf,
  slideToClosest: Mf,
  slideToClickedSlide: Pf,
};
function Of(s, e) {
  const t = this,
    { params: r, slidesEl: i } = t;
  if (!r.loop || (t.virtual && t.params.virtual.enabled)) return;
  const n = () => {
      Ct(i, `.${r.slideClass}, swiper-slide`).forEach((h, f) => {
        h.setAttribute('data-swiper-slide-index', f);
      });
    },
    a = () => {
      const m = Ct(i, `.${r.slideBlankClass}`);
      (m.forEach((h) => {
        h.remove();
      }),
        m.length > 0 && (t.recalcSlides(), t.updateSlides()));
    },
    o = t.grid && r.grid && r.grid.rows > 1;
  r.loopAddBlankSlides && (r.slidesPerGroup > 1 || o) && a();
  const c = r.slidesPerGroup * (o ? r.grid.rows : 1),
    l = t.slides.length % c !== 0,
    u = o && t.slides.length % r.grid.rows !== 0,
    p = (m) => {
      for (let h = 0; h < m; h += 1) {
        const f = t.isElement
          ? pr('swiper-slide', [r.slideBlankClass])
          : pr('div', [r.slideClass, r.slideBlankClass]);
        t.slidesEl.append(f);
      }
    };
  if (l) {
    if (r.loopAddBlankSlides) {
      const m = c - (t.slides.length % c);
      (p(m), t.recalcSlides(), t.updateSlides());
    } else
      ua(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      );
    n();
  } else if (u) {
    if (r.loopAddBlankSlides) {
      const m = r.grid.rows - (t.slides.length % r.grid.rows);
      (p(m), t.recalcSlides(), t.updateSlides());
    } else
      ua(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      );
    n();
  } else n();
  t.loopFix({
    slideRealIndex: s,
    direction: r.centeredSlides ? void 0 : 'next',
    initial: e,
  });
}
function Lf(s) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: r,
    setTranslate: i,
    activeSlideIndex: n,
    initial: a,
    byController: o,
    byMousewheel: c,
  } = s === void 0 ? {} : s;
  const l = this;
  if (!l.params.loop) return;
  l.emit('beforeLoopFix');
  const {
      slides: u,
      allowSlidePrev: p,
      allowSlideNext: m,
      slidesEl: h,
      params: f,
    } = l,
    { centeredSlides: d, initialSlide: g } = f;
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && f.virtual.enabled)
  ) {
    (t &&
      (!f.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : f.centeredSlides && l.snapIndex < f.slidesPerView
          ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
          : l.snapIndex === l.snapGrid.length - 1 &&
            l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = p),
      (l.allowSlideNext = m),
      l.emit('loopFix'));
    return;
  }
  let w = f.slidesPerView;
  w === 'auto'
    ? (w = l.slidesPerViewDynamic())
    : ((w = Math.ceil(parseFloat(f.slidesPerView, 10))),
      d && w % 2 === 0 && (w = w + 1));
  const _ = f.slidesPerGroupAuto ? w : f.slidesPerGroup;
  let v = d ? Math.max(_, Math.ceil(w / 2)) : _;
  (v % _ !== 0 && (v += _ - (v % _)),
    (v += f.loopAdditionalSlides),
    (l.loopedSlides = v));
  const y = l.grid && f.grid && f.grid.rows > 1;
  u.length < w + v || (l.params.effect === 'cards' && u.length < w + v * 2)
    ? ua(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters'
      )
    : y &&
      f.grid.fill === 'row' &&
      ua(
        'Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`'
      );
  const b = [],
    P = [],
    T = y ? Math.ceil(u.length / f.grid.rows) : u.length,
    O = a && T - g < w && !d;
  let S = O ? g : l.activeIndex;
  typeof n > 'u'
    ? (n = l.getSlideIndex(
        u.find(($) => $.classList.contains(f.slideActiveClass))
      ))
    : (S = n);
  const E = r === 'next' || !r,
    I = r === 'prev' || !r;
  let A = 0,
    k = 0;
  const L = (y ? u[n].column : n) + (d && typeof i > 'u' ? -w / 2 + 0.5 : 0);
  if (L < v) {
    A = Math.max(v - L, _);
    for (let $ = 0; $ < v - L; $ += 1) {
      const M = $ - Math.floor($ / T) * T;
      if (y) {
        const D = T - M - 1;
        for (let z = u.length - 1; z >= 0; z -= 1)
          u[z].column === D && b.push(z);
      } else b.push(T - M - 1);
    }
  } else if (L + w > T - v) {
    ((k = Math.max(L - (T - v * 2), _)), O && (k = Math.max(k, w - T + g + 1)));
    for (let $ = 0; $ < k; $ += 1) {
      const M = $ - Math.floor($ / T) * T;
      y
        ? u.forEach((D, z) => {
            D.column === M && P.push(z);
          })
        : P.push(M);
    }
  }
  if (
    ((l.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      l.__preventObserver__ = !1;
    }),
    l.params.effect === 'cards' &&
      u.length < w + v * 2 &&
      (P.includes(n) && P.splice(P.indexOf(n), 1),
      b.includes(n) && b.splice(b.indexOf(n), 1)),
    I &&
      b.forEach(($) => {
        ((u[$].swiperLoopMoveDOM = !0),
          h.prepend(u[$]),
          (u[$].swiperLoopMoveDOM = !1));
      }),
    E &&
      P.forEach(($) => {
        ((u[$].swiperLoopMoveDOM = !0),
          h.append(u[$]),
          (u[$].swiperLoopMoveDOM = !1));
      }),
    l.recalcSlides(),
    f.slidesPerView === 'auto'
      ? l.updateSlides()
      : y &&
        ((b.length > 0 && I) || (P.length > 0 && E)) &&
        l.slides.forEach(($, M) => {
          l.grid.updateSlide(M, $, l.slides);
        }),
    f.watchSlidesProgress && l.updateSlidesOffset(),
    t)
  ) {
    if (b.length > 0 && I) {
      if (typeof e > 'u') {
        const $ = l.slidesGrid[S],
          D = l.slidesGrid[S + A] - $;
        c
          ? l.setTranslate(l.translate - D)
          : (l.slideTo(S + Math.ceil(A), 0, !1, !0),
            i &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - D),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - D)));
      } else if (i) {
        const $ = y ? b.length / f.grid.rows : b.length;
        (l.slideTo(l.activeIndex + $, 0, !1, !0),
          (l.touchEventsData.currentTranslate = l.translate));
      }
    } else if (P.length > 0 && E)
      if (typeof e > 'u') {
        const $ = l.slidesGrid[S],
          D = l.slidesGrid[S - k] - $;
        c
          ? l.setTranslate(l.translate - D)
          : (l.slideTo(S - k, 0, !1, !0),
            i &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - D),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - D)));
      } else {
        const $ = y ? P.length / f.grid.rows : P.length;
        l.slideTo(l.activeIndex - $, 0, !1, !0);
      }
  }
  if (
    ((l.allowSlidePrev = p),
    (l.allowSlideNext = m),
    l.controller && l.controller.control && !o)
  ) {
    const $ = {
      slideRealIndex: e,
      direction: r,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0,
    };
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((M) => {
          !M.destroyed &&
            M.params.loop &&
            M.loopFix({
              ...$,
              slideTo: M.params.slidesPerView === f.slidesPerView ? t : !1,
            });
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix({
          ...$,
          slideTo:
            l.controller.control.params.slidesPerView === f.slidesPerView
              ? t
              : !1,
        });
  }
  l.emit('loopFix');
}
function Df() {
  const s = this,
    { params: e, slidesEl: t } = s;
  if (!e.loop || !t || (s.virtual && s.params.virtual.enabled)) return;
  s.recalcSlides();
  const r = [];
  (s.slides.forEach((i) => {
    const n =
      typeof i.swiperSlideIndex > 'u'
        ? i.getAttribute('data-swiper-slide-index') * 1
        : i.swiperSlideIndex;
    r[n] = i;
  }),
    s.slides.forEach((i) => {
      i.removeAttribute('data-swiper-slide-index');
    }),
    r.forEach((i) => {
      t.append(i);
    }),
    s.recalcSlides(),
    s.slideTo(s.realIndex, 0));
}
var kf = { loopCreate: Of, loopFix: Lf, loopDestroy: Df };
function If(s) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const t = e.params.touchEventsTarget === 'container' ? e.el : e.wrapperEl;
  (e.isElement && (e.__preventObserver__ = !0),
    (t.style.cursor = 'move'),
    (t.style.cursor = s ? 'grabbing' : 'grab'),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
function Rf() {
  const s = this;
  (s.params.watchOverflow && s.isLocked) ||
    s.params.cssMode ||
    (s.isElement && (s.__preventObserver__ = !0),
    (s[
      s.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    s.isElement &&
      requestAnimationFrame(() => {
        s.__preventObserver__ = !1;
      }));
}
var zf = { setGrabCursor: If, unsetGrabCursor: Rf };
function $f(s, e) {
  e === void 0 && (e = this);
  function t(r) {
    if (!r || r === bt() || r === Ke()) return null;
    r.assignedSlot && (r = r.assignedSlot);
    const i = r.closest(s);
    return !i && !r.getRootNode ? null : i || t(r.getRootNode().host);
  }
  return t(e);
}
function Ml(s, e, t) {
  const r = Ke(),
    { params: i } = s,
    n = i.edgeSwipeDetection,
    a = i.edgeSwipeThreshold;
  return n && (t <= a || t >= r.innerWidth - a)
    ? n === 'prevent'
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function Nf(s) {
  const e = this,
    t = bt();
  let r = s;
  r.originalEvent && (r = r.originalEvent);
  const i = e.touchEventsData;
  if (r.type === 'pointerdown') {
    if (i.pointerId !== null && i.pointerId !== r.pointerId) return;
    i.pointerId = r.pointerId;
  } else
    r.type === 'touchstart' &&
      r.targetTouches.length === 1 &&
      (i.touchId = r.targetTouches[0].identifier);
  if (r.type === 'touchstart') {
    Ml(e, r, r.targetTouches[0].pageX);
    return;
  }
  const { params: n, touches: a, enabled: o } = e;
  if (
    !o ||
    (!n.simulateTouch && r.pointerType === 'mouse') ||
    (e.animating && n.preventInteractionOnTransition)
  )
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let c = r.target;
  if (
    (n.touchEventsTarget === 'wrapper' && !Gd(c, e.wrapperEl)) ||
    ('which' in r && r.which === 3) ||
    ('button' in r && r.button > 0) ||
    (i.isTouched && i.isMoved)
  )
    return;
  const l = !!n.noSwipingClass && n.noSwipingClass !== '',
    u = r.composedPath ? r.composedPath() : r.path;
  l && r.target && r.target.shadowRoot && u && (c = u[0]);
  const p = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    m = !!(r.target && r.target.shadowRoot);
  if (n.noSwiping && (m ? $f(p, c) : c.closest(p))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !c.closest(n.swipeHandler)) return;
  ((a.currentX = r.pageX), (a.currentY = r.pageY));
  const h = a.currentX,
    f = a.currentY;
  if (!Ml(e, r, h)) return;
  (Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (a.startX = h),
    (a.startY = f),
    (i.touchStartTime = Sr()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    n.threshold > 0 && (i.allowThresholdMove = !1));
  let d = !0;
  (c.matches(i.focusableElements) &&
    ((d = !1), c.nodeName === 'SELECT' && (i.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(i.focusableElements) &&
      t.activeElement !== c &&
      (r.pointerType === 'mouse' ||
        (r.pointerType !== 'mouse' && !c.matches(i.focusableElements))) &&
      t.activeElement.blur());
  const g = d && e.allowTouchMove && n.touchStartPreventDefault;
  ((n.touchStartForcePreventDefault || g) &&
    !c.isContentEditable &&
    r.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !n.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit('touchStart', r));
}
function Bf(s) {
  const e = bt(),
    t = this,
    r = t.touchEventsData,
    { params: i, touches: n, rtlTranslate: a, enabled: o } = t;
  if (!o || (!i.simulateTouch && s.pointerType === 'mouse')) return;
  let c = s;
  if (
    (c.originalEvent && (c = c.originalEvent),
    c.type === 'pointermove' &&
      (r.touchId !== null || c.pointerId !== r.pointerId))
  )
    return;
  let l;
  if (c.type === 'touchmove') {
    if (
      ((l = [...c.changedTouches].find((b) => b.identifier === r.touchId)),
      !l || l.identifier !== r.touchId)
    )
      return;
  } else l = c;
  if (!r.isTouched) {
    r.startMoving && r.isScrolling && t.emit('touchMoveOpposite', c);
    return;
  }
  const u = l.pageX,
    p = l.pageY;
  if (c.preventedByNestedSwiper) {
    ((n.startX = u), (n.startY = p));
    return;
  }
  if (!t.allowTouchMove) {
    (c.target.matches(r.focusableElements) || (t.allowClick = !1),
      r.isTouched &&
        (Object.assign(n, { startX: u, startY: p, currentX: u, currentY: p }),
        (r.touchStartTime = Sr())));
    return;
  }
  if (i.touchReleaseOnEdges && !i.loop)
    if (t.isVertical()) {
      if (
        (p < n.startY && t.translate <= t.maxTranslate()) ||
        (p > n.startY && t.translate >= t.minTranslate())
      ) {
        ((r.isTouched = !1), (r.isMoved = !1));
        return;
      }
    } else {
      if (
        a &&
        ((u > n.startX && -t.translate <= t.maxTranslate()) ||
          (u < n.startX && -t.translate >= t.minTranslate()))
      )
        return;
      if (
        !a &&
        ((u < n.startX && t.translate <= t.maxTranslate()) ||
          (u > n.startX && t.translate >= t.minTranslate()))
      )
        return;
    }
  if (
    (e.activeElement &&
      e.activeElement.matches(r.focusableElements) &&
      e.activeElement !== c.target &&
      c.pointerType !== 'mouse' &&
      e.activeElement.blur(),
    e.activeElement &&
      c.target === e.activeElement &&
      c.target.matches(r.focusableElements))
  ) {
    ((r.isMoved = !0), (t.allowClick = !1));
    return;
  }
  (r.allowTouchCallbacks && t.emit('touchMove', c),
    (n.previousX = n.currentX),
    (n.previousY = n.currentY),
    (n.currentX = u),
    (n.currentY = p));
  const m = n.currentX - n.startX,
    h = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(m ** 2 + h ** 2) < t.params.threshold)
    return;
  if (typeof r.isScrolling > 'u') {
    let b;
    (t.isHorizontal() && n.currentY === n.startY) ||
    (t.isVertical() && n.currentX === n.startX)
      ? (r.isScrolling = !1)
      : m * m + h * h >= 25 &&
        ((b = (Math.atan2(Math.abs(h), Math.abs(m)) * 180) / Math.PI),
        (r.isScrolling = t.isHorizontal()
          ? b > i.touchAngle
          : 90 - b > i.touchAngle));
  }
  if (
    (r.isScrolling && t.emit('touchMoveOpposite', c),
    typeof r.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (r.startMoving = !0),
    r.isScrolling ||
      (c.type === 'touchmove' && r.preventTouchMoveFromPointerMove))
  ) {
    r.isTouched = !1;
    return;
  }
  if (!r.startMoving) return;
  ((t.allowClick = !1),
    !i.cssMode && c.cancelable && c.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && c.stopPropagation());
  let f = t.isHorizontal() ? m : h,
    d = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  (i.oneWayMovement &&
    ((f = Math.abs(f) * (a ? 1 : -1)), (d = Math.abs(d) * (a ? 1 : -1))),
    (n.diff = f),
    (f *= i.touchRatio),
    a && ((f = -f), (d = -d)));
  const g = t.touchesDirection;
  ((t.swipeDirection = f > 0 ? 'prev' : 'next'),
    (t.touchesDirection = d > 0 ? 'prev' : 'next'));
  const w = t.params.loop && !i.cssMode,
    _ =
      (t.touchesDirection === 'next' && t.allowSlideNext) ||
      (t.touchesDirection === 'prev' && t.allowSlidePrev);
  if (!r.isMoved) {
    if (
      (w && _ && t.loopFix({ direction: t.swipeDirection }),
      (r.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const b = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(b);
    }
    ((r.allowMomentumBounce = !1),
      i.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit('sliderFirstMove', c));
  }
  if (
    (new Date().getTime(),
    i._loopSwapReset !== !1 &&
      r.isMoved &&
      r.allowThresholdMove &&
      g !== t.touchesDirection &&
      w &&
      _ &&
      Math.abs(f) >= 1)
  ) {
    (Object.assign(n, {
      startX: u,
      startY: p,
      currentX: u,
      currentY: p,
      startTranslate: r.currentTranslate,
    }),
      (r.loopSwapReset = !0),
      (r.startTranslate = r.currentTranslate));
    return;
  }
  (t.emit('sliderMove', c),
    (r.isMoved = !0),
    (r.currentTranslate = f + r.startTranslate));
  let v = !0,
    y = i.resistanceRatio;
  if (
    (i.touchReleaseOnEdges && (y = 0),
    f > 0
      ? (w &&
          _ &&
          r.allowThresholdMove &&
          r.currentTranslate >
            (i.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (i.slidesPerView !== 'auto' &&
                t.slides.length - i.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        r.currentTranslate > t.minTranslate() &&
          ((v = !1),
          i.resistance &&
            (r.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + r.startTranslate + f) ** y)))
      : f < 0 &&
        (w &&
          _ &&
          r.allowThresholdMove &&
          r.currentTranslate <
            (i.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (i.slidesPerView !== 'auto' &&
                t.slides.length - i.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (i.slidesPerView === 'auto'
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(i.slidesPerView, 10))),
          }),
        r.currentTranslate < t.maxTranslate() &&
          ((v = !1),
          i.resistance &&
            (r.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - r.startTranslate - f) ** y))),
    v && (c.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === 'next' &&
      r.currentTranslate < r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === 'prev' &&
      r.currentTranslate > r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (r.currentTranslate = r.startTranslate),
    i.threshold > 0)
  )
    if (Math.abs(f) > i.threshold || r.allowThresholdMove) {
      if (!r.allowThresholdMove) {
        ((r.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (r.currentTranslate = r.startTranslate),
          (n.diff = t.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY));
        return;
      }
    } else {
      r.currentTranslate = r.startTranslate;
      return;
    }
  !i.followFinger ||
    i.cssMode ||
    (((i.freeMode && i.freeMode.enabled && t.freeMode) ||
      i.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    i.freeMode && i.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(r.currentTranslate),
    t.setTranslate(r.currentTranslate));
}
function Ff(s) {
  const e = this,
    t = e.touchEventsData;
  let r = s;
  r.originalEvent && (r = r.originalEvent);
  let i;
  if (r.type === 'touchend' || r.type === 'touchcancel') {
    if (
      ((i = [...r.changedTouches].find((b) => b.identifier === t.touchId)),
      !i || i.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || r.pointerId !== t.pointerId) return;
    i = r;
  }
  if (
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      r.type
    ) &&
    !(
      ['pointercancel', 'contextmenu'].includes(r.type) &&
      (e.browser.isSafari || e.browser.isWebView)
    )
  )
    return;
  ((t.pointerId = null), (t.touchId = null));
  const {
    params: a,
    touches: o,
    rtlTranslate: c,
    slidesGrid: l,
    enabled: u,
  } = e;
  if (!u || (!a.simulateTouch && r.pointerType === 'mouse')) return;
  if (
    (t.allowTouchCallbacks && e.emit('touchEnd', r),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    (t.isMoved && a.grabCursor && e.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1));
    return;
  }
  a.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const p = Sr(),
    m = p - t.touchStartTime;
  if (e.allowClick) {
    const b = r.path || (r.composedPath && r.composedPath());
    (e.updateClickedSlide((b && b[0]) || r.target, b),
      e.emit('tap click', r),
      m < 300 &&
        p - t.lastClickTime < 300 &&
        e.emit('doubleTap doubleClick', r));
  }
  if (
    ((t.lastClickTime = Sr()),
    bs(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !e.swipeDirection ||
      (o.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    ((t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1));
    return;
  }
  ((t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1));
  let h;
  if (
    (a.followFinger
      ? (h = c ? e.translate : -e.translate)
      : (h = -t.currentTranslate),
    a.cssMode)
  )
    return;
  if (a.freeMode && a.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: h });
    return;
  }
  const f = h >= -e.maxTranslate() && !e.params.loop;
  let d = 0,
    g = e.slidesSizesGrid[0];
  for (
    let b = 0;
    b < l.length;
    b += b < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
  ) {
    const P = b < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof l[b + P] < 'u'
      ? (f || (h >= l[b] && h < l[b + P])) && ((d = b), (g = l[b + P] - l[b]))
      : (f || h >= l[b]) && ((d = b), (g = l[l.length - 1] - l[l.length - 2]));
  }
  let w = null,
    _ = null;
  a.rewind &&
    (e.isBeginning
      ? (_ =
          a.virtual && a.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (w = 0));
  const v = (h - l[d]) / g,
    y = d < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (m > a.longSwipesMs) {
    if (!a.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    (e.swipeDirection === 'next' &&
      (v >= a.longSwipesRatio
        ? e.slideTo(a.rewind && e.isEnd ? w : d + y)
        : e.slideTo(d)),
      e.swipeDirection === 'prev' &&
        (v > 1 - a.longSwipesRatio
          ? e.slideTo(d + y)
          : _ !== null && v < 0 && Math.abs(v) > a.longSwipesRatio
            ? e.slideTo(_)
            : e.slideTo(d)));
  } else {
    if (!a.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (r.target === e.navigation.nextEl || r.target === e.navigation.prevEl)
      ? r.target === e.navigation.nextEl
        ? e.slideTo(d + y)
        : e.slideTo(d)
      : (e.swipeDirection === 'next' && e.slideTo(w !== null ? w : d + y),
        e.swipeDirection === 'prev' && e.slideTo(_ !== null ? _ : d));
  }
}
function Pl() {
  const s = this,
    { params: e, el: t } = s;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && s.setBreakpoint();
  const { allowSlideNext: r, allowSlidePrev: i, snapGrid: n } = s,
    a = s.virtual && s.params.virtual.enabled;
  ((s.allowSlideNext = !0),
    (s.allowSlidePrev = !0),
    s.updateSize(),
    s.updateSlides(),
    s.updateSlidesClasses());
  const o = a && e.loop;
  ((e.slidesPerView === 'auto' || e.slidesPerView > 1) &&
  s.isEnd &&
  !s.isBeginning &&
  !s.params.centeredSlides &&
  !o
    ? s.slideTo(s.slides.length - 1, 0, !1, !0)
    : s.params.loop && !a
      ? s.slideToLoop(s.realIndex, 0, !1, !0)
      : s.slideTo(s.activeIndex, 0, !1, !0),
    s.autoplay &&
      s.autoplay.running &&
      s.autoplay.paused &&
      (clearTimeout(s.autoplay.resizeTimeout),
      (s.autoplay.resizeTimeout = setTimeout(() => {
        s.autoplay &&
          s.autoplay.running &&
          s.autoplay.paused &&
          s.autoplay.resume();
      }, 500))),
    (s.allowSlidePrev = i),
    (s.allowSlideNext = r),
    s.params.watchOverflow && n !== s.snapGrid && s.checkOverflow());
}
function Yf(s) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && s.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (s.stopPropagation(), s.stopImmediatePropagation())));
}
function Vf() {
  const s = this,
    { wrapperEl: e, rtlTranslate: t, enabled: r } = s;
  if (!r) return;
  ((s.previousTranslate = s.translate),
    s.isHorizontal()
      ? (s.translate = -e.scrollLeft)
      : (s.translate = -e.scrollTop),
    s.translate === 0 && (s.translate = 0),
    s.updateActiveIndex(),
    s.updateSlidesClasses());
  let i;
  const n = s.maxTranslate() - s.minTranslate();
  (n === 0 ? (i = 0) : (i = (s.translate - s.minTranslate()) / n),
    i !== s.progress && s.updateProgress(t ? -s.translate : s.translate),
    s.emit('setTranslate', s.translate, !1));
}
function Xf(s) {
  const e = this;
  (Kn(e, s.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== 'auto' && !e.params.autoHeight)
    ) && e.update());
}
function Hf() {
  const s = this;
  s.documentTouchHandlerProceeded ||
    ((s.documentTouchHandlerProceeded = !0),
    s.params.touchReleaseOnEdges && (s.el.style.touchAction = 'auto'));
}
const Bc = (s, e) => {
  const t = bt(),
    { params: r, el: i, wrapperEl: n, device: a } = s,
    o = !!r.nested,
    c = e === 'on' ? 'addEventListener' : 'removeEventListener',
    l = e;
  !i ||
    typeof i == 'string' ||
    (t[c]('touchstart', s.onDocumentTouchStart, { passive: !1, capture: o }),
    i[c]('touchstart', s.onTouchStart, { passive: !1 }),
    i[c]('pointerdown', s.onTouchStart, { passive: !1 }),
    t[c]('touchmove', s.onTouchMove, { passive: !1, capture: o }),
    t[c]('pointermove', s.onTouchMove, { passive: !1, capture: o }),
    t[c]('touchend', s.onTouchEnd, { passive: !0 }),
    t[c]('pointerup', s.onTouchEnd, { passive: !0 }),
    t[c]('pointercancel', s.onTouchEnd, { passive: !0 }),
    t[c]('touchcancel', s.onTouchEnd, { passive: !0 }),
    t[c]('pointerout', s.onTouchEnd, { passive: !0 }),
    t[c]('pointerleave', s.onTouchEnd, { passive: !0 }),
    t[c]('contextmenu', s.onTouchEnd, { passive: !0 }),
    (r.preventClicks || r.preventClicksPropagation) &&
      i[c]('click', s.onClick, !0),
    r.cssMode && n[c]('scroll', s.onScroll),
    r.updateOnWindowResize
      ? s[l](
          a.ios || a.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          Pl,
          !0
        )
      : s[l]('observerUpdate', Pl, !0),
    i[c]('load', s.onLoad, { capture: !0 }));
};
function Gf() {
  const s = this,
    { params: e } = s;
  ((s.onTouchStart = Nf.bind(s)),
    (s.onTouchMove = Bf.bind(s)),
    (s.onTouchEnd = Ff.bind(s)),
    (s.onDocumentTouchStart = Hf.bind(s)),
    e.cssMode && (s.onScroll = Vf.bind(s)),
    (s.onClick = Yf.bind(s)),
    (s.onLoad = Xf.bind(s)),
    Bc(s, 'on'));
}
function qf() {
  Bc(this, 'off');
}
var Wf = { attachEvents: Gf, detachEvents: qf };
const Al = (s, e) => s.grid && e.grid && e.grid.rows > 1;
function Uf() {
  const s = this,
    { realIndex: e, initialized: t, params: r, el: i } = s,
    n = r.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const a = bt(),
    o =
      r.breakpointsBase === 'window' || !r.breakpointsBase
        ? r.breakpointsBase
        : 'container',
    c =
      ['window', 'container'].includes(r.breakpointsBase) || !r.breakpointsBase
        ? s.el
        : a.querySelector(r.breakpointsBase),
    l = s.getBreakpoint(n, o, c);
  if (!l || s.currentBreakpoint === l) return;
  const p = (l in n ? n[l] : void 0) || s.originalParams,
    m = Al(s, r),
    h = Al(s, p),
    f = s.params.grabCursor,
    d = p.grabCursor,
    g = r.enabled;
  (m && !h
    ? (i.classList.remove(
        `${r.containerModifierClass}grid`,
        `${r.containerModifierClass}grid-column`
      ),
      s.emitContainerClasses())
    : !m &&
      h &&
      (i.classList.add(`${r.containerModifierClass}grid`),
      ((p.grid.fill && p.grid.fill === 'column') ||
        (!p.grid.fill && r.grid.fill === 'column')) &&
        i.classList.add(`${r.containerModifierClass}grid-column`),
      s.emitContainerClasses()),
    f && !d ? s.unsetGrabCursor() : !f && d && s.setGrabCursor(),
    ['navigation', 'pagination', 'scrollbar'].forEach((P) => {
      if (typeof p[P] > 'u') return;
      const T = r[P] && r[P].enabled,
        O = p[P] && p[P].enabled;
      (T && !O && s[P].disable(), !T && O && s[P].enable());
    }));
  const w = p.direction && p.direction !== r.direction,
    _ = r.loop && (p.slidesPerView !== r.slidesPerView || w),
    v = r.loop;
  (w && t && s.changeDirection(), or(s.params, p));
  const y = s.params.enabled,
    b = s.params.loop;
  (Object.assign(s, {
    allowTouchMove: s.params.allowTouchMove,
    allowSlideNext: s.params.allowSlideNext,
    allowSlidePrev: s.params.allowSlidePrev,
  }),
    g && !y ? s.disable() : !g && y && s.enable(),
    (s.currentBreakpoint = l),
    s.emit('_beforeBreakpoint', p),
    t &&
      (_
        ? (s.loopDestroy(), s.loopCreate(e), s.updateSlides())
        : !v && b
          ? (s.loopCreate(e), s.updateSlides())
          : v && !b && s.loopDestroy()),
    s.emit('breakpoint', p));
}
function jf(s, e, t) {
  if ((e === void 0 && (e = 'window'), !s || (e === 'container' && !t))) return;
  let r = !1;
  const i = Ke(),
    n = e === 'window' ? i.innerHeight : t.clientHeight,
    a = Object.keys(s).map((o) => {
      if (typeof o == 'string' && o.indexOf('@') === 0) {
        const c = parseFloat(o.substr(1));
        return { value: n * c, point: o };
      }
      return { value: o, point: o };
    });
  a.sort((o, c) => parseInt(o.value, 10) - parseInt(c.value, 10));
  for (let o = 0; o < a.length; o += 1) {
    const { point: c, value: l } = a[o];
    e === 'window'
      ? i.matchMedia(`(min-width: ${l}px)`).matches && (r = c)
      : l <= t.clientWidth && (r = c);
  }
  return r || 'max';
}
var Kf = { setBreakpoint: Uf, getBreakpoint: jf };
function Zf(s, e) {
  const t = [];
  return (
    s.forEach((r) => {
      typeof r == 'object'
        ? Object.keys(r).forEach((i) => {
            r[i] && t.push(e + i);
          })
        : typeof r == 'string' && t.push(e + r);
    }),
    t
  );
}
function Qf() {
  const s = this,
    { classNames: e, params: t, rtl: r, el: i, device: n } = s,
    a = Zf(
      [
        'initialized',
        t.direction,
        { 'free-mode': s.params.freeMode && t.freeMode.enabled },
        { autoheight: t.autoHeight },
        { rtl: r },
        { grid: t.grid && t.grid.rows > 1 },
        {
          'grid-column': t.grid && t.grid.rows > 1 && t.grid.fill === 'column',
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': t.cssMode },
        { centered: t.cssMode && t.centeredSlides },
        { 'watch-progress': t.watchSlidesProgress },
      ],
      t.containerModifierClass
    );
  (e.push(...a), i.classList.add(...e), s.emitContainerClasses());
}
function Jf() {
  const s = this,
    { el: e, classNames: t } = s;
  !e ||
    typeof e == 'string' ||
    (e.classList.remove(...t), s.emitContainerClasses());
}
var ep = { addClasses: Qf, removeClasses: Jf };
function tp() {
  const s = this,
    { isLocked: e, params: t } = s,
    { slidesOffsetBefore: r } = t;
  if (r) {
    const i = s.slides.length - 1,
      n = s.slidesGrid[i] + s.slidesSizesGrid[i] + r * 2;
    s.isLocked = s.size > n;
  } else s.isLocked = s.snapGrid.length === 1;
  (t.allowSlideNext === !0 && (s.allowSlideNext = !s.isLocked),
    t.allowSlidePrev === !0 && (s.allowSlidePrev = !s.isLocked),
    e && e !== s.isLocked && (s.isEnd = !1),
    e !== s.isLocked && s.emit(s.isLocked ? 'lock' : 'unlock'));
}
var rp = { checkOverflow: tp },
  Ol = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    swiperElementNodeName: 'SWIPER-CONTAINER',
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: 'swiper',
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-blank',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideFullyVisibleClass: 'swiper-slide-fully-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function ip(s, e) {
  return function (r) {
    r === void 0 && (r = {});
    const i = Object.keys(r)[0],
      n = r[i];
    if (typeof n != 'object' || n === null) {
      or(e, r);
      return;
    }
    if (
      (s[i] === !0 && (s[i] = { enabled: !0 }),
      i === 'navigation' &&
        s[i] &&
        s[i].enabled &&
        !s[i].prevEl &&
        !s[i].nextEl &&
        (s[i].auto = !0),
      ['pagination', 'scrollbar'].indexOf(i) >= 0 &&
        s[i] &&
        s[i].enabled &&
        !s[i].el &&
        (s[i].auto = !0),
      !(i in s && 'enabled' in n))
    ) {
      or(e, r);
      return;
    }
    (typeof s[i] == 'object' && !('enabled' in s[i]) && (s[i].enabled = !0),
      s[i] || (s[i] = { enabled: !1 }),
      or(e, r));
  };
}
const Na = {
    eventsEmitter: Jd,
    update: df,
    translate: vf,
    transition: bf,
    slide: Af,
    loop: kf,
    grabCursor: zf,
    events: Wf,
    breakpoints: Kf,
    checkOverflow: rp,
    classes: ep,
  },
  Ba = {};
class nr {
  constructor() {
    let e, t;
    for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++)
      i[n] = arguments[n];
    (i.length === 1 &&
    i[0].constructor &&
    Object.prototype.toString.call(i[0]).slice(8, -1) === 'Object'
      ? (t = i[0])
      : ([e, t] = i),
      t || (t = {}),
      (t = or({}, t)),
      e && !t.el && (t.el = e));
    const a = bt();
    if (
      t.el &&
      typeof t.el == 'string' &&
      a.querySelectorAll(t.el).length > 1
    ) {
      const u = [];
      return (
        a.querySelectorAll(t.el).forEach((p) => {
          const m = or({}, t, { el: p });
          u.push(new nr(m));
        }),
        u
      );
    }
    const o = this;
    ((o.__swiper__ = !0),
      (o.support = Rc()),
      (o.device = zc({ userAgent: t.userAgent })),
      (o.browser = $c()),
      (o.eventsListeners = {}),
      (o.eventsAnyListeners = []),
      (o.modules = [...o.__modules__]),
      t.modules && Array.isArray(t.modules) && o.modules.push(...t.modules));
    const c = {};
    o.modules.forEach((u) => {
      u({
        params: t,
        swiper: o,
        extendParams: ip(t, c),
        on: o.on.bind(o),
        once: o.once.bind(o),
        off: o.off.bind(o),
        emit: o.emit.bind(o),
      });
    });
    const l = or({}, Ol, c);
    return (
      (o.params = or({}, l, Ba, t)),
      (o.originalParams = or({}, o.params)),
      (o.passedParams = or({}, t)),
      o.params &&
        o.params.on &&
        Object.keys(o.params.on).forEach((u) => {
          o.on(u, o.params.on[u]);
        }),
      o.params && o.params.onAny && o.onAny(o.params.onAny),
      Object.assign(o, {
        enabled: o.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return o.params.direction === 'horizontal';
        },
        isVertical() {
          return o.params.direction === 'vertical';
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: o.params.allowSlideNext,
        allowSlidePrev: o.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: o.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: o.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      o.emit('_swiper'),
      o.params.init && o.init(),
      o
    );
  }
  getDirectionLabel(e) {
    return this.isHorizontal()
      ? e
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom',
        }[e];
  }
  getSlideIndex(e) {
    const { slidesEl: t, params: r } = this,
      i = Ct(t, `.${r.slideClass}, swiper-slide`),
      n = hn(i[0]);
    return hn(e) - n;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.find(
        (t) => t.getAttribute('data-swiper-slide-index') * 1 === e
      )
    );
  }
  getSlideIndexWhenGrid(e) {
    return (
      this.grid &&
        this.params.grid &&
        this.params.grid.rows > 1 &&
        (this.params.grid.fill === 'column'
          ? (e = Math.floor(e / this.params.grid.rows))
          : this.params.grid.fill === 'row' &&
            (e = e % Math.ceil(this.slides.length / this.params.grid.rows))),
      e
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: t, params: r } = e;
    e.slides = Ct(t, `.${r.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit('enable'));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit('disable'));
  }
  setProgress(e, t) {
    const r = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = r.minTranslate(),
      a = (r.maxTranslate() - i) * e + i;
    (r.translateTo(a, typeof t > 'u' ? 0 : t),
      r.updateActiveIndex(),
      r.updateSlidesClasses());
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(' ')
      .filter(
        (r) =>
          r.indexOf('swiper') === 0 ||
          r.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit('_containerClasses', t.join(' '));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ''
      : e.className
          .split(' ')
          .filter(
            (r) =>
              r.indexOf('swiper-slide') === 0 ||
              r.indexOf(t.params.slideClass) === 0
          )
          .join(' ');
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    (e.slides.forEach((r) => {
      const i = e.getSlideClasses(r);
      (t.push({ slideEl: r, classNames: i }), e.emit('_slideClass', r, i));
    }),
      e.emit('_slideClasses', t));
  }
  slidesPerViewDynamic(e, t) {
    (e === void 0 && (e = 'current'), t === void 0 && (t = !1));
    const r = this,
      {
        params: i,
        slides: n,
        slidesGrid: a,
        slidesSizesGrid: o,
        size: c,
        activeIndex: l,
      } = r;
    let u = 1;
    if (typeof i.slidesPerView == 'number') return i.slidesPerView;
    if (i.centeredSlides) {
      let p = n[l] ? Math.ceil(n[l].swiperSlideSize) : 0,
        m;
      for (let h = l + 1; h < n.length; h += 1)
        n[h] &&
          !m &&
          ((p += Math.ceil(n[h].swiperSlideSize)), (u += 1), p > c && (m = !0));
      for (let h = l - 1; h >= 0; h -= 1)
        n[h] &&
          !m &&
          ((p += n[h].swiperSlideSize), (u += 1), p > c && (m = !0));
    } else if (e === 'current')
      for (let p = l + 1; p < n.length; p += 1)
        (t ? a[p] + o[p] - a[l] < c : a[p] - a[l] < c) && (u += 1);
    else for (let p = l - 1; p >= 0; p -= 1) a[l] - a[p] < c && (u += 1);
    return u;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: r } = e;
    (r.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
        a.complete && Kn(e, a);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses());
    function i() {
      const a = e.rtlTranslate ? e.translate * -1 : e.translate,
        o = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
      (e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses());
    }
    let n;
    if (r.freeMode && r.freeMode.enabled && !r.cssMode)
      (i(), r.autoHeight && e.updateAutoHeight());
    else {
      if (
        (r.slidesPerView === 'auto' || r.slidesPerView > 1) &&
        e.isEnd &&
        !r.centeredSlides
      ) {
        const a = e.virtual && r.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(a.length - 1, 0, !1, !0);
      } else n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || i();
    }
    (r.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
      e.emit('update'));
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const r = this,
      i = r.params.direction;
    return (
      e || (e = i === 'horizontal' ? 'vertical' : 'horizontal'),
      e === i ||
        (e !== 'horizontal' && e !== 'vertical') ||
        (r.el.classList.remove(`${r.params.containerModifierClass}${i}`),
        r.el.classList.add(`${r.params.containerModifierClass}${e}`),
        r.emitContainerClasses(),
        (r.params.direction = e),
        r.slides.forEach((n) => {
          e === 'vertical' ? (n.style.width = '') : (n.style.height = '');
        }),
        r.emit('changeDirection'),
        t && r.update()),
      r
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && e === 'rtl') ||
      (!t.rtl && e === 'ltr') ||
      ((t.rtl = e === 'rtl'),
      (t.rtlTranslate = t.params.direction === 'horizontal' && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = 'rtl'))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = 'ltr')),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let r = e || t.params.el;
    if ((typeof r == 'string' && (r = document.querySelector(r)), !r))
      return !1;
    ((r.swiper = t),
      r.parentNode &&
        r.parentNode.host &&
        r.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0));
    const i = () =>
      `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
    let a =
      r && r.shadowRoot && r.shadowRoot.querySelector
        ? r.shadowRoot.querySelector(i())
        : Ct(r, i())[0];
    return (
      !a &&
        t.params.createElements &&
        ((a = pr('div', t.params.wrapperClass)),
        r.append(a),
        Ct(r, `.${t.params.slideClass}`).forEach((o) => {
          a.append(o);
        })),
      Object.assign(t, {
        el: r,
        wrapperEl: a,
        slidesEl:
          t.isElement && !r.parentNode.host.slideSlots ? r.parentNode.host : a,
        hostEl: t.isElement ? r.parentNode.host : r,
        mounted: !0,
        rtl: r.dir.toLowerCase() === 'rtl' || di(r, 'direction') === 'rtl',
        rtlTranslate:
          t.params.direction === 'horizontal' &&
          (r.dir.toLowerCase() === 'rtl' || di(r, 'direction') === 'rtl'),
        wrongRTL: di(a, 'display') === '-webkit-box',
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    (t.emit('beforeInit'),
      t.params.breakpoints && t.setBreakpoint(),
      t.addClasses(),
      t.updateSize(),
      t.updateSlides(),
      t.params.watchOverflow && t.checkOverflow(),
      t.params.grabCursor && t.enabled && t.setGrabCursor(),
      t.params.loop && t.virtual && t.params.virtual.enabled
        ? t.slideTo(
            t.params.initialSlide + t.virtual.slidesBefore,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          )
        : t.slideTo(
            t.params.initialSlide,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          ),
      t.params.loop && t.loopCreate(void 0, !0),
      t.attachEvents());
    const i = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      i.forEach((n) => {
        n.complete
          ? Kn(t, n)
          : n.addEventListener('load', (a) => {
              Kn(t, a.target);
            });
      }),
      uo(t),
      (t.initialized = !0),
      uo(t),
      t.emit('init'),
      t.emit('afterInit'),
      t
    );
  }
  destroy(e, t) {
    (e === void 0 && (e = !0), t === void 0 && (t = !0));
    const r = this,
      { params: i, el: n, wrapperEl: a, slides: o } = r;
    return (
      typeof r.params > 'u' ||
        r.destroyed ||
        (r.emit('beforeDestroy'),
        (r.initialized = !1),
        r.detachEvents(),
        i.loop && r.loopDestroy(),
        t &&
          (r.removeClasses(),
          n && typeof n != 'string' && n.removeAttribute('style'),
          a && a.removeAttribute('style'),
          o &&
            o.length &&
            o.forEach((c) => {
              (c.classList.remove(
                i.slideVisibleClass,
                i.slideFullyVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass
              ),
                c.removeAttribute('style'),
                c.removeAttribute('data-swiper-slide-index'));
            })),
        r.emit('destroy'),
        Object.keys(r.eventsListeners).forEach((c) => {
          r.off(c);
        }),
        e !== !1 &&
          (r.el && typeof r.el != 'string' && (r.el.swiper = null), Yd(r)),
        (r.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    or(Ba, e);
  }
  static get extendedDefaults() {
    return Ba;
  }
  static get defaults() {
    return Ol;
  }
  static installModule(e) {
    nr.prototype.__modules__ || (nr.prototype.__modules__ = []);
    const t = nr.prototype.__modules__;
    typeof e == 'function' && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((t) => nr.installModule(t)), nr)
      : (nr.installModule(e), nr);
  }
}
Object.keys(Na).forEach((s) => {
  Object.keys(Na[s]).forEach((e) => {
    nr.prototype[e] = Na[s][e];
  });
});
nr.use([Zd, Qd]);
function sp(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  t({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  });
  let n;
  const a = bt();
  e.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: [],
  };
  const o = a.createElement('div');
  function c(f, d) {
    const g = e.params.virtual;
    if (g.cache && e.virtual.cache[d]) return e.virtual.cache[d];
    let w;
    return (
      g.renderSlide
        ? ((w = g.renderSlide.call(e, f, d)),
          typeof w == 'string' && (ei(o, w), (w = o.children[0])))
        : e.isElement
          ? (w = pr('swiper-slide'))
          : (w = pr('div', e.params.slideClass)),
      w.setAttribute('data-swiper-slide-index', d),
      g.renderSlide || ei(w, f),
      g.cache && (e.virtual.cache[d] = w),
      w
    );
  }
  function l(f, d, g) {
    const {
      slidesPerView: w,
      slidesPerGroup: _,
      centeredSlides: v,
      loop: y,
      initialSlide: b,
    } = e.params;
    if (d && !y && b > 0) return;
    const { addSlidesBefore: P, addSlidesAfter: T } = e.params.virtual,
      { from: O, to: S, slides: E, slidesGrid: I, offset: A } = e.virtual;
    e.params.cssMode || e.updateActiveIndex();
    const k = typeof g > 'u' ? e.activeIndex || 0 : g;
    let x;
    e.rtlTranslate ? (x = 'right') : (x = e.isHorizontal() ? 'left' : 'top');
    let L, $;
    v
      ? ((L = Math.floor(w / 2) + _ + T), ($ = Math.floor(w / 2) + _ + P))
      : ((L = w + (_ - 1) + T), ($ = (y ? w : _) + P));
    let M = k - $,
      D = k + L;
    y || ((M = Math.max(M, 0)), (D = Math.min(D, E.length - 1)));
    let z = (e.slidesGrid[M] || 0) - (e.slidesGrid[0] || 0);
    (y && k >= $
      ? ((M -= $), v || (z += e.slidesGrid[0]))
      : y && k < $ && ((M = -$), v && (z += e.slidesGrid[0])),
      Object.assign(e.virtual, {
        from: M,
        to: D,
        offset: z,
        slidesGrid: e.slidesGrid,
        slidesBefore: $,
        slidesAfter: L,
      }));
    function C() {
      (e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        i('virtualUpdate'));
    }
    if (O === M && S === D && !f) {
      (e.slidesGrid !== I &&
        z !== A &&
        e.slides.forEach((F) => {
          F.style[x] = `${z - Math.abs(e.cssOverflowAdjustment())}px`;
        }),
        e.updateProgress(),
        i('virtualUpdate'));
      return;
    }
    if (e.params.virtual.renderExternal) {
      (e.params.virtual.renderExternal.call(e, {
        offset: z,
        from: M,
        to: D,
        slides: (function () {
          const Y = [];
          for (let Q = M; Q <= D; Q += 1) Y.push(E[Q]);
          return Y;
        })(),
      }),
        e.params.virtual.renderExternalUpdate ? C() : i('virtualUpdate'));
      return;
    }
    const W = [],
      ae = [],
      le = (F) => {
        let Y = F;
        return (
          F < 0 ? (Y = E.length + F) : Y >= E.length && (Y = Y - E.length),
          Y
        );
      };
    if (f)
      e.slides
        .filter((F) => F.matches(`.${e.params.slideClass}, swiper-slide`))
        .forEach((F) => {
          F.remove();
        });
    else
      for (let F = O; F <= S; F += 1)
        if (F < M || F > D) {
          const Y = le(F);
          e.slides
            .filter((Q) =>
              Q.matches(
                `.${e.params.slideClass}[data-swiper-slide-index="${Y}"], swiper-slide[data-swiper-slide-index="${Y}"]`
              )
            )
            .forEach((Q) => {
              Q.remove();
            });
        }
    const U = y ? -E.length : 0,
      B = y ? E.length * 2 : E.length;
    for (let F = U; F < B; F += 1)
      if (F >= M && F <= D) {
        const Y = le(F);
        typeof S > 'u' || f
          ? ae.push(Y)
          : (F > S && ae.push(Y), F < O && W.push(Y));
      }
    if (
      (ae.forEach((F) => {
        e.slidesEl.append(c(E[F], F));
      }),
      y)
    )
      for (let F = W.length - 1; F >= 0; F -= 1) {
        const Y = W[F];
        e.slidesEl.prepend(c(E[Y], Y));
      }
    else
      (W.sort((F, Y) => Y - F),
        W.forEach((F) => {
          e.slidesEl.prepend(c(E[F], F));
        }));
    (Ct(e.slidesEl, '.swiper-slide, swiper-slide').forEach((F) => {
      F.style[x] = `${z - Math.abs(e.cssOverflowAdjustment())}px`;
    }),
      C());
  }
  function u(f) {
    if (typeof f == 'object' && 'length' in f)
      for (let d = 0; d < f.length; d += 1) f[d] && e.virtual.slides.push(f[d]);
    else e.virtual.slides.push(f);
    l(!0);
  }
  function p(f) {
    const d = e.activeIndex;
    let g = d + 1,
      w = 1;
    if (Array.isArray(f)) {
      for (let _ = 0; _ < f.length; _ += 1)
        f[_] && e.virtual.slides.unshift(f[_]);
      ((g = d + f.length), (w = f.length));
    } else e.virtual.slides.unshift(f);
    if (e.params.virtual.cache) {
      const _ = e.virtual.cache,
        v = {};
      (Object.keys(_).forEach((y) => {
        const b = _[y],
          P = b.getAttribute('data-swiper-slide-index');
        (P && b.setAttribute('data-swiper-slide-index', parseInt(P, 10) + w),
          (v[parseInt(y, 10) + w] = b));
      }),
        (e.virtual.cache = v));
    }
    (l(!0), e.slideTo(g, 0));
  }
  function m(f) {
    if (typeof f > 'u' || f === null) return;
    let d = e.activeIndex;
    if (Array.isArray(f))
      for (let g = f.length - 1; g >= 0; g -= 1)
        (e.params.virtual.cache &&
          (delete e.virtual.cache[f[g]],
          Object.keys(e.virtual.cache).forEach((w) => {
            w > f &&
              ((e.virtual.cache[w - 1] = e.virtual.cache[w]),
              e.virtual.cache[w - 1].setAttribute(
                'data-swiper-slide-index',
                w - 1
              ),
              delete e.virtual.cache[w]);
          })),
          e.virtual.slides.splice(f[g], 1),
          f[g] < d && (d -= 1),
          (d = Math.max(d, 0)));
    else
      (e.params.virtual.cache &&
        (delete e.virtual.cache[f],
        Object.keys(e.virtual.cache).forEach((g) => {
          g > f &&
            ((e.virtual.cache[g - 1] = e.virtual.cache[g]),
            e.virtual.cache[g - 1].setAttribute(
              'data-swiper-slide-index',
              g - 1
            ),
            delete e.virtual.cache[g]);
        })),
        e.virtual.slides.splice(f, 1),
        f < d && (d -= 1),
        (d = Math.max(d, 0)));
    (l(!0), e.slideTo(d, 0));
  }
  function h() {
    ((e.virtual.slides = []),
      e.params.virtual.cache && (e.virtual.cache = {}),
      l(!0),
      e.slideTo(0, 0));
  }
  (r('beforeInit', () => {
    if (!e.params.virtual.enabled) return;
    let f;
    if (typeof e.passedParams.virtual.slides > 'u') {
      const d = [...e.slidesEl.children].filter((g) =>
        g.matches(`.${e.params.slideClass}, swiper-slide`)
      );
      d &&
        d.length &&
        ((e.virtual.slides = [...d]),
        (f = !0),
        d.forEach((g, w) => {
          (g.setAttribute('data-swiper-slide-index', w),
            (e.virtual.cache[w] = g),
            g.remove());
        }));
    }
    (f || (e.virtual.slides = e.params.virtual.slides),
      e.classNames.push(`${e.params.containerModifierClass}virtual`),
      (e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0),
      l(!1, !0));
  }),
    r('setTranslate', () => {
      e.params.virtual.enabled &&
        (e.params.cssMode && !e._immediateVirtual
          ? (clearTimeout(n),
            (n = setTimeout(() => {
              l();
            }, 100)))
          : l());
    }),
    r('init update resize', () => {
      e.params.virtual.enabled &&
        e.params.cssMode &&
        Xs(e.wrapperEl, '--swiper-virtual-size', `${e.virtualSize}px`);
    }),
    Object.assign(e.virtual, {
      appendSlide: u,
      prependSlide: p,
      removeSlide: m,
      removeAllSlides: h,
      update: l,
    }));
}
function np(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = bt(),
    a = Ke();
  ((e.keyboard = { enabled: !1 }),
    t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }));
  function o(u) {
    if (!e.enabled) return;
    const { rtlTranslate: p } = e;
    let m = u;
    m.originalEvent && (m = m.originalEvent);
    const h = m.keyCode || m.charCode,
      f = e.params.keyboard.pageUpDown,
      d = f && h === 33,
      g = f && h === 34,
      w = h === 37,
      _ = h === 39,
      v = h === 38,
      y = h === 40;
    if (
      (!e.allowSlideNext &&
        ((e.isHorizontal() && _) || (e.isVertical() && y) || g)) ||
      (!e.allowSlidePrev &&
        ((e.isHorizontal() && w) || (e.isVertical() && v) || d))
    )
      return !1;
    if (
      !(m.shiftKey || m.altKey || m.ctrlKey || m.metaKey) &&
      !(
        n.activeElement &&
        (n.activeElement.isContentEditable ||
          (n.activeElement.nodeName &&
            (n.activeElement.nodeName.toLowerCase() === 'input' ||
              n.activeElement.nodeName.toLowerCase() === 'textarea')))
      )
    ) {
      if (e.params.keyboard.onlyInViewport && (d || g || w || _ || v || y)) {
        let b = !1;
        if (
          Yi(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 &&
          Yi(e.el, `.${e.params.slideActiveClass}`).length === 0
        )
          return;
        const P = e.el,
          T = P.clientWidth,
          O = P.clientHeight,
          S = a.innerWidth,
          E = a.innerHeight,
          I = da(P);
        p && (I.left -= P.scrollLeft);
        const A = [
          [I.left, I.top],
          [I.left + T, I.top],
          [I.left, I.top + O],
          [I.left + T, I.top + O],
        ];
        for (let k = 0; k < A.length; k += 1) {
          const x = A[k];
          if (x[0] >= 0 && x[0] <= S && x[1] >= 0 && x[1] <= E) {
            if (x[0] === 0 && x[1] === 0) continue;
            b = !0;
          }
        }
        if (!b) return;
      }
      (e.isHorizontal()
        ? ((d || g || w || _) &&
            (m.preventDefault ? m.preventDefault() : (m.returnValue = !1)),
          (((g || _) && !p) || ((d || w) && p)) && e.slideNext(),
          (((d || w) && !p) || ((g || _) && p)) && e.slidePrev())
        : ((d || g || v || y) &&
            (m.preventDefault ? m.preventDefault() : (m.returnValue = !1)),
          (g || y) && e.slideNext(),
          (d || v) && e.slidePrev()),
        i('keyPress', h));
    }
  }
  function c() {
    e.keyboard.enabled ||
      (n.addEventListener('keydown', o), (e.keyboard.enabled = !0));
  }
  function l() {
    e.keyboard.enabled &&
      (n.removeEventListener('keydown', o), (e.keyboard.enabled = !1));
  }
  (r('init', () => {
    e.params.keyboard.enabled && c();
  }),
    r('destroy', () => {
      e.keyboard.enabled && l();
    }),
    Object.assign(e.keyboard, { enable: c, disable: l }));
}
function ap(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = Ke();
  (t({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: 'swiper-no-mousewheel',
    },
  }),
    (e.mousewheel = { enabled: !1 }));
  let a,
    o = Sr(),
    c;
  const l = [];
  function u(v) {
    let T = 0,
      O = 0,
      S = 0,
      E = 0;
    return (
      'detail' in v && (O = v.detail),
      'wheelDelta' in v && (O = -v.wheelDelta / 120),
      'wheelDeltaY' in v && (O = -v.wheelDeltaY / 120),
      'wheelDeltaX' in v && (T = -v.wheelDeltaX / 120),
      'axis' in v && v.axis === v.HORIZONTAL_AXIS && ((T = O), (O = 0)),
      (S = T * 10),
      (E = O * 10),
      'deltaY' in v && (E = v.deltaY),
      'deltaX' in v && (S = v.deltaX),
      v.shiftKey && !S && ((S = E), (E = 0)),
      (S || E) &&
        v.deltaMode &&
        (v.deltaMode === 1 ? ((S *= 40), (E *= 40)) : ((S *= 800), (E *= 800))),
      S && !T && (T = S < 1 ? -1 : 1),
      E && !O && (O = E < 1 ? -1 : 1),
      { spinX: T, spinY: O, pixelX: S, pixelY: E }
    );
  }
  function p() {
    e.enabled && (e.mouseEntered = !0);
  }
  function m() {
    e.enabled && (e.mouseEntered = !1);
  }
  function h(v) {
    return (e.params.mousewheel.thresholdDelta &&
      v.delta < e.params.mousewheel.thresholdDelta) ||
      (e.params.mousewheel.thresholdTime &&
        Sr() - o < e.params.mousewheel.thresholdTime)
      ? !1
      : v.delta >= 6 && Sr() - o < 60
        ? !0
        : (v.direction < 0
            ? (!e.isEnd || e.params.loop) &&
              !e.animating &&
              (e.slideNext(), i('scroll', v.raw))
            : (!e.isBeginning || e.params.loop) &&
              !e.animating &&
              (e.slidePrev(), i('scroll', v.raw)),
          (o = new n.Date().getTime()),
          !1);
  }
  function f(v) {
    const y = e.params.mousewheel;
    if (v.direction < 0) {
      if (e.isEnd && !e.params.loop && y.releaseOnEdges) return !0;
    } else if (e.isBeginning && !e.params.loop && y.releaseOnEdges) return !0;
    return !1;
  }
  function d(v) {
    let y = v,
      b = !0;
    if (
      !e.enabled ||
      v.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)
    )
      return;
    const P = e.params.mousewheel;
    e.params.cssMode && y.preventDefault();
    let T = e.el;
    e.params.mousewheel.eventsTarget !== 'container' &&
      (T = document.querySelector(e.params.mousewheel.eventsTarget));
    const O = T && T.contains(y.target);
    if (!e.mouseEntered && !O && !P.releaseOnEdges) return !0;
    y.originalEvent && (y = y.originalEvent);
    let S = 0;
    const E = e.rtlTranslate ? -1 : 1,
      I = u(y);
    if (P.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(I.pixelX) > Math.abs(I.pixelY)) S = -I.pixelX * E;
        else return !0;
      else if (Math.abs(I.pixelY) > Math.abs(I.pixelX)) S = -I.pixelY;
      else return !0;
    else
      S = Math.abs(I.pixelX) > Math.abs(I.pixelY) ? -I.pixelX * E : -I.pixelY;
    if (S === 0) return !0;
    P.invert && (S = -S);
    let A = e.getTranslate() + S * P.sensitivity;
    if (
      (A >= e.minTranslate() && (A = e.minTranslate()),
      A <= e.maxTranslate() && (A = e.maxTranslate()),
      (b = e.params.loop
        ? !0
        : !(A === e.minTranslate() || A === e.maxTranslate())),
      b && e.params.nested && y.stopPropagation(),
      !e.params.freeMode || !e.params.freeMode.enabled)
    ) {
      const k = {
        time: Sr(),
        delta: Math.abs(S),
        direction: Math.sign(S),
        raw: v,
      };
      l.length >= 2 && l.shift();
      const x = l.length ? l[l.length - 1] : void 0;
      if (
        (l.push(k),
        x
          ? (k.direction !== x.direction ||
              k.delta > x.delta ||
              k.time > x.time + 150) &&
            h(k)
          : h(k),
        f(k))
      )
        return !0;
    } else {
      const k = { time: Sr(), delta: Math.abs(S), direction: Math.sign(S) },
        x =
          c &&
          k.time < c.time + 500 &&
          k.delta <= c.delta &&
          k.direction === c.direction;
      if (!x) {
        c = void 0;
        let L = e.getTranslate() + S * P.sensitivity;
        const $ = e.isBeginning,
          M = e.isEnd;
        if (
          (L >= e.minTranslate() && (L = e.minTranslate()),
          L <= e.maxTranslate() && (L = e.maxTranslate()),
          e.setTransition(0),
          e.setTranslate(L),
          e.updateProgress(),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          ((!$ && e.isBeginning) || (!M && e.isEnd)) && e.updateSlidesClasses(),
          e.params.loop &&
            e.loopFix({
              direction: k.direction < 0 ? 'next' : 'prev',
              byMousewheel: !0,
            }),
          e.params.freeMode.sticky)
        ) {
          (clearTimeout(a), (a = void 0), l.length >= 15 && l.shift());
          const D = l.length ? l[l.length - 1] : void 0,
            z = l[0];
          if (
            (l.push(k), D && (k.delta > D.delta || k.direction !== D.direction))
          )
            l.splice(0);
          else if (
            l.length >= 15 &&
            k.time - z.time < 500 &&
            z.delta - k.delta >= 1 &&
            k.delta <= 6
          ) {
            const C = S > 0 ? 0.8 : 0.2;
            ((c = k),
              l.splice(0),
              (a = bs(() => {
                e.destroyed ||
                  !e.params ||
                  e.slideToClosest(e.params.speed, !0, void 0, C);
              }, 0)));
          }
          a ||
            (a = bs(() => {
              if (e.destroyed || !e.params) return;
              const C = 0.5;
              ((c = k),
                l.splice(0),
                e.slideToClosest(e.params.speed, !0, void 0, C));
            }, 500));
        }
        if (
          (x || i('scroll', y),
          e.params.autoplay &&
            e.params.autoplay.disableOnInteraction &&
            e.autoplay.stop(),
          P.releaseOnEdges &&
            (L === e.minTranslate() || L === e.maxTranslate()))
        )
          return !0;
      }
    }
    return (y.preventDefault ? y.preventDefault() : (y.returnValue = !1), !1);
  }
  function g(v) {
    let y = e.el;
    (e.params.mousewheel.eventsTarget !== 'container' &&
      (y = document.querySelector(e.params.mousewheel.eventsTarget)),
      y[v]('mouseenter', p),
      y[v]('mouseleave', m),
      y[v]('wheel', d));
  }
  function w() {
    return e.params.cssMode
      ? (e.wrapperEl.removeEventListener('wheel', d), !0)
      : e.mousewheel.enabled
        ? !1
        : (g('addEventListener'), (e.mousewheel.enabled = !0), !0);
  }
  function _() {
    return e.params.cssMode
      ? (e.wrapperEl.addEventListener(event, d), !0)
      : e.mousewheel.enabled
        ? (g('removeEventListener'), (e.mousewheel.enabled = !1), !0)
        : !1;
  }
  (r('init', () => {
    (!e.params.mousewheel.enabled && e.params.cssMode && _(),
      e.params.mousewheel.enabled && w());
  }),
    r('destroy', () => {
      (e.params.cssMode && w(), e.mousewheel.enabled && _());
    }),
    Object.assign(e.mousewheel, { enable: w, disable: _ }));
}
function Xo(s, e, t, r) {
  return (
    s.params.createElements &&
      Object.keys(r).forEach((i) => {
        if (!t[i] && t.auto === !0) {
          let n = Ct(s.el, `.${r[i]}`)[0];
          (n || ((n = pr('div', r[i])), (n.className = r[i]), s.el.append(n)),
            (t[i] = n),
            (e[i] = n));
        }
      }),
    t
  );
}
function op(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  (t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled',
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null }));
  function n(f) {
    let d;
    return f &&
      typeof f == 'string' &&
      e.isElement &&
      ((d = e.el.querySelector(f) || e.hostEl.querySelector(f)), d)
      ? d
      : (f &&
          (typeof f == 'string' && (d = [...document.querySelectorAll(f)]),
          e.params.uniqueNavElements &&
          typeof f == 'string' &&
          d &&
          d.length > 1 &&
          e.el.querySelectorAll(f).length === 1
            ? (d = e.el.querySelector(f))
            : d && d.length === 1 && (d = d[0])),
        f && !d ? f : d);
  }
  function a(f, d) {
    const g = e.params.navigation;
    ((f = Ee(f)),
      f.forEach((w) => {
        w &&
          (w.classList[d ? 'add' : 'remove'](...g.disabledClass.split(' ')),
          w.tagName === 'BUTTON' && (w.disabled = d),
          e.params.watchOverflow &&
            e.enabled &&
            w.classList[e.isLocked ? 'add' : 'remove'](g.lockClass));
      }));
  }
  function o() {
    const { nextEl: f, prevEl: d } = e.navigation;
    if (e.params.loop) {
      (a(d, !1), a(f, !1));
      return;
    }
    (a(d, e.isBeginning && !e.params.rewind),
      a(f, e.isEnd && !e.params.rewind));
  }
  function c(f) {
    (f.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), i('navigationPrev')));
  }
  function l(f) {
    (f.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), i('navigationNext')));
  }
  function u() {
    const f = e.params.navigation;
    if (
      ((e.params.navigation = Xo(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
      )),
      !(f.nextEl || f.prevEl))
    )
      return;
    let d = n(f.nextEl),
      g = n(f.prevEl);
    (Object.assign(e.navigation, { nextEl: d, prevEl: g }),
      (d = Ee(d)),
      (g = Ee(g)));
    const w = (_, v) => {
      (_ && _.addEventListener('click', v === 'next' ? l : c),
        !e.enabled && _ && _.classList.add(...f.lockClass.split(' ')));
    };
    (d.forEach((_) => w(_, 'next')), g.forEach((_) => w(_, 'prev')));
  }
  function p() {
    let { nextEl: f, prevEl: d } = e.navigation;
    ((f = Ee(f)), (d = Ee(d)));
    const g = (w, _) => {
      (w.removeEventListener('click', _ === 'next' ? l : c),
        w.classList.remove(...e.params.navigation.disabledClass.split(' ')));
    };
    (f.forEach((w) => g(w, 'next')), d.forEach((w) => g(w, 'prev')));
  }
  (r('init', () => {
    e.params.navigation.enabled === !1 ? h() : (u(), o());
  }),
    r('toEdge fromEdge lock unlock', () => {
      o();
    }),
    r('destroy', () => {
      p();
    }),
    r('enable disable', () => {
      let { nextEl: f, prevEl: d } = e.navigation;
      if (((f = Ee(f)), (d = Ee(d)), e.enabled)) {
        o();
        return;
      }
      [...f, ...d]
        .filter((g) => !!g)
        .forEach((g) => g.classList.add(e.params.navigation.lockClass));
    }),
    r('click', (f, d) => {
      let { nextEl: g, prevEl: w } = e.navigation;
      ((g = Ee(g)), (w = Ee(w)));
      const _ = d.target;
      let v = w.includes(_) || g.includes(_);
      if (e.isElement && !v) {
        const y = d.path || (d.composedPath && d.composedPath());
        y && (v = y.find((b) => g.includes(b) || w.includes(b)));
      }
      if (e.params.navigation.hideOnClick && !v) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === _ || e.pagination.el.contains(_))
        )
          return;
        let y;
        (g.length
          ? (y = g[0].classList.contains(e.params.navigation.hiddenClass))
          : w.length &&
            (y = w[0].classList.contains(e.params.navigation.hiddenClass)),
          i(y === !0 ? 'navigationShow' : 'navigationHide'),
          [...g, ...w]
            .filter((b) => !!b)
            .forEach((b) =>
              b.classList.toggle(e.params.navigation.hiddenClass)
            ));
      }
    }));
  const m = () => {
      (e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(' ')
      ),
        u(),
        o());
    },
    h = () => {
      (e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(' ')
      ),
        p());
    };
  Object.assign(e.navigation, {
    enable: m,
    disable: h,
    update: o,
    init: u,
    destroy: p,
  });
}
function jr(s) {
  return (
    s === void 0 && (s = ''),
    `.${s
      .trim()
      .replace(/([\.:!+\/()[\]])/g, '\\$1')
      .replace(/ /g, '.')}`
  );
}
function lp(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = 'swiper-pagination';
  (t({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: 'bullets',
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (_) => _,
      formatFractionTotal: (_) => _,
      bulletClass: `${n}-bullet`,
      bulletActiveClass: `${n}-bullet-active`,
      modifierClass: `${n}-`,
      currentClass: `${n}-current`,
      totalClass: `${n}-total`,
      hiddenClass: `${n}-hidden`,
      progressbarFillClass: `${n}-progressbar-fill`,
      progressbarOppositeClass: `${n}-progressbar-opposite`,
      clickableClass: `${n}-clickable`,
      lockClass: `${n}-lock`,
      horizontalClass: `${n}-horizontal`,
      verticalClass: `${n}-vertical`,
      paginationDisabledClass: `${n}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] }));
  let a,
    o = 0;
  function c() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function l(_, v) {
    const { bulletActiveClass: y } = e.params.pagination;
    _ &&
      ((_ = _[`${v === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      _ &&
        (_.classList.add(`${y}-${v}`),
        (_ = _[`${v === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        _ && _.classList.add(`${y}-${v}-${v}`)));
  }
  function u(_, v, y) {
    if (((_ = _ % y), (v = v % y), v === _ + 1)) return 'next';
    if (v === _ - 1) return 'previous';
  }
  function p(_) {
    const v = _.target.closest(jr(e.params.pagination.bulletClass));
    if (!v) return;
    _.preventDefault();
    const y = hn(v) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === y) return;
      const b = u(e.realIndex, y, e.slides.length);
      b === 'next'
        ? e.slideNext()
        : b === 'previous'
          ? e.slidePrev()
          : e.slideToLoop(y);
    } else e.slideTo(y);
  }
  function m() {
    const _ = e.rtl,
      v = e.params.pagination;
    if (c()) return;
    let y = e.pagination.el;
    y = Ee(y);
    let b, P;
    const T =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      O = e.params.loop
        ? Math.ceil(T / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((P = e.previousRealIndex || 0),
          (b =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < 'u'
          ? ((b = e.snapIndex), (P = e.previousSnapIndex))
          : ((P = e.previousIndex || 0), (b = e.activeIndex || 0)),
      v.type === 'bullets' &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const S = e.pagination.bullets;
      let E, I, A;
      if (
        (v.dynamicBullets &&
          ((a = co(S[0], e.isHorizontal() ? 'width' : 'height')),
          y.forEach((k) => {
            k.style[e.isHorizontal() ? 'width' : 'height'] =
              `${a * (v.dynamicMainBullets + 4)}px`;
          }),
          v.dynamicMainBullets > 1 &&
            P !== void 0 &&
            ((o += b - (P || 0)),
            o > v.dynamicMainBullets - 1
              ? (o = v.dynamicMainBullets - 1)
              : o < 0 && (o = 0)),
          (E = Math.max(b - o, 0)),
          (I = E + (Math.min(S.length, v.dynamicMainBullets) - 1)),
          (A = (I + E) / 2)),
        S.forEach((k) => {
          const x = [
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (L) => `${v.bulletActiveClass}${L}`
            ),
          ]
            .map((L) =>
              typeof L == 'string' && L.includes(' ') ? L.split(' ') : L
            )
            .flat();
          k.classList.remove(...x);
        }),
        y.length > 1)
      )
        S.forEach((k) => {
          const x = hn(k);
          (x === b
            ? k.classList.add(...v.bulletActiveClass.split(' '))
            : e.isElement && k.setAttribute('part', 'bullet'),
            v.dynamicBullets &&
              (x >= E &&
                x <= I &&
                k.classList.add(...`${v.bulletActiveClass}-main`.split(' ')),
              x === E && l(k, 'prev'),
              x === I && l(k, 'next')));
        });
      else {
        const k = S[b];
        if (
          (k && k.classList.add(...v.bulletActiveClass.split(' ')),
          e.isElement &&
            S.forEach((x, L) => {
              x.setAttribute('part', L === b ? 'bullet-active' : 'bullet');
            }),
          v.dynamicBullets)
        ) {
          const x = S[E],
            L = S[I];
          for (let $ = E; $ <= I; $ += 1)
            S[$] &&
              S[$].classList.add(...`${v.bulletActiveClass}-main`.split(' '));
          (l(x, 'prev'), l(L, 'next'));
        }
      }
      if (v.dynamicBullets) {
        const k = Math.min(S.length, v.dynamicMainBullets + 4),
          x = (a * k - a) / 2 - A * a,
          L = _ ? 'right' : 'left';
        S.forEach(($) => {
          $.style[e.isHorizontal() ? L : 'top'] = `${x}px`;
        });
      }
    }
    y.forEach((S, E) => {
      if (
        (v.type === 'fraction' &&
          (S.querySelectorAll(jr(v.currentClass)).forEach((I) => {
            I.textContent = v.formatFractionCurrent(b + 1);
          }),
          S.querySelectorAll(jr(v.totalClass)).forEach((I) => {
            I.textContent = v.formatFractionTotal(O);
          })),
        v.type === 'progressbar')
      ) {
        let I;
        v.progressbarOpposite
          ? (I = e.isHorizontal() ? 'vertical' : 'horizontal')
          : (I = e.isHorizontal() ? 'horizontal' : 'vertical');
        const A = (b + 1) / O;
        let k = 1,
          x = 1;
        (I === 'horizontal' ? (k = A) : (x = A),
          S.querySelectorAll(jr(v.progressbarFillClass)).forEach((L) => {
            ((L.style.transform = `translate3d(0,0,0) scaleX(${k}) scaleY(${x})`),
              (L.style.transitionDuration = `${e.params.speed}ms`));
          }));
      }
      (v.type === 'custom' && v.renderCustom
        ? (ei(S, v.renderCustom(e, b + 1, O)),
          E === 0 && i('paginationRender', S))
        : (E === 0 && i('paginationRender', S), i('paginationUpdate', S)),
        e.params.watchOverflow &&
          e.enabled &&
          S.classList[e.isLocked ? 'add' : 'remove'](v.lockClass));
    });
  }
  function h() {
    const _ = e.params.pagination;
    if (c()) return;
    const v =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
          ? e.slides.length / Math.ceil(e.params.grid.rows)
          : e.slides.length;
    let y = e.pagination.el;
    y = Ee(y);
    let b = '';
    if (_.type === 'bullets') {
      let P = e.params.loop
        ? Math.ceil(v / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && P > v && (P = v);
      for (let T = 0; T < P; T += 1)
        _.renderBullet
          ? (b += _.renderBullet.call(e, T, _.bulletClass))
          : (b += `<${_.bulletElement} ${e.isElement ? 'part="bullet"' : ''} class="${_.bulletClass}"></${_.bulletElement}>`);
    }
    (_.type === 'fraction' &&
      (_.renderFraction
        ? (b = _.renderFraction.call(e, _.currentClass, _.totalClass))
        : (b = `<span class="${_.currentClass}"></span> / <span class="${_.totalClass}"></span>`)),
      _.type === 'progressbar' &&
        (_.renderProgressbar
          ? (b = _.renderProgressbar.call(e, _.progressbarFillClass))
          : (b = `<span class="${_.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      y.forEach((P) => {
        (_.type !== 'custom' && ei(P, b || ''),
          _.type === 'bullets' &&
            e.pagination.bullets.push(
              ...P.querySelectorAll(jr(_.bulletClass))
            ));
      }),
      _.type !== 'custom' && i('paginationRender', y[0]));
  }
  function f() {
    e.params.pagination = Xo(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: 'swiper-pagination' }
    );
    const _ = e.params.pagination;
    if (!_.el) return;
    let v;
    (typeof _.el == 'string' && e.isElement && (v = e.el.querySelector(_.el)),
      !v &&
        typeof _.el == 'string' &&
        (v = [...document.querySelectorAll(_.el)]),
      v || (v = _.el),
      !(!v || v.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof _.el == 'string' &&
          Array.isArray(v) &&
          v.length > 1 &&
          ((v = [...e.el.querySelectorAll(_.el)]),
          v.length > 1 && (v = v.find((y) => Yi(y, '.swiper')[0] === e.el))),
        Array.isArray(v) && v.length === 1 && (v = v[0]),
        Object.assign(e.pagination, { el: v }),
        (v = Ee(v)),
        v.forEach((y) => {
          (_.type === 'bullets' &&
            _.clickable &&
            y.classList.add(...(_.clickableClass || '').split(' ')),
            y.classList.add(_.modifierClass + _.type),
            y.classList.add(
              e.isHorizontal() ? _.horizontalClass : _.verticalClass
            ),
            _.type === 'bullets' &&
              _.dynamicBullets &&
              (y.classList.add(`${_.modifierClass}${_.type}-dynamic`),
              (o = 0),
              _.dynamicMainBullets < 1 && (_.dynamicMainBullets = 1)),
            _.type === 'progressbar' &&
              _.progressbarOpposite &&
              y.classList.add(_.progressbarOppositeClass),
            _.clickable && y.addEventListener('click', p),
            e.enabled || y.classList.add(_.lockClass));
        })));
  }
  function d() {
    const _ = e.params.pagination;
    if (c()) return;
    let v = e.pagination.el;
    (v &&
      ((v = Ee(v)),
      v.forEach((y) => {
        (y.classList.remove(_.hiddenClass),
          y.classList.remove(_.modifierClass + _.type),
          y.classList.remove(
            e.isHorizontal() ? _.horizontalClass : _.verticalClass
          ),
          _.clickable &&
            (y.classList.remove(...(_.clickableClass || '').split(' ')),
            y.removeEventListener('click', p)));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((y) =>
          y.classList.remove(..._.bulletActiveClass.split(' '))
        ));
  }
  (r('changeDirection', () => {
    if (!e.pagination || !e.pagination.el) return;
    const _ = e.params.pagination;
    let { el: v } = e.pagination;
    ((v = Ee(v)),
      v.forEach((y) => {
        (y.classList.remove(_.horizontalClass, _.verticalClass),
          y.classList.add(
            e.isHorizontal() ? _.horizontalClass : _.verticalClass
          ));
      }));
  }),
    r('init', () => {
      e.params.pagination.enabled === !1 ? w() : (f(), h(), m());
    }),
    r('activeIndexChange', () => {
      typeof e.snapIndex > 'u' && m();
    }),
    r('snapIndexChange', () => {
      m();
    }),
    r('snapGridLengthChange', () => {
      (h(), m());
    }),
    r('destroy', () => {
      d();
    }),
    r('enable disable', () => {
      let { el: _ } = e.pagination;
      _ &&
        ((_ = Ee(_)),
        _.forEach((v) =>
          v.classList[e.enabled ? 'remove' : 'add'](
            e.params.pagination.lockClass
          )
        ));
    }),
    r('lock unlock', () => {
      m();
    }),
    r('click', (_, v) => {
      const y = v.target,
        b = Ee(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        b &&
        b.length > 0 &&
        !y.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && y === e.navigation.nextEl) ||
            (e.navigation.prevEl && y === e.navigation.prevEl))
        )
          return;
        const P = b[0].classList.contains(e.params.pagination.hiddenClass);
        (i(P === !0 ? 'paginationShow' : 'paginationHide'),
          b.forEach((T) =>
            T.classList.toggle(e.params.pagination.hiddenClass)
          ));
      }
    }));
  const g = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: _ } = e.pagination;
      (_ &&
        ((_ = Ee(_)),
        _.forEach((v) =>
          v.classList.remove(e.params.pagination.paginationDisabledClass)
        )),
        f(),
        h(),
        m());
    },
    w = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: _ } = e.pagination;
      (_ &&
        ((_ = Ee(_)),
        _.forEach((v) =>
          v.classList.add(e.params.pagination.paginationDisabledClass)
        )),
        d());
    };
  Object.assign(e.pagination, {
    enable: g,
    disable: w,
    render: h,
    update: m,
    init: f,
    destroy: d,
  });
}
function cp(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = bt();
  let a = !1,
    o = null,
    c = null,
    l,
    u,
    p,
    m;
  (t({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: 'swiper-scrollbar-horizontal',
      verticalClass: 'swiper-scrollbar-vertical',
    },
  }),
    (e.scrollbar = { el: null, dragEl: null }));
  function h() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: A, rtlTranslate: k } = e,
      { dragEl: x, el: L } = A,
      $ = e.params.scrollbar,
      M = e.params.loop ? e.progressLoop : e.progress;
    let D = u,
      z = (p - u) * M;
    (k
      ? ((z = -z), z > 0 ? ((D = u - z), (z = 0)) : -z + u > p && (D = p + z))
      : z < 0
        ? ((D = u + z), (z = 0))
        : z + u > p && (D = p - z),
      e.isHorizontal()
        ? ((x.style.transform = `translate3d(${z}px, 0, 0)`),
          (x.style.width = `${D}px`))
        : ((x.style.transform = `translate3d(0px, ${z}px, 0)`),
          (x.style.height = `${D}px`)),
      $.hide &&
        (clearTimeout(o),
        (L.style.opacity = 1),
        (o = setTimeout(() => {
          ((L.style.opacity = 0), (L.style.transitionDuration = '400ms'));
        }, 1e3))));
  }
  function f(A) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${A}ms`);
  }
  function d() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: A } = e,
      { dragEl: k, el: x } = A;
    ((k.style.width = ''),
      (k.style.height = ''),
      (p = e.isHorizontal() ? x.offsetWidth : x.offsetHeight),
      (m =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === 'auto'
        ? (u = p * m)
        : (u = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (k.style.width = `${u}px`)
        : (k.style.height = `${u}px`),
      m >= 1 ? (x.style.display = 'none') : (x.style.display = ''),
      e.params.scrollbar.hide && (x.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        A.el.classList[e.isLocked ? 'add' : 'remove'](
          e.params.scrollbar.lockClass
        ));
  }
  function g(A) {
    return e.isHorizontal() ? A.clientX : A.clientY;
  }
  function w(A) {
    const { scrollbar: k, rtlTranslate: x } = e,
      { el: L } = k;
    let $;
    (($ =
      (g(A) -
        da(L)[e.isHorizontal() ? 'left' : 'top'] -
        (l !== null ? l : u / 2)) /
      (p - u)),
      ($ = Math.max(Math.min($, 1), 0)),
      x && ($ = 1 - $));
    const M = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * $;
    (e.updateProgress(M),
      e.setTranslate(M),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
  }
  function _(A) {
    const k = e.params.scrollbar,
      { scrollbar: x, wrapperEl: L } = e,
      { el: $, dragEl: M } = x;
    ((a = !0),
      (l =
        A.target === M
          ? g(A) -
            A.target.getBoundingClientRect()[e.isHorizontal() ? 'left' : 'top']
          : null),
      A.preventDefault(),
      A.stopPropagation(),
      (L.style.transitionDuration = '100ms'),
      (M.style.transitionDuration = '100ms'),
      w(A),
      clearTimeout(c),
      ($.style.transitionDuration = '0ms'),
      k.hide && ($.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style['scroll-snap-type'] = 'none'),
      i('scrollbarDragStart', A));
  }
  function v(A) {
    const { scrollbar: k, wrapperEl: x } = e,
      { el: L, dragEl: $ } = k;
    a &&
      (A.preventDefault && A.cancelable
        ? A.preventDefault()
        : (A.returnValue = !1),
      w(A),
      (x.style.transitionDuration = '0ms'),
      (L.style.transitionDuration = '0ms'),
      ($.style.transitionDuration = '0ms'),
      i('scrollbarDragMove', A));
  }
  function y(A) {
    const k = e.params.scrollbar,
      { scrollbar: x, wrapperEl: L } = e,
      { el: $ } = x;
    a &&
      ((a = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style['scroll-snap-type'] = ''),
        (L.style.transitionDuration = '')),
      k.hide &&
        (clearTimeout(c),
        (c = bs(() => {
          (($.style.opacity = 0), ($.style.transitionDuration = '400ms'));
        }, 1e3))),
      i('scrollbarDragEnd', A),
      k.snapOnRelease && e.slideToClosest());
  }
  function b(A) {
    const { scrollbar: k, params: x } = e,
      L = k.el;
    if (!L) return;
    const $ = L,
      M = x.passiveListeners ? { passive: !1, capture: !1 } : !1,
      D = x.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!$) return;
    const z = A === 'on' ? 'addEventListener' : 'removeEventListener';
    ($[z]('pointerdown', _, M),
      n[z]('pointermove', v, M),
      n[z]('pointerup', y, D));
  }
  function P() {
    !e.params.scrollbar.el || !e.scrollbar.el || b('on');
  }
  function T() {
    !e.params.scrollbar.el || !e.scrollbar.el || b('off');
  }
  function O() {
    const { scrollbar: A, el: k } = e;
    e.params.scrollbar = Xo(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: 'swiper-scrollbar',
    });
    const x = e.params.scrollbar;
    if (!x.el) return;
    let L;
    if (
      (typeof x.el == 'string' && e.isElement && (L = e.el.querySelector(x.el)),
      !L && typeof x.el == 'string')
    ) {
      if (((L = n.querySelectorAll(x.el)), !L.length)) return;
    } else L || (L = x.el);
    (e.params.uniqueNavElements &&
      typeof x.el == 'string' &&
      L.length > 1 &&
      k.querySelectorAll(x.el).length === 1 &&
      (L = k.querySelector(x.el)),
      L.length > 0 && (L = L[0]),
      L.classList.add(e.isHorizontal() ? x.horizontalClass : x.verticalClass));
    let $;
    (L &&
      (($ = L.querySelector(jr(e.params.scrollbar.dragClass))),
      $ || (($ = pr('div', e.params.scrollbar.dragClass)), L.append($))),
      Object.assign(A, { el: L, dragEl: $ }),
      x.draggable && P(),
      L &&
        L.classList[e.enabled ? 'remove' : 'add'](
          ...li(e.params.scrollbar.lockClass)
        ));
  }
  function S() {
    const A = e.params.scrollbar,
      k = e.scrollbar.el;
    (k &&
      k.classList.remove(
        ...li(e.isHorizontal() ? A.horizontalClass : A.verticalClass)
      ),
      T());
  }
  (r('changeDirection', () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const A = e.params.scrollbar;
    let { el: k } = e.scrollbar;
    ((k = Ee(k)),
      k.forEach((x) => {
        (x.classList.remove(A.horizontalClass, A.verticalClass),
          x.classList.add(
            e.isHorizontal() ? A.horizontalClass : A.verticalClass
          ));
      }));
  }),
    r('init', () => {
      e.params.scrollbar.enabled === !1 ? I() : (O(), d(), h());
    }),
    r('update resize observerUpdate lock unlock changeDirection', () => {
      d();
    }),
    r('setTranslate', () => {
      h();
    }),
    r('setTransition', (A, k) => {
      f(k);
    }),
    r('enable disable', () => {
      const { el: A } = e.scrollbar;
      A &&
        A.classList[e.enabled ? 'remove' : 'add'](
          ...li(e.params.scrollbar.lockClass)
        );
    }),
    r('destroy', () => {
      S();
    }));
  const E = () => {
      (e.el.classList.remove(...li(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            ...li(e.params.scrollbar.scrollbarDisabledClass)
          ),
        O(),
        d(),
        h());
    },
    I = () => {
      (e.el.classList.add(...li(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            ...li(e.params.scrollbar.scrollbarDisabledClass)
          ),
        S());
    };
  Object.assign(e.scrollbar, {
    enable: E,
    disable: I,
    updateSize: d,
    setTranslate: h,
    init: O,
    destroy: S,
  });
}
function up(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({ parallax: { enabled: !1 } });
  const i =
      '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
    n = (c, l) => {
      const { rtl: u } = e,
        p = u ? -1 : 1,
        m = c.getAttribute('data-swiper-parallax') || '0';
      let h = c.getAttribute('data-swiper-parallax-x'),
        f = c.getAttribute('data-swiper-parallax-y');
      const d = c.getAttribute('data-swiper-parallax-scale'),
        g = c.getAttribute('data-swiper-parallax-opacity'),
        w = c.getAttribute('data-swiper-parallax-rotate');
      if (
        (h || f
          ? ((h = h || '0'), (f = f || '0'))
          : e.isHorizontal()
            ? ((h = m), (f = '0'))
            : ((f = m), (h = '0')),
        h.indexOf('%') >= 0
          ? (h = `${parseInt(h, 10) * l * p}%`)
          : (h = `${h * l * p}px`),
        f.indexOf('%') >= 0
          ? (f = `${parseInt(f, 10) * l}%`)
          : (f = `${f * l}px`),
        typeof g < 'u' && g !== null)
      ) {
        const v = g - (g - 1) * (1 - Math.abs(l));
        c.style.opacity = v;
      }
      let _ = `translate3d(${h}, ${f}, 0px)`;
      if (typeof d < 'u' && d !== null) {
        const v = d - (d - 1) * (1 - Math.abs(l));
        _ += ` scale(${v})`;
      }
      if (w && typeof w < 'u' && w !== null) {
        const v = w * l * -1;
        _ += ` rotate(${v}deg)`;
      }
      c.style.transform = _;
    },
    a = () => {
      const { el: c, slides: l, progress: u, snapGrid: p, isElement: m } = e,
        h = Ct(c, i);
      (e.isElement && h.push(...Ct(e.hostEl, i)),
        h.forEach((f) => {
          n(f, u);
        }),
        l.forEach((f, d) => {
          let g = f.progress;
          (e.params.slidesPerGroup > 1 &&
            e.params.slidesPerView !== 'auto' &&
            (g += Math.ceil(d / 2) - u * (p.length - 1)),
            (g = Math.min(Math.max(g, -1), 1)),
            f
              .querySelectorAll(`${i}, [data-swiper-parallax-rotate]`)
              .forEach((w) => {
                n(w, g);
              }));
        }));
    },
    o = function (c) {
      c === void 0 && (c = e.params.speed);
      const { el: l, hostEl: u } = e,
        p = [...l.querySelectorAll(i)];
      (e.isElement && p.push(...u.querySelectorAll(i)),
        p.forEach((m) => {
          let h =
            parseInt(m.getAttribute('data-swiper-parallax-duration'), 10) || c;
          (c === 0 && (h = 0), (m.style.transitionDuration = `${h}ms`));
        }));
    };
  (r('beforeInit', () => {
    e.params.parallax.enabled &&
      ((e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0));
  }),
    r('init', () => {
      e.params.parallax.enabled && a();
    }),
    r('setTranslate', () => {
      e.params.parallax.enabled && a();
    }),
    r('setTransition', (c, l) => {
      e.params.parallax.enabled && o(l);
    }));
}
function dp(s) {
  let { swiper: e, extendParams: t, on: r, emit: i } = s;
  const n = Ke();
  (t({
    zoom: {
      enabled: !1,
      limitToOriginalSize: !1,
      maxRatio: 3,
      minRatio: 1,
      panOnMouseMove: !1,
      toggle: !0,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  }),
    (e.zoom = { enabled: !1 }));
  let a = 1,
    o = !1,
    c = !1,
    l = { x: 0, y: 0 };
  const u = -3;
  let p, m;
  const h = [],
    f = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3,
    },
    d = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {},
    },
    g = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0,
    };
  let w = 1;
  Object.defineProperty(e.zoom, 'scale', {
    get() {
      return w;
    },
    set(B) {
      if (w !== B) {
        const F = f.imageEl,
          Y = f.slideEl;
        i('zoomChange', B, F, Y);
      }
      w = B;
    },
  });
  function _() {
    if (h.length < 2) return 1;
    const B = h[0].pageX,
      F = h[0].pageY,
      Y = h[1].pageX,
      Q = h[1].pageY;
    return Math.sqrt((Y - B) ** 2 + (Q - F) ** 2);
  }
  function v() {
    const B = e.params.zoom,
      F = f.imageWrapEl.getAttribute('data-swiper-zoom') || B.maxRatio;
    if (B.limitToOriginalSize && f.imageEl && f.imageEl.naturalWidth) {
      const Y = f.imageEl.naturalWidth / f.imageEl.offsetWidth;
      return Math.min(Y, F);
    }
    return F;
  }
  function y() {
    if (h.length < 2) return { x: null, y: null };
    const B = f.imageEl.getBoundingClientRect();
    return [
      (h[0].pageX + (h[1].pageX - h[0].pageX) / 2 - B.x - n.scrollX) / a,
      (h[0].pageY + (h[1].pageY - h[0].pageY) / 2 - B.y - n.scrollY) / a,
    ];
  }
  function b() {
    return e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`;
  }
  function P(B) {
    const F = b();
    return !!(
      B.target.matches(F) ||
      e.slides.filter((Y) => Y.contains(B.target)).length > 0
    );
  }
  function T(B) {
    const F = `.${e.params.zoom.containerClass}`;
    return !!(
      B.target.matches(F) ||
      [...e.hostEl.querySelectorAll(F)].filter((Y) => Y.contains(B.target))
        .length > 0
    );
  }
  function O(B) {
    if ((B.pointerType === 'mouse' && h.splice(0, h.length), !P(B))) return;
    const F = e.params.zoom;
    if (((p = !1), (m = !1), h.push(B), !(h.length < 2))) {
      if (((p = !0), (f.scaleStart = _()), !f.slideEl)) {
        ((f.slideEl = B.target.closest(
          `.${e.params.slideClass}, swiper-slide`
        )),
          f.slideEl || (f.slideEl = e.slides[e.activeIndex]));
        let Y = f.slideEl.querySelector(`.${F.containerClass}`);
        if (
          (Y &&
            (Y = Y.querySelectorAll(
              'picture, img, svg, canvas, .swiper-zoom-target'
            )[0]),
          (f.imageEl = Y),
          Y
            ? (f.imageWrapEl = Yi(f.imageEl, `.${F.containerClass}`)[0])
            : (f.imageWrapEl = void 0),
          !f.imageWrapEl)
        ) {
          f.imageEl = void 0;
          return;
        }
        f.maxRatio = v();
      }
      if (f.imageEl) {
        const [Y, Q] = y();
        ((f.originX = Y),
          (f.originY = Q),
          (f.imageEl.style.transitionDuration = '0ms'));
      }
      o = !0;
    }
  }
  function S(B) {
    if (!P(B)) return;
    const F = e.params.zoom,
      Y = e.zoom,
      Q = h.findIndex((se) => se.pointerId === B.pointerId);
    (Q >= 0 && (h[Q] = B),
      !(h.length < 2) &&
        ((m = !0),
        (f.scaleMove = _()),
        f.imageEl &&
          ((Y.scale = (f.scaleMove / f.scaleStart) * a),
          Y.scale > f.maxRatio &&
            (Y.scale = f.maxRatio - 1 + (Y.scale - f.maxRatio + 1) ** 0.5),
          Y.scale < F.minRatio &&
            (Y.scale = F.minRatio + 1 - (F.minRatio - Y.scale + 1) ** 0.5),
          (f.imageEl.style.transform = `translate3d(0,0,0) scale(${Y.scale})`))));
  }
  function E(B) {
    if (!P(B) || (B.pointerType === 'mouse' && B.type === 'pointerout')) return;
    const F = e.params.zoom,
      Y = e.zoom,
      Q = h.findIndex((se) => se.pointerId === B.pointerId);
    (Q >= 0 && h.splice(Q, 1),
      !(!p || !m) &&
        ((p = !1),
        (m = !1),
        f.imageEl &&
          ((Y.scale = Math.max(Math.min(Y.scale, f.maxRatio), F.minRatio)),
          (f.imageEl.style.transitionDuration = `${e.params.speed}ms`),
          (f.imageEl.style.transform = `translate3d(0,0,0) scale(${Y.scale})`),
          (a = Y.scale),
          (o = !1),
          Y.scale > 1 && f.slideEl
            ? f.slideEl.classList.add(`${F.zoomedSlideClass}`)
            : Y.scale <= 1 &&
              f.slideEl &&
              f.slideEl.classList.remove(`${F.zoomedSlideClass}`),
          Y.scale === 1 &&
            ((f.originX = 0), (f.originY = 0), (f.slideEl = void 0)))));
  }
  let I;
  function A() {
    e.touchEventsData.preventTouchMoveFromPointerMove = !1;
  }
  function k() {
    (clearTimeout(I),
      (e.touchEventsData.preventTouchMoveFromPointerMove = !0),
      (I = setTimeout(() => {
        e.destroyed || A();
      })));
  }
  function x(B) {
    const F = e.device;
    if (!f.imageEl || d.isTouched) return;
    (F.android && B.cancelable && B.preventDefault(), (d.isTouched = !0));
    const Y = h.length > 0 ? h[0] : B;
    ((d.touchesStart.x = Y.pageX), (d.touchesStart.y = Y.pageY));
  }
  function L(B) {
    const Y = B.pointerType === 'mouse' && e.params.zoom.panOnMouseMove;
    if (!P(B) || !T(B)) return;
    const Q = e.zoom;
    if (!f.imageEl) return;
    if (!d.isTouched || !f.slideEl) {
      Y && D(B);
      return;
    }
    if (Y) {
      D(B);
      return;
    }
    d.isMoved ||
      ((d.width = f.imageEl.offsetWidth || f.imageEl.clientWidth),
      (d.height = f.imageEl.offsetHeight || f.imageEl.clientHeight),
      (d.startX = lo(f.imageWrapEl, 'x') || 0),
      (d.startY = lo(f.imageWrapEl, 'y') || 0),
      (f.slideWidth = f.slideEl.offsetWidth),
      (f.slideHeight = f.slideEl.offsetHeight),
      (f.imageWrapEl.style.transitionDuration = '0ms'));
    const se = d.width * Q.scale,
      ke = d.height * Q.scale;
    if (
      ((d.minX = Math.min(f.slideWidth / 2 - se / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(f.slideHeight / 2 - ke / 2, 0)),
      (d.maxY = -d.minY),
      (d.touchesCurrent.x = h.length > 0 ? h[0].pageX : B.pageX),
      (d.touchesCurrent.y = h.length > 0 ? h[0].pageY : B.pageY),
      Math.max(
        Math.abs(d.touchesCurrent.x - d.touchesStart.x),
        Math.abs(d.touchesCurrent.y - d.touchesStart.y)
      ) > 5 && (e.allowClick = !1),
      !d.isMoved && !o)
    ) {
      if (
        e.isHorizontal() &&
        ((Math.floor(d.minX) === Math.floor(d.startX) &&
          d.touchesCurrent.x < d.touchesStart.x) ||
          (Math.floor(d.maxX) === Math.floor(d.startX) &&
            d.touchesCurrent.x > d.touchesStart.x))
      ) {
        ((d.isTouched = !1), A());
        return;
      }
      if (
        !e.isHorizontal() &&
        ((Math.floor(d.minY) === Math.floor(d.startY) &&
          d.touchesCurrent.y < d.touchesStart.y) ||
          (Math.floor(d.maxY) === Math.floor(d.startY) &&
            d.touchesCurrent.y > d.touchesStart.y))
      ) {
        ((d.isTouched = !1), A());
        return;
      }
    }
    (B.cancelable && B.preventDefault(),
      B.stopPropagation(),
      k(),
      (d.isMoved = !0));
    const fe = (Q.scale - a) / (f.maxRatio - e.params.zoom.minRatio),
      { originX: j, originY: ee } = f;
    ((d.currentX =
      d.touchesCurrent.x -
      d.touchesStart.x +
      d.startX +
      fe * (d.width - j * 2)),
      (d.currentY =
        d.touchesCurrent.y -
        d.touchesStart.y +
        d.startY +
        fe * (d.height - ee * 2)),
      d.currentX < d.minX &&
        (d.currentX = d.minX + 1 - (d.minX - d.currentX + 1) ** 0.8),
      d.currentX > d.maxX &&
        (d.currentX = d.maxX - 1 + (d.currentX - d.maxX + 1) ** 0.8),
      d.currentY < d.minY &&
        (d.currentY = d.minY + 1 - (d.minY - d.currentY + 1) ** 0.8),
      d.currentY > d.maxY &&
        (d.currentY = d.maxY - 1 + (d.currentY - d.maxY + 1) ** 0.8),
      g.prevPositionX || (g.prevPositionX = d.touchesCurrent.x),
      g.prevPositionY || (g.prevPositionY = d.touchesCurrent.y),
      g.prevTime || (g.prevTime = Date.now()),
      (g.x =
        (d.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2),
      (g.y =
        (d.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2),
      Math.abs(d.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
      Math.abs(d.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
      (g.prevPositionX = d.touchesCurrent.x),
      (g.prevPositionY = d.touchesCurrent.y),
      (g.prevTime = Date.now()),
      (f.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`));
  }
  function $() {
    const B = e.zoom;
    if (((h.length = 0), !f.imageEl)) return;
    if (!d.isTouched || !d.isMoved) {
      ((d.isTouched = !1), (d.isMoved = !1));
      return;
    }
    ((d.isTouched = !1), (d.isMoved = !1));
    let F = 300,
      Y = 300;
    const Q = g.x * F,
      se = d.currentX + Q,
      ke = g.y * Y,
      be = d.currentY + ke;
    (g.x !== 0 && (F = Math.abs((se - d.currentX) / g.x)),
      g.y !== 0 && (Y = Math.abs((be - d.currentY) / g.y)));
    const fe = Math.max(F, Y);
    ((d.currentX = se), (d.currentY = be));
    const j = d.width * B.scale,
      ee = d.height * B.scale;
    ((d.minX = Math.min(f.slideWidth / 2 - j / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(f.slideHeight / 2 - ee / 2, 0)),
      (d.maxY = -d.minY),
      (d.currentX = Math.max(Math.min(d.currentX, d.maxX), d.minX)),
      (d.currentY = Math.max(Math.min(d.currentY, d.maxY), d.minY)),
      (f.imageWrapEl.style.transitionDuration = `${fe}ms`),
      (f.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`));
  }
  function M() {
    const B = e.zoom;
    f.slideEl &&
      e.activeIndex !== e.slides.indexOf(f.slideEl) &&
      (f.imageEl && (f.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      f.imageWrapEl && (f.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      f.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
      (B.scale = 1),
      (a = 1),
      (f.slideEl = void 0),
      (f.imageEl = void 0),
      (f.imageWrapEl = void 0),
      (f.originX = 0),
      (f.originY = 0));
  }
  function D(B) {
    if (a <= 1 || !f.imageWrapEl || !P(B) || !T(B)) return;
    const F = n.getComputedStyle(f.imageWrapEl).transform,
      Y = new n.DOMMatrix(F);
    if (!c) {
      ((c = !0),
        (l.x = B.clientX),
        (l.y = B.clientY),
        (d.startX = Y.e),
        (d.startY = Y.f),
        (d.width = f.imageEl.offsetWidth || f.imageEl.clientWidth),
        (d.height = f.imageEl.offsetHeight || f.imageEl.clientHeight),
        (f.slideWidth = f.slideEl.offsetWidth),
        (f.slideHeight = f.slideEl.offsetHeight));
      return;
    }
    const Q = (B.clientX - l.x) * u,
      se = (B.clientY - l.y) * u,
      ke = d.width * a,
      be = d.height * a,
      fe = f.slideWidth,
      j = f.slideHeight,
      ee = Math.min(fe / 2 - ke / 2, 0),
      ce = -ee,
      ge = Math.min(j / 2 - be / 2, 0),
      N = -ge,
      Pe = Math.max(Math.min(d.startX + Q, ce), ee),
      X = Math.max(Math.min(d.startY + se, N), ge);
    ((f.imageWrapEl.style.transitionDuration = '0ms'),
      (f.imageWrapEl.style.transform = `translate3d(${Pe}px, ${X}px, 0)`),
      (l.x = B.clientX),
      (l.y = B.clientY),
      (d.startX = Pe),
      (d.startY = X),
      (d.currentX = Pe),
      (d.currentY = X));
  }
  function z(B) {
    const F = e.zoom,
      Y = e.params.zoom;
    if (!f.slideEl) {
      (B &&
        B.target &&
        (f.slideEl = B.target.closest(`.${e.params.slideClass}, swiper-slide`)),
        f.slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (f.slideEl = Ct(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
            : (f.slideEl = e.slides[e.activeIndex])));
      let ve = f.slideEl.querySelector(`.${Y.containerClass}`);
      (ve &&
        (ve = ve.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target'
        )[0]),
        (f.imageEl = ve),
        ve
          ? (f.imageWrapEl = Yi(f.imageEl, `.${Y.containerClass}`)[0])
          : (f.imageWrapEl = void 0));
    }
    if (!f.imageEl || !f.imageWrapEl) return;
    (e.params.cssMode &&
      ((e.wrapperEl.style.overflow = 'hidden'),
      (e.wrapperEl.style.touchAction = 'none')),
      f.slideEl.classList.add(`${Y.zoomedSlideClass}`));
    let Q, se, ke, be, fe, j, ee, ce, ge, N, Pe, X, R, V, H, K, J, re;
    typeof d.touchesStart.x > 'u' && B
      ? ((Q = B.pageX), (se = B.pageY))
      : ((Q = d.touchesStart.x), (se = d.touchesStart.y));
    const Ae = a,
      te = typeof B == 'number' ? B : null;
    a === 1 &&
      te &&
      ((Q = void 0),
      (se = void 0),
      (d.touchesStart.x = void 0),
      (d.touchesStart.y = void 0));
    const _e = v();
    ((F.scale = te || _e),
      (a = te || _e),
      B && !(a === 1 && te)
        ? ((J = f.slideEl.offsetWidth),
          (re = f.slideEl.offsetHeight),
          (ke = da(f.slideEl).left + n.scrollX),
          (be = da(f.slideEl).top + n.scrollY),
          (fe = ke + J / 2 - Q),
          (j = be + re / 2 - se),
          (ge = f.imageEl.offsetWidth || f.imageEl.clientWidth),
          (N = f.imageEl.offsetHeight || f.imageEl.clientHeight),
          (Pe = ge * F.scale),
          (X = N * F.scale),
          (R = Math.min(J / 2 - Pe / 2, 0)),
          (V = Math.min(re / 2 - X / 2, 0)),
          (H = -R),
          (K = -V),
          Ae > 0 &&
          te &&
          typeof d.currentX == 'number' &&
          typeof d.currentY == 'number'
            ? ((ee = (d.currentX * F.scale) / Ae),
              (ce = (d.currentY * F.scale) / Ae))
            : ((ee = fe * F.scale), (ce = j * F.scale)),
          ee < R && (ee = R),
          ee > H && (ee = H),
          ce < V && (ce = V),
          ce > K && (ce = K))
        : ((ee = 0), (ce = 0)),
      te && F.scale === 1 && ((f.originX = 0), (f.originY = 0)),
      (d.currentX = ee),
      (d.currentY = ce),
      (f.imageWrapEl.style.transitionDuration = '300ms'),
      (f.imageWrapEl.style.transform = `translate3d(${ee}px, ${ce}px,0)`),
      (f.imageEl.style.transitionDuration = '300ms'),
      (f.imageEl.style.transform = `translate3d(0,0,0) scale(${F.scale})`));
  }
  function C() {
    const B = e.zoom,
      F = e.params.zoom;
    if (!f.slideEl) {
      e.params.virtual && e.params.virtual.enabled && e.virtual
        ? (f.slideEl = Ct(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
        : (f.slideEl = e.slides[e.activeIndex]);
      let Y = f.slideEl.querySelector(`.${F.containerClass}`);
      (Y &&
        (Y = Y.querySelectorAll(
          'picture, img, svg, canvas, .swiper-zoom-target'
        )[0]),
        (f.imageEl = Y),
        Y
          ? (f.imageWrapEl = Yi(f.imageEl, `.${F.containerClass}`)[0])
          : (f.imageWrapEl = void 0));
    }
    !f.imageEl ||
      !f.imageWrapEl ||
      (e.params.cssMode &&
        ((e.wrapperEl.style.overflow = ''),
        (e.wrapperEl.style.touchAction = '')),
      (B.scale = 1),
      (a = 1),
      (d.currentX = void 0),
      (d.currentY = void 0),
      (d.touchesStart.x = void 0),
      (d.touchesStart.y = void 0),
      (f.imageWrapEl.style.transitionDuration = '300ms'),
      (f.imageWrapEl.style.transform = 'translate3d(0,0,0)'),
      (f.imageEl.style.transitionDuration = '300ms'),
      (f.imageEl.style.transform = 'translate3d(0,0,0) scale(1)'),
      f.slideEl.classList.remove(`${F.zoomedSlideClass}`),
      (f.slideEl = void 0),
      (f.originX = 0),
      (f.originY = 0),
      e.params.zoom.panOnMouseMove &&
        ((l = { x: 0, y: 0 }),
        c && ((c = !1), (d.startX = 0), (d.startY = 0))));
  }
  function W(B) {
    const F = e.zoom;
    F.scale && F.scale !== 1 ? C() : z(B);
  }
  function ae() {
    const B = e.params.passiveListeners ? { passive: !0, capture: !1 } : !1,
      F = e.params.passiveListeners ? { passive: !1, capture: !0 } : !0;
    return { passiveListener: B, activeListenerWithCapture: F };
  }
  function le() {
    const B = e.zoom;
    if (B.enabled) return;
    B.enabled = !0;
    const { passiveListener: F, activeListenerWithCapture: Y } = ae();
    (e.wrapperEl.addEventListener('pointerdown', O, F),
      e.wrapperEl.addEventListener('pointermove', S, Y),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((Q) => {
        e.wrapperEl.addEventListener(Q, E, F);
      }),
      e.wrapperEl.addEventListener('pointermove', L, Y));
  }
  function U() {
    const B = e.zoom;
    if (!B.enabled) return;
    B.enabled = !1;
    const { passiveListener: F, activeListenerWithCapture: Y } = ae();
    (e.wrapperEl.removeEventListener('pointerdown', O, F),
      e.wrapperEl.removeEventListener('pointermove', S, Y),
      ['pointerup', 'pointercancel', 'pointerout'].forEach((Q) => {
        e.wrapperEl.removeEventListener(Q, E, F);
      }),
      e.wrapperEl.removeEventListener('pointermove', L, Y));
  }
  (r('init', () => {
    e.params.zoom.enabled && le();
  }),
    r('destroy', () => {
      U();
    }),
    r('touchStart', (B, F) => {
      e.zoom.enabled && x(F);
    }),
    r('touchEnd', (B, F) => {
      e.zoom.enabled && $();
    }),
    r('doubleTap', (B, F) => {
      !e.animating &&
        e.params.zoom.enabled &&
        e.zoom.enabled &&
        e.params.zoom.toggle &&
        W(F);
    }),
    r('transitionEnd', () => {
      e.zoom.enabled && e.params.zoom.enabled && M();
    }),
    r('slideChange', () => {
      e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && M();
    }),
    Object.assign(e.zoom, {
      enable: le,
      disable: U,
      in: z,
      out: C,
      toggle: W,
    }));
}
function fp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  (t({ controller: { control: void 0, inverse: !1, by: 'slide' } }),
    (e.controller = { control: void 0 }));
  function i(l, u) {
    const p = (function () {
      let d, g, w;
      return (_, v) => {
        for (g = -1, d = _.length; d - g > 1; )
          ((w = (d + g) >> 1), _[w] <= v ? (g = w) : (d = w));
        return d;
      };
    })();
    ((this.x = l), (this.y = u), (this.lastIndex = l.length - 1));
    let m, h;
    return (
      (this.interpolate = function (d) {
        return d
          ? ((h = p(this.x, d)),
            (m = h - 1),
            ((d - this.x[m]) * (this.y[h] - this.y[m])) /
              (this.x[h] - this.x[m]) +
              this.y[m])
          : 0;
      }),
      this
    );
  }
  function n(l) {
    e.controller.spline = e.params.loop
      ? new i(e.slidesGrid, l.slidesGrid)
      : new i(e.snapGrid, l.snapGrid);
  }
  function a(l, u) {
    const p = e.controller.control;
    let m, h;
    const f = e.constructor;
    function d(g) {
      if (g.destroyed) return;
      const w = e.rtlTranslate ? -e.translate : e.translate;
      (e.params.controller.by === 'slide' &&
        (n(g), (h = -e.controller.spline.interpolate(-w))),
        (!h || e.params.controller.by === 'container') &&
          ((m =
            (g.maxTranslate() - g.minTranslate()) /
            (e.maxTranslate() - e.minTranslate())),
          (Number.isNaN(m) || !Number.isFinite(m)) && (m = 1),
          (h = (w - e.minTranslate()) * m + g.minTranslate())),
        e.params.controller.inverse && (h = g.maxTranslate() - h),
        g.updateProgress(h),
        g.setTranslate(h, e),
        g.updateActiveIndex(),
        g.updateSlidesClasses());
    }
    if (Array.isArray(p))
      for (let g = 0; g < p.length; g += 1)
        p[g] !== u && p[g] instanceof f && d(p[g]);
    else p instanceof f && u !== p && d(p);
  }
  function o(l, u) {
    const p = e.constructor,
      m = e.controller.control;
    let h;
    function f(d) {
      d.destroyed ||
        (d.setTransition(l, e),
        l !== 0 &&
          (d.transitionStart(),
          d.params.autoHeight &&
            bs(() => {
              d.updateAutoHeight();
            }),
          Qs(d.wrapperEl, () => {
            m && d.transitionEnd();
          })));
    }
    if (Array.isArray(m))
      for (h = 0; h < m.length; h += 1)
        m[h] !== u && m[h] instanceof p && f(m[h]);
    else m instanceof p && u !== m && f(m);
  }
  function c() {
    e.controller.control &&
      e.controller.spline &&
      ((e.controller.spline = void 0), delete e.controller.spline);
  }
  (r('beforeInit', () => {
    if (
      typeof window < 'u' &&
      (typeof e.params.controller.control == 'string' ||
        e.params.controller.control instanceof HTMLElement)
    ) {
      (typeof e.params.controller.control == 'string'
        ? [...document.querySelectorAll(e.params.controller.control)]
        : [e.params.controller.control]
      ).forEach((u) => {
        if (
          (e.controller.control || (e.controller.control = []), u && u.swiper)
        )
          e.controller.control.push(u.swiper);
        else if (u) {
          const p = `${e.params.eventsPrefix}init`,
            m = (h) => {
              (e.controller.control.push(h.detail[0]),
                e.update(),
                u.removeEventListener(p, m));
            };
          u.addEventListener(p, m);
        }
      });
      return;
    }
    e.controller.control = e.params.controller.control;
  }),
    r('update', () => {
      c();
    }),
    r('resize', () => {
      c();
    }),
    r('observerUpdate', () => {
      c();
    }),
    r('setTranslate', (l, u, p) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTranslate(u, p);
    }),
    r('setTransition', (l, u, p) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTransition(u, p);
    }),
    Object.assign(e.controller, { setTranslate: a, setTransition: o }));
}
function pp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  (t({
    a11y: {
      enabled: !0,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: !0,
    },
  }),
    (e.a11y = { clicked: !1 }));
  let i = null,
    n,
    a,
    o = new Date().getTime();
  function c(M) {
    const D = i;
    D.length !== 0 && ei(D, M);
  }
  function l(M) {
    const D = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(M).replace(/x/g, D);
  }
  function u(M) {
    ((M = Ee(M)),
      M.forEach((D) => {
        D.setAttribute('tabIndex', '0');
      }));
  }
  function p(M) {
    ((M = Ee(M)),
      M.forEach((D) => {
        D.setAttribute('tabIndex', '-1');
      }));
  }
  function m(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('role', D);
      }));
  }
  function h(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('aria-roledescription', D);
      }));
  }
  function f(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('aria-controls', D);
      }));
  }
  function d(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('aria-label', D);
      }));
  }
  function g(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('id', D);
      }));
  }
  function w(M, D) {
    ((M = Ee(M)),
      M.forEach((z) => {
        z.setAttribute('aria-live', D);
      }));
  }
  function _(M) {
    ((M = Ee(M)),
      M.forEach((D) => {
        D.setAttribute('aria-disabled', !0);
      }));
  }
  function v(M) {
    ((M = Ee(M)),
      M.forEach((D) => {
        D.setAttribute('aria-disabled', !1);
      }));
  }
  function y(M) {
    if (M.keyCode !== 13 && M.keyCode !== 32) return;
    const D = e.params.a11y,
      z = M.target;
    if (
      !(
        e.pagination &&
        e.pagination.el &&
        (z === e.pagination.el || e.pagination.el.contains(M.target)) &&
        !M.target.matches(jr(e.params.pagination.bulletClass))
      )
    ) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const C = Ee(e.navigation.prevEl);
        (Ee(e.navigation.nextEl).includes(z) &&
          ((e.isEnd && !e.params.loop) || e.slideNext(),
          e.isEnd ? c(D.lastSlideMessage) : c(D.nextSlideMessage)),
          C.includes(z) &&
            ((e.isBeginning && !e.params.loop) || e.slidePrev(),
            e.isBeginning ? c(D.firstSlideMessage) : c(D.prevSlideMessage)));
      }
      e.pagination &&
        z.matches(jr(e.params.pagination.bulletClass)) &&
        z.click();
    }
  }
  function b() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: M, prevEl: D } = e.navigation;
    (D && (e.isBeginning ? (_(D), p(D)) : (v(D), u(D))),
      M && (e.isEnd ? (_(M), p(M)) : (v(M), u(M))));
  }
  function P() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function T() {
    return P() && e.params.pagination.clickable;
  }
  function O() {
    const M = e.params.a11y;
    P() &&
      e.pagination.bullets.forEach((D) => {
        (e.params.pagination.clickable &&
          (u(D),
          e.params.pagination.renderBullet ||
            (m(D, 'button'),
            d(
              D,
              M.paginationBulletMessage.replace(/\{\{index\}\}/, hn(D) + 1)
            ))),
          D.matches(jr(e.params.pagination.bulletActiveClass))
            ? D.setAttribute('aria-current', 'true')
            : D.removeAttribute('aria-current'));
      });
  }
  const S = (M, D, z) => {
      (u(M),
        M.tagName !== 'BUTTON' &&
          (m(M, 'button'), M.addEventListener('keydown', y)),
        d(M, z),
        f(M, D));
    },
    E = (M) => {
      (a && a !== M.target && !a.contains(M.target) && (n = !0),
        (e.a11y.clicked = !0));
    },
    I = () => {
      ((n = !1),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.destroyed || (e.a11y.clicked = !1);
          });
        }));
    },
    A = (M) => {
      o = new Date().getTime();
    },
    k = (M) => {
      if (
        e.a11y.clicked ||
        !e.params.a11y.scrollOnFocus ||
        new Date().getTime() - o < 100
      )
        return;
      const D = M.target.closest(`.${e.params.slideClass}, swiper-slide`);
      if (!D || !e.slides.includes(D)) return;
      a = D;
      const z = e.slides.indexOf(D) === e.activeIndex,
        C =
          e.params.watchSlidesProgress &&
          e.visibleSlides &&
          e.visibleSlides.includes(D);
      z ||
        C ||
        (M.sourceCapabilities && M.sourceCapabilities.firesTouchEvents) ||
        (e.isHorizontal() ? (e.el.scrollLeft = 0) : (e.el.scrollTop = 0),
        requestAnimationFrame(() => {
          n ||
            (e.params.loop
              ? e.slideToLoop(
                  e.getSlideIndexWhenGrid(
                    parseInt(D.getAttribute('data-swiper-slide-index'))
                  ),
                  0
                )
              : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(D)), 0),
            (n = !1));
        }));
    },
    x = () => {
      const M = e.params.a11y;
      (M.itemRoleDescriptionMessage &&
        h(e.slides, M.itemRoleDescriptionMessage),
        M.slideRole && m(e.slides, M.slideRole));
      const D = e.slides.length;
      M.slideLabelMessage &&
        e.slides.forEach((z, C) => {
          const W = e.params.loop
              ? parseInt(z.getAttribute('data-swiper-slide-index'), 10)
              : C,
            ae = M.slideLabelMessage
              .replace(/\{\{index\}\}/, W + 1)
              .replace(/\{\{slidesLength\}\}/, D);
          d(z, ae);
        });
    },
    L = () => {
      const M = e.params.a11y;
      e.el.append(i);
      const D = e.el;
      (M.containerRoleDescriptionMessage &&
        h(D, M.containerRoleDescriptionMessage),
        M.containerMessage && d(D, M.containerMessage),
        M.containerRole && m(D, M.containerRole));
      const z = e.wrapperEl,
        C = M.id || z.getAttribute('id') || `swiper-wrapper-${l(16)}`,
        W = e.params.autoplay && e.params.autoplay.enabled ? 'off' : 'polite';
      (g(z, C), w(z, W), x());
      let { nextEl: ae, prevEl: le } = e.navigation ? e.navigation : {};
      ((ae = Ee(ae)),
        (le = Ee(le)),
        ae && ae.forEach((B) => S(B, C, M.nextSlideMessage)),
        le && le.forEach((B) => S(B, C, M.prevSlideMessage)),
        T() &&
          Ee(e.pagination.el).forEach((F) => {
            F.addEventListener('keydown', y);
          }),
        bt().addEventListener('visibilitychange', A),
        e.el.addEventListener('focus', k, !0),
        e.el.addEventListener('focus', k, !0),
        e.el.addEventListener('pointerdown', E, !0),
        e.el.addEventListener('pointerup', I, !0));
    };
  function $() {
    i && i.remove();
    let { nextEl: M, prevEl: D } = e.navigation ? e.navigation : {};
    ((M = Ee(M)),
      (D = Ee(D)),
      M && M.forEach((C) => C.removeEventListener('keydown', y)),
      D && D.forEach((C) => C.removeEventListener('keydown', y)),
      T() &&
        Ee(e.pagination.el).forEach((W) => {
          W.removeEventListener('keydown', y);
        }),
      bt().removeEventListener('visibilitychange', A),
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('focus', k, !0),
        e.el.removeEventListener('pointerdown', E, !0),
        e.el.removeEventListener('pointerup', I, !0)));
  }
  (r('beforeInit', () => {
    ((i = pr('span', e.params.a11y.notificationClass)),
      i.setAttribute('aria-live', 'assertive'),
      i.setAttribute('aria-atomic', 'true'));
  }),
    r('afterInit', () => {
      e.params.a11y.enabled && L();
    }),
    r('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
      e.params.a11y.enabled && x();
    }),
    r('fromEdge toEdge afterInit lock unlock', () => {
      e.params.a11y.enabled && b();
    }),
    r('paginationUpdate', () => {
      e.params.a11y.enabled && O();
    }),
    r('destroy', () => {
      e.params.a11y.enabled && $();
    }));
}
function hp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({
    history: {
      enabled: !1,
      root: '',
      replaceState: !1,
      key: 'slides',
      keepQuery: !1,
    },
  });
  let i = !1,
    n = {};
  const a = (h) =>
      h
        .toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, ''),
    o = (h) => {
      const f = Ke();
      let d;
      h ? (d = new URL(h)) : (d = f.location);
      const g = d.pathname
          .slice(1)
          .split('/')
          .filter((y) => y !== ''),
        w = g.length,
        _ = g[w - 2],
        v = g[w - 1];
      return { key: _, value: v };
    },
    c = (h, f) => {
      const d = Ke();
      if (!i || !e.params.history.enabled) return;
      let g;
      e.params.url ? (g = new URL(e.params.url)) : (g = d.location);
      const w =
        e.virtual && e.params.virtual.enabled
          ? e.slidesEl.querySelector(`[data-swiper-slide-index="${f}"]`)
          : e.slides[f];
      let _ = a(w.getAttribute('data-history'));
      if (e.params.history.root.length > 0) {
        let y = e.params.history.root;
        (y[y.length - 1] === '/' && (y = y.slice(0, y.length - 1)),
          (_ = `${y}/${h ? `${h}/` : ''}${_}`));
      } else g.pathname.includes(h) || (_ = `${h ? `${h}/` : ''}${_}`);
      e.params.history.keepQuery && (_ += g.search);
      const v = d.history.state;
      (v && v.value === _) ||
        (e.params.history.replaceState
          ? d.history.replaceState({ value: _ }, null, _)
          : d.history.pushState({ value: _ }, null, _));
    },
    l = (h, f, d) => {
      if (f)
        for (let g = 0, w = e.slides.length; g < w; g += 1) {
          const _ = e.slides[g];
          if (a(_.getAttribute('data-history')) === f) {
            const y = e.getSlideIndex(_);
            e.slideTo(y, h, d);
          }
        }
      else e.slideTo(0, h, d);
    },
    u = () => {
      ((n = o(e.params.url)), l(e.params.speed, n.value, !1));
    },
    p = () => {
      const h = Ke();
      if (e.params.history) {
        if (!h.history || !h.history.pushState) {
          ((e.params.history.enabled = !1),
            (e.params.hashNavigation.enabled = !0));
          return;
        }
        if (((i = !0), (n = o(e.params.url)), !n.key && !n.value)) {
          e.params.history.replaceState || h.addEventListener('popstate', u);
          return;
        }
        (l(0, n.value, e.params.runCallbacksOnInit),
          e.params.history.replaceState || h.addEventListener('popstate', u));
      }
    },
    m = () => {
      const h = Ke();
      e.params.history.replaceState || h.removeEventListener('popstate', u);
    };
  (r('init', () => {
    e.params.history.enabled && p();
  }),
    r('destroy', () => {
      e.params.history.enabled && m();
    }),
    r('transitionEnd _freeModeNoMomentumRelease', () => {
      i && c(e.params.history.key, e.activeIndex);
    }),
    r('slideChange', () => {
      i && e.params.cssMode && c(e.params.history.key, e.activeIndex);
    }));
}
function mp(s) {
  let { swiper: e, extendParams: t, emit: r, on: i } = s,
    n = !1;
  const a = bt(),
    o = Ke();
  t({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1,
      getSlideIndex(m, h) {
        if (e.virtual && e.params.virtual.enabled) {
          const f = e.slides.find((g) => g.getAttribute('data-hash') === h);
          return f
            ? parseInt(f.getAttribute('data-swiper-slide-index'), 10)
            : 0;
        }
        return e.getSlideIndex(
          Ct(
            e.slidesEl,
            `.${e.params.slideClass}[data-hash="${h}"], swiper-slide[data-hash="${h}"]`
          )[0]
        );
      },
    },
  });
  const c = () => {
      r('hashChange');
      const m = a.location.hash.replace('#', ''),
        h =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`
              )
            : e.slides[e.activeIndex],
        f = h ? h.getAttribute('data-hash') : '';
      if (m !== f) {
        const d = e.params.hashNavigation.getSlideIndex(e, m);
        if (typeof d > 'u' || Number.isNaN(d)) return;
        e.slideTo(d);
      }
    },
    l = () => {
      if (!n || !e.params.hashNavigation.enabled) return;
      const m =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`
              )
            : e.slides[e.activeIndex],
        h = m
          ? m.getAttribute('data-hash') || m.getAttribute('data-history')
          : '';
      e.params.hashNavigation.replaceState &&
      o.history &&
      o.history.replaceState
        ? (o.history.replaceState(null, null, `#${h}` || ''), r('hashSet'))
        : ((a.location.hash = h || ''), r('hashSet'));
    },
    u = () => {
      if (
        !e.params.hashNavigation.enabled ||
        (e.params.history && e.params.history.enabled)
      )
        return;
      n = !0;
      const m = a.location.hash.replace('#', '');
      if (m) {
        const f = e.params.hashNavigation.getSlideIndex(e, m);
        e.slideTo(f || 0, 0, e.params.runCallbacksOnInit, !0);
      }
      e.params.hashNavigation.watchState && o.addEventListener('hashchange', c);
    },
    p = () => {
      e.params.hashNavigation.watchState &&
        o.removeEventListener('hashchange', c);
    };
  (i('init', () => {
    e.params.hashNavigation.enabled && u();
  }),
    i('destroy', () => {
      e.params.hashNavigation.enabled && p();
    }),
    i('transitionEnd _freeModeNoMomentumRelease', () => {
      n && l();
    }),
    i('slideChange', () => {
      n && e.params.cssMode && l();
    }));
}
function gp(s) {
  let { swiper: e, extendParams: t, on: r, emit: i, params: n } = s;
  ((e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    }));
  let a,
    o,
    c = n && n.autoplay ? n.autoplay.delay : 3e3,
    l = n && n.autoplay ? n.autoplay.delay : 3e3,
    u,
    p = new Date().getTime(),
    m,
    h,
    f,
    d,
    g,
    w,
    _;
  function v(D) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (D.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener('transitionend', v),
        !(_ || (D.detail && D.detail.bySwiperTouchMove)) && E()));
  }
  const y = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (m = !0) : m && ((l = u), (m = !1));
      const D = e.autoplay.paused ? u : p + l - new Date().getTime();
      ((e.autoplay.timeLeft = D),
        i('autoplayTimeLeft', D, D / c),
        (o = requestAnimationFrame(() => {
          y();
        })));
    },
    b = () => {
      let D;
      return (
        e.virtual && e.params.virtual.enabled
          ? (D = e.slides.find((C) =>
              C.classList.contains('swiper-slide-active')
            ))
          : (D = e.slides[e.activeIndex]),
        D ? parseInt(D.getAttribute('data-swiper-autoplay'), 10) : void 0
      );
    },
    P = (D) => {
      if (e.destroyed || !e.autoplay.running) return;
      (cancelAnimationFrame(o), y());
      let z = typeof D > 'u' ? e.params.autoplay.delay : D;
      ((c = e.params.autoplay.delay), (l = e.params.autoplay.delay));
      const C = b();
      (!Number.isNaN(C) &&
        C > 0 &&
        typeof D > 'u' &&
        ((z = C), (c = C), (l = C)),
        (u = z));
      const W = e.params.speed,
        ae = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(W, !0, !0), i('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, W, !0, !0), i('autoplay'))
              : !e.isEnd || e.params.loop || e.params.rewind
                ? (e.slideNext(W, !0, !0), i('autoplay'))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(0, W, !0, !0), i('autoplay')),
            e.params.cssMode &&
              ((p = new Date().getTime()),
              requestAnimationFrame(() => {
                P();
              })));
        };
      return (
        z > 0
          ? (clearTimeout(a),
            (a = setTimeout(() => {
              ae();
            }, z)))
          : requestAnimationFrame(() => {
              ae();
            }),
        z
      );
    },
    T = () => {
      ((p = new Date().getTime()),
        (e.autoplay.running = !0),
        P(),
        i('autoplayStart'));
    },
    O = () => {
      ((e.autoplay.running = !1),
        clearTimeout(a),
        cancelAnimationFrame(o),
        i('autoplayStop'));
    },
    S = (D, z) => {
      if (e.destroyed || !e.autoplay.running) return;
      (clearTimeout(a), D || (w = !0));
      const C = () => {
        (i('autoplayPause'),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener('transitionend', v)
            : E());
      };
      if (((e.autoplay.paused = !0), z)) {
        (g && (u = e.params.autoplay.delay), (g = !1), C());
        return;
      }
      ((u = (u || e.params.autoplay.delay) - (new Date().getTime() - p)),
        !(e.isEnd && u < 0 && !e.params.loop) && (u < 0 && (u = 0), C()));
    },
    E = () => {
      (e.isEnd && u < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((p = new Date().getTime()),
        w ? ((w = !1), P(u)) : P(),
        (e.autoplay.paused = !1),
        i('autoplayResume'));
    },
    I = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const D = bt();
      (D.visibilityState === 'hidden' && ((w = !0), S(!0)),
        D.visibilityState === 'visible' && E());
    },
    A = (D) => {
      D.pointerType === 'mouse' &&
        ((w = !0), (_ = !0), !(e.animating || e.autoplay.paused) && S(!0));
    },
    k = (D) => {
      D.pointerType === 'mouse' && ((_ = !1), e.autoplay.paused && E());
    },
    x = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener('pointerenter', A),
        e.el.addEventListener('pointerleave', k));
    },
    L = () => {
      e.el &&
        typeof e.el != 'string' &&
        (e.el.removeEventListener('pointerenter', A),
        e.el.removeEventListener('pointerleave', k));
    },
    $ = () => {
      bt().addEventListener('visibilitychange', I);
    },
    M = () => {
      bt().removeEventListener('visibilitychange', I);
    };
  (r('init', () => {
    e.params.autoplay.enabled && (x(), $(), T());
  }),
    r('destroy', () => {
      (L(), M(), e.autoplay.running && O());
    }),
    r('_freeModeStaticRelease', () => {
      (f || w) && E();
    }),
    r('_freeModeNoMomentumRelease', () => {
      e.params.autoplay.disableOnInteraction ? O() : S(!0, !0);
    }),
    r('beforeTransitionStart', (D, z, C) => {
      e.destroyed ||
        !e.autoplay.running ||
        (C || !e.params.autoplay.disableOnInteraction ? S(!0, !0) : O());
    }),
    r('sliderFirstMove', () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          O();
          return;
        }
        ((h = !0),
          (f = !1),
          (w = !1),
          (d = setTimeout(() => {
            ((w = !0), (f = !0), S(!0));
          }, 200)));
      }
    }),
    r('touchEnd', () => {
      if (!(e.destroyed || !e.autoplay.running || !h)) {
        if (
          (clearTimeout(d),
          clearTimeout(a),
          e.params.autoplay.disableOnInteraction)
        ) {
          ((f = !1), (h = !1));
          return;
        }
        (f && e.params.cssMode && E(), (f = !1), (h = !1));
      }
    }),
    r('slideChange', () => {
      e.destroyed || !e.autoplay.running || (g = !0);
    }),
    Object.assign(e.autoplay, { start: T, stop: O, pause: S, resume: E }));
}
function vp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs',
    },
  });
  let i = !1,
    n = !1;
  e.thumbs = { swiper: null };
  function a() {
    const l = e.thumbs.swiper;
    if (!l || l.destroyed) return;
    const u = l.clickedIndex,
      p = l.clickedSlide;
    if (
      (p && p.classList.contains(e.params.thumbs.slideThumbActiveClass)) ||
      typeof u > 'u' ||
      u === null
    )
      return;
    let m;
    (l.params.loop
      ? (m = parseInt(
          l.clickedSlide.getAttribute('data-swiper-slide-index'),
          10
        ))
      : (m = u),
      e.params.loop ? e.slideToLoop(m) : e.slideTo(m));
  }
  function o() {
    const { thumbs: l } = e.params;
    if (i) return !1;
    i = !0;
    const u = e.constructor;
    if (l.swiper instanceof u) {
      if (l.swiper.destroyed) return ((i = !1), !1);
      ((e.thumbs.swiper = l.swiper),
        Object.assign(e.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        Object.assign(e.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        e.thumbs.swiper.update());
    } else if (Vs(l.swiper)) {
      const p = Object.assign({}, l.swiper);
      (Object.assign(p, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
        (e.thumbs.swiper = new u(p)),
        (n = !0));
    }
    return (
      e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),
      e.thumbs.swiper.on('tap', a),
      !0
    );
  }
  function c(l) {
    const u = e.thumbs.swiper;
    if (!u || u.destroyed) return;
    const p =
      u.params.slidesPerView === 'auto'
        ? u.slidesPerViewDynamic()
        : u.params.slidesPerView;
    let m = 1;
    const h = e.params.thumbs.slideThumbActiveClass;
    if (
      (e.params.slidesPerView > 1 &&
        !e.params.centeredSlides &&
        (m = e.params.slidesPerView),
      e.params.thumbs.multipleActiveThumbs || (m = 1),
      (m = Math.floor(m)),
      u.slides.forEach((g) => g.classList.remove(h)),
      u.params.loop || (u.params.virtual && u.params.virtual.enabled))
    )
      for (let g = 0; g < m; g += 1)
        Ct(
          u.slidesEl,
          `[data-swiper-slide-index="${e.realIndex + g}"]`
        ).forEach((w) => {
          w.classList.add(h);
        });
    else
      for (let g = 0; g < m; g += 1)
        u.slides[e.realIndex + g] && u.slides[e.realIndex + g].classList.add(h);
    const f = e.params.thumbs.autoScrollOffset,
      d = f && !u.params.loop;
    if (e.realIndex !== u.realIndex || d) {
      const g = u.activeIndex;
      let w, _;
      if (u.params.loop) {
        const v = u.slides.find(
          (y) => y.getAttribute('data-swiper-slide-index') === `${e.realIndex}`
        );
        ((w = u.slides.indexOf(v)),
          (_ = e.activeIndex > e.previousIndex ? 'next' : 'prev'));
      } else ((w = e.realIndex), (_ = w > e.previousIndex ? 'next' : 'prev'));
      (d && (w += _ === 'next' ? f : -1 * f),
        u.visibleSlidesIndexes &&
          u.visibleSlidesIndexes.indexOf(w) < 0 &&
          (u.params.centeredSlides
            ? w > g
              ? (w = w - Math.floor(p / 2) + 1)
              : (w = w + Math.floor(p / 2) - 1)
            : w > g && u.params.slidesPerGroup,
          u.slideTo(w, l ? 0 : void 0)));
    }
  }
  (r('beforeInit', () => {
    const { thumbs: l } = e.params;
    if (!(!l || !l.swiper))
      if (typeof l.swiper == 'string' || l.swiper instanceof HTMLElement) {
        const u = bt(),
          p = () => {
            const h =
              typeof l.swiper == 'string'
                ? u.querySelector(l.swiper)
                : l.swiper;
            if (h && h.swiper) ((l.swiper = h.swiper), o(), c(!0));
            else if (h) {
              const f = `${e.params.eventsPrefix}init`,
                d = (g) => {
                  ((l.swiper = g.detail[0]),
                    h.removeEventListener(f, d),
                    o(),
                    c(!0),
                    l.swiper.update(),
                    e.update());
                };
              h.addEventListener(f, d);
            }
            return h;
          },
          m = () => {
            if (e.destroyed) return;
            p() || requestAnimationFrame(m);
          };
        requestAnimationFrame(m);
      } else (o(), c(!0));
  }),
    r('slideChange update resize observerUpdate', () => {
      c();
    }),
    r('setTransition', (l, u) => {
      const p = e.thumbs.swiper;
      !p || p.destroyed || p.setTransition(u);
    }),
    r('beforeDestroy', () => {
      const l = e.thumbs.swiper;
      !l || l.destroyed || (n && l.destroy());
    }),
    Object.assign(e.thumbs, { init: o, update: c }));
}
function _p(s) {
  let { swiper: e, extendParams: t, emit: r, once: i } = s;
  t({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  });
  function n() {
    if (e.params.cssMode) return;
    const c = e.getTranslate();
    (e.setTranslate(c),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({
        currentPos: e.rtl ? e.translate : -e.translate,
      }));
  }
  function a() {
    if (e.params.cssMode) return;
    const { touchEventsData: c, touches: l } = e;
    (c.velocities.length === 0 &&
      c.velocities.push({
        position: l[e.isHorizontal() ? 'startX' : 'startY'],
        time: c.touchStartTime,
      }),
      c.velocities.push({
        position: l[e.isHorizontal() ? 'currentX' : 'currentY'],
        time: Sr(),
      }));
  }
  function o(c) {
    let { currentPos: l } = c;
    if (e.params.cssMode) return;
    const {
        params: u,
        wrapperEl: p,
        rtlTranslate: m,
        snapGrid: h,
        touchEventsData: f,
      } = e,
      g = Sr() - f.touchStartTime;
    if (l < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (l > -e.maxTranslate()) {
      e.slides.length < h.length
        ? e.slideTo(h.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (u.freeMode.momentum) {
      if (f.velocities.length > 1) {
        const O = f.velocities.pop(),
          S = f.velocities.pop(),
          E = O.position - S.position,
          I = O.time - S.time;
        ((e.velocity = E / I),
          (e.velocity /= 2),
          Math.abs(e.velocity) < u.freeMode.minimumVelocity && (e.velocity = 0),
          (I > 150 || Sr() - O.time > 300) && (e.velocity = 0));
      } else e.velocity = 0;
      ((e.velocity *= u.freeMode.momentumVelocityRatio),
        (f.velocities.length = 0));
      let w = 1e3 * u.freeMode.momentumRatio;
      const _ = e.velocity * w;
      let v = e.translate + _;
      m && (v = -v);
      let y = !1,
        b;
      const P = Math.abs(e.velocity) * 20 * u.freeMode.momentumBounceRatio;
      let T;
      if (v < e.maxTranslate())
        (u.freeMode.momentumBounce
          ? (v + e.maxTranslate() < -P && (v = e.maxTranslate() - P),
            (b = e.maxTranslate()),
            (y = !0),
            (f.allowMomentumBounce = !0))
          : (v = e.maxTranslate()),
          u.loop && u.centeredSlides && (T = !0));
      else if (v > e.minTranslate())
        (u.freeMode.momentumBounce
          ? (v - e.minTranslate() > P && (v = e.minTranslate() + P),
            (b = e.minTranslate()),
            (y = !0),
            (f.allowMomentumBounce = !0))
          : (v = e.minTranslate()),
          u.loop && u.centeredSlides && (T = !0));
      else if (u.freeMode.sticky) {
        let O;
        for (let S = 0; S < h.length; S += 1)
          if (h[S] > -v) {
            O = S;
            break;
          }
        (Math.abs(h[O] - v) < Math.abs(h[O - 1] - v) ||
        e.swipeDirection === 'next'
          ? (v = h[O])
          : (v = h[O - 1]),
          (v = -v));
      }
      if (
        (T &&
          i('transitionEnd', () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (m
            ? (w = Math.abs((-v - e.translate) / e.velocity))
            : (w = Math.abs((v - e.translate) / e.velocity)),
          u.freeMode.sticky)
        ) {
          const O = Math.abs((m ? -v : v) - e.translate),
            S = e.slidesSizesGrid[e.activeIndex];
          O < S
            ? (w = u.speed)
            : O < 2 * S
              ? (w = u.speed * 1.5)
              : (w = u.speed * 2.5);
        }
      } else if (u.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      (u.freeMode.momentumBounce && y
        ? (e.updateProgress(b),
          e.setTransition(w),
          e.setTranslate(v),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          Qs(p, () => {
            !e ||
              e.destroyed ||
              !f.allowMomentumBounce ||
              (r('momentumBounce'),
              e.setTransition(u.speed),
              setTimeout(() => {
                (e.setTranslate(b),
                  Qs(p, () => {
                    !e || e.destroyed || e.transitionEnd();
                  }));
              }, 0));
          }))
        : e.velocity
          ? (r('_freeModeNoMomentumRelease'),
            e.updateProgress(v),
            e.setTransition(w),
            e.setTranslate(v),
            e.transitionStart(!0, e.swipeDirection),
            e.animating ||
              ((e.animating = !0),
              Qs(p, () => {
                !e || e.destroyed || e.transitionEnd();
              })))
          : e.updateProgress(v),
        e.updateActiveIndex(),
        e.updateSlidesClasses());
    } else if (u.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else u.freeMode && r('_freeModeNoMomentumRelease');
    (!u.freeMode.momentum || g >= u.longSwipesMs) &&
      (r('_freeModeStaticRelease'),
      e.updateProgress(),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: n, onTouchMove: a, onTouchEnd: o },
  });
}
function wp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({ grid: { rows: 1, fill: 'column' } });
  let i, n, a, o;
  const c = () => {
      let d = e.params.spaceBetween;
      return (
        typeof d == 'string' && d.indexOf('%') >= 0
          ? (d = (parseFloat(d.replace('%', '')) / 100) * e.size)
          : typeof d == 'string' && (d = parseFloat(d)),
        d
      );
    },
    l = (d) => {
      const { slidesPerView: g } = e.params,
        { rows: w, fill: _ } = e.params.grid,
        v =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : d.length;
      ((a = Math.floor(v / w)),
        Math.floor(v / w) === v / w ? (i = v) : (i = Math.ceil(v / w) * w),
        g !== 'auto' && _ === 'row' && (i = Math.max(i, g * w)),
        (n = i / w));
    },
    u = () => {
      e.slides &&
        e.slides.forEach((d) => {
          d.swiperSlideGridSet &&
            ((d.style.height = ''),
            (d.style[e.getDirectionLabel('margin-top')] = ''));
        });
    },
    p = (d, g, w) => {
      const { slidesPerGroup: _ } = e.params,
        v = c(),
        { rows: y, fill: b } = e.params.grid,
        P =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : w.length;
      let T, O, S;
      if (b === 'row' && _ > 1) {
        const E = Math.floor(d / (_ * y)),
          I = d - y * _ * E,
          A = E === 0 ? _ : Math.min(Math.ceil((P - E * y * _) / y), _);
        ((S = Math.floor(I / A)),
          (O = I - S * A + E * _),
          (T = O + (S * i) / y),
          (g.style.order = T));
      } else
        b === 'column'
          ? ((O = Math.floor(d / y)),
            (S = d - O * y),
            (O > a || (O === a && S === y - 1)) &&
              ((S += 1), S >= y && ((S = 0), (O += 1))))
          : ((S = Math.floor(d / n)), (O = d - S * n));
      ((g.row = S),
        (g.column = O),
        (g.style.height = `calc((100% - ${(y - 1) * v}px) / ${y})`),
        (g.style[e.getDirectionLabel('margin-top')] =
          S !== 0 ? v && `${v}px` : ''),
        (g.swiperSlideGridSet = !0));
    },
    m = (d, g) => {
      const { centeredSlides: w, roundLengths: _ } = e.params,
        v = c(),
        { rows: y } = e.params.grid;
      if (
        ((e.virtualSize = (d + v) * i),
        (e.virtualSize = Math.ceil(e.virtualSize / y) - v),
        e.params.cssMode ||
          (e.wrapperEl.style[e.getDirectionLabel('width')] =
            `${e.virtualSize + v}px`),
        w)
      ) {
        const b = [];
        for (let P = 0; P < g.length; P += 1) {
          let T = g[P];
          (_ && (T = Math.floor(T)), g[P] < e.virtualSize + g[0] && b.push(T));
        }
        (g.splice(0, g.length), g.push(...b));
      }
    },
    h = () => {
      o = e.params.grid && e.params.grid.rows > 1;
    },
    f = () => {
      const { params: d, el: g } = e,
        w = d.grid && d.grid.rows > 1;
      (o && !w
        ? (g.classList.remove(
            `${d.containerModifierClass}grid`,
            `${d.containerModifierClass}grid-column`
          ),
          (a = 1),
          e.emitContainerClasses())
        : !o &&
          w &&
          (g.classList.add(`${d.containerModifierClass}grid`),
          d.grid.fill === 'column' &&
            g.classList.add(`${d.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        (o = w));
    };
  (r('init', h),
    r('update', f),
    (e.grid = {
      initSlides: l,
      unsetSlides: u,
      updateSlide: p,
      updateWrapperSize: m,
    }));
}
function yp(s) {
  const e = this,
    { params: t, slidesEl: r } = e;
  t.loop && e.loopDestroy();
  const i = (n) => {
    if (typeof n == 'string') {
      const a = document.createElement('div');
      (ei(a, n), r.append(a.children[0]), ei(a, ''));
    } else r.append(n);
  };
  if (typeof s == 'object' && 'length' in s)
    for (let n = 0; n < s.length; n += 1) s[n] && i(s[n]);
  else i(s);
  (e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update());
}
function bp(s) {
  const e = this,
    { params: t, activeIndex: r, slidesEl: i } = e;
  t.loop && e.loopDestroy();
  let n = r + 1;
  const a = (o) => {
    if (typeof o == 'string') {
      const c = document.createElement('div');
      (ei(c, o), i.prepend(c.children[0]), ei(c, ''));
    } else i.prepend(o);
  };
  if (typeof s == 'object' && 'length' in s) {
    for (let o = 0; o < s.length; o += 1) s[o] && a(s[o]);
    n = r + s.length;
  } else a(s);
  (e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    e.slideTo(n, 0, !1));
}
function Tp(s, e) {
  const t = this,
    { params: r, activeIndex: i, slidesEl: n } = t;
  let a = i;
  r.loop && ((a -= t.loopedSlides), t.loopDestroy(), t.recalcSlides());
  const o = t.slides.length;
  if (s <= 0) {
    t.prependSlide(e);
    return;
  }
  if (s >= o) {
    t.appendSlide(e);
    return;
  }
  let c = a > s ? a + 1 : a;
  const l = [];
  for (let u = o - 1; u >= s; u -= 1) {
    const p = t.slides[u];
    (p.remove(), l.unshift(p));
  }
  if (typeof e == 'object' && 'length' in e) {
    for (let u = 0; u < e.length; u += 1) e[u] && n.append(e[u]);
    c = a > s ? a + e.length : a;
  } else n.append(e);
  for (let u = 0; u < l.length; u += 1) n.append(l[u]);
  (t.recalcSlides(),
    r.loop && t.loopCreate(),
    (!r.observer || t.isElement) && t.update(),
    r.loop ? t.slideTo(c + t.loopedSlides, 0, !1) : t.slideTo(c, 0, !1));
}
function xp(s) {
  const e = this,
    { params: t, activeIndex: r } = e;
  let i = r;
  t.loop && ((i -= e.loopedSlides), e.loopDestroy());
  let n = i,
    a;
  if (typeof s == 'object' && 'length' in s) {
    for (let o = 0; o < s.length; o += 1)
      ((a = s[o]), e.slides[a] && e.slides[a].remove(), a < n && (n -= 1));
    n = Math.max(n, 0);
  } else
    ((a = s),
      e.slides[a] && e.slides[a].remove(),
      a < n && (n -= 1),
      (n = Math.max(n, 0)));
  (e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    t.loop ? e.slideTo(n + e.loopedSlides, 0, !1) : e.slideTo(n, 0, !1));
}
function Sp() {
  const s = this,
    e = [];
  for (let t = 0; t < s.slides.length; t += 1) e.push(t);
  s.removeSlide(e);
}
function Ep(s) {
  let { swiper: e } = s;
  Object.assign(e, {
    appendSlide: yp.bind(e),
    prependSlide: bp.bind(e),
    addSlide: Tp.bind(e),
    removeSlide: xp.bind(e),
    removeAllSlides: Sp.bind(e),
  });
}
function Is(s) {
  const {
    effect: e,
    swiper: t,
    on: r,
    setTranslate: i,
    setTransition: n,
    overwriteParams: a,
    perspective: o,
    recreateShadows: c,
    getEffectParams: l,
  } = s;
  (r('beforeInit', () => {
    if (t.params.effect !== e) return;
    (t.classNames.push(`${t.params.containerModifierClass}${e}`),
      o && o() && t.classNames.push(`${t.params.containerModifierClass}3d`));
    const p = a ? a() : {};
    (Object.assign(t.params, p), Object.assign(t.originalParams, p));
  }),
    r('setTranslate _virtualUpdated', () => {
      t.params.effect === e && i();
    }),
    r('setTransition', (p, m) => {
      t.params.effect === e && n(m);
    }),
    r('transitionEnd', () => {
      if (t.params.effect === e && c) {
        if (!l || !l().slideShadows) return;
        (t.slides.forEach((p) => {
          p.querySelectorAll(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          ).forEach((m) => m.remove());
        }),
          c());
      }
    }));
  let u;
  r('virtualUpdate', () => {
    t.params.effect === e &&
      (t.slides.length || (u = !0),
      requestAnimationFrame(() => {
        u && t.slides && t.slides.length && (i(), (u = !1));
      }));
  });
}
function Cn(s, e) {
  const t = Ji(e);
  return (
    t !== e &&
      ((t.style.backfaceVisibility = 'hidden'),
      (t.style['-webkit-backface-visibility'] = 'hidden')),
    t
  );
}
function Ea(s) {
  let { swiper: e, duration: t, transformElements: r, allSlides: i } = s;
  const { activeIndex: n } = e,
    a = (o) =>
      o.parentElement
        ? o.parentElement
        : e.slides.find((l) => l.shadowRoot && l.shadowRoot === o.parentNode);
  if (e.params.virtualTranslate && t !== 0) {
    let o = !1,
      c;
    (i
      ? (c = r)
      : (c = r.filter((l) => {
          const u = l.classList.contains('swiper-slide-transform') ? a(l) : l;
          return e.getSlideIndex(u) === n;
        })),
      c.forEach((l) => {
        Qs(l, () => {
          if (o || !e || e.destroyed) return;
          ((o = !0), (e.animating = !1));
          const u = new window.CustomEvent('transitionend', {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(u);
        });
      }));
  }
}
function Cp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  (t({ fadeEffect: { crossFade: !1 } }),
    Is({
      effect: 'fade',
      swiper: e,
      on: r,
      setTranslate: () => {
        const { slides: a } = e,
          o = e.params.fadeEffect;
        for (let c = 0; c < a.length; c += 1) {
          const l = e.slides[c];
          let p = -l.swiperSlideOffset;
          e.params.virtualTranslate || (p -= e.translate);
          let m = 0;
          e.isHorizontal() || ((m = p), (p = 0));
          const h = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(l.progress), 0)
              : 1 + Math.min(Math.max(l.progress, -1), 0),
            f = Cn(o, l);
          ((f.style.opacity = h),
            (f.style.transform = `translate3d(${p}px, ${m}px, 0px)`));
        }
      },
      setTransition: (a) => {
        const o = e.slides.map((c) => Ji(c));
        (o.forEach((c) => {
          c.style.transitionDuration = `${a}ms`;
        }),
          Ea({ swiper: e, duration: a, transformElements: o, allSlides: !0 }));
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode,
      }),
    }));
}
function Mp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const i = (c, l, u) => {
    let p = u
        ? c.querySelector('.swiper-slide-shadow-left')
        : c.querySelector('.swiper-slide-shadow-top'),
      m = u
        ? c.querySelector('.swiper-slide-shadow-right')
        : c.querySelector('.swiper-slide-shadow-bottom');
    (p ||
      ((p = pr(
        'div',
        `swiper-slide-shadow-cube swiper-slide-shadow-${u ? 'left' : 'top'}`.split(
          ' '
        )
      )),
      c.append(p)),
      m ||
        ((m = pr(
          'div',
          `swiper-slide-shadow-cube swiper-slide-shadow-${u ? 'right' : 'bottom'}`.split(
            ' '
          )
        )),
        c.append(m)),
      p && (p.style.opacity = Math.max(-l, 0)),
      m && (m.style.opacity = Math.max(l, 0)));
  };
  Is({
    effect: 'cube',
    swiper: e,
    on: r,
    setTranslate: () => {
      const {
          el: c,
          wrapperEl: l,
          slides: u,
          width: p,
          height: m,
          rtlTranslate: h,
          size: f,
          browser: d,
        } = e,
        g = Sa(e),
        w = e.params.cubeEffect,
        _ = e.isHorizontal(),
        v = e.virtual && e.params.virtual.enabled;
      let y = 0,
        b;
      w.shadow &&
        (_
          ? ((b = e.wrapperEl.querySelector('.swiper-cube-shadow')),
            b || ((b = pr('div', 'swiper-cube-shadow')), e.wrapperEl.append(b)),
            (b.style.height = `${p}px`))
          : ((b = c.querySelector('.swiper-cube-shadow')),
            b || ((b = pr('div', 'swiper-cube-shadow')), c.append(b))));
      for (let T = 0; T < u.length; T += 1) {
        const O = u[T];
        let S = T;
        v && (S = parseInt(O.getAttribute('data-swiper-slide-index'), 10));
        let E = S * 90,
          I = Math.floor(E / 360);
        h && ((E = -E), (I = Math.floor(-E / 360)));
        const A = Math.max(Math.min(O.progress, 1), -1);
        let k = 0,
          x = 0,
          L = 0;
        (S % 4 === 0
          ? ((k = -I * 4 * f), (L = 0))
          : (S - 1) % 4 === 0
            ? ((k = 0), (L = -I * 4 * f))
            : (S - 2) % 4 === 0
              ? ((k = f + I * 4 * f), (L = f))
              : (S - 3) % 4 === 0 && ((k = -f), (L = 3 * f + f * 4 * I)),
          h && (k = -k),
          _ || ((x = k), (k = 0)));
        const $ = `rotateX(${g(_ ? 0 : -E)}deg) rotateY(${g(_ ? E : 0)}deg) translate3d(${k}px, ${x}px, ${L}px)`;
        (A <= 1 &&
          A > -1 &&
          ((y = S * 90 + A * 90), h && (y = -S * 90 - A * 90)),
          (O.style.transform = $),
          w.slideShadows && i(O, A, _));
      }
      if (
        ((l.style.transformOrigin = `50% 50% -${f / 2}px`),
        (l.style['-webkit-transform-origin'] = `50% 50% -${f / 2}px`),
        w.shadow)
      )
        if (_)
          b.style.transform = `translate3d(0px, ${p / 2 + w.shadowOffset}px, ${-p / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${w.shadowScale})`;
        else {
          const T = Math.abs(y) - Math.floor(Math.abs(y) / 90) * 90,
            O =
              1.5 -
              (Math.sin((T * 2 * Math.PI) / 360) / 2 +
                Math.cos((T * 2 * Math.PI) / 360) / 2),
            S = w.shadowScale,
            E = w.shadowScale / O,
            I = w.shadowOffset;
          b.style.transform = `scale3d(${S}, 1, ${E}) translate3d(0px, ${m / 2 + I}px, ${-m / 2 / E}px) rotateX(-89.99deg)`;
        }
      const P =
        (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -f / 2 : 0;
      ((l.style.transform = `translate3d(0px,0,${P}px) rotateX(${g(e.isHorizontal() ? 0 : y)}deg) rotateY(${g(e.isHorizontal() ? -y : 0)}deg)`),
        l.style.setProperty('--swiper-cube-translate-z', `${P}px`));
    },
    setTransition: (c) => {
      const { el: l, slides: u } = e;
      if (
        (u.forEach((p) => {
          ((p.style.transitionDuration = `${c}ms`),
            p
              .querySelectorAll(
                '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
              )
              .forEach((m) => {
                m.style.transitionDuration = `${c}ms`;
              }));
        }),
        e.params.cubeEffect.shadow && !e.isHorizontal())
      ) {
        const p = l.querySelector('.swiper-cube-shadow');
        p && (p.style.transitionDuration = `${c}ms`);
      }
    },
    recreateShadows: () => {
      const c = e.isHorizontal();
      e.slides.forEach((l) => {
        const u = Math.max(Math.min(l.progress, 1), -1);
        i(l, u, c);
      });
    },
    getEffectParams: () => e.params.cubeEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0,
    }),
  });
}
function Ts(s, e, t) {
  const r = `swiper-slide-shadow${t ? `-${t}` : ''}${s ? ` swiper-slide-shadow-${s}` : ''}`,
    i = Ji(e);
  let n = i.querySelector(`.${r.split(' ').join('.')}`);
  return (n || ((n = pr('div', r.split(' '))), i.append(n)), n);
}
function Pp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
  const i = (c, l) => {
    let u = e.isHorizontal()
        ? c.querySelector('.swiper-slide-shadow-left')
        : c.querySelector('.swiper-slide-shadow-top'),
      p = e.isHorizontal()
        ? c.querySelector('.swiper-slide-shadow-right')
        : c.querySelector('.swiper-slide-shadow-bottom');
    (u || (u = Ts('flip', c, e.isHorizontal() ? 'left' : 'top')),
      p || (p = Ts('flip', c, e.isHorizontal() ? 'right' : 'bottom')),
      u && (u.style.opacity = Math.max(-l, 0)),
      p && (p.style.opacity = Math.max(l, 0)));
  };
  Is({
    effect: 'flip',
    swiper: e,
    on: r,
    setTranslate: () => {
      const { slides: c, rtlTranslate: l } = e,
        u = e.params.flipEffect,
        p = Sa(e);
      for (let m = 0; m < c.length; m += 1) {
        const h = c[m];
        let f = h.progress;
        e.params.flipEffect.limitRotation &&
          (f = Math.max(Math.min(h.progress, 1), -1));
        const d = h.swiperSlideOffset;
        let w = -180 * f,
          _ = 0,
          v = e.params.cssMode ? -d - e.translate : -d,
          y = 0;
        (e.isHorizontal()
          ? l && (w = -w)
          : ((y = v), (v = 0), (_ = -w), (w = 0)),
          (h.style.zIndex = -Math.abs(Math.round(f)) + c.length),
          u.slideShadows && i(h, f));
        const b = `translate3d(${v}px, ${y}px, 0px) rotateX(${p(_)}deg) rotateY(${p(w)}deg)`,
          P = Cn(u, h);
        P.style.transform = b;
      }
    },
    setTransition: (c) => {
      const l = e.slides.map((u) => Ji(u));
      (l.forEach((u) => {
        ((u.style.transitionDuration = `${c}ms`),
          u
            .querySelectorAll(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
            )
            .forEach((p) => {
              p.style.transitionDuration = `${c}ms`;
            }));
      }),
        Ea({ swiper: e, duration: c, transformElements: l }));
    },
    recreateShadows: () => {
      (e.params.flipEffect,
        e.slides.forEach((c) => {
          let l = c.progress;
          (e.params.flipEffect.limitRotation &&
            (l = Math.max(Math.min(c.progress, 1), -1)),
            i(c, l));
        }));
    },
    getEffectParams: () => e.params.flipEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Ap(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  (t({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
    },
  }),
    Is({
      effect: 'coverflow',
      swiper: e,
      on: r,
      setTranslate: () => {
        const { width: a, height: o, slides: c, slidesSizesGrid: l } = e,
          u = e.params.coverflowEffect,
          p = e.isHorizontal(),
          m = e.translate,
          h = p ? -m + a / 2 : -m + o / 2,
          f = p ? u.rotate : -u.rotate,
          d = u.depth,
          g = Sa(e);
        for (let w = 0, _ = c.length; w < _; w += 1) {
          const v = c[w],
            y = l[w],
            b = v.swiperSlideOffset,
            P = (h - b - y / 2) / y,
            T =
              typeof u.modifier == 'function' ? u.modifier(P) : P * u.modifier;
          let O = p ? f * T : 0,
            S = p ? 0 : f * T,
            E = -d * Math.abs(T),
            I = u.stretch;
          typeof I == 'string' &&
            I.indexOf('%') !== -1 &&
            (I = (parseFloat(u.stretch) / 100) * y);
          let A = p ? 0 : I * T,
            k = p ? I * T : 0,
            x = 1 - (1 - u.scale) * Math.abs(T);
          (Math.abs(k) < 0.001 && (k = 0),
            Math.abs(A) < 0.001 && (A = 0),
            Math.abs(E) < 0.001 && (E = 0),
            Math.abs(O) < 0.001 && (O = 0),
            Math.abs(S) < 0.001 && (S = 0),
            Math.abs(x) < 0.001 && (x = 0));
          const L = `translate3d(${k}px,${A}px,${E}px)  rotateX(${g(S)}deg) rotateY(${g(O)}deg) scale(${x})`,
            $ = Cn(u, v);
          if (
            (($.style.transform = L),
            (v.style.zIndex = -Math.abs(Math.round(T)) + 1),
            u.slideShadows)
          ) {
            let M = p
                ? v.querySelector('.swiper-slide-shadow-left')
                : v.querySelector('.swiper-slide-shadow-top'),
              D = p
                ? v.querySelector('.swiper-slide-shadow-right')
                : v.querySelector('.swiper-slide-shadow-bottom');
            (M || (M = Ts('coverflow', v, p ? 'left' : 'top')),
              D || (D = Ts('coverflow', v, p ? 'right' : 'bottom')),
              M && (M.style.opacity = T > 0 ? T : 0),
              D && (D.style.opacity = -T > 0 ? -T : 0));
          }
        }
      },
      setTransition: (a) => {
        e.slides
          .map((c) => Ji(c))
          .forEach((c) => {
            ((c.style.transitionDuration = `${a}ms`),
              c
                .querySelectorAll(
                  '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
                )
                .forEach((l) => {
                  l.style.transitionDuration = `${a}ms`;
                }));
          });
      },
      perspective: () => !0,
      overwriteParams: () => ({ watchSlidesProgress: !0 }),
    }));
}
function Op(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  t({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    },
  });
  const i = (o) => (typeof o == 'string' ? o : `${o}px`);
  Is({
    effect: 'creative',
    swiper: e,
    on: r,
    setTranslate: () => {
      const { slides: o, wrapperEl: c, slidesSizesGrid: l } = e,
        u = e.params.creativeEffect,
        { progressMultiplier: p } = u,
        m = e.params.centeredSlides,
        h = Sa(e);
      if (m) {
        const f = l[0] / 2 - e.params.slidesOffsetBefore || 0;
        c.style.transform = `translateX(calc(50% - ${f}px))`;
      }
      for (let f = 0; f < o.length; f += 1) {
        const d = o[f],
          g = d.progress,
          w = Math.min(Math.max(d.progress, -u.limitProgress), u.limitProgress);
        let _ = w;
        m ||
          (_ = Math.min(
            Math.max(d.originalProgress, -u.limitProgress),
            u.limitProgress
          ));
        const v = d.swiperSlideOffset,
          y = [e.params.cssMode ? -v - e.translate : -v, 0, 0],
          b = [0, 0, 0];
        let P = !1;
        e.isHorizontal() || ((y[1] = y[0]), (y[0] = 0));
        let T = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };
        (w < 0 ? ((T = u.next), (P = !0)) : w > 0 && ((T = u.prev), (P = !0)),
          y.forEach((x, L) => {
            y[L] = `calc(${x}px + (${i(T.translate[L])} * ${Math.abs(w * p)}))`;
          }),
          b.forEach((x, L) => {
            let $ = T.rotate[L] * Math.abs(w * p);
            b[L] = $;
          }),
          (d.style.zIndex = -Math.abs(Math.round(g)) + o.length));
        const O = y.join(', '),
          S = `rotateX(${h(b[0])}deg) rotateY(${h(b[1])}deg) rotateZ(${h(b[2])}deg)`,
          E =
            _ < 0
              ? `scale(${1 + (1 - T.scale) * _ * p})`
              : `scale(${1 - (1 - T.scale) * _ * p})`,
          I = _ < 0 ? 1 + (1 - T.opacity) * _ * p : 1 - (1 - T.opacity) * _ * p,
          A = `translate3d(${O}) ${S} ${E}`;
        if ((P && T.shadow) || !P) {
          let x = d.querySelector('.swiper-slide-shadow');
          if ((!x && T.shadow && (x = Ts('creative', d)), x)) {
            const L = u.shadowPerProgress ? w * (1 / u.limitProgress) : w;
            x.style.opacity = Math.min(Math.max(Math.abs(L), 0), 1);
          }
        }
        const k = Cn(u, d);
        ((k.style.transform = A),
          (k.style.opacity = I),
          T.origin && (k.style.transformOrigin = T.origin));
      }
    },
    setTransition: (o) => {
      const c = e.slides.map((l) => Ji(l));
      (c.forEach((l) => {
        ((l.style.transitionDuration = `${o}ms`),
          l.querySelectorAll('.swiper-slide-shadow').forEach((u) => {
            u.style.transitionDuration = `${o}ms`;
          }));
      }),
        Ea({ swiper: e, duration: o, transformElements: c, allSlides: !0 }));
    },
    perspective: () => e.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Lp(s) {
  let { swiper: e, extendParams: t, on: r } = s;
  (t({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8,
    },
  }),
    Is({
      effect: 'cards',
      swiper: e,
      on: r,
      setTranslate: () => {
        const { slides: a, activeIndex: o, rtlTranslate: c } = e,
          l = e.params.cardsEffect,
          { startTranslate: u, isTouched: p } = e.touchEventsData,
          m = c ? -e.translate : e.translate;
        for (let h = 0; h < a.length; h += 1) {
          const f = a[h],
            d = f.progress,
            g = Math.min(Math.max(d, -4), 4);
          let w = f.swiperSlideOffset;
          (e.params.centeredSlides &&
            !e.params.cssMode &&
            (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
            e.params.centeredSlides &&
              e.params.cssMode &&
              (w -= a[0].swiperSlideOffset));
          let _ = e.params.cssMode ? -w - e.translate : -w,
            v = 0;
          const y = -100 * Math.abs(g);
          let b = 1,
            P = -l.perSlideRotate * g,
            T = l.perSlideOffset - Math.abs(g) * 0.75;
          const O =
              e.virtual && e.params.virtual.enabled ? e.virtual.from + h : h,
            S =
              (O === o || O === o - 1) &&
              g > 0 &&
              g < 1 &&
              (p || e.params.cssMode) &&
              m < u,
            E =
              (O === o || O === o + 1) &&
              g < 0 &&
              g > -1 &&
              (p || e.params.cssMode) &&
              m > u;
          if (S || E) {
            const x = (1 - Math.abs((Math.abs(g) - 0.5) / 0.5)) ** 0.5;
            ((P += -28 * g * x),
              (b += -0.5 * x),
              (T += 96 * x),
              (v = `${-25 * x * Math.abs(g)}%`));
          }
          if (
            (g < 0
              ? (_ = `calc(${_}px ${c ? '-' : '+'} (${T * Math.abs(g)}%))`)
              : g > 0
                ? (_ = `calc(${_}px ${c ? '-' : '+'} (-${T * Math.abs(g)}%))`)
                : (_ = `${_}px`),
            !e.isHorizontal())
          ) {
            const x = v;
            ((v = _), (_ = x));
          }
          const I = g < 0 ? `${1 + (1 - b) * g}` : `${1 - (1 - b) * g}`,
            A = `
        translate3d(${_}, ${v}, ${y}px)
        rotateZ(${l.rotate ? (c ? -P : P) : 0}deg)
        scale(${I})
      `;
          if (l.slideShadows) {
            let x = f.querySelector('.swiper-slide-shadow');
            (x || (x = Ts('cards', f)),
              x &&
                (x.style.opacity = Math.min(
                  Math.max((Math.abs(g) - 0.5) / 0.5, 0),
                  1
                )));
          }
          f.style.zIndex = -Math.abs(Math.round(d)) + a.length;
          const k = Cn(l, f);
          k.style.transform = A;
        }
      },
      setTransition: (a) => {
        const o = e.slides.map((c) => Ji(c));
        (o.forEach((c) => {
          ((c.style.transitionDuration = `${a}ms`),
            c.querySelectorAll('.swiper-slide-shadow').forEach((l) => {
              l.style.transitionDuration = `${a}ms`;
            }));
        }),
          Ea({ swiper: e, duration: a, transformElements: o }));
      },
      perspective: () => !0,
      overwriteParams: () => ({
        _loopSwapReset: !1,
        watchSlidesProgress: !0,
        loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
        centeredSlides: !0,
        virtualTranslate: !e.params.cssMode,
      }),
    }));
}
const Dp = [
  sp,
  np,
  ap,
  op,
  lp,
  cp,
  up,
  dp,
  fp,
  pp,
  hp,
  mp,
  gp,
  vp,
  _p,
  wp,
  Ep,
  Cp,
  Mp,
  Pp,
  Ap,
  Op,
  Lp,
];
nr.use(Dp);
function kp(s) {
  new nr(s, {
    effect: 'slide',
    lazy: !0,
    spaceBetween: 20,
    navigation: { nextEl: '.btn-next', prevEl: '.btn-prev' },
    slidesPerView: 5,
    speed: 800,
    pagination: { el: '.swiper-pagination', dynamicBullets: !0 },
    grabCursor: !0,
    centeredSlides: !1,
    breakpoints: {
      0: { slidesPerView: 2, spaceBetween: 10 },
      490: { slidesPerView: 3, spaceBetween: 15 },
      690: { slidesPerView: 4, spaceBetween: 15 },
      960: { slidesPerView: 5 },
    },
  });
}
function Ip() {
  const s = () => {
    const e = document.querySelector('.page__header'),
      r = document
        .querySelector('.page__main-content')
        .getBoundingClientRect().top;
    e &&
      (r < -50
        ? e.classList.add('with-shadow')
        : r <= 0 && e.classList.remove('with-shadow'));
  };
  return (
    window.addEventListener('scroll', s),
    () => {
      window.removeEventListener('scroll', s);
    }
  );
}
function Rp() {
  const s = document.querySelectorAll('.animate-items');
  if (s.length === 0) return;
  function e(n) {
    const a = n.getBoundingClientRect(),
      o = window.pageYOffset || document.documentElement.scrollTop,
      c = window.pageXOffset || document.documentElement.scrollLeft;
    return { top: a.top + o, left: a.left + c };
  }
  function t() {
    for (let n = 0; n < s.length; n++) {
      const a = s[n],
        o = a.offsetHeight,
        c = e(a).top,
        l = 5;
      let u = window.innerHeight - o / l;
      o > window.innerHeight &&
        (u = window.innerHeight - window.innerHeight / l);
      const p = window.pageYOffset;
      p > c - u && p < c + o
        ? a.classList.add('active')
        : a.classList.contains('animate-not-hide') ||
          a.classList.remove('active');
    }
  }
  let r = !1;
  function i() {
    r ||
      (requestAnimationFrame(() => {
        (t(), (r = !1));
      }),
      (r = !0));
  }
  return (
    window.addEventListener('scroll', i),
    t(),
    function () {
      window.removeEventListener('scroll', i);
    }
  );
}
var zp =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {};
function $p(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, 'default')
    ? s.default
    : s;
}
var Fa = { exports: {} },
  Ll;
function Np() {
  return (
    Ll ||
      ((Ll = 1),
      (function (s) {
        (function (e, t) {
          s.exports ? (s.exports = t()) : (e.Rellax = t());
        })(typeof window < 'u' ? window : zp, function () {
          var e = function (t, r) {
            var i = Object.create(e.prototype),
              n = 0,
              a = 0,
              o = 0,
              c = 0,
              l = [],
              u = !0,
              p =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (x) {
                  return setTimeout(x, 1e3 / 60);
                },
              m = null,
              h = !1;
            try {
              var f = Object.defineProperty({}, 'passive', {
                get: function () {
                  h = !0;
                },
              });
              (window.addEventListener('testPassive', null, f),
                window.removeEventListener('testPassive', null, f));
            } catch {}
            var d =
                window.cancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                clearTimeout,
              g =
                window.transformProp ||
                (function () {
                  var x = document.createElement('div');
                  if (x.style.transform === null) {
                    var L = ['Webkit', 'Moz', 'ms'];
                    for (var $ in L)
                      if (x.style[L[$] + 'Transform'] !== void 0)
                        return L[$] + 'Transform';
                  }
                  return 'transform';
                })();
            ((i.options = {
              speed: -2,
              verticalSpeed: null,
              horizontalSpeed: null,
              breakpoints: [576, 768, 1201],
              center: !1,
              wrapper: null,
              relativeToWrapper: !1,
              round: !0,
              vertical: !0,
              horizontal: !1,
              verticalScrollAxis: 'y',
              horizontalScrollAxis: 'x',
              callback: function () {},
            }),
              r &&
                Object.keys(r).forEach(function (x) {
                  i.options[x] = r[x];
                }));
            function w() {
              if (
                i.options.breakpoints.length === 3 &&
                Array.isArray(i.options.breakpoints)
              ) {
                var x = !0,
                  L = !0,
                  $;
                if (
                  (i.options.breakpoints.forEach(function (M) {
                    (typeof M != 'number' && (L = !1),
                      $ !== null && M < $ && (x = !1),
                      ($ = M));
                  }),
                  x && L)
                )
                  return;
              }
              ((i.options.breakpoints = [576, 768, 1201]),
                console.warn(
                  'Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted'
                ));
            }
            (r && r.breakpoints && w(), t || (t = '.rellax'));
            var _ = typeof t == 'string' ? document.querySelectorAll(t) : [t];
            if (_.length > 0) i.elems = _;
            else {
              console.warn(
                "Rellax: The elements you're trying to select don't exist."
              );
              return;
            }
            if (i.options.wrapper && !i.options.wrapper.nodeType) {
              var v = document.querySelector(i.options.wrapper);
              if (v) i.options.wrapper = v;
              else {
                console.warn(
                  "Rellax: The wrapper you're trying to use doesn't exist."
                );
                return;
              }
            }
            var y,
              b = function (x) {
                var L = i.options.breakpoints;
                return x < L[0]
                  ? 'xs'
                  : x >= L[0] && x < L[1]
                    ? 'sm'
                    : x >= L[1] && x < L[2]
                      ? 'md'
                      : 'lg';
              },
              P = function () {
                for (var x = 0; x < i.elems.length; x++) {
                  var L = O(i.elems[x]);
                  l.push(L);
                }
              },
              T = function () {
                for (var x = 0; x < l.length; x++)
                  i.elems[x].style.cssText = l[x].style;
                ((l = []),
                  (a = window.innerHeight),
                  (c = window.innerWidth),
                  (y = b(c)),
                  S(),
                  P(),
                  k(),
                  u && (window.addEventListener('resize', T), (u = !1), A()));
              },
              O = function (x) {
                var L = x.getAttribute('data-rellax-percentage'),
                  $ = x.getAttribute('data-rellax-speed'),
                  M = x.getAttribute('data-rellax-xs-speed'),
                  D = x.getAttribute('data-rellax-mobile-speed'),
                  z = x.getAttribute('data-rellax-tablet-speed'),
                  C = x.getAttribute('data-rellax-desktop-speed'),
                  W = x.getAttribute('data-rellax-vertical-speed'),
                  ae = x.getAttribute('data-rellax-horizontal-speed'),
                  le = x.getAttribute('data-rellax-vertical-scroll-axis'),
                  U = x.getAttribute('data-rellax-horizontal-scroll-axis'),
                  B = x.getAttribute('data-rellax-zindex') || 0,
                  F = x.getAttribute('data-rellax-min'),
                  Y = x.getAttribute('data-rellax-max'),
                  Q = x.getAttribute('data-rellax-min-x'),
                  se = x.getAttribute('data-rellax-max-x'),
                  ke = x.getAttribute('data-rellax-min-y'),
                  be = x.getAttribute('data-rellax-max-y'),
                  fe,
                  j = !0;
                !M && !D && !z && !C
                  ? (j = !1)
                  : (fe = { xs: M, sm: D, md: z, lg: C });
                var ee = i.options.wrapper
                  ? i.options.wrapper.scrollTop
                  : window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (i.options.relativeToWrapper) {
                  var ce =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                  ee = ce - i.options.wrapper.offsetTop;
                }
                var ge = i.options.vertical && (L || i.options.center) ? ee : 0,
                  N =
                    i.options.horizontal && (L || i.options.center)
                      ? i.options.wrapper
                        ? i.options.wrapper.scrollLeft
                        : window.pageXOffset ||
                          document.documentElement.scrollLeft ||
                          document.body.scrollLeft
                      : 0,
                  Pe = ge + x.getBoundingClientRect().top,
                  X = x.clientHeight || x.offsetHeight || x.scrollHeight,
                  R = N + x.getBoundingClientRect().left,
                  V = x.clientWidth || x.offsetWidth || x.scrollWidth,
                  H = L || (ge - Pe + a) / (X + a),
                  K = L || (N - R + c) / (V + c);
                i.options.center && ((K = 0.5), (H = 0.5));
                var J =
                    j && fe[y] !== null ? Number(fe[y]) : $ || i.options.speed,
                  re = W || i.options.verticalSpeed,
                  Ae = ae || i.options.horizontalSpeed,
                  te = le || i.options.verticalScrollAxis,
                  _e = U || i.options.horizontalScrollAxis,
                  ve = E(K, H, J, re, Ae),
                  de = x.style.cssText,
                  Ye = '',
                  G = /transform\s*:/i.exec(de);
                if (G) {
                  var Ut = G.index,
                    nt = de.slice(Ut),
                    at = nt.indexOf(';');
                  at
                    ? (Ye = ' ' + nt.slice(11, at).replace(/\s/g, ''))
                    : (Ye = ' ' + nt.slice(11).replace(/\s/g, ''));
                }
                return {
                  baseX: ve.x,
                  baseY: ve.y,
                  top: Pe,
                  left: R,
                  height: X,
                  width: V,
                  speed: J,
                  verticalSpeed: re,
                  horizontalSpeed: Ae,
                  verticalScrollAxis: te,
                  horizontalScrollAxis: _e,
                  style: de,
                  transform: Ye,
                  zindex: B,
                  min: F,
                  max: Y,
                  minX: Q,
                  maxX: se,
                  minY: ke,
                  maxY: be,
                };
              },
              S = function () {
                var x = n,
                  L = o;
                if (
                  ((n = i.options.wrapper
                    ? i.options.wrapper.scrollTop
                    : (
                        document.documentElement ||
                        document.body.parentNode ||
                        document.body
                      ).scrollTop || window.pageYOffset),
                  (o = i.options.wrapper
                    ? i.options.wrapper.scrollLeft
                    : (
                        document.documentElement ||
                        document.body.parentNode ||
                        document.body
                      ).scrollLeft || window.pageXOffset),
                  i.options.relativeToWrapper)
                ) {
                  var $ =
                    (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                    ).scrollTop || window.pageYOffset;
                  n = $ - i.options.wrapper.offsetTop;
                }
                return !!(
                  (x != n && i.options.vertical) ||
                  (L != o && i.options.horizontal)
                );
              },
              E = function (x, L, $, M, D) {
                var z = {},
                  C = (D || $) * (100 * (1 - x)),
                  W = (M || $) * (100 * (1 - L));
                return (
                  (z.x = i.options.round
                    ? Math.round(C)
                    : Math.round(C * 100) / 100),
                  (z.y = i.options.round
                    ? Math.round(W)
                    : Math.round(W * 100) / 100),
                  z
                );
              },
              I = function () {
                (window.removeEventListener('resize', I),
                  window.removeEventListener('orientationchange', I),
                  (i.options.wrapper
                    ? i.options.wrapper
                    : window
                  ).removeEventListener('scroll', I),
                  (i.options.wrapper
                    ? i.options.wrapper
                    : document
                  ).removeEventListener('touchmove', I),
                  (m = p(A)));
              },
              A = function () {
                S() && u === !1
                  ? (k(), (m = p(A)))
                  : ((m = null),
                    window.addEventListener('resize', I),
                    window.addEventListener('orientationchange', I),
                    (i.options.wrapper
                      ? i.options.wrapper
                      : window
                    ).addEventListener('scroll', I, h ? { passive: !0 } : !1),
                    (i.options.wrapper
                      ? i.options.wrapper
                      : document
                    ).addEventListener(
                      'touchmove',
                      I,
                      h ? { passive: !0 } : !1
                    ));
              },
              k = function () {
                for (var x, L = 0; L < i.elems.length; L++) {
                  var $ = l[L].verticalScrollAxis.toLowerCase(),
                    M = l[L].horizontalScrollAxis.toLowerCase(),
                    D = $.indexOf('x') != -1 ? n : 0,
                    z = $.indexOf('y') != -1 ? n : 0,
                    C = M.indexOf('x') != -1 ? o : 0,
                    W = M.indexOf('y') != -1 ? o : 0,
                    ae = (z + W - l[L].top + a) / (l[L].height + a),
                    le = (D + C - l[L].left + c) / (l[L].width + c);
                  x = E(
                    le,
                    ae,
                    l[L].speed,
                    l[L].verticalSpeed,
                    l[L].horizontalSpeed
                  );
                  var U = x.y - l[L].baseY,
                    B = x.x - l[L].baseX;
                  (l[L].min !== null &&
                    (i.options.vertical &&
                      !i.options.horizontal &&
                      (U = U <= l[L].min ? l[L].min : U),
                    i.options.horizontal &&
                      !i.options.vertical &&
                      (B = B <= l[L].min ? l[L].min : B)),
                    l[L].minY != null && (U = U <= l[L].minY ? l[L].minY : U),
                    l[L].minX != null && (B = B <= l[L].minX ? l[L].minX : B),
                    l[L].max !== null &&
                      (i.options.vertical &&
                        !i.options.horizontal &&
                        (U = U >= l[L].max ? l[L].max : U),
                      i.options.horizontal &&
                        !i.options.vertical &&
                        (B = B >= l[L].max ? l[L].max : B)),
                    l[L].maxY != null && (U = U >= l[L].maxY ? l[L].maxY : U),
                    l[L].maxX != null && (B = B >= l[L].maxX ? l[L].maxX : B));
                  var F = l[L].zindex,
                    Y =
                      'translate3d(' +
                      (i.options.horizontal ? B : '0') +
                      'px,' +
                      (i.options.vertical ? U : '0') +
                      'px,' +
                      F +
                      'px) ' +
                      l[L].transform;
                  i.elems[L].style[g] = Y;
                }
                i.options.callback(x);
              };
            return (
              (i.destroy = function () {
                for (var x = 0; x < i.elems.length; x++)
                  i.elems[x].style.cssText = l[x].style;
                (u || (window.removeEventListener('resize', T), (u = !0)),
                  d(m),
                  (m = null));
              }),
              T(),
              (i.refresh = T),
              i
            );
          };
          return e;
        });
      })(Fa)),
    Fa.exports
  );
}
var Bp = Np();
const Fp = $p(Bp);
const Ci = typeof window < 'u',
  Ya = Ci ? window : null,
  mn = Ci ? document : null,
  et = { OBJECT: 0, ATTRIBUTE: 1, CSS: 2, TRANSFORM: 3, CSS_VAR: 4 },
  De = { NUMBER: 0, UNIT: 1, COLOR: 2, COMPLEX: 3 },
  ur = { NONE: 0, AUTO: 1, FORCE: 2 },
  Gt = { replace: 0, none: 1, blend: 2 },
  Dl = Symbol(),
  Ho = Symbol(),
  Fc = Symbol(),
  Ca = Symbol(),
  Yp = Symbol(),
  Re = 1e-11,
  fo = 1e12,
  xs = 1e3,
  po = 120,
  Vi = '',
  Vp = 'var(',
  Yc = (() => {
    const s = new Map();
    return (
      s.set('x', 'translateX'),
      s.set('y', 'translateY'),
      s.set('z', 'translateZ'),
      s
    );
  })(),
  Vc = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skew',
    'skewX',
    'skewY',
    'matrix',
    'matrix3d',
    'perspective',
  ],
  Xc = Vc.reduce((s, e) => ({ ...s, [e]: e + '(' }), {}),
  br = () => {},
  Xp = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,
  Hp = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
  Gp = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  qp =
    /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,
  Wp =
    /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  kl = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,
  Up = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,
  jp = /([a-z])([A-Z])/g,
  Kp = /(\w+)(\([^)]+\)+)/g,
  Zp = /(\*=|\+=|-=)/,
  Qp = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;
const Hc = {
    id: null,
    keyframes: null,
    playbackEase: null,
    playbackRate: 1,
    frameRate: po,
    loop: 0,
    reversed: !1,
    alternate: !1,
    autoplay: !0,
    persist: !1,
    duration: xs,
    delay: 0,
    loopDelay: 0,
    ease: 'out(2)',
    composition: Gt.replace,
    modifier: (s) => s,
    onBegin: br,
    onBeforeUpdate: br,
    onUpdate: br,
    onLoop: br,
    onPause: br,
    onComplete: br,
    onRender: br,
  },
  Jp = { root: mn },
  yt = { defaults: Hc, precision: 4, timeScale: 1, tickThreshold: 200 },
  Gc = { version: '4.2.2', engine: null };
Ci && (Ya.AnimeJS || (Ya.AnimeJS = []), Ya.AnimeJS.push(Gc));
const qc = (s) => s.replace(jp, '$1-$2').toLowerCase(),
  Qr = (s, e) => s.indexOf(e) === 0,
  Ss = Date.now,
  Es = Array.isArray,
  Js = (s) => s && s.constructor === Object,
  Go = (s) => typeof s == 'number' && !isNaN(s),
  gn = (s) => typeof s == 'string',
  Cs = (s) => typeof s == 'function',
  Ie = (s) => typeof s > 'u',
  fs = (s) => Ie(s) || s === null,
  Wc = (s) => Ci && s instanceof SVGElement,
  Uc = (s) => Xp.test(s),
  jc = (s) => Qr(s, 'rgb'),
  Kc = (s) => Qr(s, 'hsl'),
  eh = (s) => Uc(s) || jc(s) || Kc(s),
  Zn = (s) => !yt.defaults.hasOwnProperty(s),
  th = ['opacity', 'rotate', 'overflow', 'color'],
  rh = (s, e) => {
    if (th.includes(e)) return !1;
    if (s.getAttribute(e) || e in s) {
      if (e === 'scale') {
        const t = s.parentNode;
        return t && t.tagName === 'filter';
      }
      return !0;
    }
  },
  as = Math.pow,
  ih = Math.sqrt,
  sh = Math.sin,
  nh = Math.cos,
  ah = Math.floor,
  oh = Math.asin,
  qo = Math.PI,
  Il = Math.round,
  Kt = (s, e, t) => (s < e ? e : s > t ? t : s),
  Rl = {},
  it = (s, e) => {
    if (e < 0) return s;
    if (!e) return Il(s);
    let t = Rl[e];
    return (t || (t = Rl[e] = 10 ** e), Il(s * t) / t);
  },
  Ai = (s, e, t) => s + (e - s) * t,
  Ma = (s) => (s === 1 / 0 ? fo : s === -1 / 0 ? -fo : s),
  ps = (s) => (s <= Re ? Re : Ma(it(s, 11))),
  Vt = (s) => (Es(s) ? [...s] : s),
  Zc = (s, e) => {
    const t = { ...s };
    for (let r in e) {
      const i = s[r];
      t[r] = Ie(i) ? e[r] : i;
    }
    return t;
  },
  qe = (s, e, t, r = '_prev', i = '_next') => {
    let n = s._head,
      a = i;
    for (t && ((n = s._tail), (a = r)); n; ) {
      const o = n[a];
      (e(n), (n = o));
    }
  },
  $i = (s, e, t = '_prev', r = '_next') => {
    const i = e[t],
      n = e[r];
    (i ? (i[r] = n) : (s._head = n),
      n ? (n[t] = i) : (s._tail = i),
      (e[t] = null),
      (e[r] = null));
  },
  Ni = (s, e, t, r = '_prev', i = '_next') => {
    let n = s._tail;
    for (; n && t && t(n, e); ) n = n[r];
    const a = n ? n[i] : s._head;
    (n ? (n[i] = e) : (s._head = e),
      a ? (a[r] = e) : (s._tail = e),
      (e[r] = n),
      (e[i] = a));
  };
const lh = (s, e, t) => {
  const r = s.style.transform;
  let i;
  if (r) {
    const n = s[Ca];
    let a;
    for (; (a = Kp.exec(r)); ) {
      const o = a[1],
        c = a[2].slice(1, -1);
      ((n[o] = c), o === e && ((i = c), t && (t[e] = c)));
    }
  }
  return r && !Ie(i)
    ? i
    : Qr(e, 'scale')
      ? '1'
      : Qr(e, 'rotate') || Qr(e, 'skew')
        ? '0deg'
        : '0px';
};
const ch = (s) => {
    const e = Hp.exec(s) || Gp.exec(s),
      t = Ie(e[4]) ? 1 : +e[4];
    return [+e[1], +e[2], +e[3], t];
  },
  uh = (s) => {
    const e = s.length,
      t = e === 4 || e === 5;
    return [
      +('0x' + s[1] + s[t ? 1 : 2]),
      +('0x' + s[t ? 2 : 3] + s[t ? 2 : 4]),
      +('0x' + s[t ? 3 : 5] + s[t ? 3 : 6]),
      e === 5 || e === 9
        ? +(+('0x' + s[t ? 4 : 7] + s[t ? 4 : 8]) / 255).toFixed(3)
        : 1,
    ];
  },
  Va = (s, e, t) => (
    t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6
      ? s + (e - s) * 6 * t
      : t < 1 / 2
        ? e
        : t < 2 / 3
          ? s + (e - s) * (2 / 3 - t) * 6
          : s
  ),
  dh = (s) => {
    const e = qp.exec(s) || Wp.exec(s),
      t = +e[1] / 360,
      r = +e[2] / 100,
      i = +e[3] / 100,
      n = Ie(e[4]) ? 1 : +e[4];
    let a, o, c;
    if (r === 0) a = o = c = i;
    else {
      const l = i < 0.5 ? i * (1 + r) : i + r - i * r,
        u = 2 * i - l;
      ((a = it(Va(u, l, t + 1 / 3) * 255, 0)),
        (o = it(Va(u, l, t) * 255, 0)),
        (c = it(Va(u, l, t - 1 / 3) * 255, 0)));
    }
    return [a, o, c, n];
  },
  fh = (s) => (jc(s) ? ch(s) : Uc(s) ? uh(s) : Kc(s) ? dh(s) : [0, 0, 0, 1]);
const It = (s, e) => (Ie(s) ? e : s),
  si = (s, e, t, r, i) => {
    let n;
    if (Cs(s))
      n = () => {
        const a = s(e, t, r);
        return isNaN(+a) ? a || 0 : +a;
      };
    else if (gn(s) && Qr(s, Vp))
      n = () => {
        const a = s.match(Qp),
          o = a[1],
          c = a[2];
        let l = getComputedStyle(e)?.getPropertyValue(o);
        return ((!l || l.trim() === Vi) && c && (l = c.trim()), l || 0);
      };
    else return s;
    return (i && (i.func = n), n());
  },
  Qc = (s, e) =>
    s[Ho]
      ? s[Fc] && rh(s, e)
        ? et.ATTRIBUTE
        : Vc.includes(e) || Yc.get(e)
          ? et.TRANSFORM
          : Qr(e, '--')
            ? et.CSS_VAR
            : e in s.style
              ? et.CSS
              : e in s
                ? et.OBJECT
                : et.ATTRIBUTE
      : et.OBJECT,
  zl = (s, e, t) => {
    const r = s.style[e];
    r && t && (t[e] = r);
    const i = r || getComputedStyle(s[Yp] || s).getPropertyValue(e);
    return i === 'auto' ? '0' : i;
  },
  $s = (s, e, t, r) => {
    const i = Ie(t) ? Qc(s, e) : t;
    return i === et.OBJECT
      ? s[e] || 0
      : i === et.ATTRIBUTE
        ? s.getAttribute(e)
        : i === et.TRANSFORM
          ? lh(s, e, r)
          : i === et.CSS_VAR
            ? zl(s, e, r).trimStart()
            : zl(s, e, r);
  },
  Qn = (s, e, t) => (t === '-' ? s - e : t === '+' ? s + e : s * e),
  Wo = () => ({ t: De.NUMBER, n: 0, u: null, o: null, d: null, s: null }),
  zr = (s, e) => {
    if (
      ((e.t = De.NUMBER),
      (e.n = 0),
      (e.u = null),
      (e.o = null),
      (e.d = null),
      (e.s = null),
      !s)
    )
      return e;
    const t = +s;
    if (isNaN(t)) {
      let r = s;
      r[1] === '=' && ((e.o = r[0]), (r = r.slice(2)));
      const i = r.includes(' ') ? !1 : Up.exec(r);
      if (i) return ((e.t = De.UNIT), (e.n = +i[1]), (e.u = i[2]), e);
      if (e.o) return ((e.n = +r), e);
      if (eh(r)) return ((e.t = De.COLOR), (e.d = fh(r)), e);
      {
        const n = r.match(kl);
        return (
          (e.t = De.COMPLEX),
          (e.d = n ? n.map(Number) : []),
          (e.s = r.split(kl) || []),
          e
        );
      }
    } else return ((e.n = t), e);
  },
  $l = (s, e) => (
    (e.t = s._valueType),
    (e.n = s._toNumber),
    (e.u = s._unit),
    (e.o = null),
    (e.d = Vt(s._toNumbers)),
    (e.s = Vt(s._strings)),
    e
  ),
  ni = Wo();
const Jn = (s, e, t, r, i) => {
    const n = s.parent,
      a = s.duration,
      o = s.completed,
      c = s.iterationDuration,
      l = s.iterationCount,
      u = s._currentIteration,
      p = s._loopDelay,
      m = s._reversed,
      h = s._alternate,
      f = s._hasChildren,
      d = s._delay,
      g = s._currentTime,
      w = d + c,
      _ = e - d,
      v = Kt(g, -d, a),
      y = Kt(_, -d, a),
      b = _ - g,
      P = y > 0,
      T = y >= a,
      O = a <= Re,
      S = i === ur.FORCE;
    let E = 0,
      I = _,
      A = 0;
    if (l > 1) {
      const M = ~~(y / (c + (T ? 0 : p)));
      ((s._currentIteration = Kt(M, 0, l)),
        T && s._currentIteration--,
        (E = s._currentIteration % 2),
        (I = y % (c + p) || 0));
    }
    const k = m ^ (h && E),
      x = s._ease;
    let L = T ? (k ? 0 : a) : k ? c - I : I;
    x && (L = c * x(L / c) || 0);
    const $ = (n ? n.backwards : _ < g) ? !k : !!k;
    if (
      ((s._currentTime = _),
      (s._iterationTime = L),
      (s.backwards = $),
      P && !s.began
        ? ((s.began = !0), !t && !(n && ($ || !n.began)) && s.onBegin(s))
        : _ <= 0 && (s.began = !1),
      !t && !f && P && s._currentIteration !== u && s.onLoop(s),
      S ||
        (i === ur.AUTO &&
          ((e >= d && e <= w) || (e <= d && v > d) || (e >= w && v !== a))) ||
        (L >= w && v !== a) ||
        (L <= d && v > 0) ||
        (e <= v && v === a && o) ||
        (T && !o && O))
    ) {
      if ((P && (s.computeDeltaTime(v), t || s.onBeforeUpdate(s)), !f)) {
        const M = S || ($ ? b * -1 : b) >= yt.tickThreshold,
          D = s._offset + (n ? n._offset : 0) + d + L;
        let z = s._head,
          C,
          W,
          ae,
          le,
          U = 0;
        for (; z; ) {
          const B = z._composition,
            F = z._currentTime,
            Y = z._changeDuration,
            Q = z._absoluteStartTime + z._changeDuration,
            se = z._nextRep,
            ke = z._prevRep,
            be = B !== Gt.none;
          if (
            (M ||
              ((F !== Y || D <= Q + (se ? se._delay : 0)) &&
                (F !== 0 || D >= z._absoluteStartTime))) &&
            (!be ||
              (!z._isOverridden &&
                (!z._isOverlapped || D <= Q) &&
                (!se || se._isOverridden || D <= se._absoluteStartTime) &&
                (!ke ||
                  ke._isOverridden ||
                  D >= ke._absoluteStartTime + ke._changeDuration + z._delay)))
          ) {
            const fe = (z._currentTime = Kt(L - z._startTime, 0, Y)),
              j = z._ease(fe / z._updateDuration),
              ee = z._modifier,
              ce = z._valueType,
              ge = z._tweenType,
              N = ge === et.OBJECT,
              Pe = ce === De.NUMBER,
              X = (Pe && N) || j === 0 || j === 1 ? -1 : yt.precision;
            let R, V;
            if (Pe) R = V = ee(it(Ai(z._fromNumber, z._toNumber, j), X));
            else if (ce === De.UNIT)
              ((V = ee(it(Ai(z._fromNumber, z._toNumber, j), X))),
                (R = `${V}${z._unit}`));
            else if (ce === De.COLOR) {
              const H = z._fromNumbers,
                K = z._toNumbers,
                J = it(Kt(ee(Ai(H[0], K[0], j)), 0, 255), 0),
                re = it(Kt(ee(Ai(H[1], K[1], j)), 0, 255), 0),
                Ae = it(Kt(ee(Ai(H[2], K[2], j)), 0, 255), 0),
                te = Kt(ee(it(Ai(H[3], K[3], j), X)), 0, 1);
              if (((R = `rgba(${J},${re},${Ae},${te})`), be)) {
                const _e = z._numbers;
                ((_e[0] = J), (_e[1] = re), (_e[2] = Ae), (_e[3] = te));
              }
            } else if (ce === De.COMPLEX) {
              R = z._strings[0];
              for (let H = 0, K = z._toNumbers.length; H < K; H++) {
                const J = ee(it(Ai(z._fromNumbers[H], z._toNumbers[H], j), X)),
                  re = z._strings[H + 1];
                ((R += `${re ? J + re : J}`), be && (z._numbers[H] = J));
              }
            }
            if ((be && (z._number = V), !r && B !== Gt.blend)) {
              const H = z.property;
              ((C = z.target),
                N
                  ? (C[H] = R)
                  : ge === et.ATTRIBUTE
                    ? C.setAttribute(H, R)
                    : ((W = C.style),
                      ge === et.TRANSFORM
                        ? (C !== ae && ((ae = C), (le = C[Ca])),
                          (le[H] = R),
                          (U = 1))
                        : ge === et.CSS
                          ? (W[H] = R)
                          : ge === et.CSS_VAR && W.setProperty(H, R)),
                P && (A = 1));
            } else z._value = R;
          }
          if (U && z._renderTransforms) {
            let fe = Vi;
            for (let j in le) fe += `${Xc[j]}${le[j]}) `;
            ((W.transform = fe), (U = 0));
          }
          z = z._next;
        }
        !t && A && s.onRender(s);
      }
      !t && P && s.onUpdate(s);
    }
    return (
      n && O
        ? !t &&
          ((n.began && !$ && _ > 0 && !o) || ($ && _ <= Re && o)) &&
          (s.onComplete(s), (s.completed = !$))
        : P && T
          ? l === 1 / 0
            ? (s._startTime += s.duration)
            : s._currentIteration >= l - 1 &&
              ((s.paused = !0),
              !o &&
                !f &&
                ((s.completed = !0),
                !t &&
                  !(n && ($ || !n.began)) &&
                  (s.onComplete(s), s._resolve(s))))
          : (s.completed = !1),
      A
    );
  },
  zi = (s, e, t, r, i) => {
    const n = s._currentIteration;
    if ((Jn(s, e, t, r, i), s._hasChildren)) {
      const a = s,
        o = a.backwards,
        c = r ? e : a._iterationTime,
        l = Ss();
      let u = 0,
        p = !0;
      if (!r && a._currentIteration !== n) {
        const m = a.iterationDuration;
        (qe(a, (h) => {
          if (!o)
            (!h.completed &&
              !h.backwards &&
              h._currentTime < h.iterationDuration &&
              Jn(h, m, t, 1, ur.FORCE),
              (h.began = !1),
              (h.completed = !1));
          else {
            const f = h.duration,
              d = h._offset + h._delay,
              g = d + f;
            !t && f <= Re && (!d || g === m) && h.onComplete(h);
          }
        }),
          t || a.onLoop(a));
      }
      (qe(
        a,
        (m) => {
          const h = it((c - m._offset) * m._speed, 12),
            f = m._fps < a._fps ? m.requestTick(l) : i;
          ((u += Jn(m, h, t, r, f)), !m.completed && p && (p = !1));
        },
        o
      ),
        !t && u && a.onRender(a),
        (p || o) &&
          a._currentTime >= a.duration &&
          ((a.paused = !0),
          a.completed ||
            ((a.completed = !0), t || (a.onComplete(a), a._resolve(a)))));
    }
  };
const Nl = {},
  Jc = (s, e, t) => {
    if (t === et.TRANSFORM) {
      const r = Yc.get(s);
      return r || s;
    } else if (t === et.CSS || (t === et.ATTRIBUTE && Wc(e) && s in e.style)) {
      const r = Nl[s];
      if (r) return r;
      {
        const i = s && qc(s);
        return ((Nl[s] = i), i);
      }
    } else return s;
  },
  Uo = (s) => {
    if (s._hasChildren) qe(s, Uo, !0);
    else {
      const e = s;
      (e.pause(),
        qe(e, (t) => {
          const r = t.property,
            i = t.target;
          if (i[Ho]) {
            const n = i.style,
              a = t._inlineValue,
              o = fs(a) || a === Vi;
            if (t._tweenType === et.TRANSFORM) {
              const c = i[Ca];
              if ((o ? delete c[r] : (c[r] = a), t._renderTransforms))
                if (!Object.keys(c).length) n.removeProperty('transform');
                else {
                  let l = Vi;
                  for (let u in c) l += Xc[u] + c[u] + ') ';
                  n.transform = l;
                }
            } else o ? n.removeProperty(qc(r)) : (n[r] = a);
            e._tail === t &&
              e.targets.forEach((c) => {
                c.getAttribute &&
                  c.getAttribute('style') === Vi &&
                  c.removeAttribute('style');
              });
          }
        }));
    }
    return s;
  };
class eu {
  constructor(e = 0) {
    ((this.deltaTime = 0),
      (this._currentTime = e),
      (this._elapsedTime = e),
      (this._startTime = e),
      (this._lastTime = e),
      (this._scheduledTime = 0),
      (this._frameDuration = it(xs / po, 0)),
      (this._fps = po),
      (this._speed = 1),
      (this._hasChildren = !1),
      (this._head = null),
      (this._tail = null));
  }
  get fps() {
    return this._fps;
  }
  set fps(e) {
    const t = this._frameDuration,
      r = +e,
      i = r < Re ? Re : r,
      n = it(xs / i, 0);
    ((this._fps = i),
      (this._frameDuration = n),
      (this._scheduledTime += n - t));
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    const t = +e;
    this._speed = t < Re ? Re : t;
  }
  requestTick(e) {
    const t = this._scheduledTime,
      r = this._elapsedTime;
    if (((this._elapsedTime += e - r), r < t)) return ur.NONE;
    const i = this._frameDuration,
      n = r - t;
    return ((this._scheduledTime += n < i ? i : n), ur.AUTO);
  }
  computeDeltaTime(e) {
    const t = e - this._lastTime;
    return ((this.deltaTime = t), (this._lastTime = e), t);
  }
}
const hs = { animation: null, update: br },
  ph = (s) => {
    let e = hs.animation;
    return (
      e ||
        ((e = {
          duration: Re,
          computeDeltaTime: br,
          _offset: 0,
          _delay: 0,
          _head: null,
          _tail: null,
        }),
        (hs.animation = e),
        (hs.update = () => {
          (s.forEach((t) => {
            for (let r in t) {
              const i = t[r],
                n = i._head;
              if (n) {
                const a = n._valueType,
                  o =
                    a === De.COMPLEX || a === De.COLOR
                      ? Vt(n._fromNumbers)
                      : null;
                let c = n._fromNumber,
                  l = i._tail;
                for (; l && l !== n; ) {
                  if (o)
                    for (let u = 0, p = l._numbers.length; u < p; u++)
                      o[u] += l._numbers[u];
                  else c += l._number;
                  l = l._prevAdd;
                }
                ((n._toNumber = c), (n._toNumbers = o));
              }
            }
          }),
            Jn(e, 1, 1, 0, ur.FORCE));
        })),
      e
    );
  };
const tu = Ci ? requestAnimationFrame : setImmediate,
  hh = Ci ? cancelAnimationFrame : clearImmediate;
class mh extends eu {
  constructor(e) {
    (super(e),
      (this.useDefaultMainLoop = !0),
      (this.pauseOnDocumentHidden = !0),
      (this.defaults = Hc),
      (this.paused = !0),
      (this.reqId = 0));
  }
  update() {
    const e = (this._currentTime = Ss());
    if (this.requestTick(e)) {
      this.computeDeltaTime(e);
      const t = this._speed,
        r = this._fps;
      let i = this._head;
      for (; i; ) {
        const n = i._next;
        (i.paused
          ? ($i(this, i),
            (this._hasChildren = !!this._tail),
            (i._running = !1),
            i.completed && !i._cancelled && i.cancel())
          : zi(
              i,
              (e - i._startTime) * i._speed * t,
              0,
              0,
              i._fps < r ? i.requestTick(e) : ur.AUTO
            ),
          (i = n));
      }
      hs.update();
    }
  }
  wake() {
    return (
      this.useDefaultMainLoop &&
        !this.reqId &&
        (this.requestTick(Ss()), (this.reqId = tu(ru))),
      this
    );
  }
  pause() {
    if (this.reqId) return ((this.paused = !0), gh());
  }
  resume() {
    if (this.paused)
      return ((this.paused = !1), qe(this, (e) => e.resetTime()), this.wake());
  }
  get speed() {
    return this._speed * (yt.timeScale === 1 ? 1 : xs);
  }
  set speed(e) {
    ((this._speed = e * yt.timeScale), qe(this, (t) => (t.speed = t._speed)));
  }
  get timeUnit() {
    return yt.timeScale === 1 ? 'ms' : 's';
  }
  set timeUnit(e) {
    const r = e === 's',
      i = r ? 0.001 : 1;
    if (yt.timeScale !== i) {
      ((yt.timeScale = i), (yt.tickThreshold = 200 * i));
      const n = r ? 0.001 : xs;
      ((this.defaults.duration *= n), (this._speed *= n));
    }
  }
  get precision() {
    return yt.precision;
  }
  set precision(e) {
    yt.precision = e;
  }
}
const Et = (() => {
    const s = new mh(Ss());
    return (
      Ci &&
        ((Gc.engine = s),
        mn.addEventListener('visibilitychange', () => {
          s.pauseOnDocumentHidden && (mn.hidden ? s.pause() : s.resume());
        })),
      s
    );
  })(),
  ru = () => {
    Et._head ? ((Et.reqId = tu(ru)), Et.update()) : (Et.reqId = 0);
  },
  gh = () => (hh(Et.reqId), (Et.reqId = 0), Et);
const fa = { _rep: new WeakMap(), _add: new Map() },
  jo = (s, e, t = '_rep') => {
    const r = fa[t];
    let i = r.get(s);
    return (
      i || ((i = {}), r.set(s, i)),
      i[e] ? i[e] : (i[e] = { _head: null, _tail: null })
    );
  },
  vh = (s, e) => s._isOverridden || s._absoluteStartTime > e._absoluteStartTime,
  ea = (s) => {
    ((s._isOverlapped = 1),
      (s._isOverridden = 1),
      (s._changeDuration = Re),
      (s._currentTime = Re));
  },
  iu = (s, e) => {
    const t = s._composition;
    if (t === Gt.replace) {
      const r = s._absoluteStartTime;
      Ni(e, s, vh, '_prevRep', '_nextRep');
      const i = s._prevRep;
      if (i) {
        const n = i.parent,
          a = i._absoluteStartTime + i._changeDuration;
        if (
          s.parent.id !== n.id &&
          n.iterationCount > 1 &&
          a + (n.duration - n.iterationDuration) > r
        ) {
          ea(i);
          let l = i._prevRep;
          for (; l && l.parent.id === n.id; ) (ea(l), (l = l._prevRep));
        }
        const o = r - s._delay;
        if (a > o) {
          const l = i._startTime,
            u = a - (l + i._updateDuration),
            p = it(o - u - l, 12);
          ((i._changeDuration = p),
            (i._currentTime = p),
            (i._isOverlapped = 1),
            p < Re && ea(i));
        }
        let c = !0;
        if (
          (qe(n, (l) => {
            l._isOverlapped || (c = !1);
          }),
          c)
        ) {
          const l = n.parent;
          if (l) {
            let u = !0;
            (qe(l, (p) => {
              p !== n &&
                qe(p, (m) => {
                  m._isOverlapped || (u = !1);
                });
            }),
              u && l.cancel());
          } else n.cancel();
        }
      }
    } else if (t === Gt.blend) {
      const r = jo(s.target, s.property, '_add'),
        i = ph(fa._add);
      let n = r._head;
      n ||
        ((n = { ...s }),
        (n._composition = Gt.replace),
        (n._updateDuration = Re),
        (n._startTime = 0),
        (n._numbers = Vt(s._fromNumbers)),
        (n._number = 0),
        (n._next = null),
        (n._prev = null),
        Ni(r, n),
        Ni(i, n));
      const a = s._toNumber;
      if (
        ((s._fromNumber = n._fromNumber - a),
        (s._toNumber = 0),
        (s._numbers = Vt(s._fromNumbers)),
        (s._number = 0),
        (n._fromNumber = a),
        s._toNumbers)
      ) {
        const o = Vt(s._toNumbers);
        (o &&
          o.forEach((c, l) => {
            ((s._fromNumbers[l] = n._fromNumbers[l] - c),
              (s._toNumbers[l] = 0));
          }),
          (n._fromNumbers = o));
      }
      Ni(r, s, null, '_prevAdd', '_nextAdd');
    }
    return s;
  },
  su = (s) => {
    const e = s._composition;
    if (e !== Gt.none) {
      const t = s.target,
        r = s.property,
        a = fa._rep.get(t)[r];
      if (($i(a, s, '_prevRep', '_nextRep'), e === Gt.blend)) {
        const o = fa._add,
          c = o.get(t);
        if (!c) return;
        const l = c[r],
          u = hs.animation;
        $i(l, s, '_prevAdd', '_nextAdd');
        const p = l._head;
        if (p && p === l._tail) {
          ($i(l, p, '_prevAdd', '_nextAdd'), $i(u, p));
          let m = !0;
          for (let h in c)
            if (c[h]._head) {
              m = !1;
              break;
            }
          m && o.delete(t);
        }
      }
    }
    return s;
  },
  Bl = (s, e, t) => {
    let r = !1;
    return (
      qe(
        e,
        (i) => {
          const n = i.target;
          if (s.includes(n)) {
            const a = i.property,
              o = i._tweenType,
              c = Jc(t, n, o);
            (!c || (c && c === a)) &&
              (i.parent._tail === i &&
                i._tweenType === et.TRANSFORM &&
                i._prev &&
                i._prev._tweenType === et.TRANSFORM &&
                (i._prev._renderTransforms = 1),
              $i(e, i),
              su(i),
              (r = !0));
          }
        },
        !0
      ),
      r
    );
  },
  nu = (s, e, t) => {
    const r = e || Et;
    let i;
    if (r._hasChildren) {
      let n = 0;
      (qe(
        r,
        (a) => {
          if (!a._hasChildren)
            if (((i = Bl(s, a, t)), i && !a._head)) (a.cancel(), $i(r, a));
            else {
              const c = a._offset + a._delay + a.duration;
              c > n && (n = c);
            }
          a._head ? nu(s, a, t) : (a._hasChildren = !1);
        },
        !0
      ),
        Ie(r.iterationDuration) || (r.iterationDuration = n));
    } else i = Bl(s, r, t);
    i && !r._head && ((r._hasChildren = !1), r.cancel && r.cancel());
  };
const Fl = (s) => ((s.paused = !0), (s.began = !1), (s.completed = !1), s),
  ho = (s) => (
    s._cancelled &&
      (s._hasChildren
        ? qe(s, ho)
        : qe(s, (e) => {
            e._composition !== Gt.none && iu(e, jo(e.target, e.property));
          }),
      (s._cancelled = 0)),
    s
  );
let _h = 0;
class Ko extends eu {
  constructor(e = {}, t = null, r = 0) {
    super(0);
    const {
        id: i,
        delay: n,
        duration: a,
        reversed: o,
        alternate: c,
        loop: l,
        loopDelay: u,
        autoplay: p,
        frameRate: m,
        playbackRate: h,
        onComplete: f,
        onLoop: d,
        onPause: g,
        onBegin: w,
        onBeforeUpdate: _,
        onUpdate: v,
      } = e,
      y = t ? 0 : Et._elapsedTime,
      b = t ? t.defaults : yt.defaults,
      P = Cs(n) || Ie(n) ? b.delay : +n,
      T = Cs(a) || Ie(a) ? 1 / 0 : +a,
      O = It(l, b.loop),
      S = It(u, b.loopDelay),
      E = O === !0 || O === 1 / 0 || O < 0 ? 1 / 0 : O + 1;
    let I = 0;
    (t
      ? (I = r)
      : (Et.reqId || Et.requestTick(Ss()),
        (I = (Et._elapsedTime - Et._startTime) * yt.timeScale)),
      (this.id = Ie(i) ? ++_h : i),
      (this.parent = t),
      (this.duration = Ma((T + S) * E - S) || Re),
      (this.backwards = !1),
      (this.paused = !0),
      (this.began = !1),
      (this.completed = !1),
      (this.onBegin = w || b.onBegin),
      (this.onBeforeUpdate = _ || b.onBeforeUpdate),
      (this.onUpdate = v || b.onUpdate),
      (this.onLoop = d || b.onLoop),
      (this.onPause = g || b.onPause),
      (this.onComplete = f || b.onComplete),
      (this.iterationDuration = T),
      (this.iterationCount = E),
      (this._autoplay = t ? !1 : It(p, b.autoplay)),
      (this._offset = I),
      (this._delay = P),
      (this._loopDelay = S),
      (this._iterationTime = 0),
      (this._currentIteration = 0),
      (this._resolve = br),
      (this._running = !1),
      (this._reversed = +It(o, b.reversed)),
      (this._reverse = this._reversed),
      (this._cancelled = 0),
      (this._alternate = It(c, b.alternate)),
      (this._prev = null),
      (this._next = null),
      (this._elapsedTime = y),
      (this._startTime = y),
      (this._lastTime = y),
      (this._fps = It(m, b.frameRate)),
      (this._speed = It(h, b.playbackRate)));
  }
  get cancelled() {
    return !!this._cancelled;
  }
  set cancelled(e) {
    e ? this.cancel() : this.reset(!0).play();
  }
  get currentTime() {
    return Kt(it(this._currentTime, yt.precision), -this._delay, this.duration);
  }
  set currentTime(e) {
    const t = this.paused;
    (this.pause().seek(+e), t || this.resume());
  }
  get iterationCurrentTime() {
    return it(this._iterationTime, yt.precision);
  }
  set iterationCurrentTime(e) {
    this.currentTime = this.iterationDuration * this._currentIteration + e;
  }
  get progress() {
    return Kt(it(this._currentTime / this.duration, 10), 0, 1);
  }
  set progress(e) {
    this.currentTime = this.duration * e;
  }
  get iterationProgress() {
    return Kt(it(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }
  set iterationProgress(e) {
    const t = this.iterationDuration;
    this.currentTime = t * this._currentIteration + t * e;
  }
  get currentIteration() {
    return this._currentIteration;
  }
  set currentIteration(e) {
    this.currentTime =
      this.iterationDuration * Kt(+e, 0, this.iterationCount - 1);
  }
  get reversed() {
    return !!this._reversed;
  }
  set reversed(e) {
    e ? this.reverse() : this.play();
  }
  get speed() {
    return super.speed;
  }
  set speed(e) {
    ((super.speed = e), this.resetTime());
  }
  reset(e = !1) {
    return (
      ho(this),
      this._reversed && !this._reverse && (this.reversed = !1),
      (this._iterationTime = this.iterationDuration),
      zi(this, 0, 1, ~~e, ur.FORCE),
      Fl(this),
      this._hasChildren && qe(this, Fl),
      this
    );
  }
  init(e = !1) {
    ((this.fps = this._fps),
      (this.speed = this._speed),
      !e && this._hasChildren && zi(this, this.duration, 1, ~~e, ur.FORCE),
      this.reset(e));
    const t = this._autoplay;
    return (
      t === !0 ? this.resume() : t && !Ie(t.linked) && t.link(this),
      this
    );
  }
  resetTime() {
    const e = 1 / (this._speed * Et._speed);
    return (
      (this._startTime = Ss() - (this._currentTime + this._delay) * e),
      this
    );
  }
  pause() {
    return this.paused ? this : ((this.paused = !0), this.onPause(this), this);
  }
  resume() {
    return this.paused
      ? ((this.paused = !1),
        this.duration <= Re && !this._hasChildren
          ? zi(this, Re, 0, 0, ur.FORCE)
          : (this._running ||
              (Ni(Et, this), (Et._hasChildren = !0), (this._running = !0)),
            this.resetTime(),
            (this._startTime -= 12),
            Et.wake()),
        this)
      : this;
  }
  restart() {
    return this.reset().resume();
  }
  seek(e, t = 0, r = 0) {
    (ho(this), (this.completed = !1));
    const i = this.paused;
    return (
      (this.paused = !0),
      zi(this, e + this._delay, ~~t, ~~r, ur.AUTO),
      i ? this : this.resume()
    );
  }
  alternate() {
    const e = this._reversed,
      t = this.iterationCount,
      r = this.iterationDuration,
      i = t === 1 / 0 ? ah(fo / r) : t;
    return (
      (this._reversed = +(this._alternate && !(i % 2) ? e : !e)),
      t === 1 / 0
        ? (this.iterationProgress = this._reversed
            ? 1 - this.iterationProgress
            : this.iterationProgress)
        : this.seek(r * i - this._currentTime),
      this.resetTime(),
      this
    );
  }
  play() {
    return (this._reversed && this.alternate(), this.resume());
  }
  reverse() {
    return (this._reversed || this.alternate(), this.resume());
  }
  cancel() {
    return (
      this._hasChildren ? qe(this, (e) => e.cancel(), !0) : qe(this, su),
      (this._cancelled = 1),
      this.pause()
    );
  }
  stretch(e) {
    const t = this.duration,
      r = ps(e);
    if (t === r) return this;
    const i = e / t,
      n = e <= Re;
    return (
      (this.duration = n ? Re : r),
      (this.iterationDuration = n ? Re : ps(this.iterationDuration * i)),
      (this._offset *= i),
      (this._delay *= i),
      (this._loopDelay *= i),
      this
    );
  }
  revert() {
    zi(this, 0, 1, 0, ur.AUTO);
    const e = this._autoplay;
    return (e && e.linked && e.linked === this && e.revert(), this.cancel());
  }
  complete() {
    return this.seek(this.duration).cancel();
  }
  then(e = br) {
    const t = this.then,
      r = () => {
        ((this.then = null), e(this), (this.then = t), (this._resolve = br));
      };
    return new Promise(
      (i) => (
        (this._resolve = () => i(r())),
        this.completed && this._resolve(),
        this
      )
    );
  }
}
function Yl(s) {
  const e = gn(s) ? Jp.root.querySelectorAll(s) : s;
  if (e instanceof NodeList || e instanceof HTMLCollection) return e;
}
function mo(s) {
  if (fs(s)) return [];
  if (!Ci) return (Es(s) && s.flat(1 / 0)) || [s];
  if (Es(s)) {
    const t = s.flat(1 / 0),
      r = [];
    for (let i = 0, n = t.length; i < n; i++) {
      const a = t[i];
      if (!fs(a)) {
        const o = Yl(a);
        if (o)
          for (let c = 0, l = o.length; c < l; c++) {
            const u = o[c];
            if (!fs(u)) {
              let p = !1;
              for (let m = 0, h = r.length; m < h; m++)
                if (r[m] === u) {
                  p = !0;
                  break;
                }
              p || r.push(u);
            }
          }
        else {
          let c = !1;
          for (let l = 0, u = r.length; l < u; l++)
            if (r[l] === a) {
              c = !0;
              break;
            }
          c || r.push(a);
        }
      }
    }
    return r;
  }
  const e = Yl(s);
  return e ? Array.from(e) : [s];
}
function au(s) {
  const e = mo(s),
    t = e.length;
  if (t)
    for (let r = 0; r < t; r++) {
      const i = e[r];
      if (!i[Dl]) {
        i[Dl] = !0;
        const n = Wc(i);
        (i.nodeType || n) && ((i[Ho] = !0), (i[Fc] = n), (i[Ca] = {}));
      }
    }
  return e;
}
const Xa = { deg: 1, rad: 180 / qo, turn: 360 },
  Vl = {},
  wh = (s, e, t, r = !1) => {
    const i = e.u,
      n = e.n;
    if (e.t === De.UNIT && i === t) return e;
    const a = n + i + t,
      o = Vl[a];
    if (!Ie(o) && !r) e.n = o;
    else {
      let c;
      if (i in Xa) c = (n * Xa[i]) / Xa[t];
      else {
        const u = s.cloneNode(),
          p = s.parentNode,
          m = p && p !== mn ? p : mn.body;
        m.appendChild(u);
        const h = u.style;
        h.width = 100 + i;
        const f = u.offsetWidth || 100;
        h.width = 100 + t;
        const d = u.offsetWidth || 100,
          g = f / d;
        (m.removeChild(u), (c = g * n));
      }
      ((e.n = c), (Vl[a] = c));
    }
    return (e.t, De.UNIT, (e.u = t), e);
  };
const yi = (s) => s;
const Ns =
    (s = 1.68) =>
    (e) =>
      as(e, +s),
  go = {
    in: (s) => (e) => s(e),
    out: (s) => (e) => 1 - s(1 - e),
    inOut: (s) => (e) => (e < 0.5 ? s(e * 2) / 2 : 1 - s(e * -2 + 2) / 2),
    outIn: (s) => (e) =>
      e < 0.5 ? (1 - s(1 - e * 2)) / 2 : (s(e * 2 - 1) + 1) / 2,
  },
  yh = qo / 2,
  Xl = qo * 2,
  Hl = {
    [Vi]: Ns,
    Quad: Ns(2),
    Cubic: Ns(3),
    Quart: Ns(4),
    Quint: Ns(5),
    Sine: (s) => 1 - nh(s * yh),
    Circ: (s) => 1 - ih(1 - s * s),
    Expo: (s) => (s ? as(2, 10 * s - 10) : 0),
    Bounce: (s) => {
      let e,
        t = 4;
      for (; s < ((e = as(2, --t)) - 1) / 11; );
      return 1 / as(4, 3 - t) - 7.5625 * as((e * 3 - 2) / 22 - s, 2);
    },
    Back:
      (s = 1.7) =>
      (e) =>
        (+s + 1) * e * e * e - +s * e * e,
    Elastic: (s = 1, e = 0.3) => {
      const t = Kt(+s, 1, 10),
        r = Kt(+e, Re, 2),
        i = (r / Xl) * oh(1 / t),
        n = Xl / r;
      return (a) =>
        a === 0 || a === 1
          ? a
          : -t * as(2, -10 * (1 - a)) * sh((1 - a - i) * n);
    },
  },
  Ha = (() => {
    const s = { linear: yi, none: yi };
    for (let e in go)
      for (let t in Hl) {
        const r = Hl[t],
          i = go[e];
        s[e + t] =
          t === Vi || t === 'Back' || t === 'Elastic'
            ? (n, a) => i(r(n, a))
            : i(r);
      }
    return s;
  })(),
  On = { linear: yi, none: yi },
  bh = (s) => {
    if (On[s]) return On[s];
    if (s.indexOf('(') <= -1) {
      const t =
        go[s] || s.includes('Back') || s.includes('Elastic') ? Ha[s]() : Ha[s];
      return t ? (On[s] = t) : yi;
    } else {
      const e = s.slice(0, -1).split('('),
        t = Ha[e[0]];
      return t ? (On[s] = t(...e[1].split(','))) : yi;
    }
  },
  Gl = ['steps(', 'irregular(', 'linear(', 'cubicBezier('],
  vo = (s) => {
    if (gn(s)) {
      for (let t = 0, r = Gl.length; t < r; t++)
        if (Qr(s, Gl[t]))
          return (
            console.warn(
              `String syntax for \`ease: "${s}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${s}\``
            ),
            yi
          );
    }
    return Cs(s) ? s : gn(s) ? bh(s) : yi;
  };
const me = Wo(),
  ye = Wo(),
  ts = {},
  Ln = { func: null },
  Dn = [null],
  rs = [null, null],
  kn = { to: null };
let Th = 0,
  ai,
  $r;
const xh = (s, e) => {
  const t = {};
  if (Es(s)) {
    const r = [].concat(...s.map((i) => Object.keys(i))).filter(Zn);
    for (let i = 0, n = r.length; i < n; i++) {
      const a = r[i],
        o = s.map((c) => {
          const l = {};
          for (let u in c) {
            const p = c[u];
            Zn(u) ? u === a && (l.to = p) : (l[u] = p);
          }
          return l;
        });
      t[a] = o;
    }
  } else {
    const r = It(e.duration, yt.defaults.duration);
    Object.keys(s)
      .map((n) => ({ o: parseFloat(n) / 100, p: s[n] }))
      .sort((n, a) => n.o - a.o)
      .forEach((n) => {
        const a = n.o,
          o = n.p;
        for (let c in o)
          if (Zn(c)) {
            let l = t[c];
            l || (l = t[c] = []);
            const u = a * r;
            let p = l.length,
              m = l[p - 1];
            const h = { to: o[c] };
            let f = 0;
            for (let d = 0; d < p; d++) f += l[d].duration;
            (p === 1 && (h.from = m.to),
              o.ease && (h.ease = o.ease),
              (h.duration = u - (p ? f : 0)),
              l.push(h));
          }
        return n;
      });
    for (let n in t) {
      const a = t[n];
      let o;
      for (let c = 0, l = a.length; c < l; c++) {
        const u = a[c],
          p = u.ease;
        ((u.ease = o || void 0), (o = p));
      }
      a[0].duration || a.shift();
    }
  }
  return t;
};
class ou extends Ko {
  constructor(e, t, r, i, n = !1, a = 0, o = 0) {
    super(t, r, i);
    const c = au(e),
      l = c.length,
      u = t.keyframes,
      p = u ? Zc(xh(u, t), t) : t,
      {
        delay: m,
        duration: h,
        ease: f,
        playbackEase: d,
        modifier: g,
        composition: w,
        onRender: _,
      } = p,
      v = r ? r.defaults : yt.defaults,
      y = It(d, v.playbackEase),
      b = y ? vo(y) : null,
      P = !Ie(f) && !Ie(f.ease),
      T = P ? f.ease : It(f, b ? 'linear' : v.ease),
      O = P ? f.settlingDuration : It(h, v.duration),
      S = It(m, v.delay),
      E = g || v.modifier,
      I = Ie(w) && l >= xs ? Gt.none : Ie(w) ? v.composition : w,
      A = this._offset + (r ? r._offset : 0);
    P && (f.parent = this);
    let k = NaN,
      x = NaN,
      L = 0,
      $ = 0;
    for (let M = 0; M < l; M++) {
      const D = c[M],
        z = a || M,
        C = o || l;
      let W = NaN,
        ae = NaN;
      for (let le in p)
        if (Zn(le)) {
          const U = Qc(D, le),
            B = Jc(le, D, U);
          let F = p[le];
          const Y = Es(F);
          if ((n && !Y && ((rs[0] = F), (rs[1] = F), (F = rs)), Y)) {
            const j = F.length,
              ee = !Js(F[0]);
            j === 2 && ee
              ? ((kn.to = F), (Dn[0] = kn), (ai = Dn))
              : j > 2 && ee
                ? ((ai = []),
                  F.forEach((ce, ge) => {
                    ge
                      ? ge === 1
                        ? ((rs[1] = ce), ai.push(rs))
                        : ai.push(ce)
                      : (rs[0] = ce);
                  }))
                : (ai = F);
          } else ((Dn[0] = F), (ai = Dn));
          let Q = null,
            se = null,
            ke = NaN,
            be = 0,
            fe = 0;
          for (let j = ai.length; fe < j; fe++) {
            const ee = ai[fe];
            (Js(ee) ? ($r = ee) : ((kn.to = ee), ($r = kn)), (Ln.func = null));
            const ce = si($r.to, D, z, C, Ln);
            let ge;
            Js(ce) && !Ie(ce.to) ? (($r = ce), (ge = ce.to)) : (ge = ce);
            const N = si($r.from, D, z, C),
              Pe = $r.ease,
              X = !Ie(Pe) && !Ie(Pe.ease),
              R = X ? Pe.ease : Pe || T,
              V = X
                ? Pe.settlingDuration
                : si(It($r.duration, j > 1 ? si(O, D, z, C) / j : O), D, z, C),
              H = si(It($r.delay, fe ? 0 : S), D, z, C),
              K = si(It($r.composition, I), D, z, C),
              J = Go(K) ? K : Gt[K],
              re = $r.modifier || E,
              Ae = !Ie(N),
              te = !Ie(ge),
              _e = Es(ge),
              ve = _e || (Ae && te),
              de = se ? be + H : H,
              Ye = it(A + de, 12);
            !$ && (Ae || _e) && ($ = 1);
            let G = se;
            if (J !== Gt.none) {
              Q || (Q = jo(D, B));
              let Me = Q._head;
              for (; Me && !Me._isOverridden && Me._absoluteStartTime <= Ye; )
                if (
                  ((G = Me),
                  (Me = Me._nextRep),
                  Me && Me._absoluteStartTime >= Ye)
                )
                  for (; Me; ) (ea(Me), (Me = Me._nextRep));
            }
            if (
              (ve
                ? (zr(_e ? si(ge[0], D, z, C) : N, me),
                  zr(_e ? si(ge[1], D, z, C, Ln) : ge, ye),
                  me.t === De.NUMBER &&
                    (G
                      ? G._valueType === De.UNIT &&
                        ((me.t = De.UNIT), (me.u = G._unit))
                      : (zr($s(D, B, U, ts), ni),
                        ni.t === De.UNIT && ((me.t = De.UNIT), (me.u = ni.u)))))
                : (te
                    ? zr(ge, ye)
                    : se
                      ? $l(se, ye)
                      : zr(
                          r && G && G.parent.parent === r
                            ? G._value
                            : $s(D, B, U, ts),
                          ye
                        ),
                  Ae
                    ? zr(N, me)
                    : se
                      ? $l(se, me)
                      : zr(
                          r && G && G.parent.parent === r
                            ? G._value
                            : $s(D, B, U, ts),
                          me
                        )),
              me.o &&
                (me.n = Qn(
                  G ? G._toNumber : zr($s(D, B, U, ts), ni).n,
                  me.n,
                  me.o
                )),
              ye.o && (ye.n = Qn(me.n, ye.n, ye.o)),
              me.t !== ye.t)
            ) {
              if (me.t === De.COMPLEX || ye.t === De.COMPLEX) {
                const Me = me.t === De.COMPLEX ? me : ye,
                  Fe = me.t === De.COMPLEX ? ye : me;
                ((Fe.t = De.COMPLEX),
                  (Fe.s = Vt(Me.s)),
                  (Fe.d = Me.d.map(() => Fe.n)));
              } else if (me.t === De.UNIT || ye.t === De.UNIT) {
                const Me = me.t === De.UNIT ? me : ye,
                  Fe = me.t === De.UNIT ? ye : me;
                ((Fe.t = De.UNIT), (Fe.u = Me.u));
              } else if (me.t === De.COLOR || ye.t === De.COLOR) {
                const Me = me.t === De.COLOR ? me : ye,
                  Fe = me.t === De.COLOR ? ye : me;
                ((Fe.t = De.COLOR), (Fe.s = Me.s), (Fe.d = [0, 0, 0, 1]));
              }
            }
            if (me.u !== ye.u) {
              let Me = ye.u ? me : ye;
              Me = wh(D, Me, ye.u ? ye.u : me.u, !1);
            }
            if (ye.d && me.d && ye.d.length !== me.d.length) {
              const Me = me.d.length > ye.d.length ? me : ye,
                Fe = Me === me ? ye : me;
              ((Fe.d = Me.d.map((wr, oe) => (Ie(Fe.d[oe]) ? 0 : Fe.d[oe]))),
                (Fe.s = Vt(Me.s)));
            }
            const Ut = it(+V || Re, 12);
            let nt = ts[B];
            fs(nt) || (ts[B] = null);
            const at = {
              parent: this,
              id: Th++,
              property: B,
              target: D,
              _value: null,
              _func: Ln.func,
              _ease: vo(R),
              _fromNumbers: Vt(me.d),
              _toNumbers: Vt(ye.d),
              _strings: Vt(ye.s),
              _fromNumber: me.n,
              _toNumber: ye.n,
              _numbers: Vt(me.d),
              _number: me.n,
              _unit: ye.u,
              _modifier: re,
              _currentTime: 0,
              _startTime: de,
              _delay: +H,
              _updateDuration: Ut,
              _changeDuration: Ut,
              _absoluteStartTime: Ye,
              _tweenType: U,
              _valueType: ye.t,
              _composition: J,
              _isOverlapped: 0,
              _isOverridden: 0,
              _renderTransforms: 0,
              _inlineValue: nt,
              _prevRep: null,
              _nextRep: null,
              _prevAdd: null,
              _nextAdd: null,
              _prev: null,
              _next: null,
            };
            (J !== Gt.none && iu(at, Q),
              isNaN(ke) && (ke = at._startTime),
              (be = it(de + Ut, 12)),
              (se = at),
              L++,
              Ni(this, at));
          }
          ((isNaN(x) || ke < x) && (x = ke),
            (isNaN(k) || be > k) && (k = be),
            U === et.TRANSFORM && ((W = L - fe), (ae = L)));
        }
      if (!isNaN(W)) {
        let le = 0;
        qe(this, (U) => {
          (le >= W &&
            le < ae &&
            ((U._renderTransforms = 1),
            U._composition === Gt.blend &&
              qe(hs.animation, (B) => {
                B.id === U.id && (B._renderTransforms = 1);
              })),
            le++);
        });
      }
    }
    (l ||
      console.warn(
        "No target found. Make sure the element you're trying to animate is accessible before creating your animation."
      ),
      x
        ? (qe(this, (M) => {
            (M._startTime - M._delay || (M._delay -= x), (M._startTime -= x));
          }),
          (k -= x))
        : (x = 0),
      k || ((k = Re), (this.iterationCount = 0)),
      (this.targets = c),
      (this.duration =
        k === Re
          ? Re
          : Ma((k + this._loopDelay) * this.iterationCount - this._loopDelay) ||
            Re),
      (this.onRender = _ || v.onRender),
      (this._ease = b),
      (this._delay = x),
      (this.iterationDuration = k),
      !this._autoplay && $ && this.onRender(this));
  }
  stretch(e) {
    const t = this.duration;
    if (t === ps(e)) return this;
    const r = e / t;
    return (
      qe(this, (i) => {
        ((i._updateDuration = ps(i._updateDuration * r)),
          (i._changeDuration = ps(i._changeDuration * r)),
          (i._currentTime *= r),
          (i._startTime *= r),
          (i._absoluteStartTime *= r));
      }),
      super.stretch(e)
    );
  }
  refresh() {
    return (
      qe(this, (e) => {
        const t = e._func;
        if (t) {
          const r = $s(e.target, e.property, e._tweenType);
          (zr(r, ni),
            zr(t(), ye),
            (e._fromNumbers = Vt(ni.d)),
            (e._fromNumber = ni.n),
            (e._toNumbers = Vt(ye.d)),
            (e._strings = Vt(ye.s)),
            (e._toNumber = ye.o ? Qn(ni.n, ye.n, ye.o) : ye.n));
        }
      }),
      this.duration === Re && this.restart(),
      this
    );
  }
  revert() {
    return (super.revert(), Uo(this));
  }
  then(e) {
    return super.then(e);
  }
}
const Ga = (s, e) => new ou(s, e, null, 0, !1).init();
const Sh = (s, e) => {
    if (Qr(e, '<')) {
      const t = e[1] === '<',
        r = s._tail,
        i = r ? r._offset + r._delay : 0;
      return t ? i : i + r.duration;
    }
  },
  In = (s, e) => {
    let t = s.iterationDuration;
    if ((t === Re && (t = 0), Ie(e))) return t;
    if (Go(+e)) return +e;
    const r = e,
      i = s ? s.labels : null,
      n = !fs(i),
      a = Sh(s, r),
      o = !Ie(a),
      c = Zp.exec(r);
    if (c) {
      const l = c[0],
        u = r.split(l),
        p = n && u[0] ? i[u[0]] : t,
        m = o ? a : n ? p : t,
        h = +u[1];
      return Qn(m, h, l[0]);
    } else return o ? a : n ? (Ie(i[r]) ? t : i[r]) : t;
  };
function Eh(s) {
  return (
    Ma(
      (s.iterationDuration + s._loopDelay) * s.iterationCount - s._loopDelay
    ) || Re
  );
}
function qa(s, e, t, r, i, n) {
  const o = Go(s.duration) && s.duration <= Re ? t - Re : t;
  zi(e, o, 1, 1, ur.AUTO);
  const c = r ? new ou(r, s, e, o, !1, i, n) : new Ko(s, e, o);
  return (
    c.init(!0),
    Ni(e, c),
    qe(e, (l) => {
      const p = l._offset + l._delay + l.duration;
      p > e.iterationDuration && (e.iterationDuration = p);
    }),
    (e.duration = Eh(e)),
    e
  );
}
let Ch = class extends Ko {
  constructor(e = {}) {
    (super(e, null, 0), (this.duration = 0), (this.labels = {}));
    const t = e.defaults,
      r = yt.defaults;
    ((this.defaults = t ? Zc(t, r) : r),
      (this.onRender = e.onRender || r.onRender));
    const i = It(e.playbackEase, r.playbackEase);
    ((this._ease = i ? vo(i) : null), (this.iterationDuration = 0));
  }
  add(e, t, r) {
    const i = Js(t),
      n = Js(e);
    if (i || n) {
      if (((this._hasChildren = !0), i)) {
        const a = t;
        if (Cs(r)) {
          const o = r,
            c = mo(e),
            l = this.duration,
            u = this.iterationDuration,
            p = a.id;
          let m = 0;
          const h = c.length;
          c.forEach((f) => {
            const d = { ...a };
            ((this.duration = l),
              (this.iterationDuration = u),
              Ie(p) || (d.id = p + '-' + m),
              qa(d, this, In(this, o(f, m, h, this)), f, m, h),
              m++);
          });
        } else qa(a, this, In(this, r), e);
      } else qa(e, this, In(this, t));
      return this.init(!0);
    }
  }
  sync(e, t) {
    if (Ie(e) || (e && Ie(e.pause))) return this;
    e.pause();
    const r = +(e.effect ? e.effect.getTiming().duration : e.duration);
    return this.add(e, { currentTime: [0, r], duration: r, ease: 'linear' }, t);
  }
  set(e, t, r) {
    return Ie(t)
      ? this
      : ((t.duration = Re), (t.composition = Gt.replace), this.add(e, t, r));
  }
  call(e, t) {
    return Ie(e) || (e && !Cs(e))
      ? this
      : this.add({ duration: 0, onComplete: () => e(this) }, t);
  }
  label(e, t) {
    return Ie(e) || (e && !gn(e))
      ? this
      : ((this.labels[e] = In(this, t)), this);
  }
  remove(e, t) {
    return (nu(mo(e), this, t), this);
  }
  stretch(e) {
    const t = this.duration;
    if (t === ps(e)) return this;
    const r = e / t,
      i = this.labels;
    qe(this, (n) => n.stretch(n.duration * r));
    for (let n in i) i[n] *= r;
    return super.stretch(e);
  }
  refresh() {
    return (
      qe(this, (e) => {
        e.refresh && e.refresh();
      }),
      this
    );
  }
  revert() {
    return (super.revert(), qe(this, (e) => e.revert, !0), Uo(this));
  }
  then(e) {
    return super.then(e);
  }
};
const Mh = (s) => new Ch(s).init();
function Ph() {
  Mh({ defaults: { delay: 300, duration: 950 } })
    .add('.tl-1', { x: { from: '15rem' }, opacity: [0, 1] })
    .add('.tl-2', { x: { from: '15rem' }, opacity: [0, 1] }, 600)
    .add('.tl-3', { x: { from: '20rem' }, opacity: [0, 1] }, 1200)
    .add('.tl-4', { x: { from: '15rem' }, opacity: [0, 1] }, 1900);
}
function Ah() {
  const s = au('.square'),
    [e] = s;
  s.forEach((a) => {
    const o = a.classList[1];
    Ga(a, {
      scale: [0.5, 1],
      alternate: !0,
      loop: !0,
      duration: 750,
      composition: o,
    });
  });
  const t = { scale: 1.5, duration: 350 },
    r = { scale: 1, duration: 250 },
    i = () => Ga(e, { composition: 'blend', ...t }),
    n = () => Ga(e, { composition: 'blend', ...r });
  (e.addEventListener('mouseenter', i), e.addEventListener('mouseleave', n));
}
function Wr(s) {
  if (s === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return s;
}
function lu(s, e) {
  ((s.prototype = Object.create(e.prototype)),
    (s.prototype.constructor = s),
    (s.__proto__ = e));
}
var gr = {
    autoSleep: 120,
    force3D: 'auto',
    nullTargetWarn: 1,
    units: { lineHeight: '' },
  },
  Ms = { duration: 0.5, overwrite: !1, delay: 0 },
  Zo,
  Pt,
  je,
  Er = 1e8,
  He = 1 / Er,
  _o = Math.PI * 2,
  Oh = _o / 4,
  Lh = 0,
  cu = Math.sqrt,
  Dh = Math.cos,
  kh = Math.sin,
  Tt = function (e) {
    return typeof e == 'string';
  },
  st = function (e) {
    return typeof e == 'function';
  },
  ti = function (e) {
    return typeof e == 'number';
  },
  Qo = function (e) {
    return typeof e > 'u';
  },
  Gr = function (e) {
    return typeof e == 'object';
  },
  Zt = function (e) {
    return e !== !1;
  },
  Jo = function () {
    return typeof window < 'u';
  },
  Rn = function (e) {
    return st(e) || Tt(e);
  },
  uu =
    (typeof ArrayBuffer == 'function' && ArrayBuffer.isView) || function () {},
  $t = Array.isArray,
  Ih = /random\([^)]+\)/g,
  Rh = /,\s*/g,
  ql = /(?:-?\.?\d|\.)+/gi,
  du = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  cs = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  Wa = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  fu = /[+-]=-?[.\d]+/,
  zh = /[^,'"\[\]\s]+/gi,
  $h = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  Je,
  Nr,
  wo,
  el,
  vr = {},
  pa = {},
  pu,
  hu = function (e) {
    return (pa = Ps(e, vr)) && tr;
  },
  tl = function (e, t) {
    return console.warn(
      'Invalid property',
      e,
      'set to',
      t,
      'Missing plugin? gsap.registerPlugin()'
    );
  },
  vn = function (e, t) {
    return !t && console.warn(e);
  },
  mu = function (e, t) {
    return (e && (vr[e] = t) && pa && (pa[e] = t)) || vr;
  },
  _n = function () {
    return 0;
  },
  Nh = { suppressEvents: !0, isStart: !0, kill: !1 },
  ta = { suppressEvents: !0, kill: !1 },
  Bh = { suppressEvents: !0 },
  rl = {},
  vi = [],
  yo = {},
  gu,
  lr = {},
  Ua = {},
  Wl = 30,
  ra = [],
  il = '',
  sl = function (e) {
    var t = e[0],
      r,
      i;
    if ((Gr(t) || st(t) || (e = [e]), !(r = (t._gsap || {}).harness))) {
      for (i = ra.length; i-- && !ra[i].targetTest(t); );
      r = ra[i];
    }
    for (i = e.length; i--; )
      (e[i] && (e[i]._gsap || (e[i]._gsap = new Fu(e[i], r)))) ||
        e.splice(i, 1);
    return e;
  },
  Xi = function (e) {
    return e._gsap || sl(Cr(e))[0]._gsap;
  },
  vu = function (e, t, r) {
    return (r = e[t]) && st(r)
      ? e[t]()
      : (Qo(r) && e.getAttribute && e.getAttribute(t)) || r;
  },
  Qt = function (e, t) {
    return (e = e.split(',')).forEach(t) || e;
  },
  lt = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Qe = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  ms = function (e, t) {
    var r = t.charAt(0),
      i = parseFloat(t.substr(2));
    return (
      (e = parseFloat(e)),
      r === '+' ? e + i : r === '-' ? e - i : r === '*' ? e * i : e / i
    );
  },
  Fh = function (e, t) {
    for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r; );
    return i < r;
  },
  ha = function () {
    var e = vi.length,
      t = vi.slice(0),
      r,
      i;
    for (yo = {}, vi.length = 0, r = 0; r < e; r++)
      ((i = t[r]),
        i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0));
  },
  nl = function (e) {
    return !!(e._initted || e._startAt || e.add);
  },
  _u = function (e, t, r, i) {
    (vi.length && !Pt && ha(),
      e.render(t, r, !!(Pt && t < 0 && nl(e))),
      vi.length && !Pt && ha());
  },
  wu = function (e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + '').match(zh).length < 2
      ? t
      : Tt(e)
        ? e.trim()
        : e;
  },
  yu = function (e) {
    return e;
  },
  _r = function (e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e;
  },
  Yh = function (e) {
    return function (t, r) {
      for (var i in r)
        i in t || (i === 'duration' && e) || i === 'ease' || (t[i] = r[i]);
    };
  },
  Ps = function (e, t) {
    for (var r in t) e[r] = t[r];
    return e;
  },
  Ul = function s(e, t) {
    for (var r in t)
      r !== '__proto__' &&
        r !== 'constructor' &&
        r !== 'prototype' &&
        (e[r] = Gr(t[r]) ? s(e[r] || (e[r] = {}), t[r]) : t[r]);
    return e;
  },
  ma = function (e, t) {
    var r = {},
      i;
    for (i in e) i in t || (r[i] = e[i]);
    return r;
  },
  en = function (e) {
    var t = e.parent || Je,
      r = e.keyframes ? Yh($t(e.keyframes)) : _r;
    if (Zt(e.inherit))
      for (; t; ) (r(e, t.vars.defaults), (t = t.parent || t._dp));
    return e;
  },
  Vh = function (e, t) {
    for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r]; );
    return r < 0;
  },
  bu = function (e, t, r, i, n) {
    var a = e[i],
      o;
    if (n) for (o = t[n]; a && a[n] > o; ) a = a._prev;
    return (
      a ? ((t._next = a._next), (a._next = t)) : ((t._next = e[r]), (e[r] = t)),
      t._next ? (t._next._prev = t) : (e[i] = t),
      (t._prev = a),
      (t.parent = t._dp = e),
      t
    );
  },
  Pa = function (e, t, r, i) {
    (r === void 0 && (r = '_first'), i === void 0 && (i = '_last'));
    var n = t._prev,
      a = t._next;
    (n ? (n._next = a) : e[r] === t && (e[r] = a),
      a ? (a._prev = n) : e[i] === t && (e[i] = n),
      (t._next = t._prev = t.parent = null));
  },
  bi = function (e, t) {
    (e.parent &&
      (!t || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0));
  },
  Hi = function (e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var r = e; r; ) ((r._dirty = 1), (r = r.parent));
    return e;
  },
  Xh = function (e) {
    for (var t = e.parent; t && t.parent; )
      ((t._dirty = 1), t.totalDuration(), (t = t.parent));
    return e;
  },
  bo = function (e, t, r, i) {
    return (
      e._startAt &&
      (Pt
        ? e._startAt.revert(ta)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(t, !0, i))
    );
  },
  Hh = function s(e) {
    return !e || (e._ts && s(e.parent));
  },
  jl = function (e) {
    return e._repeat ? As(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  As = function (e, t) {
    var r = Math.floor((e = Qe(e / t)));
    return e && r === e ? r - 1 : r;
  },
  ga = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    );
  },
  Aa = function (e) {
    return (e._end = Qe(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || He) || 0)
    ));
  },
  Oa = function (e, t) {
    var r = e._dp;
    return (
      r &&
        r.smoothChildTiming &&
        e._ts &&
        ((e._start = Qe(
          r._time -
            (e._ts > 0
              ? t / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
        )),
        Aa(e),
        r._dirty || Hi(r, e)),
      e
    );
  },
  Tu = function (e, t) {
    var r;
    if (
      ((t._time ||
        (!t._dur && t._initted) ||
        (t._start < e._time && (t._dur || !t.add))) &&
        ((r = ga(e.rawTime(), t)),
        (!t._dur || Mn(0, t.totalDuration(), r) - t._tTime > He) &&
          t.render(r, !0)),
      Hi(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (r = e; r._dp; )
          (r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp));
      e._zTime = -He;
    }
  },
  Yr = function (e, t, r, i) {
    return (
      t.parent && bi(t),
      (t._start = Qe(
        (ti(r) ? r : r || e !== Je ? yr(e, r, t) : e._time) + t._delay
      )),
      (t._end = Qe(
        t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
      )),
      bu(e, t, '_first', '_last', e._sort ? '_start' : 0),
      To(t) || (e._recent = t),
      i || Tu(e, t),
      e._ts < 0 && Oa(e, e._tTime),
      e
    );
  },
  xu = function (e, t) {
    return (
      (vr.ScrollTrigger || tl('scrollTrigger', t)) &&
      vr.ScrollTrigger.create(t, e)
    );
  },
  Su = function (e, t, r, i, n) {
    if ((ol(e, t, n), !e._initted)) return 1;
    if (
      !r &&
      e._pt &&
      !Pt &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      gu !== dr.frame
    )
      return (vi.push(e), (e._lazy = [n, i]), 1);
  },
  Gh = function s(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || s(t));
  },
  To = function (e) {
    var t = e.data;
    return t === 'isFromStart' || t === 'isStart';
  },
  qh = function (e, t, r, i) {
    var n = e.ratio,
      a =
        t < 0 ||
        (!t &&
          ((!e._start && Gh(e) && !(!e._initted && To(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !To(e))))
          ? 0
          : 1,
      o = e._rDelay,
      c = 0,
      l,
      u,
      p;
    if (
      (o &&
        e._repeat &&
        ((c = Mn(0, e._tDur, t)),
        (u = As(c, o)),
        e._yoyo && u & 1 && (a = 1 - a),
        u !== As(e._tTime, o) &&
          ((n = 1 - a), e.vars.repeatRefresh && e._initted && e.invalidate())),
      a !== n || Pt || i || e._zTime === He || (!t && e._zTime))
    ) {
      if (!e._initted && Su(e, t, i, r, c)) return;
      for (
        p = e._zTime,
          e._zTime = t || (r ? He : 0),
          r || (r = t && !p),
          e.ratio = a,
          e._from && (a = 1 - a),
          e._time = 0,
          e._tTime = c,
          l = e._pt;
        l;
      )
        (l.r(a, l.d), (l = l._next));
      (t < 0 && bo(e, t, r, !0),
        e._onUpdate && !r && hr(e, 'onUpdate'),
        c && e._repeat && !r && e.parent && hr(e, 'onRepeat'),
        (t >= e._tDur || t < 0) &&
          e.ratio === a &&
          (a && bi(e, 1),
          !r &&
            !Pt &&
            (hr(e, a ? 'onComplete' : 'onReverseComplete', !0),
            e._prom && e._prom())));
    } else e._zTime || (e._zTime = t);
  },
  Wh = function (e, t, r) {
    var i;
    if (r > t)
      for (i = e._first; i && i._start <= r; ) {
        if (i.data === 'isPause' && i._start > t) return i;
        i = i._next;
      }
    else
      for (i = e._last; i && i._start >= r; ) {
        if (i.data === 'isPause' && i._start < t) return i;
        i = i._prev;
      }
  },
  Os = function (e, t, r, i) {
    var n = e._repeat,
      a = Qe(t) || 0,
      o = e._tTime / e._tDur;
    return (
      o && !i && (e._time *= a / e._dur),
      (e._dur = a),
      (e._tDur = n ? (n < 0 ? 1e10 : Qe(a * (n + 1) + e._rDelay * n)) : a),
      o > 0 && !i && Oa(e, (e._tTime = e._tDur * o)),
      e.parent && Aa(e),
      r || Hi(e.parent, e),
      e
    );
  },
  Kl = function (e) {
    return e instanceof qt ? Hi(e) : Os(e, e._dur);
  },
  Uh = { _start: 0, endTime: _n, totalDuration: _n },
  yr = function s(e, t, r) {
    var i = e.labels,
      n = e._recent || Uh,
      a = e.duration() >= Er ? n.endTime(!1) : e._dur,
      o,
      c,
      l;
    return Tt(t) && (isNaN(t) || t in i)
      ? ((c = t.charAt(0)),
        (l = t.substr(-1) === '%'),
        (o = t.indexOf('=')),
        c === '<' || c === '>'
          ? (o >= 0 && (t = t.replace(/=/, '')),
            (c === '<' ? n._start : n.endTime(n._repeat >= 0)) +
              (parseFloat(t.substr(1)) || 0) *
                (l ? (o < 0 ? n : r).totalDuration() / 100 : 1))
          : o < 0
            ? (t in i || (i[t] = a), i[t])
            : ((c = parseFloat(t.charAt(o - 1) + t.substr(o + 1))),
              l && r && (c = (c / 100) * ($t(r) ? r[0] : r).totalDuration()),
              o > 1 ? s(e, t.substr(0, o - 1), r) + c : a + c))
      : t == null
        ? a
        : +t;
  },
  tn = function (e, t, r) {
    var i = ti(t[1]),
      n = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      a = t[n],
      o,
      c;
    if ((i && (a.duration = t[1]), (a.parent = r), e)) {
      for (o = a, c = r; c && !('immediateRender' in o); )
        ((o = c.vars.defaults || {}), (c = Zt(c.vars.inherit) && c.parent));
      ((a.immediateRender = Zt(o.immediateRender)),
        e < 2 ? (a.runBackwards = 1) : (a.startAt = t[n - 1]));
    }
    return new ft(t[0], a, t[n + 1]);
  },
  Mi = function (e, t) {
    return e || e === 0 ? t(e) : t;
  },
  Mn = function (e, t, r) {
    return r < e ? e : r > t ? t : r;
  },
  Rt = function (e, t) {
    return !Tt(e) || !(t = $h.exec(e)) ? '' : t[1];
  },
  jh = function (e, t, r) {
    return Mi(r, function (i) {
      return Mn(e, t, i);
    });
  },
  xo = [].slice,
  Eu = function (e, t) {
    return (
      e &&
      Gr(e) &&
      'length' in e &&
      ((!t && !e.length) || (e.length - 1 in e && Gr(e[0]))) &&
      !e.nodeType &&
      e !== Nr
    );
  },
  Kh = function (e, t, r) {
    return (
      r === void 0 && (r = []),
      e.forEach(function (i) {
        var n;
        return (Tt(i) && !t) || Eu(i, 1)
          ? (n = r).push.apply(n, Cr(i))
          : r.push(i);
      }) || r
    );
  },
  Cr = function (e, t, r) {
    return je && !t && je.selector
      ? je.selector(e)
      : Tt(e) && !r && (wo || !Ls())
        ? xo.call((t || el).querySelectorAll(e), 0)
        : $t(e)
          ? Kh(e, r)
          : Eu(e)
            ? xo.call(e, 0)
            : e
              ? [e]
              : [];
  },
  So = function (e) {
    return (
      (e = Cr(e)[0] || vn('Invalid scope') || {}),
      function (t) {
        var r = e.current || e.nativeElement || e;
        return Cr(
          t,
          r.querySelectorAll
            ? r
            : r === e
              ? vn('Invalid scope') || el.createElement('div')
              : e
        );
      }
    );
  },
  Cu = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  Mu = function (e) {
    if (st(e)) return e;
    var t = Gr(e) ? e : { each: e },
      r = Gi(t.ease),
      i = t.from || 0,
      n = parseFloat(t.base) || 0,
      a = {},
      o = i > 0 && i < 1,
      c = isNaN(i) || o,
      l = t.axis,
      u = i,
      p = i;
    return (
      Tt(i)
        ? (u = p = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
        : !o && c && ((u = i[0]), (p = i[1])),
      function (m, h, f) {
        var d = (f || t).length,
          g = a[d],
          w,
          _,
          v,
          y,
          b,
          P,
          T,
          O,
          S;
        if (!g) {
          if (((S = t.grid === 'auto' ? 0 : (t.grid || [1, Er])[1]), !S)) {
            for (
              T = -Er;
              T < (T = f[S++].getBoundingClientRect().left) && S < d;
            );
            S < d && S--;
          }
          for (
            g = a[d] = [],
              w = c ? Math.min(S, d) * u - 0.5 : i % S,
              _ = S === Er ? 0 : c ? (d * p) / S - 0.5 : (i / S) | 0,
              T = 0,
              O = Er,
              P = 0;
            P < d;
            P++
          )
            ((v = (P % S) - w),
              (y = _ - ((P / S) | 0)),
              (g[P] = b = l ? Math.abs(l === 'y' ? y : v) : cu(v * v + y * y)),
              b > T && (T = b),
              b < O && (O = b));
          (i === 'random' && Cu(g),
            (g.max = T - O),
            (g.min = O),
            (g.v = d =
              (parseFloat(t.amount) ||
                parseFloat(t.each) *
                  (S > d
                    ? d - 1
                    : l
                      ? l === 'y'
                        ? d / S
                        : S
                      : Math.max(S, d / S)) ||
                0) * (i === 'edges' ? -1 : 1)),
            (g.b = d < 0 ? n - d : n),
            (g.u = Rt(t.amount || t.each) || 0),
            (r = r && d < 0 ? $u(r) : r));
        }
        return (
          (d = (g[m] - g.min) / g.max || 0),
          Qe(g.b + (r ? r(d) : d) * g.v) + g.u
        );
      }
    );
  },
  Eo = function (e) {
    var t = Math.pow(10, ((e + '').split('.')[1] || '').length);
    return function (r) {
      var i = Qe(Math.round(parseFloat(r) / e) * e * t);
      return (i - (i % 1)) / t + (ti(r) ? 0 : Rt(r));
    };
  },
  Pu = function (e, t) {
    var r = $t(e),
      i,
      n;
    return (
      !r &&
        Gr(e) &&
        ((i = r = e.radius || Er),
        e.values
          ? ((e = Cr(e.values)), (n = !ti(e[0])) && (i *= i))
          : (e = Eo(e.increment))),
      Mi(
        t,
        r
          ? st(e)
            ? function (a) {
                return ((n = e(a)), Math.abs(n - a) <= i ? n : a);
              }
            : function (a) {
                for (
                  var o = parseFloat(n ? a.x : a),
                    c = parseFloat(n ? a.y : 0),
                    l = Er,
                    u = 0,
                    p = e.length,
                    m,
                    h;
                  p--;
                )
                  (n
                    ? ((m = e[p].x - o), (h = e[p].y - c), (m = m * m + h * h))
                    : (m = Math.abs(e[p] - o)),
                    m < l && ((l = m), (u = p)));
                return (
                  (u = !i || l <= i ? e[u] : a),
                  n || u === a || ti(a) ? u : u + Rt(a)
                );
              }
          : Eo(e)
      )
    );
  },
  Au = function (e, t, r, i) {
    return Mi($t(e) ? !t : r === !0 ? !!(r = 0) : !i, function () {
      return $t(e)
        ? e[~~(Math.random() * e.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + '').length - 2) : 1) &&
            Math.floor(
              Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) *
                r *
                i
            ) / i;
    });
  },
  Zh = function () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (i) {
      return t.reduce(function (n, a) {
        return a(n);
      }, i);
    };
  },
  Qh = function (e, t) {
    return function (r) {
      return e(parseFloat(r)) + (t || Rt(r));
    };
  },
  Jh = function (e, t, r) {
    return Lu(e, t, 0, 1, r);
  },
  Ou = function (e, t, r) {
    return Mi(r, function (i) {
      return e[~~t(i)];
    });
  },
  em = function s(e, t, r) {
    var i = t - e;
    return $t(e)
      ? Ou(e, s(0, e.length), t)
      : Mi(r, function (n) {
          return ((i + ((n - e) % i)) % i) + e;
        });
  },
  tm = function s(e, t, r) {
    var i = t - e,
      n = i * 2;
    return $t(e)
      ? Ou(e, s(0, e.length - 1), t)
      : Mi(r, function (a) {
          return ((a = (n + ((a - e) % n)) % n || 0), e + (a > i ? n - a : a));
        });
  },
  wn = function (e) {
    return e.replace(Ih, function (t) {
      var r = t.indexOf('[') + 1,
        i = t.substring(r || 7, r ? t.indexOf(']') : t.length - 1).split(Rh);
      return Au(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
    });
  },
  Lu = function (e, t, r, i, n) {
    var a = t - e,
      o = i - r;
    return Mi(n, function (c) {
      return r + (((c - e) / a) * o || 0);
    });
  },
  rm = function s(e, t, r, i) {
    var n = isNaN(e + t)
      ? 0
      : function (h) {
          return (1 - h) * e + h * t;
        };
    if (!n) {
      var a = Tt(e),
        o = {},
        c,
        l,
        u,
        p,
        m;
      if ((r === !0 && (i = 1) && (r = null), a))
        ((e = { p: e }), (t = { p: t }));
      else if ($t(e) && !$t(t)) {
        for (u = [], p = e.length, m = p - 2, l = 1; l < p; l++)
          u.push(s(e[l - 1], e[l]));
        (p--,
          (n = function (f) {
            f *= p;
            var d = Math.min(m, ~~f);
            return u[d](f - d);
          }),
          (r = t));
      } else i || (e = Ps($t(e) ? [] : {}, e));
      if (!u) {
        for (c in t) al.call(o, e, c, 'get', t[c]);
        n = function (f) {
          return ul(f, o) || (a ? e.p : e);
        };
      }
    }
    return Mi(r, n);
  },
  Zl = function (e, t, r) {
    var i = e.labels,
      n = Er,
      a,
      o,
      c;
    for (a in i)
      ((o = i[a] - t),
        o < 0 == !!r && o && n > (o = Math.abs(o)) && ((c = a), (n = o)));
    return c;
  },
  hr = function (e, t, r) {
    var i = e.vars,
      n = i[t],
      a = je,
      o = e._ctx,
      c,
      l,
      u;
    if (n)
      return (
        (c = i[t + 'Params']),
        (l = i.callbackScope || e),
        r && vi.length && ha(),
        o && (je = o),
        (u = c ? n.apply(l, c) : n.call(l)),
        (je = a),
        u
      );
  },
  Hs = function (e) {
    return (
      bi(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!Pt),
      e.progress() < 1 && hr(e, 'onInterrupt'),
      e
    );
  },
  us,
  Du = [],
  ku = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), Jo() || e.headless)) {
        var t = e.name,
          r = st(e),
          i =
            t && !r && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          n = {
            init: _n,
            render: ul,
            add: al,
            kill: _m,
            modifier: vm,
            rawVars: 0,
          },
          a = {
            targetTest: 0,
            get: 0,
            getSetter: cl,
            aliases: {},
            register: 0,
          };
        if ((Ls(), e !== i)) {
          if (lr[t]) return;
          (_r(i, _r(ma(e, n), a)),
            Ps(i.prototype, Ps(n, ma(e, a))),
            (lr[(i.prop = t)] = i),
            e.targetTest && (ra.push(i), (rl[t] = 1)),
            (t =
              (t === 'css' ? 'CSS' : t.charAt(0).toUpperCase() + t.substr(1)) +
              'Plugin'));
        }
        (mu(t, i), e.register && e.register(tr, i, Jt));
      } else Du.push(e);
  },
  Xe = 255,
  Gs = {
    aqua: [0, Xe, Xe],
    lime: [0, Xe, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, Xe],
    navy: [0, 0, 128],
    white: [Xe, Xe, Xe],
    olive: [128, 128, 0],
    yellow: [Xe, Xe, 0],
    orange: [Xe, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [Xe, 0, 0],
    pink: [Xe, 192, 203],
    cyan: [0, Xe, Xe],
    transparent: [Xe, Xe, Xe, 0],
  },
  ja = function (e, t, r) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (r - t) * e * 6
        : e < 0.5
          ? r
          : e * 3 < 2
            ? t + (r - t) * (2 / 3 - e) * 6
            : t) *
        Xe +
        0.5) |
        0
    );
  },
  Iu = function (e, t, r) {
    var i = e ? (ti(e) ? [e >> 16, (e >> 8) & Xe, e & Xe] : 0) : Gs.black,
      n,
      a,
      o,
      c,
      l,
      u,
      p,
      m,
      h,
      f;
    if (!i) {
      if ((e.substr(-1) === ',' && (e = e.substr(0, e.length - 1)), Gs[e]))
        i = Gs[e];
      else if (e.charAt(0) === '#') {
        if (
          (e.length < 6 &&
            ((n = e.charAt(1)),
            (a = e.charAt(2)),
            (o = e.charAt(3)),
            (e =
              '#' +
              n +
              n +
              a +
              a +
              o +
              o +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ''))),
          e.length === 9)
        )
          return (
            (i = parseInt(e.substr(1, 6), 16)),
            [i >> 16, (i >> 8) & Xe, i & Xe, parseInt(e.substr(7), 16) / 255]
          );
        ((e = parseInt(e.substr(1), 16)),
          (i = [e >> 16, (e >> 8) & Xe, e & Xe]));
      } else if (e.substr(0, 3) === 'hsl') {
        if (((i = f = e.match(ql)), !t))
          ((c = (+i[0] % 360) / 360),
            (l = +i[1] / 100),
            (u = +i[2] / 100),
            (a = u <= 0.5 ? u * (l + 1) : u + l - u * l),
            (n = u * 2 - a),
            i.length > 3 && (i[3] *= 1),
            (i[0] = ja(c + 1 / 3, n, a)),
            (i[1] = ja(c, n, a)),
            (i[2] = ja(c - 1 / 3, n, a)));
        else if (~e.indexOf('='))
          return ((i = e.match(du)), r && i.length < 4 && (i[3] = 1), i);
      } else i = e.match(ql) || Gs.transparent;
      i = i.map(Number);
    }
    return (
      t &&
        !f &&
        ((n = i[0] / Xe),
        (a = i[1] / Xe),
        (o = i[2] / Xe),
        (p = Math.max(n, a, o)),
        (m = Math.min(n, a, o)),
        (u = (p + m) / 2),
        p === m
          ? (c = l = 0)
          : ((h = p - m),
            (l = u > 0.5 ? h / (2 - p - m) : h / (p + m)),
            (c =
              p === n
                ? (a - o) / h + (a < o ? 6 : 0)
                : p === a
                  ? (o - n) / h + 2
                  : (n - a) / h + 4),
            (c *= 60)),
        (i[0] = ~~(c + 0.5)),
        (i[1] = ~~(l * 100 + 0.5)),
        (i[2] = ~~(u * 100 + 0.5))),
      r && i.length < 4 && (i[3] = 1),
      i
    );
  },
  Ru = function (e) {
    var t = [],
      r = [],
      i = -1;
    return (
      e.split(_i).forEach(function (n) {
        var a = n.match(cs) || [];
        (t.push.apply(t, a), r.push((i += a.length + 1)));
      }),
      (t.c = r),
      t
    );
  },
  Ql = function (e, t, r) {
    var i = '',
      n = (e + i).match(_i),
      a = t ? 'hsla(' : 'rgba(',
      o = 0,
      c,
      l,
      u,
      p;
    if (!n) return e;
    if (
      ((n = n.map(function (m) {
        return (
          (m = Iu(m, t, 1)) &&
          a +
            (t ? m[0] + ',' + m[1] + '%,' + m[2] + '%,' + m[3] : m.join(',')) +
            ')'
        );
      })),
      r && ((u = Ru(e)), (c = r.c), c.join(i) !== u.c.join(i)))
    )
      for (l = e.replace(_i, '1').split(cs), p = l.length - 1; o < p; o++)
        i +=
          l[o] +
          (~c.indexOf(o)
            ? n.shift() || a + '0,0,0,0)'
            : (u.length ? u : n.length ? n : r).shift());
    if (!l)
      for (l = e.split(_i), p = l.length - 1; o < p; o++) i += l[o] + n[o];
    return i + l[p];
  },
  _i = (function () {
    var s =
        '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b',
      e;
    for (e in Gs) s += '|' + e + '\\b';
    return new RegExp(s + ')', 'gi');
  })(),
  im = /hsl[a]?\(/,
  zu = function (e) {
    var t = e.join(' '),
      r;
    if (((_i.lastIndex = 0), _i.test(t)))
      return (
        (r = im.test(t)),
        (e[1] = Ql(e[1], r)),
        (e[0] = Ql(e[0], r, Ru(e[1]))),
        !0
      );
  },
  yn,
  dr = (function () {
    var s = Date.now,
      e = 500,
      t = 33,
      r = s(),
      i = r,
      n = 1e3 / 240,
      a = n,
      o = [],
      c,
      l,
      u,
      p,
      m,
      h,
      f = function d(g) {
        var w = s() - i,
          _ = g === !0,
          v,
          y,
          b,
          P;
        if (
          ((w > e || w < 0) && (r += w - t),
          (i += w),
          (b = i - r),
          (v = b - a),
          (v > 0 || _) &&
            ((P = ++p.frame),
            (m = b - p.time * 1e3),
            (p.time = b = b / 1e3),
            (a += v + (v >= n ? 4 : n - v)),
            (y = 1)),
          _ || (c = l(d)),
          y)
        )
          for (h = 0; h < o.length; h++) o[h](b, m, P, g);
      };
    return (
      (p = {
        time: 0,
        frame: 0,
        tick: function () {
          f(!0);
        },
        deltaRatio: function (g) {
          return m / (1e3 / (g || 60));
        },
        wake: function () {
          pu &&
            (!wo &&
              Jo() &&
              ((Nr = wo = window),
              (el = Nr.document || {}),
              (vr.gsap = tr),
              (Nr.gsapVersions || (Nr.gsapVersions = [])).push(tr.version),
              hu(pa || Nr.GreenSockGlobals || (!Nr.gsap && Nr) || {}),
              Du.forEach(ku)),
            (u = typeof requestAnimationFrame < 'u' && requestAnimationFrame),
            c && p.sleep(),
            (l =
              u ||
              function (g) {
                return setTimeout(g, (a - p.time * 1e3 + 1) | 0);
              }),
            (yn = 1),
            f(2));
        },
        sleep: function () {
          ((u ? cancelAnimationFrame : clearTimeout)(c), (yn = 0), (l = _n));
        },
        lagSmoothing: function (g, w) {
          ((e = g || 1 / 0), (t = Math.min(w || 33, e)));
        },
        fps: function (g) {
          ((n = 1e3 / (g || 240)), (a = p.time * 1e3 + n));
        },
        add: function (g, w, _) {
          var v = w
            ? function (y, b, P, T) {
                (g(y, b, P, T), p.remove(v));
              }
            : g;
          return (p.remove(g), o[_ ? 'unshift' : 'push'](v), Ls(), v);
        },
        remove: function (g, w) {
          ~(w = o.indexOf(g)) && o.splice(w, 1) && h >= w && h--;
        },
        _listeners: o,
      }),
      p
    );
  })(),
  Ls = function () {
    return !yn && dr.wake();
  },
  Le = {},
  sm = /^[\d.\-M][\d.\-,\s]/,
  nm = /["']/g,
  am = function (e) {
    for (
      var t = {},
        r = e.substr(1, e.length - 3).split(':'),
        i = r[0],
        n = 1,
        a = r.length,
        o,
        c,
        l;
      n < a;
      n++
    )
      ((c = r[n]),
        (o = n !== a - 1 ? c.lastIndexOf(',') : c.length),
        (l = c.substr(0, o)),
        (t[i] = isNaN(l) ? l.replace(nm, '').trim() : +l),
        (i = c.substr(o + 1).trim()));
    return t;
  },
  om = function (e) {
    var t = e.indexOf('(') + 1,
      r = e.indexOf(')'),
      i = e.indexOf('(', t);
    return e.substring(t, ~i && i < r ? e.indexOf(')', r + 1) : r);
  },
  lm = function (e) {
    var t = (e + '').split('('),
      r = Le[t[0]];
    return r && t.length > 1 && r.config
      ? r.config.apply(
          null,
          ~e.indexOf('{') ? [am(t[1])] : om(e).split(',').map(wu)
        )
      : Le._CE && sm.test(e)
        ? Le._CE('', e)
        : r;
  },
  $u = function (e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
  Nu = function s(e, t) {
    for (var r = e._first, i; r; )
      (r instanceof qt
        ? s(r, t)
        : r.vars.yoyoEase &&
          (!r._yoyo || !r._repeat) &&
          r._yoyo !== t &&
          (r.timeline
            ? s(r.timeline, t)
            : ((i = r._ease),
              (r._ease = r._yEase),
              (r._yEase = i),
              (r._yoyo = t))),
        (r = r._next));
  },
  Gi = function (e, t) {
    return (e && (st(e) ? e : Le[e] || lm(e))) || t;
  },
  es = function (e, t, r, i) {
    (r === void 0 &&
      (r = function (c) {
        return 1 - t(1 - c);
      }),
      i === void 0 &&
        (i = function (c) {
          return c < 0.5 ? t(c * 2) / 2 : 1 - t((1 - c) * 2) / 2;
        }));
    var n = { easeIn: t, easeOut: r, easeInOut: i },
      a;
    return (
      Qt(e, function (o) {
        ((Le[o] = vr[o] = n), (Le[(a = o.toLowerCase())] = r));
        for (var c in n)
          Le[
            a + (c === 'easeIn' ? '.in' : c === 'easeOut' ? '.out' : '.inOut')
          ] = Le[o + '.' + c] = n[c];
      }),
      n
    );
  },
  Bu = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
    };
  },
  Ka = function s(e, t, r) {
    var i = t >= 1 ? t : 1,
      n = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      a = (n / _o) * (Math.asin(1 / i) || 0),
      o = function (u) {
        return u === 1 ? 1 : i * Math.pow(2, -10 * u) * kh((u - a) * n) + 1;
      },
      c =
        e === 'out'
          ? o
          : e === 'in'
            ? function (l) {
                return 1 - o(1 - l);
              }
            : Bu(o);
    return (
      (n = _o / n),
      (c.config = function (l, u) {
        return s(e, l, u);
      }),
      c
    );
  },
  Za = function s(e, t) {
    t === void 0 && (t = 1.70158);
    var r = function (a) {
        return a ? --a * a * ((t + 1) * a + t) + 1 : 0;
      },
      i =
        e === 'out'
          ? r
          : e === 'in'
            ? function (n) {
                return 1 - r(1 - n);
              }
            : Bu(r);
    return (
      (i.config = function (n) {
        return s(e, n);
      }),
      i
    );
  };
Qt('Linear,Quad,Cubic,Quart,Quint,Strong', function (s, e) {
  var t = e < 5 ? e + 1 : e;
  es(
    s + ',Power' + (t - 1),
    e
      ? function (r) {
          return Math.pow(r, t);
        }
      : function (r) {
          return r;
        },
    function (r) {
      return 1 - Math.pow(1 - r, t);
    },
    function (r) {
      return r < 0.5
        ? Math.pow(r * 2, t) / 2
        : 1 - Math.pow((1 - r) * 2, t) / 2;
    }
  );
});
Le.Linear.easeNone = Le.none = Le.Linear.easeIn;
es('Elastic', Ka('in'), Ka('out'), Ka());
(function (s, e) {
  var t = 1 / e,
    r = 2 * t,
    i = 2.5 * t,
    n = function (o) {
      return o < t
        ? s * o * o
        : o < r
          ? s * Math.pow(o - 1.5 / e, 2) + 0.75
          : o < i
            ? s * (o -= 2.25 / e) * o + 0.9375
            : s * Math.pow(o - 2.625 / e, 2) + 0.984375;
    };
  es(
    'Bounce',
    function (a) {
      return 1 - n(1 - a);
    },
    n
  );
})(7.5625, 2.75);
es('Expo', function (s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
es('Circ', function (s) {
  return -(cu(1 - s * s) - 1);
});
es('Sine', function (s) {
  return s === 1 ? 1 : -Dh(s * Oh) + 1;
});
es('Back', Za('in'), Za('out'), Za());
Le.SteppedEase =
  Le.steps =
  vr.SteppedEase =
    {
      config: function (e, t) {
        e === void 0 && (e = 1);
        var r = 1 / e,
          i = e + (t ? 0 : 1),
          n = t ? 1 : 0,
          a = 1 - He;
        return function (o) {
          return (((i * Mn(0, a, o)) | 0) + n) * r;
        };
      },
    };
Ms.ease = Le['quad.out'];
Qt(
  'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
  function (s) {
    return (il += s + ',' + s + 'Params,');
  }
);
var Fu = function (e, t) {
    ((this.id = Lh++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : vu),
      (this.set = t ? t.getSetter : cl));
  },
  bn = (function () {
    function s(t) {
      ((this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        Os(this, +t.duration, 1, 1),
        (this.data = t.data),
        je && ((this._ctx = je), je.data.push(this)),
        yn || dr.wake());
    }
    var e = s.prototype;
    return (
      (e.delay = function (r) {
        return r || r === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + r - this._delay),
            (this._delay = r),
            this)
          : this._delay;
      }),
      (e.duration = function (r) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r
            )
          : this.totalDuration() && this._dur;
      }),
      (e.totalDuration = function (r) {
        return arguments.length
          ? ((this._dirty = 0),
            Os(
              this,
              this._repeat < 0
                ? r
                : (r - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (r, i) {
        if ((Ls(), !arguments.length)) return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
          for (Oa(this, r), !n._dp || n.parent || Tu(n, this); n && n.parent; )
            (n.parent._time !==
              n._start +
                (n._ts >= 0
                  ? n._tTime / n._ts
                  : (n.totalDuration() - n._tTime) / -n._ts) &&
              n.totalTime(n._tTime, !0),
              (n = n.parent));
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && r < this._tDur) ||
              (this._ts < 0 && r > 0) ||
              (!this._tDur && !r)) &&
            Yr(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== r ||
            (!this._dur && !i) ||
            (this._initted && Math.abs(this._zTime) === He) ||
            (!this._initted && this._dur && r) ||
            (!r && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = r), _u(this, r, i)),
          this
        );
      }),
      (e.time = function (r, i) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), r + jl(this)) %
                (this._dur + this._rDelay) || (r ? this._dur : 0),
              i
            )
          : this._time;
      }),
      (e.totalProgress = function (r, i) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * r, i)
          : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.rawTime() >= 0 && this._initted
              ? 1
              : 0;
      }),
      (e.progress = function (r, i) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) +
                jl(this),
              i
            )
          : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.rawTime() > 0
              ? 1
              : 0;
      }),
      (e.iteration = function (r, i) {
        var n = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (r - 1) * n, i)
          : this._repeat
            ? As(this._tTime, n) + 1
            : 1;
      }),
      (e.timeScale = function (r, i) {
        if (!arguments.length) return this._rts === -He ? 0 : this._rts;
        if (this._rts === r) return this;
        var n =
          this.parent && this._ts ? ga(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +r || 0),
          (this._ts = this._ps || r === -He ? 0 : this._rts),
          this.totalTime(
            Mn(-Math.abs(this._delay), this.totalDuration(), n),
            i !== !1
          ),
          Aa(this),
          Xh(this)
        );
      }),
      (e.paused = function (r) {
        return arguments.length
          ? (this._ps !== r &&
              ((this._ps = r),
              r
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Ls(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== He &&
                      (this._tTime -= He)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (r) {
        if (arguments.length) {
          this._start = Qe(r);
          var i = this.parent || this._dp;
          return (
            i &&
              (i._sort || !this.parent) &&
              Yr(i, this, this._start - this._delay),
            this
          );
        }
        return this._start;
      }),
      (e.endTime = function (r) {
        return (
          this._start +
          (Zt(r) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (e.rawTime = function (r) {
        var i = this.parent || this._dp;
        return i
          ? r &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
              ? ga(i.rawTime(r), this)
              : this._tTime
          : this._tTime;
      }),
      (e.revert = function (r) {
        r === void 0 && (r = Bh);
        var i = Pt;
        return (
          (Pt = r),
          nl(this) &&
            (this.timeline && this.timeline.revert(r),
            this.totalTime(-0.01, r.suppressEvents)),
          this.data !== 'nested' && r.kill !== !1 && this.kill(),
          (Pt = i),
          this
        );
      }),
      (e.globalTime = function (r) {
        for (var i = this, n = arguments.length ? r : i.rawTime(); i; )
          ((n = i._start + n / (Math.abs(i._ts) || 1)), (i = i._dp));
        return !this.parent && this._sat ? this._sat.globalTime(r) : n;
      }),
      (e.repeat = function (r) {
        return arguments.length
          ? ((this._repeat = r === 1 / 0 ? -2 : r), Kl(this))
          : this._repeat === -2
            ? 1 / 0
            : this._repeat;
      }),
      (e.repeatDelay = function (r) {
        if (arguments.length) {
          var i = this._time;
          return ((this._rDelay = r), Kl(this), i ? this.time(i) : this);
        }
        return this._rDelay;
      }),
      (e.yoyo = function (r) {
        return arguments.length ? ((this._yoyo = r), this) : this._yoyo;
      }),
      (e.seek = function (r, i) {
        return this.totalTime(yr(this, r), Zt(i));
      }),
      (e.restart = function (r, i) {
        return (
          this.play().totalTime(r ? -this._delay : 0, Zt(i)),
          this._dur || (this._zTime = -He),
          this
        );
      }),
      (e.play = function (r, i) {
        return (r != null && this.seek(r, i), this.reversed(!1).paused(!1));
      }),
      (e.reverse = function (r, i) {
        return (
          r != null && this.seek(r || this.totalDuration(), i),
          this.reversed(!0).paused(!1)
        );
      }),
      (e.pause = function (r, i) {
        return (r != null && this.seek(r, i), this.paused(!0));
      }),
      (e.resume = function () {
        return this.paused(!1);
      }),
      (e.reversed = function (r) {
        return arguments.length
          ? (!!r !== this.reversed() &&
              this.timeScale(-this._rts || (r ? -He : 0)),
            this)
          : this._rts < 0;
      }),
      (e.invalidate = function () {
        return ((this._initted = this._act = 0), (this._zTime = -He), this);
      }),
      (e.isActive = function () {
        var r = this.parent || this._dp,
          i = this._start,
          n;
        return !!(
          !r ||
          (this._ts &&
            this._initted &&
            r.isActive() &&
            (n = r.rawTime(!0)) >= i &&
            n < this.endTime(!0) - He)
        );
      }),
      (e.eventCallback = function (r, i, n) {
        var a = this.vars;
        return arguments.length > 1
          ? (i
              ? ((a[r] = i),
                n && (a[r + 'Params'] = n),
                r === 'onUpdate' && (this._onUpdate = i))
              : delete a[r],
            this)
          : a[r];
      }),
      (e.then = function (r) {
        var i = this,
          n = i._prom;
        return new Promise(function (a) {
          var o = st(r) ? r : yu,
            c = function () {
              var u = i.then;
              ((i.then = null),
                n && n(),
                st(o) && (o = o(i)) && (o.then || o === i) && (i.then = u),
                a(o),
                (i.then = u));
            };
          (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
          (!i._tTime && i._ts < 0)
            ? c()
            : (i._prom = c);
        });
      }),
      (e.kill = function () {
        Hs(this);
      }),
      s
    );
  })();
_r(bn.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -He,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var qt = (function (s) {
  lu(e, s);
  function e(r, i) {
    var n;
    return (
      r === void 0 && (r = {}),
      (n = s.call(this, r) || this),
      (n.labels = {}),
      (n.smoothChildTiming = !!r.smoothChildTiming),
      (n.autoRemoveChildren = !!r.autoRemoveChildren),
      (n._sort = Zt(r.sortChildren)),
      Je && Yr(r.parent || Je, Wr(n), i),
      r.reversed && n.reverse(),
      r.paused && n.paused(!0),
      r.scrollTrigger && xu(Wr(n), r.scrollTrigger),
      n
    );
  }
  var t = e.prototype;
  return (
    (t.to = function (i, n, a) {
      return (tn(0, arguments, this), this);
    }),
    (t.from = function (i, n, a) {
      return (tn(1, arguments, this), this);
    }),
    (t.fromTo = function (i, n, a, o) {
      return (tn(2, arguments, this), this);
    }),
    (t.set = function (i, n, a) {
      return (
        (n.duration = 0),
        (n.parent = this),
        en(n).repeatDelay || (n.repeat = 0),
        (n.immediateRender = !!n.immediateRender),
        new ft(i, n, yr(this, a), 1),
        this
      );
    }),
    (t.call = function (i, n, a) {
      return Yr(this, ft.delayedCall(0, i, n), a);
    }),
    (t.staggerTo = function (i, n, a, o, c, l, u) {
      return (
        (a.duration = n),
        (a.stagger = a.stagger || o),
        (a.onComplete = l),
        (a.onCompleteParams = u),
        (a.parent = this),
        new ft(i, a, yr(this, c)),
        this
      );
    }),
    (t.staggerFrom = function (i, n, a, o, c, l, u) {
      return (
        (a.runBackwards = 1),
        (en(a).immediateRender = Zt(a.immediateRender)),
        this.staggerTo(i, n, a, o, c, l, u)
      );
    }),
    (t.staggerFromTo = function (i, n, a, o, c, l, u, p) {
      return (
        (o.startAt = a),
        (en(o).immediateRender = Zt(o.immediateRender)),
        this.staggerTo(i, n, o, c, l, u, p)
      );
    }),
    (t.render = function (i, n, a) {
      var o = this._time,
        c = this._dirty ? this.totalDuration() : this._tDur,
        l = this._dur,
        u = i <= 0 ? 0 : Qe(i),
        p = this._zTime < 0 != i < 0 && (this._initted || !l),
        m,
        h,
        f,
        d,
        g,
        w,
        _,
        v,
        y,
        b,
        P,
        T;
      if (
        (this !== Je && u > c && i >= 0 && (u = c), u !== this._tTime || a || p)
      ) {
        if (
          (o !== this._time &&
            l &&
            ((u += this._time - o), (i += this._time - o)),
          (m = u),
          (y = this._start),
          (v = this._ts),
          (w = !v),
          p && (l || (o = this._zTime), (i || !n) && (this._zTime = i)),
          this._repeat)
        ) {
          if (
            ((P = this._yoyo),
            (g = l + this._rDelay),
            this._repeat < -1 && i < 0)
          )
            return this.totalTime(g * 100 + i, n, a);
          if (
            ((m = Qe(u % g)),
            u === c
              ? ((d = this._repeat), (m = l))
              : ((b = Qe(u / g)),
                (d = ~~b),
                d && d === b && ((m = l), d--),
                m > l && (m = l)),
            (b = As(this._tTime, g)),
            !o &&
              this._tTime &&
              b !== d &&
              this._tTime - b * g - this._dur <= 0 &&
              (b = d),
            P && d & 1 && ((m = l - m), (T = 1)),
            d !== b && !this._lock)
          ) {
            var O = P && b & 1,
              S = O === (P && d & 1);
            if (
              (d < b && (O = !O),
              (o = O ? 0 : u % l ? l : u),
              (this._lock = 1),
              (this.render(o || (T ? 0 : Qe(d * g)), n, !l)._lock = 0),
              (this._tTime = u),
              !n && this.parent && hr(this, 'onRepeat'),
              this.vars.repeatRefresh &&
                !T &&
                ((this.invalidate()._lock = 1), (b = d)),
              (o && o !== this._time) ||
                w !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((l = this._dur),
              (c = this._tDur),
              S &&
                ((this._lock = 2),
                (o = O ? l : -1e-4),
                this.render(o, !0),
                this.vars.repeatRefresh && !T && this.invalidate()),
              (this._lock = 0),
              !this._ts && !w)
            )
              return this;
            Nu(this, T);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((_ = Wh(this, Qe(o), Qe(m))), _ && (u -= m - (m = _._start))),
          (this._tTime = u),
          (this._time = m),
          (this._act = !v),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = i),
            (o = 0)),
          !o && u && l && !n && !b && (hr(this, 'onStart'), this._tTime !== u))
        )
          return this;
        if (m >= o && i >= 0)
          for (h = this._first; h; ) {
            if (
              ((f = h._next), (h._act || m >= h._start) && h._ts && _ !== h)
            ) {
              if (h.parent !== this) return this.render(i, n, a);
              if (
                (h.render(
                  h._ts > 0
                    ? (m - h._start) * h._ts
                    : (h._dirty ? h.totalDuration() : h._tDur) +
                        (m - h._start) * h._ts,
                  n,
                  a
                ),
                m !== this._time || (!this._ts && !w))
              ) {
                ((_ = 0), f && (u += this._zTime = -He));
                break;
              }
            }
            h = f;
          }
        else {
          h = this._last;
          for (var E = i < 0 ? i : m; h; ) {
            if (((f = h._prev), (h._act || E <= h._end) && h._ts && _ !== h)) {
              if (h.parent !== this) return this.render(i, n, a);
              if (
                (h.render(
                  h._ts > 0
                    ? (E - h._start) * h._ts
                    : (h._dirty ? h.totalDuration() : h._tDur) +
                        (E - h._start) * h._ts,
                  n,
                  a || (Pt && nl(h))
                ),
                m !== this._time || (!this._ts && !w))
              ) {
                ((_ = 0), f && (u += this._zTime = E ? -He : He));
                break;
              }
            }
            h = f;
          }
        }
        if (
          _ &&
          !n &&
          (this.pause(),
          (_.render(m >= o ? 0 : -He)._zTime = m >= o ? 1 : -1),
          this._ts)
        )
          return ((this._start = y), Aa(this), this.render(i, n, a));
        (this._onUpdate && !n && hr(this, 'onUpdate', !0),
          ((u === c && this._tTime >= this.totalDuration()) || (!u && o)) &&
            (y === this._start || Math.abs(v) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((i || !l) &&
                ((u === c && this._ts > 0) || (!u && this._ts < 0)) &&
                bi(this, 1),
              !n &&
                !(i < 0 && !o) &&
                (u || o || !c) &&
                (hr(
                  this,
                  u === c && i >= 0 ? 'onComplete' : 'onReverseComplete',
                  !0
                ),
                this._prom &&
                  !(u < c && this.timeScale() > 0) &&
                  this._prom()))));
      }
      return this;
    }),
    (t.add = function (i, n) {
      var a = this;
      if ((ti(n) || (n = yr(this, n, i)), !(i instanceof bn))) {
        if ($t(i))
          return (
            i.forEach(function (o) {
              return a.add(o, n);
            }),
            this
          );
        if (Tt(i)) return this.addLabel(i, n);
        if (st(i)) i = ft.delayedCall(0, i);
        else return this;
      }
      return this !== i ? Yr(this, i, n) : this;
    }),
    (t.getChildren = function (i, n, a, o) {
      (i === void 0 && (i = !0),
        n === void 0 && (n = !0),
        a === void 0 && (a = !0),
        o === void 0 && (o = -Er));
      for (var c = [], l = this._first; l; )
        (l._start >= o &&
          (l instanceof ft
            ? n && c.push(l)
            : (a && c.push(l), i && c.push.apply(c, l.getChildren(!0, n, a)))),
          (l = l._next));
      return c;
    }),
    (t.getById = function (i) {
      for (var n = this.getChildren(1, 1, 1), a = n.length; a--; )
        if (n[a].vars.id === i) return n[a];
    }),
    (t.remove = function (i) {
      return Tt(i)
        ? this.removeLabel(i)
        : st(i)
          ? this.killTweensOf(i)
          : (i.parent === this && Pa(this, i),
            i === this._recent && (this._recent = this._last),
            Hi(this));
    }),
    (t.totalTime = function (i, n) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = Qe(
              dr.time -
                (this._ts > 0
                  ? i / this._ts
                  : (this.totalDuration() - i) / -this._ts)
            )),
          s.prototype.totalTime.call(this, i, n),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (t.addLabel = function (i, n) {
      return ((this.labels[i] = yr(this, n)), this);
    }),
    (t.removeLabel = function (i) {
      return (delete this.labels[i], this);
    }),
    (t.addPause = function (i, n, a) {
      var o = ft.delayedCall(0, n || _n, a);
      return (
        (o.data = 'isPause'),
        (this._hasPause = 1),
        Yr(this, o, yr(this, i))
      );
    }),
    (t.removePause = function (i) {
      var n = this._first;
      for (i = yr(this, i); n; )
        (n._start === i && n.data === 'isPause' && bi(n), (n = n._next));
    }),
    (t.killTweensOf = function (i, n, a) {
      for (var o = this.getTweensOf(i, a), c = o.length; c--; )
        fi !== o[c] && o[c].kill(i, n);
      return this;
    }),
    (t.getTweensOf = function (i, n) {
      for (var a = [], o = Cr(i), c = this._first, l = ti(n), u; c; )
        (c instanceof ft
          ? Fh(c._targets, o) &&
            (l
              ? (!fi || (c._initted && c._ts)) &&
                c.globalTime(0) <= n &&
                c.globalTime(c.totalDuration()) > n
              : !n || c.isActive()) &&
            a.push(c)
          : (u = c.getTweensOf(o, n)).length && a.push.apply(a, u),
          (c = c._next));
      return a;
    }),
    (t.tweenTo = function (i, n) {
      n = n || {};
      var a = this,
        o = yr(a, i),
        c = n,
        l = c.startAt,
        u = c.onStart,
        p = c.onStartParams,
        m = c.immediateRender,
        h,
        f = ft.to(
          a,
          _r(
            {
              ease: n.ease || 'none',
              lazy: !1,
              immediateRender: !1,
              time: o,
              overwrite: 'auto',
              duration:
                n.duration ||
                Math.abs(
                  (o - (l && 'time' in l ? l.time : a._time)) / a.timeScale()
                ) ||
                He,
              onStart: function () {
                if ((a.pause(), !h)) {
                  var g =
                    n.duration ||
                    Math.abs(
                      (o - (l && 'time' in l ? l.time : a._time)) /
                        a.timeScale()
                    );
                  (f._dur !== g && Os(f, g, 0, 1).render(f._time, !0, !0),
                    (h = 1));
                }
                u && u.apply(f, p || []);
              },
            },
            n
          )
        );
      return m ? f.render(0) : f;
    }),
    (t.tweenFromTo = function (i, n, a) {
      return this.tweenTo(n, _r({ startAt: { time: yr(this, i) } }, a));
    }),
    (t.recent = function () {
      return this._recent;
    }),
    (t.nextLabel = function (i) {
      return (i === void 0 && (i = this._time), Zl(this, yr(this, i)));
    }),
    (t.previousLabel = function (i) {
      return (i === void 0 && (i = this._time), Zl(this, yr(this, i), 1));
    }),
    (t.currentLabel = function (i) {
      return arguments.length
        ? this.seek(i, !0)
        : this.previousLabel(this._time + He);
    }),
    (t.shiftChildren = function (i, n, a) {
      a === void 0 && (a = 0);
      var o = this._first,
        c = this.labels,
        l;
      for (i = Qe(i); o; )
        (o._start >= a && ((o._start += i), (o._end += i)), (o = o._next));
      if (n) for (l in c) c[l] >= a && (c[l] += i);
      return Hi(this);
    }),
    (t.invalidate = function (i) {
      var n = this._first;
      for (this._lock = 0; n; ) (n.invalidate(i), (n = n._next));
      return s.prototype.invalidate.call(this, i);
    }),
    (t.clear = function (i) {
      i === void 0 && (i = !0);
      for (var n = this._first, a; n; )
        ((a = n._next), this.remove(n), (n = a));
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        i && (this.labels = {}),
        Hi(this)
      );
    }),
    (t.totalDuration = function (i) {
      var n = 0,
        a = this,
        o = a._last,
        c = Er,
        l,
        u,
        p;
      if (arguments.length)
        return a.timeScale(
          (a._repeat < 0 ? a.duration() : a.totalDuration()) /
            (a.reversed() ? -i : i)
        );
      if (a._dirty) {
        for (p = a.parent; o; )
          ((l = o._prev),
            o._dirty && o.totalDuration(),
            (u = o._start),
            u > c && a._sort && o._ts && !a._lock
              ? ((a._lock = 1), (Yr(a, o, u - o._delay, 1)._lock = 0))
              : (c = u),
            u < 0 &&
              o._ts &&
              ((n -= u),
              ((!p && !a._dp) || (p && p.smoothChildTiming)) &&
                ((a._start += Qe(u / a._ts)), (a._time -= u), (a._tTime -= u)),
              a.shiftChildren(-u, !1, -1 / 0),
              (c = 0)),
            o._end > n && o._ts && (n = o._end),
            (o = l));
        (Os(a, a === Je && a._time > n ? a._time : n, 1, 1), (a._dirty = 0));
      }
      return a._tDur;
    }),
    (e.updateRoot = function (i) {
      if ((Je._ts && (_u(Je, ga(i, Je)), (gu = dr.frame)), dr.frame >= Wl)) {
        Wl += gr.autoSleep || 120;
        var n = Je._first;
        if ((!n || !n._ts) && gr.autoSleep && dr._listeners.length < 2) {
          for (; n && !n._ts; ) n = n._next;
          n || dr.sleep();
        }
      }
    }),
    e
  );
})(bn);
_r(qt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var cm = function (e, t, r, i, n, a, o) {
    var c = new Jt(this._pt, e, t, 0, 1, qu, null, n),
      l = 0,
      u = 0,
      p,
      m,
      h,
      f,
      d,
      g,
      w,
      _;
    for (
      c.b = r,
        c.e = i,
        r += '',
        i += '',
        (w = ~i.indexOf('random(')) && (i = wn(i)),
        a && ((_ = [r, i]), a(_, e, t), (r = _[0]), (i = _[1])),
        m = r.match(Wa) || [];
      (p = Wa.exec(i));
    )
      ((f = p[0]),
        (d = i.substring(l, p.index)),
        h ? (h = (h + 1) % 5) : d.substr(-5) === 'rgba(' && (h = 1),
        f !== m[u++] &&
          ((g = parseFloat(m[u - 1]) || 0),
          (c._pt = {
            _next: c._pt,
            p: d || u === 1 ? d : ',',
            s: g,
            c: f.charAt(1) === '=' ? ms(g, f) - g : parseFloat(f) - g,
            m: h && h < 4 ? Math.round : 0,
          }),
          (l = Wa.lastIndex)));
    return (
      (c.c = l < i.length ? i.substring(l, i.length) : ''),
      (c.fp = o),
      (fu.test(i) || w) && (c.e = 0),
      (this._pt = c),
      c
    );
  },
  al = function (e, t, r, i, n, a, o, c, l, u) {
    st(i) && (i = i(n || 0, e, a));
    var p = e[t],
      m =
        r !== 'get'
          ? r
          : st(p)
            ? l
              ? e[
                  t.indexOf('set') || !st(e['get' + t.substr(3)])
                    ? t
                    : 'get' + t.substr(3)
                ](l)
              : e[t]()
            : p,
      h = st(p) ? (l ? hm : Hu) : ll,
      f;
    if (
      (Tt(i) &&
        (~i.indexOf('random(') && (i = wn(i)),
        i.charAt(1) === '=' &&
          ((f = ms(m, i) + (Rt(m) || 0)), (f || f === 0) && (i = f))),
      !u || m !== i || Co)
    )
      return !isNaN(m * i) && i !== ''
        ? ((f = new Jt(
            this._pt,
            e,
            t,
            +m || 0,
            i - (m || 0),
            typeof p == 'boolean' ? gm : Gu,
            0,
            h
          )),
          l && (f.fp = l),
          o && f.modifier(o, this, e),
          (this._pt = f))
        : (!p && !(t in e) && tl(t, i),
          cm.call(this, e, t, m, i, h, c || gr.stringFilter, l));
  },
  um = function (e, t, r, i, n) {
    if (
      (st(e) && (e = rn(e, n, t, r, i)),
      !Gr(e) || (e.style && e.nodeType) || $t(e) || uu(e))
    )
      return Tt(e) ? rn(e, n, t, r, i) : e;
    var a = {},
      o;
    for (o in e) a[o] = rn(e[o], n, t, r, i);
    return a;
  },
  Yu = function (e, t, r, i, n, a) {
    var o, c, l, u;
    if (
      lr[e] &&
      (o = new lr[e]()).init(
        n,
        o.rawVars ? t[e] : um(t[e], i, n, a, r),
        r,
        i,
        a
      ) !== !1 &&
      ((r._pt = c = new Jt(r._pt, n, e, 0, 1, o.render, o, 0, o.priority)),
      r !== us)
    )
      for (l = r._ptLookup[r._targets.indexOf(n)], u = o._props.length; u--; )
        l[o._props[u]] = c;
    return o;
  },
  fi,
  Co,
  ol = function s(e, t, r) {
    var i = e.vars,
      n = i.ease,
      a = i.startAt,
      o = i.immediateRender,
      c = i.lazy,
      l = i.onUpdate,
      u = i.runBackwards,
      p = i.yoyoEase,
      m = i.keyframes,
      h = i.autoRevert,
      f = e._dur,
      d = e._startAt,
      g = e._targets,
      w = e.parent,
      _ = w && w.data === 'nested' ? w.vars.targets : g,
      v = e._overwrite === 'auto' && !Zo,
      y = e.timeline,
      b,
      P,
      T,
      O,
      S,
      E,
      I,
      A,
      k,
      x,
      L,
      $,
      M;
    if (
      (y && (!m || !n) && (n = 'none'),
      (e._ease = Gi(n, Ms.ease)),
      (e._yEase = p ? $u(Gi(p === !0 ? n : p, Ms.ease)) : 0),
      p &&
        e._yoyo &&
        !e._repeat &&
        ((p = e._yEase), (e._yEase = e._ease), (e._ease = p)),
      (e._from = !y && !!i.runBackwards),
      !y || (m && !i.stagger))
    ) {
      if (
        ((A = g[0] ? Xi(g[0]).harness : 0),
        ($ = A && i[A.prop]),
        (b = ma(i, rl)),
        d &&
          (d._zTime < 0 && d.progress(1),
          t < 0 && u && o && !h ? d.render(-1, !0) : d.revert(u && f ? ta : Nh),
          (d._lazy = 0)),
        a)
      ) {
        if (
          (bi(
            (e._startAt = ft.set(
              g,
              _r(
                {
                  data: 'isStart',
                  overwrite: !1,
                  parent: w,
                  immediateRender: !0,
                  lazy: !d && Zt(c),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    l &&
                    function () {
                      return hr(e, 'onUpdate');
                    },
                  stagger: 0,
                },
                a
              )
            ))
          ),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (Pt || (!o && !h)) && e._startAt.revert(ta),
          o && f && t <= 0 && r <= 0)
        ) {
          t && (e._zTime = t);
          return;
        }
      } else if (u && f && !d) {
        if (
          (t && (o = !1),
          (T = _r(
            {
              overwrite: !1,
              data: 'isFromStart',
              lazy: o && !d && Zt(c),
              immediateRender: o,
              stagger: 0,
              parent: w,
            },
            b
          )),
          $ && (T[A.prop] = $),
          bi((e._startAt = ft.set(g, T))),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (Pt ? e._startAt.revert(ta) : e._startAt.render(-1, !0)),
          (e._zTime = t),
          !o)
        )
          s(e._startAt, He, He);
        else if (!t) return;
      }
      for (
        e._pt = e._ptCache = 0, c = (f && Zt(c)) || (c && !f), P = 0;
        P < g.length;
        P++
      ) {
        if (
          ((S = g[P]),
          (I = S._gsap || sl(g)[P]._gsap),
          (e._ptLookup[P] = x = {}),
          yo[I.id] && vi.length && ha(),
          (L = _ === g ? P : _.indexOf(S)),
          A &&
            (k = new A()).init(S, $ || b, e, L, _) !== !1 &&
            ((e._pt = O =
              new Jt(e._pt, S, k.name, 0, 1, k.render, k, 0, k.priority)),
            k._props.forEach(function (D) {
              x[D] = O;
            }),
            k.priority && (E = 1)),
          !A || $)
        )
          for (T in b)
            lr[T] && (k = Yu(T, b, e, L, S, _))
              ? k.priority && (E = 1)
              : (x[T] = O =
                  al.call(e, S, T, 'get', b[T], L, _, 0, i.stringFilter));
        (e._op && e._op[P] && e.kill(S, e._op[P]),
          v &&
            e._pt &&
            ((fi = e),
            Je.killTweensOf(S, x, e.globalTime(t)),
            (M = !e.parent),
            (fi = 0)),
          e._pt && c && (yo[I.id] = 1));
      }
      (E && Wu(e), e._onInit && e._onInit(e));
    }
    ((e._onUpdate = l),
      (e._initted = (!e._op || e._pt) && !M),
      m && t <= 0 && y.render(Er, !0, !0));
  },
  dm = function (e, t, r, i, n, a, o, c) {
    var l = ((e._pt && e._ptCache) || (e._ptCache = {}))[t],
      u,
      p,
      m,
      h;
    if (!l)
      for (
        l = e._ptCache[t] = [], m = e._ptLookup, h = e._targets.length;
        h--;
      ) {
        if (((u = m[h][t]), u && u.d && u.d._pt))
          for (u = u.d._pt; u && u.p !== t && u.fp !== t; ) u = u._next;
        if (!u)
          return (
            (Co = 1),
            (e.vars[t] = '+=0'),
            ol(e, o),
            (Co = 0),
            c ? vn(t + ' not eligible for reset') : 1
          );
        l.push(u);
      }
    for (h = l.length; h--; )
      ((p = l[h]),
        (u = p._pt || p),
        (u.s = (i || i === 0) && !n ? i : u.s + (i || 0) + a * u.c),
        (u.c = r - u.s),
        p.e && (p.e = lt(r) + Rt(p.e)),
        p.b && (p.b = u.s + Rt(p.b)));
  },
  fm = function (e, t) {
    var r = e[0] ? Xi(e[0]).harness : 0,
      i = r && r.aliases,
      n,
      a,
      o,
      c;
    if (!i) return t;
    n = Ps({}, t);
    for (a in i)
      if (a in n) for (c = i[a].split(','), o = c.length; o--; ) n[c[o]] = n[a];
    return n;
  },
  pm = function (e, t, r, i) {
    var n = t.ease || i || 'power1.inOut',
      a,
      o;
    if ($t(t))
      ((o = r[e] || (r[e] = [])),
        t.forEach(function (c, l) {
          return o.push({ t: (l / (t.length - 1)) * 100, v: c, e: n });
        }));
    else
      for (a in t)
        ((o = r[a] || (r[a] = [])),
          a === 'ease' || o.push({ t: parseFloat(e), v: t[a], e: n }));
  },
  rn = function (e, t, r, i, n) {
    return st(e)
      ? e.call(t, r, i, n)
      : Tt(e) && ~e.indexOf('random(')
        ? wn(e)
        : e;
  },
  Vu = il + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
  Xu = {};
Qt(Vu + ',id,stagger,delay,duration,paused,scrollTrigger', function (s) {
  return (Xu[s] = 1);
});
var ft = (function (s) {
  lu(e, s);
  function e(r, i, n, a) {
    var o;
    (typeof i == 'number' && ((n.duration = i), (i = n), (n = null)),
      (o = s.call(this, a ? i : en(i)) || this));
    var c = o.vars,
      l = c.duration,
      u = c.delay,
      p = c.immediateRender,
      m = c.stagger,
      h = c.overwrite,
      f = c.keyframes,
      d = c.defaults,
      g = c.scrollTrigger,
      w = c.yoyoEase,
      _ = i.parent || Je,
      v = ($t(r) || uu(r) ? ti(r[0]) : 'length' in i) ? [r] : Cr(r),
      y,
      b,
      P,
      T,
      O,
      S,
      E,
      I;
    if (
      ((o._targets = v.length
        ? sl(v)
        : vn(
            'GSAP target ' + r + ' not found. https://gsap.com',
            !gr.nullTargetWarn
          ) || []),
      (o._ptLookup = []),
      (o._overwrite = h),
      f || m || Rn(l) || Rn(u))
    ) {
      if (
        ((i = o.vars),
        (y = o.timeline =
          new qt({
            data: 'nested',
            defaults: d || {},
            targets: _ && _.data === 'nested' ? _.vars.targets : v,
          })),
        y.kill(),
        (y.parent = y._dp = Wr(o)),
        (y._start = 0),
        m || Rn(l) || Rn(u))
      ) {
        if (((T = v.length), (E = m && Mu(m)), Gr(m)))
          for (O in m) ~Vu.indexOf(O) && (I || (I = {}), (I[O] = m[O]));
        for (b = 0; b < T; b++)
          ((P = ma(i, Xu)),
            (P.stagger = 0),
            w && (P.yoyoEase = w),
            I && Ps(P, I),
            (S = v[b]),
            (P.duration = +rn(l, Wr(o), b, S, v)),
            (P.delay = (+rn(u, Wr(o), b, S, v) || 0) - o._delay),
            !m &&
              T === 1 &&
              P.delay &&
              ((o._delay = u = P.delay), (o._start += u), (P.delay = 0)),
            y.to(S, P, E ? E(b, S, v) : 0),
            (y._ease = Le.none));
        y.duration() ? (l = u = 0) : (o.timeline = 0);
      } else if (f) {
        (en(_r(y.vars.defaults, { ease: 'none' })),
          (y._ease = Gi(f.ease || i.ease || 'none')));
        var A = 0,
          k,
          x,
          L;
        if ($t(f))
          (f.forEach(function ($) {
            return y.to(v, $, '>');
          }),
            y.duration());
        else {
          P = {};
          for (O in f)
            O === 'ease' || O === 'easeEach' || pm(O, f[O], P, f.easeEach);
          for (O in P)
            for (
              k = P[O].sort(function ($, M) {
                return $.t - M.t;
              }),
                A = 0,
                b = 0;
              b < k.length;
              b++
            )
              ((x = k[b]),
                (L = {
                  ease: x.e,
                  duration: ((x.t - (b ? k[b - 1].t : 0)) / 100) * l,
                }),
                (L[O] = x.v),
                y.to(v, L, A),
                (A += L.duration));
          y.duration() < l && y.to({}, { duration: l - y.duration() });
        }
      }
      l || o.duration((l = y.duration()));
    } else o.timeline = 0;
    return (
      h === !0 && !Zo && ((fi = Wr(o)), Je.killTweensOf(v), (fi = 0)),
      Yr(_, Wr(o), n),
      i.reversed && o.reverse(),
      i.paused && o.paused(!0),
      (p ||
        (!l &&
          !f &&
          o._start === Qe(_._time) &&
          Zt(p) &&
          Hh(Wr(o)) &&
          _.data !== 'nested')) &&
        ((o._tTime = -He), o.render(Math.max(0, -u) || 0)),
      g && xu(Wr(o), g),
      o
    );
  }
  var t = e.prototype;
  return (
    (t.render = function (i, n, a) {
      var o = this._time,
        c = this._tDur,
        l = this._dur,
        u = i < 0,
        p = i > c - He && !u ? c : i < He ? 0 : i,
        m,
        h,
        f,
        d,
        g,
        w,
        _,
        v,
        y;
      if (!l) qh(this, i, n, a);
      else if (
        p !== this._tTime ||
        !i ||
        a ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== u) ||
        this._lazy
      ) {
        if (((m = p), (v = this.timeline), this._repeat)) {
          if (((d = l + this._rDelay), this._repeat < -1 && u))
            return this.totalTime(d * 100 + i, n, a);
          if (
            ((m = Qe(p % d)),
            p === c
              ? ((f = this._repeat), (m = l))
              : ((g = Qe(p / d)),
                (f = ~~g),
                f && f === g ? ((m = l), f--) : m > l && (m = l)),
            (w = this._yoyo && f & 1),
            w && ((y = this._yEase), (m = l - m)),
            (g = As(this._tTime, d)),
            m === o && !a && this._initted && f === g)
          )
            return ((this._tTime = p), this);
          f !== g &&
            (v && this._yEase && Nu(v, w),
            this.vars.repeatRefresh &&
              !w &&
              !this._lock &&
              m !== d &&
              this._initted &&
              ((this._lock = a = 1),
              (this.render(Qe(d * f), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (Su(this, u ? i : m, a, n, p)) return ((this._tTime = 0), this);
          if (o !== this._time && !(a && this.vars.repeatRefresh && f !== g))
            return this;
          if (l !== this._dur) return this.render(i, n, a);
        }
        if (
          ((this._tTime = p),
          (this._time = m),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = _ = (y || this._ease)(m / l)),
          this._from && (this.ratio = _ = 1 - _),
          !o && p && !n && !g && (hr(this, 'onStart'), this._tTime !== p))
        )
          return this;
        for (h = this._pt; h; ) (h.r(_, h.d), (h = h._next));
        ((v && v.render(i < 0 ? i : v._dur * v._ease(m / this._dur), n, a)) ||
          (this._startAt && (this._zTime = i)),
          this._onUpdate &&
            !n &&
            (u && bo(this, i, n, a), hr(this, 'onUpdate')),
          this._repeat &&
            f !== g &&
            this.vars.onRepeat &&
            !n &&
            this.parent &&
            hr(this, 'onRepeat'),
          (p === this._tDur || !p) &&
            this._tTime === p &&
            (u && !this._onUpdate && bo(this, i, !0, !0),
            (i || !l) &&
              ((p === this._tDur && this._ts > 0) || (!p && this._ts < 0)) &&
              bi(this, 1),
            !n &&
              !(u && !o) &&
              (p || o || w) &&
              (hr(this, p === c ? 'onComplete' : 'onReverseComplete', !0),
              this._prom && !(p < c && this.timeScale() > 0) && this._prom())));
      }
      return this;
    }),
    (t.targets = function () {
      return this._targets;
    }),
    (t.invalidate = function (i) {
      return (
        (!i || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(i),
        s.prototype.invalidate.call(this, i)
      );
    }),
    (t.resetTo = function (i, n, a, o, c) {
      (yn || dr.wake(), this._ts || this.play());
      var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        u;
      return (
        this._initted || ol(this, l),
        (u = this._ease(l / this._dur)),
        dm(this, i, n, a, o, u, l, c)
          ? this.resetTo(i, n, a, o, 1)
          : (Oa(this, 0),
            this.parent ||
              bu(
                this._dp,
                this,
                '_first',
                '_last',
                this._dp._sort ? '_start' : 0
              ),
            this.render(0))
      );
    }),
    (t.kill = function (i, n) {
      if ((n === void 0 && (n = 'all'), !i && (!n || n === 'all')))
        return (
          (this._lazy = this._pt = 0),
          this.parent
            ? Hs(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!Pt),
          this
        );
      if (this.timeline) {
        var a = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(i, n, fi && fi.vars.overwrite !== !0)
            ._first || Hs(this),
          this.parent &&
            a !== this.timeline.totalDuration() &&
            Os(this, (this._dur * this.timeline._tDur) / a, 0, 1),
          this
        );
      }
      var o = this._targets,
        c = i ? Cr(i) : o,
        l = this._ptLookup,
        u = this._pt,
        p,
        m,
        h,
        f,
        d,
        g,
        w;
      if ((!n || n === 'all') && Vh(o, c))
        return (n === 'all' && (this._pt = 0), Hs(this));
      for (
        p = this._op = this._op || [],
          n !== 'all' &&
            (Tt(n) &&
              ((d = {}),
              Qt(n, function (_) {
                return (d[_] = 1);
              }),
              (n = d)),
            (n = fm(o, n))),
          w = o.length;
        w--;
      )
        if (~c.indexOf(o[w])) {
          ((m = l[w]),
            n === 'all'
              ? ((p[w] = n), (f = m), (h = {}))
              : ((h = p[w] = p[w] || {}), (f = n)));
          for (d in f)
            ((g = m && m[d]),
              g &&
                ((!('kill' in g.d) || g.d.kill(d) === !0) && Pa(this, g, '_pt'),
                delete m[d]),
              h !== 'all' && (h[d] = 1));
        }
      return (this._initted && !this._pt && u && Hs(this), this);
    }),
    (e.to = function (i, n) {
      return new e(i, n, arguments[2]);
    }),
    (e.from = function (i, n) {
      return tn(1, arguments);
    }),
    (e.delayedCall = function (i, n, a, o) {
      return new e(n, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: i,
        onComplete: n,
        onReverseComplete: n,
        onCompleteParams: a,
        onReverseCompleteParams: a,
        callbackScope: o,
      });
    }),
    (e.fromTo = function (i, n, a) {
      return tn(2, arguments);
    }),
    (e.set = function (i, n) {
      return ((n.duration = 0), n.repeatDelay || (n.repeat = 0), new e(i, n));
    }),
    (e.killTweensOf = function (i, n, a) {
      return Je.killTweensOf(i, n, a);
    }),
    e
  );
})(bn);
_r(ft.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
Qt('staggerTo,staggerFrom,staggerFromTo', function (s) {
  ft[s] = function () {
    var e = new qt(),
      t = xo.call(arguments, 0);
    return (t.splice(s === 'staggerFromTo' ? 5 : 4, 0, 0), e[s].apply(e, t));
  };
});
var ll = function (e, t, r) {
    return (e[t] = r);
  },
  Hu = function (e, t, r) {
    return e[t](r);
  },
  hm = function (e, t, r, i) {
    return e[t](i.fp, r);
  },
  mm = function (e, t, r) {
    return e.setAttribute(t, r);
  },
  cl = function (e, t) {
    return st(e[t]) ? Hu : Qo(e[t]) && e.setAttribute ? mm : ll;
  },
  Gu = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
  },
  gm = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t);
  },
  qu = function (e, t) {
    var r = t._pt,
      i = '';
    if (!e && t.b) i = t.b;
    else if (e === 1 && t.e) i = t.e;
    else {
      for (; r; )
        ((i =
          r.p +
          (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) +
          i),
          (r = r._next));
      i += t.c;
    }
    t.set(t.t, t.p, i, t);
  },
  ul = function (e, t) {
    for (var r = t._pt; r; ) (r.r(e, r.d), (r = r._next));
  },
  vm = function (e, t, r, i) {
    for (var n = this._pt, a; n; )
      ((a = n._next), n.p === i && n.modifier(e, t, r), (n = a));
  },
  _m = function (e) {
    for (var t = this._pt, r, i; t; )
      ((i = t._next),
        (t.p === e && !t.op) || t.op === e
          ? Pa(this, t, '_pt')
          : t.dep || (r = 1),
        (t = i));
    return !r;
  },
  wm = function (e, t, r, i) {
    i.mSet(e, t, i.m.call(i.tween, r, i.mt), i);
  },
  Wu = function (e) {
    for (var t = e._pt, r, i, n, a; t; ) {
      for (r = t._next, i = n; i && i.pr > t.pr; ) i = i._next;
      ((t._prev = i ? i._prev : a) ? (t._prev._next = t) : (n = t),
        (t._next = i) ? (i._prev = t) : (a = t),
        (t = r));
    }
    e._pt = n;
  },
  Jt = (function () {
    function s(t, r, i, n, a, o, c, l, u) {
      ((this.t = r),
        (this.s = n),
        (this.c = a),
        (this.p = i),
        (this.r = o || Gu),
        (this.d = c || this),
        (this.set = l || ll),
        (this.pr = u || 0),
        (this._next = t),
        t && (t._prev = this));
    }
    var e = s.prototype;
    return (
      (e.modifier = function (r, i, n) {
        ((this.mSet = this.mSet || this.set),
          (this.set = wm),
          (this.m = r),
          (this.mt = n),
          (this.tween = i));
      }),
      s
    );
  })();
Qt(
  il +
    'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
  function (s) {
    return (rl[s] = 1);
  }
);
vr.TweenMax = vr.TweenLite = ft;
vr.TimelineLite = vr.TimelineMax = qt;
Je = new qt({
  sortChildren: !1,
  defaults: Ms,
  autoRemoveChildren: !0,
  id: 'root',
  smoothChildTiming: !0,
});
gr.stringFilter = zu;
var qi = [],
  ia = {},
  ym = [],
  Jl = 0,
  bm = 0,
  Qa = function (e) {
    return (ia[e] || ym).map(function (t) {
      return t();
    });
  },
  Mo = function () {
    var e = Date.now(),
      t = [];
    e - Jl > 2 &&
      (Qa('matchMediaInit'),
      qi.forEach(function (r) {
        var i = r.queries,
          n = r.conditions,
          a,
          o,
          c,
          l;
        for (o in i)
          ((a = Nr.matchMedia(i[o]).matches),
            a && (c = 1),
            a !== n[o] && ((n[o] = a), (l = 1)));
        l && (r.revert(), c && t.push(r));
      }),
      Qa('matchMediaRevert'),
      t.forEach(function (r) {
        return r.onMatch(r, function (i) {
          return r.add(null, i);
        });
      }),
      (Jl = e),
      Qa('matchMedia'));
  },
  Uu = (function () {
    function s(t, r) {
      ((this.selector = r && So(r)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = bm++),
        t && this.add(t));
    }
    var e = s.prototype;
    return (
      (e.add = function (r, i, n) {
        st(r) && ((n = i), (i = r), (r = st));
        var a = this,
          o = function () {
            var l = je,
              u = a.selector,
              p;
            return (
              l && l !== a && l.data.push(a),
              n && (a.selector = So(n)),
              (je = a),
              (p = i.apply(a, arguments)),
              st(p) && a._r.push(p),
              (je = l),
              (a.selector = u),
              (a.isReverted = !1),
              p
            );
          };
        return (
          (a.last = o),
          r === st
            ? o(a, function (c) {
                return a.add(null, c);
              })
            : r
              ? (a[r] = o)
              : o
        );
      }),
      (e.ignore = function (r) {
        var i = je;
        ((je = null), r(this), (je = i));
      }),
      (e.getTweens = function () {
        var r = [];
        return (
          this.data.forEach(function (i) {
            return i instanceof s
              ? r.push.apply(r, i.getTweens())
              : i instanceof ft &&
                  !(i.parent && i.parent.data === 'nested') &&
                  r.push(i);
          }),
          r
        );
      }),
      (e.clear = function () {
        this._r.length = this.data.length = 0;
      }),
      (e.kill = function (r, i) {
        var n = this;
        if (
          (r
            ? (function () {
                for (var o = n.getTweens(), c = n.data.length, l; c--; )
                  ((l = n.data[c]),
                    l.data === 'isFlip' &&
                      (l.revert(),
                      l.getChildren(!0, !0, !1).forEach(function (u) {
                        return o.splice(o.indexOf(u), 1);
                      })));
                for (
                  o
                    .map(function (u) {
                      return {
                        g:
                          u._dur ||
                          u._delay ||
                          (u._sat && !u._sat.vars.immediateRender)
                            ? u.globalTime(0)
                            : -1 / 0,
                        t: u,
                      };
                    })
                    .sort(function (u, p) {
                      return p.g - u.g || -1 / 0;
                    })
                    .forEach(function (u) {
                      return u.t.revert(r);
                    }),
                    c = n.data.length;
                  c--;
                )
                  ((l = n.data[c]),
                    l instanceof qt
                      ? l.data !== 'nested' &&
                        (l.scrollTrigger && l.scrollTrigger.revert(), l.kill())
                      : !(l instanceof ft) && l.revert && l.revert(r));
                (n._r.forEach(function (u) {
                  return u(r, n);
                }),
                  (n.isReverted = !0));
              })()
            : this.data.forEach(function (o) {
                return o.kill && o.kill();
              }),
          this.clear(),
          i)
        )
          for (var a = qi.length; a--; )
            qi[a].id === this.id && qi.splice(a, 1);
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      s
    );
  })(),
  Tm = (function () {
    function s(t) {
      ((this.contexts = []), (this.scope = t), je && je.data.push(this));
    }
    var e = s.prototype;
    return (
      (e.add = function (r, i, n) {
        Gr(r) || (r = { matches: r });
        var a = new Uu(0, n || this.scope),
          o = (a.conditions = {}),
          c,
          l,
          u;
        (je && !a.selector && (a.selector = je.selector),
          this.contexts.push(a),
          (i = a.add('onMatch', i)),
          (a.queries = r));
        for (l in r)
          l === 'all'
            ? (u = 1)
            : ((c = Nr.matchMedia(r[l])),
              c &&
                (qi.indexOf(a) < 0 && qi.push(a),
                (o[l] = c.matches) && (u = 1),
                c.addListener
                  ? c.addListener(Mo)
                  : c.addEventListener('change', Mo)));
        return (
          u &&
            i(a, function (p) {
              return a.add(null, p);
            }),
          this
        );
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      (e.kill = function (r) {
        this.contexts.forEach(function (i) {
          return i.kill(r, !0);
        });
      }),
      s
    );
  })(),
  va = {
    registerPlugin: function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      t.forEach(function (i) {
        return ku(i);
      });
    },
    timeline: function (e) {
      return new qt(e);
    },
    getTweensOf: function (e, t) {
      return Je.getTweensOf(e, t);
    },
    getProperty: function (e, t, r, i) {
      Tt(e) && (e = Cr(e)[0]);
      var n = Xi(e || {}).get,
        a = r ? yu : wu;
      return (
        r === 'native' && (r = ''),
        e &&
          (t
            ? a(((lr[t] && lr[t].get) || n)(e, t, r, i))
            : function (o, c, l) {
                return a(((lr[o] && lr[o].get) || n)(e, o, c, l));
              })
      );
    },
    quickSetter: function (e, t, r) {
      if (((e = Cr(e)), e.length > 1)) {
        var i = e.map(function (u) {
            return tr.quickSetter(u, t, r);
          }),
          n = i.length;
        return function (u) {
          for (var p = n; p--; ) i[p](u);
        };
      }
      e = e[0] || {};
      var a = lr[t],
        o = Xi(e),
        c = (o.harness && (o.harness.aliases || {})[t]) || t,
        l = a
          ? function (u) {
              var p = new a();
              ((us._pt = 0),
                p.init(e, r ? u + r : u, us, 0, [e]),
                p.render(1, p),
                us._pt && ul(1, us));
            }
          : o.set(e, c);
      return a
        ? l
        : function (u) {
            return l(e, c, r ? u + r : u, o, 1);
          };
    },
    quickTo: function (e, t, r) {
      var i,
        n = tr.to(
          e,
          _r(
            ((i = {}), (i[t] = '+=0.1'), (i.paused = !0), (i.stagger = 0), i),
            r || {}
          )
        ),
        a = function (c, l, u) {
          return n.resetTo(t, c, l, u);
        };
      return ((a.tween = n), a);
    },
    isTweening: function (e) {
      return Je.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return (e && e.ease && (e.ease = Gi(e.ease, Ms.ease)), Ul(Ms, e || {}));
    },
    config: function (e) {
      return Ul(gr, e || {});
    },
    registerEffect: function (e) {
      var t = e.name,
        r = e.effect,
        i = e.plugins,
        n = e.defaults,
        a = e.extendTimeline;
      ((i || '').split(',').forEach(function (o) {
        return (
          o && !lr[o] && !vr[o] && vn(t + ' effect requires ' + o + ' plugin.')
        );
      }),
        (Ua[t] = function (o, c, l) {
          return r(Cr(o), _r(c || {}, n), l);
        }),
        a &&
          (qt.prototype[t] = function (o, c, l) {
            return this.add(Ua[t](o, Gr(c) ? c : (l = c) && {}, this), l);
          }));
    },
    registerEase: function (e, t) {
      Le[e] = Gi(t);
    },
    parseEase: function (e, t) {
      return arguments.length ? Gi(e, t) : Le;
    },
    getById: function (e) {
      return Je.getById(e);
    },
    exportRoot: function (e, t) {
      e === void 0 && (e = {});
      var r = new qt(e),
        i,
        n;
      for (
        r.smoothChildTiming = Zt(e.smoothChildTiming),
          Je.remove(r),
          r._dp = 0,
          r._time = r._tTime = Je._time,
          i = Je._first;
        i;
      )
        ((n = i._next),
          (t ||
            !(
              !i._dur &&
              i instanceof ft &&
              i.vars.onComplete === i._targets[0]
            )) &&
            Yr(r, i, i._start - i._delay),
          (i = n));
      return (Yr(Je, r, 0), r);
    },
    context: function (e, t) {
      return e ? new Uu(e, t) : je;
    },
    matchMedia: function (e) {
      return new Tm(e);
    },
    matchMediaRefresh: function () {
      return (
        qi.forEach(function (e) {
          var t = e.conditions,
            r,
            i;
          for (i in t) t[i] && ((t[i] = !1), (r = 1));
          r && e.revert();
        }) || Mo()
      );
    },
    addEventListener: function (e, t) {
      var r = ia[e] || (ia[e] = []);
      ~r.indexOf(t) || r.push(t);
    },
    removeEventListener: function (e, t) {
      var r = ia[e],
        i = r && r.indexOf(t);
      i >= 0 && r.splice(i, 1);
    },
    utils: {
      wrap: em,
      wrapYoyo: tm,
      distribute: Mu,
      random: Au,
      snap: Pu,
      normalize: Jh,
      getUnit: Rt,
      clamp: jh,
      splitColor: Iu,
      toArray: Cr,
      selector: So,
      mapRange: Lu,
      pipe: Zh,
      unitize: Qh,
      interpolate: rm,
      shuffle: Cu,
    },
    install: hu,
    effects: Ua,
    ticker: dr,
    updateRoot: qt.updateRoot,
    plugins: lr,
    globalTimeline: Je,
    core: {
      PropTween: Jt,
      globals: mu,
      Tween: ft,
      Timeline: qt,
      Animation: bn,
      getCache: Xi,
      _removeLinkedListItem: Pa,
      reverting: function () {
        return Pt;
      },
      context: function (e) {
        return (e && je && (je.data.push(e), (e._ctx = je)), je);
      },
      suppressOverwrites: function (e) {
        return (Zo = e);
      },
    },
  };
Qt('to,from,fromTo,delayedCall,set,killTweensOf', function (s) {
  return (va[s] = ft[s]);
});
dr.add(qt.updateRoot);
us = va.to({}, { duration: 0 });
var xm = function (e, t) {
    for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
      r = r._next;
    return r;
  },
  Sm = function (e, t) {
    var r = e._targets,
      i,
      n,
      a;
    for (i in t)
      for (n = r.length; n--; )
        ((a = e._ptLookup[n][i]),
          a &&
            (a = a.d) &&
            (a._pt && (a = xm(a, i)),
            a && a.modifier && a.modifier(t[i], e, r[n], i)));
  },
  Ja = function (e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (i, n, a) {
        a._onInit = function (o) {
          var c, l;
          if (
            (Tt(n) &&
              ((c = {}),
              Qt(n, function (u) {
                return (c[u] = 1);
              }),
              (n = c)),
            t)
          ) {
            c = {};
            for (l in n) c[l] = t(n[l]);
            n = c;
          }
          Sm(o, n);
        };
      },
    };
  },
  tr =
    va.registerPlugin(
      {
        name: 'attr',
        init: function (e, t, r, i, n) {
          var a, o, c;
          this.tween = r;
          for (a in t)
            ((c = e.getAttribute(a) || ''),
              (o = this.add(
                e,
                'setAttribute',
                (c || 0) + '',
                t[a],
                i,
                n,
                0,
                0,
                a
              )),
              (o.op = a),
              (o.b = c),
              this._props.push(a));
        },
        render: function (e, t) {
          for (var r = t._pt; r; )
            (Pt ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), (r = r._next));
        },
      },
      {
        name: 'endArray',
        headless: 1,
        init: function (e, t) {
          for (var r = t.length; r--; )
            this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
        },
      },
      Ja('roundProps', Eo),
      Ja('modifiers'),
      Ja('snap', Pu)
    ) || va;
ft.version = qt.version = tr.version = '3.14.2';
pu = 1;
Jo() && Ls();
Le.Power0;
Le.Power1;
Le.Power2;
Le.Power3;
Le.Power4;
Le.Linear;
Le.Quad;
Le.Cubic;
Le.Quart;
Le.Quint;
Le.Strong;
Le.Elastic;
Le.Back;
Le.SteppedEase;
Le.Bounce;
Le.Sine;
Le.Expo;
Le.Circ;
var ec,
  pi,
  gs,
  dl,
  Bi,
  tc,
  fl,
  Em = function () {
    return typeof window < 'u';
  },
  ri = {},
  Di = 180 / Math.PI,
  vs = Math.PI / 180,
  is = Math.atan2,
  rc = 1e8,
  pl = /([A-Z])/g,
  Cm = /(left|right|width|margin|padding|x)/i,
  Mm = /[\s,\(]\S/,
  Vr = {
    autoAlpha: 'opacity,visibility',
    scale: 'scaleX,scaleY',
    alpha: 'opacity',
  },
  Po = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
  },
  Pm = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    );
  },
  Am = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  Om = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  Lm = function (e, t) {
    var r = t.s + t.c * e;
    t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
  },
  ju = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t);
  },
  Ku = function (e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
  },
  Dm = function (e, t, r) {
    return (e.style[t] = r);
  },
  km = function (e, t, r) {
    return e.style.setProperty(t, r);
  },
  Im = function (e, t, r) {
    return (e._gsap[t] = r);
  },
  Rm = function (e, t, r) {
    return (e._gsap.scaleX = e._gsap.scaleY = r);
  },
  zm = function (e, t, r, i, n) {
    var a = e._gsap;
    ((a.scaleX = a.scaleY = r), a.renderTransform(n, a));
  },
  $m = function (e, t, r, i, n) {
    var a = e._gsap;
    ((a[t] = r), a.renderTransform(n, a));
  },
  tt = 'transform',
  er = tt + 'Origin',
  Nm = function s(e, t) {
    var r = this,
      i = this.target,
      n = i.style,
      a = i._gsap;
    if (e in ri && n) {
      if (((this.tfm = this.tfm || {}), e !== 'transform'))
        ((e = Vr[e] || e),
          ~e.indexOf(',')
            ? e.split(',').forEach(function (o) {
                return (r.tfm[o] = Ur(i, o));
              })
            : (this.tfm[e] = a.x ? a[e] : Ur(i, e)),
          e === er && (this.tfm.zOrigin = a.zOrigin));
      else
        return Vr.transform.split(',').forEach(function (o) {
          return s.call(r, o, t);
        });
      if (this.props.indexOf(tt) >= 0) return;
      (a.svg &&
        ((this.svgo = i.getAttribute('data-svg-origin')),
        this.props.push(er, t, '')),
        (e = tt));
    }
    (n || t) && this.props.push(e, t, n[e]);
  },
  Zu = function (e) {
    e.translate &&
      (e.removeProperty('translate'),
      e.removeProperty('scale'),
      e.removeProperty('rotate'));
  },
  Bm = function () {
    var e = this.props,
      t = this.target,
      r = t.style,
      i = t._gsap,
      n,
      a;
    for (n = 0; n < e.length; n += 3)
      e[n + 1]
        ? e[n + 1] === 2
          ? t[e[n]](e[n + 2])
          : (t[e[n]] = e[n + 2])
        : e[n + 2]
          ? (r[e[n]] = e[n + 2])
          : r.removeProperty(
              e[n].substr(0, 2) === '--'
                ? e[n]
                : e[n].replace(pl, '-$1').toLowerCase()
            );
    if (this.tfm) {
      for (a in this.tfm) i[a] = this.tfm[a];
      (i.svg &&
        (i.renderTransform(),
        t.setAttribute('data-svg-origin', this.svgo || '')),
        (n = fl()),
        (!n || !n.isStart) &&
          !r[tt] &&
          (Zu(r),
          i.zOrigin &&
            r[er] &&
            ((r[er] += ' ' + i.zOrigin + 'px'),
            (i.zOrigin = 0),
            i.renderTransform()),
          (i.uncache = 1)));
    }
  },
  Qu = function (e, t) {
    var r = { target: e, props: [], revert: Bm, save: Nm };
    return (
      e._gsap || tr.core.getCache(e),
      t &&
        e.style &&
        e.nodeType &&
        t.split(',').forEach(function (i) {
          return r.save(i);
        }),
      r
    );
  },
  Ju,
  Ao = function (e, t) {
    var r = pi.createElementNS
      ? pi.createElementNS(
          (t || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
          e
        )
      : pi.createElement(e);
    return r && r.style ? r : pi.createElement(e);
  },
  mr = function s(e, t, r) {
    var i = getComputedStyle(e);
    return (
      i[t] ||
      i.getPropertyValue(t.replace(pl, '-$1').toLowerCase()) ||
      i.getPropertyValue(t) ||
      (!r && s(e, Ds(t) || t, 1)) ||
      ''
    );
  },
  ic = 'O,Moz,ms,Ms,Webkit'.split(','),
  Ds = function (e, t, r) {
    var i = t || Bi,
      n = i.style,
      a = 5;
    if (e in n && !r) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      a-- && !(ic[a] + e in n);
    );
    return a < 0 ? null : (a === 3 ? 'ms' : a >= 0 ? ic[a] : '') + e;
  },
  Oo = function () {
    Em() &&
      window.document &&
      ((ec = window),
      (pi = ec.document),
      (gs = pi.documentElement),
      (Bi = Ao('div') || { style: {} }),
      Ao('div'),
      (tt = Ds(tt)),
      (er = tt + 'Origin'),
      (Bi.style.cssText =
        'border-width:0;line-height:0;position:absolute;padding:0'),
      (Ju = !!Ds('perspective')),
      (fl = tr.core.reverting),
      (dl = 1));
  },
  sc = function (e) {
    var t = e.ownerSVGElement,
      r = Ao(
        'svg',
        (t && t.getAttribute('xmlns')) || 'http://www.w3.org/2000/svg'
      ),
      i = e.cloneNode(!0),
      n;
    ((i.style.display = 'block'), r.appendChild(i), gs.appendChild(r));
    try {
      n = i.getBBox();
    } catch {}
    return (r.removeChild(i), gs.removeChild(r), n);
  },
  nc = function (e, t) {
    for (var r = t.length; r--; )
      if (e.hasAttribute(t[r])) return e.getAttribute(t[r]);
  },
  ed = function (e) {
    var t, r;
    try {
      t = e.getBBox();
    } catch {
      ((t = sc(e)), (r = 1));
    }
    return (
      (t && (t.width || t.height)) || r || (t = sc(e)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +nc(e, ['x', 'cx', 'x1']) || 0,
            y: +nc(e, ['y', 'cy', 'y1']) || 0,
            width: 0,
            height: 0,
          }
        : t
    );
  },
  td = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ed(e));
  },
  Ti = function (e, t) {
    if (t) {
      var r = e.style,
        i;
      (t in ri && t !== er && (t = tt),
        r.removeProperty
          ? ((i = t.substr(0, 2)),
            (i === 'ms' || t.substr(0, 6) === 'webkit') && (t = '-' + t),
            r.removeProperty(
              i === '--' ? t : t.replace(pl, '-$1').toLowerCase()
            ))
          : r.removeAttribute(t));
    }
  },
  hi = function (e, t, r, i, n, a) {
    var o = new Jt(e._pt, t, r, 0, 1, a ? Ku : ju);
    return ((e._pt = o), (o.b = i), (o.e = n), e._props.push(r), o);
  },
  ac = { deg: 1, rad: 1, turn: 1 },
  Fm = { grid: 1, flex: 1 },
  xi = function s(e, t, r, i) {
    var n = parseFloat(r) || 0,
      a = (r + '').trim().substr((n + '').length) || 'px',
      o = Bi.style,
      c = Cm.test(t),
      l = e.tagName.toLowerCase() === 'svg',
      u = (l ? 'client' : 'offset') + (c ? 'Width' : 'Height'),
      p = 100,
      m = i === 'px',
      h = i === '%',
      f,
      d,
      g,
      w;
    if (i === a || !n || ac[i] || ac[a]) return n;
    if (
      (a !== 'px' && !m && (n = s(e, t, r, 'px')),
      (w = e.getCTM && td(e)),
      (h || a === '%') && (ri[t] || ~t.indexOf('adius')))
    )
      return (
        (f = w ? e.getBBox()[c ? 'width' : 'height'] : e[u]),
        lt(h ? (n / f) * p : (n / 100) * f)
      );
    if (
      ((o[c ? 'width' : 'height'] = p + (m ? a : i)),
      (d =
        (i !== 'rem' && ~t.indexOf('adius')) ||
        (i === 'em' && e.appendChild && !l)
          ? e
          : e.parentNode),
      w && (d = (e.ownerSVGElement || {}).parentNode),
      (!d || d === pi || !d.appendChild) && (d = pi.body),
      (g = d._gsap),
      g && h && g.width && c && g.time === dr.time && !g.uncache)
    )
      return lt((n / g.width) * p);
    if (h && (t === 'height' || t === 'width')) {
      var _ = e.style[t];
      ((e.style[t] = p + i), (f = e[u]), _ ? (e.style[t] = _) : Ti(e, t));
    } else
      ((h || a === '%') &&
        !Fm[mr(d, 'display')] &&
        (o.position = mr(e, 'position')),
        d === e && (o.position = 'static'),
        d.appendChild(Bi),
        (f = Bi[u]),
        d.removeChild(Bi),
        (o.position = 'absolute'));
    return (
      c && h && ((g = Xi(d)), (g.time = dr.time), (g.width = d[u])),
      lt(m ? (f * n) / p : f && n ? (p / f) * n : 0)
    );
  },
  Ur = function (e, t, r, i) {
    var n;
    return (
      dl || Oo(),
      t in Vr &&
        t !== 'transform' &&
        ((t = Vr[t]), ~t.indexOf(',') && (t = t.split(',')[0])),
      ri[t] && t !== 'transform'
        ? ((n = xn(e, i)),
          (n =
            t !== 'transformOrigin'
              ? n[t]
              : n.svg
                ? n.origin
                : wa(mr(e, er)) + ' ' + n.zOrigin + 'px'))
        : ((n = e.style[t]),
          (!n || n === 'auto' || i || ~(n + '').indexOf('calc(')) &&
            (n =
              (_a[t] && _a[t](e, t, r)) ||
              mr(e, t) ||
              vu(e, t) ||
              (t === 'opacity' ? 1 : 0))),
      r && !~(n + '').trim().indexOf(' ') ? xi(e, t, n, r) + r : n
    );
  },
  Ym = function (e, t, r, i) {
    if (!r || r === 'none') {
      var n = Ds(t, e, 1),
        a = n && mr(e, n, 1);
      a && a !== r
        ? ((t = n), (r = a))
        : t === 'borderColor' && (r = mr(e, 'borderTopColor'));
    }
    var o = new Jt(this._pt, e.style, t, 0, 1, qu),
      c = 0,
      l = 0,
      u,
      p,
      m,
      h,
      f,
      d,
      g,
      w,
      _,
      v,
      y,
      b;
    if (
      ((o.b = r),
      (o.e = i),
      (r += ''),
      (i += ''),
      i.substring(0, 6) === 'var(--' &&
        (i = mr(e, i.substring(4, i.indexOf(')')))),
      i === 'auto' &&
        ((d = e.style[t]),
        (e.style[t] = i),
        (i = mr(e, t) || i),
        d ? (e.style[t] = d) : Ti(e, t)),
      (u = [r, i]),
      zu(u),
      (r = u[0]),
      (i = u[1]),
      (m = r.match(cs) || []),
      (b = i.match(cs) || []),
      b.length)
    ) {
      for (; (p = cs.exec(i)); )
        ((g = p[0]),
          (_ = i.substring(c, p.index)),
          f
            ? (f = (f + 1) % 5)
            : (_.substr(-5) === 'rgba(' || _.substr(-5) === 'hsla(') && (f = 1),
          g !== (d = m[l++] || '') &&
            ((h = parseFloat(d) || 0),
            (y = d.substr((h + '').length)),
            g.charAt(1) === '=' && (g = ms(h, g) + y),
            (w = parseFloat(g)),
            (v = g.substr((w + '').length)),
            (c = cs.lastIndex - v.length),
            v ||
              ((v = v || gr.units[t] || y),
              c === i.length && ((i += v), (o.e += v))),
            y !== v && (h = xi(e, t, d, v) || 0),
            (o._pt = {
              _next: o._pt,
              p: _ || l === 1 ? _ : ',',
              s: h,
              c: w - h,
              m: (f && f < 4) || t === 'zIndex' ? Math.round : 0,
            })));
      o.c = c < i.length ? i.substring(c, i.length) : '';
    } else o.r = t === 'display' && i === 'none' ? Ku : ju;
    return (fu.test(i) && (o.e = 0), (this._pt = o), o);
  },
  oc = { top: '0%', bottom: '100%', left: '0%', right: '100%', center: '50%' },
  Vm = function (e) {
    var t = e.split(' '),
      r = t[0],
      i = t[1] || '50%';
    return (
      (r === 'top' || r === 'bottom' || i === 'left' || i === 'right') &&
        ((e = r), (r = i), (i = e)),
      (t[0] = oc[r] || r),
      (t[1] = oc[i] || i),
      t.join(' ')
    );
  },
  Xm = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var r = t.t,
        i = r.style,
        n = t.u,
        a = r._gsap,
        o,
        c,
        l;
      if (n === 'all' || n === !0) ((i.cssText = ''), (c = 1));
      else
        for (n = n.split(','), l = n.length; --l > -1; )
          ((o = n[l]),
            ri[o] && ((c = 1), (o = o === 'transformOrigin' ? er : tt)),
            Ti(r, o));
      c &&
        (Ti(r, tt),
        a &&
          (a.svg && r.removeAttribute('transform'),
          (i.scale = i.rotate = i.translate = 'none'),
          xn(r, 1),
          (a.uncache = 1),
          Zu(i)));
    }
  },
  _a = {
    clearProps: function (e, t, r, i, n) {
      if (n.data !== 'isFromStart') {
        var a = (e._pt = new Jt(e._pt, t, r, 0, 0, Xm));
        return ((a.u = i), (a.pr = -10), (a.tween = n), e._props.push(r), 1);
      }
    },
  },
  Tn = [1, 0, 0, 1, 0, 0],
  rd = {},
  id = function (e) {
    return e === 'matrix(1, 0, 0, 1, 0, 0)' || e === 'none' || !e;
  },
  lc = function (e) {
    var t = mr(e, tt);
    return id(t) ? Tn : t.substr(7).match(du).map(lt);
  },
  hl = function (e, t) {
    var r = e._gsap || Xi(e),
      i = e.style,
      n = lc(e),
      a,
      o,
      c,
      l;
    return r.svg && e.getAttribute('transform')
      ? ((c = e.transform.baseVal.consolidate().matrix),
        (n = [c.a, c.b, c.c, c.d, c.e, c.f]),
        n.join(',') === '1,0,0,1,0,0' ? Tn : n)
      : (n === Tn &&
          !e.offsetParent &&
          e !== gs &&
          !r.svg &&
          ((c = i.display),
          (i.display = 'block'),
          (a = e.parentNode),
          (!a || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((l = 1), (o = e.nextElementSibling), gs.appendChild(e)),
          (n = lc(e)),
          c ? (i.display = c) : Ti(e, 'display'),
          l &&
            (o
              ? a.insertBefore(e, o)
              : a
                ? a.appendChild(e)
                : gs.removeChild(e))),
        t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
  },
  Lo = function (e, t, r, i, n, a) {
    var o = e._gsap,
      c = n || hl(e, !0),
      l = o.xOrigin || 0,
      u = o.yOrigin || 0,
      p = o.xOffset || 0,
      m = o.yOffset || 0,
      h = c[0],
      f = c[1],
      d = c[2],
      g = c[3],
      w = c[4],
      _ = c[5],
      v = t.split(' '),
      y = parseFloat(v[0]) || 0,
      b = parseFloat(v[1]) || 0,
      P,
      T,
      O,
      S;
    (r
      ? c !== Tn &&
        (T = h * g - f * d) &&
        ((O = y * (g / T) + b * (-d / T) + (d * _ - g * w) / T),
        (S = y * (-f / T) + b * (h / T) - (h * _ - f * w) / T),
        (y = O),
        (b = S))
      : ((P = ed(e)),
        (y = P.x + (~v[0].indexOf('%') ? (y / 100) * P.width : y)),
        (b = P.y + (~(v[1] || v[0]).indexOf('%') ? (b / 100) * P.height : b))),
      i || (i !== !1 && o.smooth)
        ? ((w = y - l),
          (_ = b - u),
          (o.xOffset = p + (w * h + _ * d) - w),
          (o.yOffset = m + (w * f + _ * g) - _))
        : (o.xOffset = o.yOffset = 0),
      (o.xOrigin = y),
      (o.yOrigin = b),
      (o.smooth = !!i),
      (o.origin = t),
      (o.originIsAbsolute = !!r),
      (e.style[er] = '0px 0px'),
      a &&
        (hi(a, o, 'xOrigin', l, y),
        hi(a, o, 'yOrigin', u, b),
        hi(a, o, 'xOffset', p, o.xOffset),
        hi(a, o, 'yOffset', m, o.yOffset)),
      e.setAttribute('data-svg-origin', y + ' ' + b));
  },
  xn = function (e, t) {
    var r = e._gsap || new Fu(e);
    if ('x' in r && !t && !r.uncache) return r;
    var i = e.style,
      n = r.scaleX < 0,
      a = 'px',
      o = 'deg',
      c = getComputedStyle(e),
      l = mr(e, er) || '0',
      u,
      p,
      m,
      h,
      f,
      d,
      g,
      w,
      _,
      v,
      y,
      b,
      P,
      T,
      O,
      S,
      E,
      I,
      A,
      k,
      x,
      L,
      $,
      M,
      D,
      z,
      C,
      W,
      ae,
      le,
      U,
      B;
    return (
      (u = p = m = d = g = w = _ = v = y = 0),
      (h = f = 1),
      (r.svg = !!(e.getCTM && td(e))),
      c.translate &&
        ((c.translate !== 'none' ||
          c.scale !== 'none' ||
          c.rotate !== 'none') &&
          (i[tt] =
            (c.translate !== 'none'
              ? 'translate3d(' +
                (c.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                ') '
              : '') +
            (c.rotate !== 'none' ? 'rotate(' + c.rotate + ') ' : '') +
            (c.scale !== 'none'
              ? 'scale(' + c.scale.split(' ').join(',') + ') '
              : '') +
            (c[tt] !== 'none' ? c[tt] : '')),
        (i.scale = i.rotate = i.translate = 'none')),
      (T = hl(e, r.svg)),
      r.svg &&
        (r.uncache
          ? ((D = e.getBBox()),
            (l = r.xOrigin - D.x + 'px ' + (r.yOrigin - D.y) + 'px'),
            (M = ''))
          : (M = !t && e.getAttribute('data-svg-origin')),
        Lo(e, M || l, !!M || r.originIsAbsolute, r.smooth !== !1, T)),
      (b = r.xOrigin || 0),
      (P = r.yOrigin || 0),
      T !== Tn &&
        ((I = T[0]),
        (A = T[1]),
        (k = T[2]),
        (x = T[3]),
        (u = L = T[4]),
        (p = $ = T[5]),
        T.length === 6
          ? ((h = Math.sqrt(I * I + A * A)),
            (f = Math.sqrt(x * x + k * k)),
            (d = I || A ? is(A, I) * Di : 0),
            (_ = k || x ? is(k, x) * Di + d : 0),
            _ && (f *= Math.abs(Math.cos(_ * vs))),
            r.svg && ((u -= b - (b * I + P * k)), (p -= P - (b * A + P * x))))
          : ((B = T[6]),
            (le = T[7]),
            (C = T[8]),
            (W = T[9]),
            (ae = T[10]),
            (U = T[11]),
            (u = T[12]),
            (p = T[13]),
            (m = T[14]),
            (O = is(B, ae)),
            (g = O * Di),
            O &&
              ((S = Math.cos(-O)),
              (E = Math.sin(-O)),
              (M = L * S + C * E),
              (D = $ * S + W * E),
              (z = B * S + ae * E),
              (C = L * -E + C * S),
              (W = $ * -E + W * S),
              (ae = B * -E + ae * S),
              (U = le * -E + U * S),
              (L = M),
              ($ = D),
              (B = z)),
            (O = is(-k, ae)),
            (w = O * Di),
            O &&
              ((S = Math.cos(-O)),
              (E = Math.sin(-O)),
              (M = I * S - C * E),
              (D = A * S - W * E),
              (z = k * S - ae * E),
              (U = x * E + U * S),
              (I = M),
              (A = D),
              (k = z)),
            (O = is(A, I)),
            (d = O * Di),
            O &&
              ((S = Math.cos(O)),
              (E = Math.sin(O)),
              (M = I * S + A * E),
              (D = L * S + $ * E),
              (A = A * S - I * E),
              ($ = $ * S - L * E),
              (I = M),
              (L = D)),
            g &&
              Math.abs(g) + Math.abs(d) > 359.9 &&
              ((g = d = 0), (w = 180 - w)),
            (h = lt(Math.sqrt(I * I + A * A + k * k))),
            (f = lt(Math.sqrt($ * $ + B * B))),
            (O = is(L, $)),
            (_ = Math.abs(O) > 2e-4 ? O * Di : 0),
            (y = U ? 1 / (U < 0 ? -U : U) : 0)),
        r.svg &&
          ((M = e.getAttribute('transform')),
          (r.forceCSS = e.setAttribute('transform', '') || !id(mr(e, tt))),
          M && e.setAttribute('transform', M))),
      Math.abs(_) > 90 &&
        Math.abs(_) < 270 &&
        (n
          ? ((h *= -1), (_ += d <= 0 ? 180 : -180), (d += d <= 0 ? 180 : -180))
          : ((f *= -1), (_ += _ <= 0 ? 180 : -180))),
      (t = t || r.uncache),
      (r.x =
        u -
        ((r.xPercent =
          u &&
          ((!t && r.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0)))
          ? (e.offsetWidth * r.xPercent) / 100
          : 0) +
        a),
      (r.y =
        p -
        ((r.yPercent =
          p &&
          ((!t && r.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-p) ? -50 : 0)))
          ? (e.offsetHeight * r.yPercent) / 100
          : 0) +
        a),
      (r.z = m + a),
      (r.scaleX = lt(h)),
      (r.scaleY = lt(f)),
      (r.rotation = lt(d) + o),
      (r.rotationX = lt(g) + o),
      (r.rotationY = lt(w) + o),
      (r.skewX = _ + o),
      (r.skewY = v + o),
      (r.transformPerspective = y + a),
      (r.zOrigin = parseFloat(l.split(' ')[2]) || (!t && r.zOrigin) || 0) &&
        (i[er] = wa(l)),
      (r.xOffset = r.yOffset = 0),
      (r.force3D = gr.force3D),
      (r.renderTransform = r.svg ? Gm : Ju ? sd : Hm),
      (r.uncache = 0),
      r
    );
  },
  wa = function (e) {
    return (e = e.split(' '))[0] + ' ' + e[1];
  },
  eo = function (e, t, r) {
    var i = Rt(t);
    return lt(parseFloat(t) + parseFloat(xi(e, 'x', r + 'px', i))) + i;
  },
  Hm = function (e, t) {
    ((t.z = '0px'),
      (t.rotationY = t.rotationX = '0deg'),
      (t.force3D = 0),
      sd(e, t));
  },
  Oi = '0deg',
  Bs = '0px',
  Li = ') ',
  sd = function (e, t) {
    var r = t || this,
      i = r.xPercent,
      n = r.yPercent,
      a = r.x,
      o = r.y,
      c = r.z,
      l = r.rotation,
      u = r.rotationY,
      p = r.rotationX,
      m = r.skewX,
      h = r.skewY,
      f = r.scaleX,
      d = r.scaleY,
      g = r.transformPerspective,
      w = r.force3D,
      _ = r.target,
      v = r.zOrigin,
      y = '',
      b = (w === 'auto' && e && e !== 1) || w === !0;
    if (v && (p !== Oi || u !== Oi)) {
      var P = parseFloat(u) * vs,
        T = Math.sin(P),
        O = Math.cos(P),
        S;
      ((P = parseFloat(p) * vs),
        (S = Math.cos(P)),
        (a = eo(_, a, T * S * -v)),
        (o = eo(_, o, -Math.sin(P) * -v)),
        (c = eo(_, c, O * S * -v + v)));
    }
    (g !== Bs && (y += 'perspective(' + g + Li),
      (i || n) && (y += 'translate(' + i + '%, ' + n + '%) '),
      (b || a !== Bs || o !== Bs || c !== Bs) &&
        (y +=
          c !== Bs || b
            ? 'translate3d(' + a + ', ' + o + ', ' + c + ') '
            : 'translate(' + a + ', ' + o + Li),
      l !== Oi && (y += 'rotate(' + l + Li),
      u !== Oi && (y += 'rotateY(' + u + Li),
      p !== Oi && (y += 'rotateX(' + p + Li),
      (m !== Oi || h !== Oi) && (y += 'skew(' + m + ', ' + h + Li),
      (f !== 1 || d !== 1) && (y += 'scale(' + f + ', ' + d + Li),
      (_.style[tt] = y || 'translate(0, 0)'));
  },
  Gm = function (e, t) {
    var r = t || this,
      i = r.xPercent,
      n = r.yPercent,
      a = r.x,
      o = r.y,
      c = r.rotation,
      l = r.skewX,
      u = r.skewY,
      p = r.scaleX,
      m = r.scaleY,
      h = r.target,
      f = r.xOrigin,
      d = r.yOrigin,
      g = r.xOffset,
      w = r.yOffset,
      _ = r.forceCSS,
      v = parseFloat(a),
      y = parseFloat(o),
      b,
      P,
      T,
      O,
      S;
    ((c = parseFloat(c)),
      (l = parseFloat(l)),
      (u = parseFloat(u)),
      u && ((u = parseFloat(u)), (l += u), (c += u)),
      c || l
        ? ((c *= vs),
          (l *= vs),
          (b = Math.cos(c) * p),
          (P = Math.sin(c) * p),
          (T = Math.sin(c - l) * -m),
          (O = Math.cos(c - l) * m),
          l &&
            ((u *= vs),
            (S = Math.tan(l - u)),
            (S = Math.sqrt(1 + S * S)),
            (T *= S),
            (O *= S),
            u &&
              ((S = Math.tan(u)),
              (S = Math.sqrt(1 + S * S)),
              (b *= S),
              (P *= S))),
          (b = lt(b)),
          (P = lt(P)),
          (T = lt(T)),
          (O = lt(O)))
        : ((b = p), (O = m), (P = T = 0)),
      ((v && !~(a + '').indexOf('px')) || (y && !~(o + '').indexOf('px'))) &&
        ((v = xi(h, 'x', a, 'px')), (y = xi(h, 'y', o, 'px'))),
      (f || d || g || w) &&
        ((v = lt(v + f - (f * b + d * T) + g)),
        (y = lt(y + d - (f * P + d * O) + w))),
      (i || n) &&
        ((S = h.getBBox()),
        (v = lt(v + (i / 100) * S.width)),
        (y = lt(y + (n / 100) * S.height))),
      (S =
        'matrix(' + b + ',' + P + ',' + T + ',' + O + ',' + v + ',' + y + ')'),
      h.setAttribute('transform', S),
      _ && (h.style[tt] = S));
  },
  qm = function (e, t, r, i, n) {
    var a = 360,
      o = Tt(n),
      c = parseFloat(n) * (o && ~n.indexOf('rad') ? Di : 1),
      l = c - i,
      u = i + l + 'deg',
      p,
      m;
    return (
      o &&
        ((p = n.split('_')[1]),
        p === 'short' && ((l %= a), l !== l % (a / 2) && (l += l < 0 ? a : -a)),
        p === 'cw' && l < 0
          ? (l = ((l + a * rc) % a) - ~~(l / a) * a)
          : p === 'ccw' && l > 0 && (l = ((l - a * rc) % a) - ~~(l / a) * a)),
      (e._pt = m = new Jt(e._pt, t, r, i, l, Pm)),
      (m.e = u),
      (m.u = 'deg'),
      e._props.push(r),
      m
    );
  },
  cc = function (e, t) {
    for (var r in t) e[r] = t[r];
    return e;
  },
  Wm = function (e, t, r) {
    var i = cc({}, r._gsap),
      n = 'perspective,force3D,transformOrigin,svgOrigin',
      a = r.style,
      o,
      c,
      l,
      u,
      p,
      m,
      h,
      f;
    i.svg
      ? ((l = r.getAttribute('transform')),
        r.setAttribute('transform', ''),
        (a[tt] = t),
        (o = xn(r, 1)),
        Ti(r, tt),
        r.setAttribute('transform', l))
      : ((l = getComputedStyle(r)[tt]),
        (a[tt] = t),
        (o = xn(r, 1)),
        (a[tt] = l));
    for (c in ri)
      ((l = i[c]),
        (u = o[c]),
        l !== u &&
          n.indexOf(c) < 0 &&
          ((h = Rt(l)),
          (f = Rt(u)),
          (p = h !== f ? xi(r, c, l, f) : parseFloat(l)),
          (m = parseFloat(u)),
          (e._pt = new Jt(e._pt, o, c, p, m - p, Po)),
          (e._pt.u = f || 0),
          e._props.push(c)));
    cc(o, i);
  };
Qt('padding,margin,Width,Radius', function (s, e) {
  var t = 'Top',
    r = 'Right',
    i = 'Bottom',
    n = 'Left',
    a = (e < 3 ? [t, r, i, n] : [t + n, t + r, i + r, i + n]).map(function (o) {
      return e < 2 ? s + o : 'border' + o + s;
    });
  _a[e > 1 ? 'border' + s : s] = function (o, c, l, u, p) {
    var m, h;
    if (arguments.length < 4)
      return (
        (m = a.map(function (f) {
          return Ur(o, f, l);
        })),
        (h = m.join(' ')),
        h.split(m[0]).length === 5 ? m[0] : h
      );
    ((m = (u + '').split(' ')),
      (h = {}),
      a.forEach(function (f, d) {
        return (h[f] = m[d] = m[d] || m[((d - 1) / 2) | 0]);
      }),
      o.init(c, h, p));
  };
});
var nd = {
  name: 'css',
  register: Oo,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, t, r, i, n) {
    var a = this._props,
      o = e.style,
      c = r.vars.startAt,
      l,
      u,
      p,
      m,
      h,
      f,
      d,
      g,
      w,
      _,
      v,
      y,
      b,
      P,
      T,
      O,
      S;
    (dl || Oo(),
      (this.styles = this.styles || Qu(e)),
      (O = this.styles.props),
      (this.tween = r));
    for (d in t)
      if (d !== 'autoRound' && ((u = t[d]), !(lr[d] && Yu(d, t, r, i, e, n)))) {
        if (
          ((h = typeof u),
          (f = _a[d]),
          h === 'function' && ((u = u.call(r, i, e, n)), (h = typeof u)),
          h === 'string' && ~u.indexOf('random(') && (u = wn(u)),
          f)
        )
          f(this, e, d, u, r) && (T = 1);
        else if (d.substr(0, 2) === '--')
          ((l = (getComputedStyle(e).getPropertyValue(d) + '').trim()),
            (u += ''),
            (_i.lastIndex = 0),
            _i.test(l) ||
              ((g = Rt(l)),
              (w = Rt(u)),
              w ? g !== w && (l = xi(e, d, l, w) + w) : g && (u += g)),
            this.add(o, 'setProperty', l, u, i, n, 0, 0, d),
            a.push(d),
            O.push(d, 0, o[d]));
        else if (h !== 'undefined') {
          if (
            (c && d in c
              ? ((l = typeof c[d] == 'function' ? c[d].call(r, i, e, n) : c[d]),
                Tt(l) && ~l.indexOf('random(') && (l = wn(l)),
                Rt(l + '') ||
                  l === 'auto' ||
                  (l += gr.units[d] || Rt(Ur(e, d)) || ''),
                (l + '').charAt(1) === '=' && (l = Ur(e, d)))
              : (l = Ur(e, d)),
            (m = parseFloat(l)),
            (_ = h === 'string' && u.charAt(1) === '=' && u.substr(0, 2)),
            _ && (u = u.substr(2)),
            (p = parseFloat(u)),
            d in Vr &&
              (d === 'autoAlpha' &&
                (m === 1 && Ur(e, 'visibility') === 'hidden' && p && (m = 0),
                O.push('visibility', 0, o.visibility),
                hi(
                  this,
                  o,
                  'visibility',
                  m ? 'inherit' : 'hidden',
                  p ? 'inherit' : 'hidden',
                  !p
                )),
              d !== 'scale' &&
                d !== 'transform' &&
                ((d = Vr[d]), ~d.indexOf(',') && (d = d.split(',')[0]))),
            (v = d in ri),
            v)
          ) {
            if (
              (this.styles.save(d),
              (S = u),
              h === 'string' && u.substring(0, 6) === 'var(--')
            ) {
              if (
                ((u = mr(e, u.substring(4, u.indexOf(')')))),
                u.substring(0, 5) === 'calc(')
              ) {
                var E = e.style.perspective;
                ((e.style.perspective = u),
                  (u = mr(e, 'perspective')),
                  E ? (e.style.perspective = E) : Ti(e, 'perspective'));
              }
              p = parseFloat(u);
            }
            if (
              (y ||
                ((b = e._gsap),
                (b.renderTransform && !t.parseTransform) ||
                  xn(e, t.parseTransform),
                (P = t.smoothOrigin !== !1 && b.smooth),
                (y = this._pt =
                  new Jt(this._pt, o, tt, 0, 1, b.renderTransform, b, 0, -1)),
                (y.dep = 1)),
              d === 'scale')
            )
              ((this._pt = new Jt(
                this._pt,
                b,
                'scaleY',
                b.scaleY,
                (_ ? ms(b.scaleY, _ + p) : p) - b.scaleY || 0,
                Po
              )),
                (this._pt.u = 0),
                a.push('scaleY', d),
                (d += 'X'));
            else if (d === 'transformOrigin') {
              (O.push(er, 0, o[er]),
                (u = Vm(u)),
                b.svg
                  ? Lo(e, u, 0, P, 0, this)
                  : ((w = parseFloat(u.split(' ')[2]) || 0),
                    w !== b.zOrigin && hi(this, b, 'zOrigin', b.zOrigin, w),
                    hi(this, o, d, wa(l), wa(u))));
              continue;
            } else if (d === 'svgOrigin') {
              Lo(e, u, 1, P, 0, this);
              continue;
            } else if (d in rd) {
              qm(this, b, d, m, _ ? ms(m, _ + u) : u);
              continue;
            } else if (d === 'smoothOrigin') {
              hi(this, b, 'smooth', b.smooth, u);
              continue;
            } else if (d === 'force3D') {
              b[d] = u;
              continue;
            } else if (d === 'transform') {
              Wm(this, u, e);
              continue;
            }
          } else d in o || (d = Ds(d) || d);
          if (v || ((p || p === 0) && (m || m === 0) && !Mm.test(u) && d in o))
            ((g = (l + '').substr((m + '').length)),
              p || (p = 0),
              (w = Rt(u) || (d in gr.units ? gr.units[d] : g)),
              g !== w && (m = xi(e, d, l, w)),
              (this._pt = new Jt(
                this._pt,
                v ? b : o,
                d,
                m,
                (_ ? ms(m, _ + p) : p) - m,
                !v && (w === 'px' || d === 'zIndex') && t.autoRound !== !1
                  ? Lm
                  : Po
              )),
              (this._pt.u = w || 0),
              v && S !== u
                ? ((this._pt.b = l), (this._pt.e = S), (this._pt.r = Om))
                : g !== w &&
                  w !== '%' &&
                  ((this._pt.b = l), (this._pt.r = Am)));
          else if (d in o) Ym.call(this, e, d, l, _ ? _ + u : u);
          else if (d in e) this.add(e, d, l || e[d], _ ? _ + u : u, i, n);
          else if (d !== 'parseTransform') {
            tl(d, u);
            continue;
          }
          (v ||
            (d in o
              ? O.push(d, 0, o[d])
              : typeof e[d] == 'function'
                ? O.push(d, 2, e[d]())
                : O.push(d, 1, l || e[d])),
            a.push(d));
        }
      }
    T && Wu(this);
  },
  render: function (e, t) {
    if (t.tween._time || !fl())
      for (var r = t._pt; r; ) (r.r(e, r.d), (r = r._next));
    else t.styles.revert();
  },
  get: Ur,
  aliases: Vr,
  getSetter: function (e, t, r) {
    var i = Vr[t];
    return (
      i && i.indexOf(',') < 0 && (t = i),
      t in ri && t !== er && (e._gsap.x || Ur(e, 'x'))
        ? r && tc === r
          ? t === 'scale'
            ? Rm
            : Im
          : (tc = r || {}) && (t === 'scale' ? zm : $m)
        : e.style && !Qo(e.style[t])
          ? Dm
          : ~t.indexOf('-')
            ? km
            : cl(e, t)
    );
  },
  core: { _removeProperty: Ti, _getMatrix: hl },
};
tr.utils.checkPrefix = Ds;
tr.core.getStyleSaver = Qu;
(function (s, e, t, r) {
  var i = Qt(s + ',' + e + ',' + t, function (n) {
    ri[n] = 1;
  });
  (Qt(e, function (n) {
    ((gr.units[n] = 'deg'), (rd[n] = 1));
  }),
    (Vr[i[13]] = s + ',' + e),
    Qt(r, function (n) {
      var a = n.split(':');
      Vr[a[1]] = i[a[0]];
    }));
})(
  'x,y,z,scale,scaleX,scaleY,xPercent,yPercent',
  'rotation,rotationX,rotationY,skewX,skewY',
  'transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
  '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY'
);
Qt(
  'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
  function (s) {
    gr.units[s] = 'px';
  }
);
tr.registerPlugin(nd);
var ml = tr.registerPlugin(nd) || tr;
ml.core.Tween;
function Um(s, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(s, r.key, r));
  }
}
function jm(s, e, t) {
  return (e && Um(s.prototype, e), s);
}
var Ne,
  zn,
  Ft,
  ui,
  qs,
  qr,
  ki,
  uc,
  we,
  Fr,
  $n,
  dc,
  fc,
  pc,
  hc,
  ad = function () {
    return typeof window < 'u';
  },
  od = function () {
    return Ne || (ad() && (Ne = window.gsap) && Ne.registerPlugin && Ne);
  },
  Km = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  oi = function (e) {
    return we.maxScroll(e || Ft);
  },
  Zm = function (e, t) {
    var r = e.parentNode || qs,
      i = e.getBoundingClientRect(),
      n = r.getBoundingClientRect(),
      a = n.top - i.top,
      o = n.bottom - i.bottom,
      c = (Math.abs(a) > Math.abs(o) ? a : o) / (1 - t),
      l = -c * t,
      u,
      p;
    return (
      c > 0 &&
        ((u = n.height / (Ft.innerHeight + n.height)),
        (p =
          u === 0.5
            ? n.height * 2
            : Math.min(n.height, Math.abs((-c * u) / (2 * u - 1))) *
              2 *
              (t || 1)),
        (l += t ? -p * t : -p / 2),
        (c += p)),
      { change: c, offset: l }
    );
  },
  Qm = function (e) {
    var t = ui.querySelector('.ScrollSmoother-wrapper');
    return (
      t ||
        ((t = ui.createElement('div')),
        t.classList.add('ScrollSmoother-wrapper'),
        e.parentNode.insertBefore(t, e),
        t.appendChild(e)),
      t
    );
  },
  Si = (function () {
    function s(e) {
      var t = this;
      (zn ||
        s.register(Ne) ||
        console.warn('Please gsap.registerPlugin(ScrollSmoother)'),
        (e = this.vars = e || {}),
        Fr && Fr.kill(),
        (Fr = this),
        pc(this));
      var r = e,
        i = r.smoothTouch,
        n = r.onUpdate,
        a = r.onStop,
        o = r.smooth,
        c = r.onFocusIn,
        l = r.normalizeScroll,
        u = r.wholePixels,
        p,
        m,
        h,
        f,
        d,
        g,
        w,
        _,
        v,
        y,
        b,
        P,
        T,
        O,
        S = this,
        E = e.effectsPrefix || '',
        I = we.getScrollFunc(Ft),
        A =
          we.isTouch === 1
            ? i === !0
              ? 0.8
              : parseFloat(i) || 0
            : o === 0 || o === !1
              ? 0
              : parseFloat(o) || 0.8,
        k = (A && +e.speed) || 1,
        x = 0,
        L = 0,
        $ = 1,
        M = dc(0),
        D = function () {
          return M.update(-x);
        },
        z = { y: 0 },
        C = function () {
          return (p.style.overflow = 'visible');
        },
        W,
        ae = function (R) {
          R.update();
          var V = R.getTween();
          (V && (V.pause(), (V._time = V._dur), (V._tTime = V._tDur)),
            (W = !1),
            R.animation.progress(R.progress, !0));
        },
        le = function (R, V) {
          ((R !== x && !y) || V) &&
            (u && (R = Math.round(R)),
            A &&
              ((p.style.transform =
                'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
                R +
                ', 0, 1)'),
              (p._gsap.y = R + 'px')),
            (L = R - x),
            (x = R),
            we.isUpdating || s.isRefreshing || we.update());
        },
        U = function (R) {
          return arguments.length
            ? (R < 0 && (R = 0),
              (z.y = -R),
              (W = !0),
              y ? (x = -R) : le(-R),
              we.isRefreshing ? f.update() : I(R / k),
              this)
            : -x;
        },
        B =
          typeof ResizeObserver < 'u' &&
          e.autoResize !== !1 &&
          new ResizeObserver(function () {
            if (!we.isRefreshing) {
              var X = oi(m) * k;
              (X < -x && U(X), hc.restart(!0));
            }
          }),
        F,
        Y = function (R) {
          ((m.scrollTop = 0),
            !(
              (R.target.contains && R.target.contains(m)) ||
              (c && c(t, R) === !1)
            ) &&
              (we.isInViewport(R.target) ||
                R.target === F ||
                t.scrollTo(R.target, !1, 'center center'),
              (F = R.target)));
        },
        Q = function (R, V) {
          if (R < V.start) return R;
          var H = isNaN(V.ratio) ? 1 : V.ratio,
            K = V.end - V.start,
            J = R - V.start,
            re = V.offset || 0,
            Ae = V.pins || [],
            te = Ae.offset || 0,
            _e =
              (V._startClamp && V.start <= 0) || (V.pins && V.pins.offset)
                ? 0
                : V._endClamp && V.end === oi()
                  ? 1
                  : 0.5;
          return (
            Ae.forEach(function (ve) {
              ((K -= ve.distance), ve.nativeStart <= R && (J -= ve.distance));
            }),
            te && (J *= (K - te / H) / K),
            R + (J - re * _e) / H - J
          );
        },
        se = function X(R, V, H) {
          H || (R.pins.length = R.pins.offset = 0);
          var K = R.pins,
            J = R.markers,
            re,
            Ae,
            te,
            _e,
            ve,
            de,
            Ye,
            G;
          for (Ye = 0; Ye < V.length; Ye++)
            if (
              ((G = V[Ye]),
              R.trigger &&
                G.trigger &&
                R !== G &&
                (G.trigger === R.trigger ||
                  G.pinnedContainer === R.trigger ||
                  R.trigger.contains(G.trigger)) &&
                ((ve = G._startNative || G._startClamp || G.start),
                (de = G._endNative || G._endClamp || G.end),
                (te = Q(ve, R)),
                (_e = G.pin && de > 0 ? te + (de - ve) : Q(de, R)),
                G.setPositions(
                  te,
                  _e,
                  !0,
                  (G._startClamp ? Math.max(0, te) : te) - ve
                ),
                G.markerStart &&
                  J.push(
                    Ne.quickSetter([G.markerStart, G.markerEnd], 'y', 'px')
                  ),
                G.pin && G.end > 0 && !H))
            ) {
              if (
                ((re = G.end - G.start),
                (Ae = R._startClamp && G.start < 0),
                Ae)
              ) {
                if (R.start > 0) {
                  (R.setPositions(0, R.end + (R._startNative - R.start), !0),
                    X(R, V));
                  return;
                }
                ((re += G.start), (K.offset = -G.start));
              }
              (K.push({
                start: G.start,
                nativeStart: ve,
                end: G.end,
                distance: re,
                trig: G,
              }),
                R.setPositions(R.start, R.end + (Ae ? -G.start : re), !0));
            }
        },
        ke = function (R, V) {
          d.forEach(function (H) {
            return se(H, R, V);
          });
        },
        be = function () {
          ((qs = ui.documentElement),
            (qr = ui.body),
            C(),
            requestAnimationFrame(C),
            d &&
              (we.getAll().forEach(function (R) {
                ((R._startNative = R.start), (R._endNative = R.end));
              }),
              d.forEach(function (R) {
                var V = R._startClamp || R.start,
                  H = R.autoSpeed
                    ? Math.min(oi(), R.end)
                    : V + Math.abs((R.end - V) / R.ratio),
                  K = H - R.end;
                if (((V -= K / 2), (H -= K / 2), V > H)) {
                  var J = V;
                  ((V = H), (H = J));
                }
                (R._startClamp && V < 0
                  ? ((H = R.ratio < 0 ? oi() : R.end / R.ratio),
                    (K = H - R.end),
                    (V = 0))
                  : (R.ratio < 0 || (R._endClamp && H >= oi())) &&
                    ((H = oi()),
                    (V =
                      R.ratio < 0 || R.ratio > 1
                        ? 0
                        : H - (H - R.start) / R.ratio),
                    (K = (H - V) * R.ratio - (R.end - R.start))),
                  (R.offset = K || 1e-4),
                  (R.pins.length = R.pins.offset = 0),
                  R.setPositions(V, H, !0));
              }),
              ke(we.sort())),
            M.reset());
        },
        fe = function () {
          return we.addEventListener('refresh', be);
        },
        j = function () {
          return (
            d &&
            d.forEach(function (R) {
              return R.vars.onRefresh(R);
            })
          );
        },
        ee = function () {
          return (
            d &&
              d.forEach(function (R) {
                return R.vars.onRefreshInit(R);
              }),
            j
          );
        },
        ce = function (R, V, H, K) {
          return function () {
            var J = typeof V == 'function' ? V(H, K) : V;
            (J ||
              J === 0 ||
              (J = K.getAttribute('data-' + E + R) || (R === 'speed' ? 1 : 0)),
              K.setAttribute('data-' + E + R, J));
            var re = (J + '').substr(0, 6) === 'clamp(';
            return { clamp: re, value: re ? J.substr(6, J.length - 7) : J };
          };
        },
        ge = function (R, V, H, K, J) {
          J = (typeof J == 'function' ? J(K, R) : J) || 0;
          var re = ce('speed', V, K, R),
            Ae = ce('lag', H, K, R),
            te = Ne.getProperty(R, 'y'),
            _e = R._gsap,
            ve,
            de,
            Ye,
            G,
            Ut,
            nt,
            at = [],
            Me = function () {
              ((V = re()),
                (H = parseFloat(Ae().value)),
                (ve = parseFloat(V.value) || 1),
                (Ye = V.value === 'auto'),
                (Ut =
                  Ye || (de && de._startClamp && de.start <= 0) || at.offset
                    ? 0
                    : de && de._endClamp && de.end === oi()
                      ? 1
                      : 0.5),
                G && G.kill(),
                (G =
                  H &&
                  Ne.to(R, { ease: $n, overwrite: !1, y: '+=0', duration: H })),
                de && ((de.ratio = ve), (de.autoSpeed = Ye)));
            },
            Fe = function () {
              ((_e.y = te + 'px'), _e.renderTransform(1), Me());
            },
            wr = [],
            oe = 0,
            Dr = function ($e) {
              if (Ye) {
                Fe();
                var We = Zm(R, uc(0, 1, -$e.start / ($e.end - $e.start)));
                ((oe = We.change), (nt = We.offset));
              } else
                ((nt = at.offset || 0),
                  (oe = ($e.end - $e.start - nt) * (1 - ve)));
              (at.forEach(function (rr) {
                return (oe -= rr.distance * (1 - ve));
              }),
                ($e.offset = oe || 0.001),
                $e.vars.onUpdate($e),
                G && G.progress(1));
            };
          return (
            Me(),
            (ve !== 1 || Ye || G) &&
              ((de = we.create({
                trigger: Ye ? R.parentNode : R,
                start: function () {
                  return V.clamp
                    ? 'clamp(top bottom+=' + J + ')'
                    : 'top bottom+=' + J;
                },
                end: function () {
                  return V.value < 0
                    ? 'max'
                    : V.clamp
                      ? 'clamp(bottom top-=' + J + ')'
                      : 'bottom top-=' + J;
                },
                scroller: m,
                scrub: !0,
                refreshPriority: -999,
                onRefreshInit: Fe,
                onRefresh: Dr,
                onKill: function ($e) {
                  var We = d.indexOf($e);
                  (We >= 0 && d.splice(We, 1), Fe());
                },
                onUpdate: function ($e) {
                  var We = te + oe * ($e.progress - Ut),
                    rr = at.length,
                    Pr = 0,
                    ut,
                    Ar,
                    ue;
                  if ($e.offset) {
                    if (rr) {
                      for (Ar = -x, ue = $e.end; rr--; ) {
                        if (
                          ((ut = at[rr]),
                          ut.trig.isActive || (Ar >= ut.start && Ar <= ut.end))
                        ) {
                          G &&
                            ((ut.trig.progress +=
                              ut.trig.direction < 0 ? 0.001 : -0.001),
                            ut.trig.update(0, 0, 1),
                            G.resetTo('y', parseFloat(_e.y), -L, !0),
                            $ && G.progress(1));
                          return;
                        }
                        (Ar > ut.end && (Pr += ut.distance),
                          (ue -= ut.distance));
                      }
                      We =
                        te +
                        Pr +
                        oe *
                          ((Ne.utils.clamp($e.start, $e.end, Ar) -
                            $e.start -
                            Pr) /
                            (ue - $e.start) -
                            Ut);
                    }
                    (wr.length &&
                      !Ye &&
                      wr.forEach(function (ne) {
                        return ne(We - Pr);
                      }),
                      (We = Km(We + nt)),
                      G
                        ? (G.resetTo('y', We, -L, !0), $ && G.progress(1))
                        : ((_e.y = We + 'px'), _e.renderTransform(1)));
                  }
                },
              })),
              Dr(de),
              (Ne.core.getCache(de.trigger).stRevert = ee),
              (de.startY = te),
              (de.pins = at),
              (de.markers = wr),
              (de.ratio = ve),
              (de.autoSpeed = Ye),
              (R.style.willChange = 'transform')),
            de
          );
        };
      (fe(),
        we.addEventListener('killAll', fe),
        Ne.delayedCall(0.5, function () {
          return ($ = 0);
        }),
        (this.scrollTop = U),
        (this.scrollTo = function (X, R, V) {
          var H = Ne.utils.clamp(
            0,
            oi(),
            isNaN(X) ? t.offset(X, V, !!R && !y) : +X
          );
          R
            ? y
              ? Ne.to(t, {
                  duration: A,
                  scrollTop: H,
                  overwrite: 'auto',
                  ease: $n,
                })
              : I(H)
            : U(H);
        }),
        (this.offset = function (X, R, V) {
          X = ki(X)[0];
          var H = X.style.cssText,
            K = we.create({ trigger: X, start: R || 'top top' }),
            J;
          return (
            d && ($ ? we.refresh() : ke([K], !0)),
            (J = K.start / (V ? k : 1)),
            K.kill(!1),
            (X.style.cssText = H),
            (Ne.core.getCache(X).uncache = 1),
            J
          );
        }));
      function N() {
        return (
          (h = p.clientHeight),
          (p.style.overflow = 'visible'),
          (qr.style.height = Ft.innerHeight + (h - Ft.innerHeight) / k + 'px'),
          h - Ft.innerHeight
        );
      }
      ((this.content = function (X) {
        if (arguments.length) {
          var R =
            ki(X || '#smooth-content')[0] ||
            console.warn('ScrollSmoother needs a valid content element.') ||
            qr.children[0];
          return (
            R !== p &&
              ((p = R),
              (v = p.getAttribute('style') || ''),
              B && B.observe(p),
              Ne.set(p, {
                overflow: 'visible',
                width: '100%',
                boxSizing: 'border-box',
                y: '+=0',
              }),
              A || Ne.set(p, { clearProps: 'transform' })),
            this
          );
        }
        return p;
      }),
        (this.wrapper = function (X) {
          return arguments.length
            ? ((m = ki(X || '#smooth-wrapper')[0] || Qm(p)),
              (_ = m.getAttribute('style') || ''),
              N(),
              Ne.set(
                m,
                A
                  ? {
                      overflow: 'hidden',
                      position: 'fixed',
                      height: '100%',
                      width: '100%',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }
                  : {
                      overflow: 'visible',
                      position: 'relative',
                      width: '100%',
                      height: 'auto',
                      top: 'auto',
                      bottom: 'auto',
                      left: 'auto',
                      right: 'auto',
                    }
              ),
              this)
            : m;
        }),
        (this.effects = function (X, R) {
          var V;
          if ((d || (d = []), !X)) return d.slice(0);
          ((X = ki(X)),
            X.forEach(function (ve) {
              for (var de = d.length; de--; )
                d[de].trigger === ve && d[de].kill();
            }),
            (R = R || {}));
          var H = R,
            K = H.speed,
            J = H.lag,
            re = H.effectsPadding,
            Ae = [],
            te,
            _e;
          for (te = 0; te < X.length; te++)
            ((_e = ge(X[te], K, J, te, re)), _e && Ae.push(_e));
          return (
            (V = d).push.apply(V, Ae),
            R.refresh !== !1 && we.refresh(),
            Ae
          );
        }),
        (this.sections = function (X, R) {
          var V;
          if ((g || (g = []), !X)) return g.slice(0);
          var H = ki(X).map(function (K) {
            return we.create({
              trigger: K,
              start: 'top 120%',
              end: 'bottom -20%',
              onToggle: function (re) {
                ((K.style.opacity = re.isActive ? '1' : '0'),
                  (K.style.pointerEvents = re.isActive ? 'all' : 'none'));
              },
            });
          });
          return (R && R.add ? (V = g).push.apply(V, H) : (g = H.slice(0)), H);
        }),
        this.content(e.content),
        this.wrapper(e.wrapper),
        (this.render = function (X) {
          return le(X || X === 0 ? X : x);
        }),
        (this.getVelocity = function () {
          return M.getVelocity(-x);
        }),
        we.scrollerProxy(m, {
          scrollTop: U,
          scrollHeight: function () {
            return N() && qr.scrollHeight;
          },
          fixedMarkers: e.fixedMarkers !== !1 && !!A,
          content: p,
          getBoundingClientRect: function () {
            return {
              top: 0,
              left: 0,
              width: Ft.innerWidth,
              height: Ft.innerHeight,
            };
          },
        }),
        we.defaults({ scroller: m }));
      var Pe = we.getAll().filter(function (X) {
        return X.scroller === Ft || X.scroller === m;
      });
      (Pe.forEach(function (X) {
        return X.revert(!0, !0);
      }),
        (f = we.create({
          animation: Ne.fromTo(
            z,
            {
              y: function () {
                return ((O = 0), 0);
              },
            },
            {
              y: function () {
                return ((O = 1), -N());
              },
              immediateRender: !1,
              ease: 'none',
              data: 'ScrollSmoother',
              duration: 100,
              onUpdate: function () {
                if (O) {
                  var R = W;
                  (R && (ae(f), (z.y = x)), le(z.y, R), D(), n && !y && n(S));
                }
              },
            }
          ),
          onRefreshInit: function (R) {
            if (!s.isRefreshing) {
              if (((s.isRefreshing = !0), d)) {
                var V = we.getAll().filter(function (K) {
                  return !!K.pin;
                });
                d.forEach(function (K) {
                  K.vars.pinnedContainer ||
                    V.forEach(function (J) {
                      if (J.pin.contains(K.trigger)) {
                        var re = K.vars;
                        ((re.pinnedContainer = J.pin),
                          (K.vars = null),
                          K.init(re, K.animation));
                      }
                    });
                });
              }
              var H = R.getTween();
              ((T = H && H._end > H._dp._time),
                (P = x),
                (z.y = 0),
                A &&
                  (we.isTouch === 1 && (m.style.position = 'absolute'),
                  (m.scrollTop = 0),
                  we.isTouch === 1 && (m.style.position = 'fixed')));
            }
          },
          onRefresh: function (R) {
            (R.animation.invalidate(),
              (z.y = 0),
              R.setPositions(R.start, N() / k),
              T || ae(R),
              (z.y = -I() * k),
              le(z.y),
              $ ||
                (T && (W = !1),
                R.animation.progress(Ne.utils.clamp(0, 1, P / k / -R.end))),
              T && ((R.progress -= 0.001), R.update()),
              (s.isRefreshing = !1));
          },
          id: 'ScrollSmoother',
          scroller: Ft,
          invalidateOnRefresh: !0,
          start: 0,
          refreshPriority: -9999,
          end: function () {
            return N() / k;
          },
          onScrubComplete: function () {
            (M.reset(), a && a(t));
          },
          scrub: A || !0,
        })),
        (this.smooth = function (X) {
          return (
            arguments.length &&
              ((A = X || 0), (k = (A && +e.speed) || 1), f.scrubDuration(X)),
            f.getTween() ? f.getTween().duration() : 0
          );
        }),
        f.getTween() && (f.getTween().vars.ease = e.ease || $n),
        (this.scrollTrigger = f),
        e.effects &&
          this.effects(
            e.effects === !0
              ? '[data-' + E + 'speed], [data-' + E + 'lag]'
              : e.effects,
            { effectsPadding: e.effectsPadding, refresh: !1 }
          ),
        e.sections &&
          this.sections(e.sections === !0 ? '[data-section]' : e.sections),
        Pe.forEach(function (X) {
          ((X.vars.scroller = m),
            X.revert(!1, !0),
            X.init(X.vars, X.animation));
        }),
        (this.paused = function (X, R) {
          return arguments.length
            ? (!!y !== X &&
                (X
                  ? (f.getTween() && f.getTween().pause(),
                    I(-x / k),
                    M.reset(),
                    (b = we.normalizeScroll()),
                    b && b.disable(),
                    (y = we.observe({
                      preventDefault: !0,
                      type: 'wheel,touch,scroll',
                      debounce: !1,
                      allowClicks: !0,
                      onChangeY: function () {
                        return U(-x);
                      },
                    })),
                    (y.nested = fc(qs, 'wheel,touch,scroll', !0, R !== !1)))
                  : (y.nested.kill(),
                    y.kill(),
                    (y = 0),
                    b && b.enable(),
                    (f.progress = (-x / k - f.start) / (f.end - f.start)),
                    ae(f))),
              this)
            : !!y;
        }),
        (this.kill = this.revert =
          function () {
            (t.paused(!1), ae(f), f.kill());
            for (var X = (d || []).concat(g || []), R = X.length; R--; )
              X[R].kill();
            (we.scrollerProxy(m),
              we.removeEventListener('killAll', fe),
              we.removeEventListener('refresh', be),
              (m.style.cssText = _),
              (p.style.cssText = v));
            var V = we.defaults({});
            (V && V.scroller === m && we.defaults({ scroller: Ft }),
              t.normalizer && we.normalizeScroll(!1),
              clearInterval(w),
              (Fr = null),
              B && B.disconnect(),
              qr.style.removeProperty('height'),
              Ft.removeEventListener('focusin', Y));
          }),
        (this.refresh = function (X, R) {
          return f.refresh(X, R);
        }),
        l &&
          (this.normalizer = we.normalizeScroll(
            l === !0 ? { debounce: !0, content: !A && p } : l
          )),
        we.config(e),
        'scrollBehavior' in Ft.getComputedStyle(qr) &&
          Ne.set([qr, qs], { scrollBehavior: 'auto' }),
        Ft.addEventListener('focusin', Y),
        (w = setInterval(D, 250)),
        ui.readyState === 'loading' ||
          requestAnimationFrame(function () {
            return we.refresh();
          }));
    }
    return (
      (s.register = function (t) {
        return (
          zn ||
            ((Ne = t || od()),
            ad() &&
              window.document &&
              ((Ft = window),
              (ui = document),
              (qs = ui.documentElement),
              (qr = ui.body)),
            Ne &&
              ((ki = Ne.utils.toArray),
              (uc = Ne.utils.clamp),
              ($n = Ne.parseEase('expo')),
              (pc = Ne.core.context || function () {}),
              (we = Ne.core.globals().ScrollTrigger),
              Ne.core.globals('ScrollSmoother', s),
              qr &&
                we &&
                ((hc = Ne.delayedCall(0.2, function () {
                  return we.isRefreshing || (Fr && Fr.refresh());
                }).pause()),
                (dc = we.core._getVelocityProp),
                (fc = we.core._inputObserver),
                (s.refresh = we.refresh),
                (zn = 1)))),
          zn
        );
      }),
      jm(s, [
        {
          key: 'progress',
          get: function () {
            return this.scrollTrigger
              ? this.scrollTrigger.animation._time / 100
              : 0;
          },
        },
      ]),
      s
    );
  })();
Si.version = '3.14.2';
Si.create = function (s) {
  return Fr && s && Fr.content() === ki(s.content)[0] ? Fr : new Si(s);
};
Si.get = function () {
  return Fr;
};
od() && Ne.registerPlugin(Si);
function Jm(s, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    ((r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(s, r.key, r));
  }
}
function eg(s, e, t) {
  return (e && Jm(s.prototype, e), s);
}
var Mt,
  sa,
  fr,
  mi,
  gi,
  _s,
  ld,
  Ii,
  sn,
  cd,
  Zr,
  Lr,
  ud,
  dd = function () {
    return (
      Mt ||
      (typeof window < 'u' && (Mt = window.gsap) && Mt.registerPlugin && Mt)
    );
  },
  fd = 1,
  ds = [],
  Se = [],
  Hr = [],
  nn = Date.now,
  Do = function (e, t) {
    return t;
  },
  tg = function () {
    var e = sn.core,
      t = e.bridge || {},
      r = e._scrollers,
      i = e._proxies;
    (r.push.apply(r, Se),
      i.push.apply(i, Hr),
      (Se = r),
      (Hr = i),
      (Do = function (a, o) {
        return t[a](o);
      }));
  },
  wi = function (e, t) {
    return ~Hr.indexOf(e) && Hr[Hr.indexOf(e) + 1][t];
  },
  an = function (e) {
    return !!~cd.indexOf(e);
  },
  Bt = function (e, t, r, i, n) {
    return e.addEventListener(t, r, { passive: i !== !1, capture: !!n });
  },
  Nt = function (e, t, r, i) {
    return e.removeEventListener(t, r, !!i);
  },
  Nn = 'scrollLeft',
  Bn = 'scrollTop',
  ko = function () {
    return (Zr && Zr.isPressed) || Se.cache++;
  },
  ya = function (e, t) {
    var r = function i(n) {
      if (n || n === 0) {
        fd && (fr.history.scrollRestoration = 'manual');
        var a = Zr && Zr.isPressed;
        ((n = i.v = Math.round(n) || (Zr && Zr.iOS ? 1 : 0)),
          e(n),
          (i.cacheID = Se.cache),
          a && Do('ss', n));
      } else
        (t || Se.cache !== i.cacheID || Do('ref')) &&
          ((i.cacheID = Se.cache), (i.v = e()));
      return i.v + i.offset;
    };
    return ((r.offset = 0), e && r);
  },
  Wt = {
    s: Nn,
    p: 'left',
    p2: 'Left',
    os: 'right',
    os2: 'Right',
    d: 'width',
    d2: 'Width',
    a: 'x',
    sc: ya(function (s) {
      return arguments.length
        ? fr.scrollTo(s, mt.sc())
        : fr.pageXOffset || mi[Nn] || gi[Nn] || _s[Nn] || 0;
    }),
  },
  mt = {
    s: Bn,
    p: 'top',
    p2: 'Top',
    os: 'bottom',
    os2: 'Bottom',
    d: 'height',
    d2: 'Height',
    a: 'y',
    op: Wt,
    sc: ya(function (s) {
      return arguments.length
        ? fr.scrollTo(Wt.sc(), s)
        : fr.pageYOffset || mi[Bn] || gi[Bn] || _s[Bn] || 0;
    }),
  },
  jt = function (e, t) {
    return (
      ((t && t._ctx && t._ctx.selector) || Mt.utils.toArray)(e)[0] ||
      (typeof e == 'string' && Mt.config().nullTargetWarn !== !1
        ? console.warn('Element not found:', e)
        : null)
    );
  },
  rg = function (e, t) {
    for (var r = t.length; r--; ) if (t[r] === e || t[r].contains(e)) return !0;
    return !1;
  },
  Ei = function (e, t) {
    var r = t.s,
      i = t.sc;
    an(e) && (e = mi.scrollingElement || gi);
    var n = Se.indexOf(e),
      a = i === mt.sc ? 1 : 2;
    (!~n && (n = Se.push(e) - 1), Se[n + a] || Bt(e, 'scroll', ko));
    var o = Se[n + a],
      c =
        o ||
        (Se[n + a] =
          ya(wi(e, r), !0) ||
          (an(e)
            ? i
            : ya(function (l) {
                return arguments.length ? (e[r] = l) : e[r];
              })));
    return (
      (c.target = e),
      o || (c.smooth = Mt.getProperty(e, 'scrollBehavior') === 'smooth'),
      c
    );
  },
  Io = function (e, t, r) {
    var i = e,
      n = e,
      a = nn(),
      o = a,
      c = t || 50,
      l = Math.max(500, c * 3),
      u = function (f, d) {
        var g = nn();
        d || g - a > c
          ? ((n = i), (i = f), (o = a), (a = g))
          : r
            ? (i += f)
            : (i = n + ((f - n) / (g - o)) * (a - o));
      },
      p = function () {
        ((n = i = r ? 0 : i), (o = a = 0));
      },
      m = function (f) {
        var d = o,
          g = n,
          w = nn();
        return (
          (f || f === 0) && f !== i && u(f),
          a === o || w - o > l
            ? 0
            : ((i + (r ? g : -g)) / ((r ? w : a) - d)) * 1e3
        );
      };
    return { update: u, reset: p, getVelocity: m };
  },
  Fs = function (e, t) {
    return (
      t && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  },
  mc = function (e) {
    var t = Math.max.apply(Math, e),
      r = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(r) ? t : r;
  },
  pd = function () {
    ((sn = Mt.core.globals().ScrollTrigger), sn && sn.core && tg());
  },
  hd = function (e) {
    return (
      (Mt = e || dd()),
      !sa &&
        Mt &&
        typeof document < 'u' &&
        document.body &&
        ((fr = window),
        (mi = document),
        (gi = mi.documentElement),
        (_s = mi.body),
        (cd = [fr, mi, gi, _s]),
        Mt.utils.clamp,
        (ud = Mt.core.context || function () {}),
        (Ii = 'onpointerenter' in _s ? 'pointer' : 'mouse'),
        (ld = ct.isTouch =
          fr.matchMedia &&
          fr.matchMedia('(hover: none), (pointer: coarse)').matches
            ? 1
            : 'ontouchstart' in fr ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
              ? 2
              : 0),
        (Lr = ct.eventTypes =
          (
            'ontouchstart' in gi
              ? 'touchstart,touchmove,touchcancel,touchend'
              : 'onpointerdown' in gi
                ? 'pointerdown,pointermove,pointercancel,pointerup'
                : 'mousedown,mousemove,mouseup,mouseup'
          ).split(',')),
        setTimeout(function () {
          return (fd = 0);
        }, 500),
        pd(),
        (sa = 1)),
      sa
    );
  };
Wt.op = mt;
Se.cache = 0;
var ct = (function () {
  function s(t) {
    this.init(t);
  }
  var e = s.prototype;
  return (
    (e.init = function (r) {
      (sa || hd(Mt) || console.warn('Please gsap.registerPlugin(Observer)'),
        sn || pd());
      var i = r.tolerance,
        n = r.dragMinimum,
        a = r.type,
        o = r.target,
        c = r.lineHeight,
        l = r.debounce,
        u = r.preventDefault,
        p = r.onStop,
        m = r.onStopDelay,
        h = r.ignore,
        f = r.wheelSpeed,
        d = r.event,
        g = r.onDragStart,
        w = r.onDragEnd,
        _ = r.onDrag,
        v = r.onPress,
        y = r.onRelease,
        b = r.onRight,
        P = r.onLeft,
        T = r.onUp,
        O = r.onDown,
        S = r.onChangeX,
        E = r.onChangeY,
        I = r.onChange,
        A = r.onToggleX,
        k = r.onToggleY,
        x = r.onHover,
        L = r.onHoverEnd,
        $ = r.onMove,
        M = r.ignoreCheck,
        D = r.isNormalizer,
        z = r.onGestureStart,
        C = r.onGestureEnd,
        W = r.onWheel,
        ae = r.onEnable,
        le = r.onDisable,
        U = r.onClick,
        B = r.scrollSpeed,
        F = r.capture,
        Y = r.allowClicks,
        Q = r.lockAxis,
        se = r.onLockAxis;
      ((this.target = o = jt(o) || gi),
        (this.vars = r),
        h && (h = Mt.utils.toArray(h)),
        (i = i || 1e-9),
        (n = n || 0),
        (f = f || 1),
        (B = B || 1),
        (a = a || 'wheel,touch,pointer'),
        (l = l !== !1),
        c || (c = parseFloat(fr.getComputedStyle(_s).lineHeight) || 22));
      var ke,
        be,
        fe,
        j,
        ee,
        ce,
        ge,
        N = this,
        Pe = 0,
        X = 0,
        R = r.passive || (!u && r.passive !== !1),
        V = Ei(o, Wt),
        H = Ei(o, mt),
        K = V(),
        J = H(),
        re =
          ~a.indexOf('touch') &&
          !~a.indexOf('pointer') &&
          Lr[0] === 'pointerdown',
        Ae = an(o),
        te = o.ownerDocument || mi,
        _e = [0, 0, 0],
        ve = [0, 0, 0],
        de = 0,
        Ye = function () {
          return (de = nn());
        },
        G = function (ne, ze) {
          return (
            ((N.event = ne) && h && rg(ne.target, h)) ||
            (ze && re && ne.pointerType !== 'touch') ||
            (M && M(ne, ze))
          );
        },
        Ut = function () {
          (N._vx.reset(), N._vy.reset(), be.pause(), p && p(N));
        },
        nt = function () {
          var ne = (N.deltaX = mc(_e)),
            ze = (N.deltaY = mc(ve)),
            q = Math.abs(ne) >= i,
            pe = Math.abs(ze) >= i;
          (I && (q || pe) && I(N, ne, ze, _e, ve),
            q &&
              (b && N.deltaX > 0 && b(N),
              P && N.deltaX < 0 && P(N),
              S && S(N),
              A && N.deltaX < 0 != Pe < 0 && A(N),
              (Pe = N.deltaX),
              (_e[0] = _e[1] = _e[2] = 0)),
            pe &&
              (O && N.deltaY > 0 && O(N),
              T && N.deltaY < 0 && T(N),
              E && E(N),
              k && N.deltaY < 0 != X < 0 && k(N),
              (X = N.deltaY),
              (ve[0] = ve[1] = ve[2] = 0)),
            (j || fe) &&
              ($ && $(N),
              fe && (g && fe === 1 && g(N), _ && _(N), (fe = 0)),
              (j = !1)),
            ce && !(ce = !1) && se && se(N),
            ee && (W(N), (ee = !1)),
            (ke = 0));
        },
        at = function (ne, ze, q) {
          ((_e[q] += ne),
            (ve[q] += ze),
            N._vx.update(ne),
            N._vy.update(ze),
            l ? ke || (ke = requestAnimationFrame(nt)) : nt());
        },
        Me = function (ne, ze) {
          (Q &&
            !ge &&
            ((N.axis = ge = Math.abs(ne) > Math.abs(ze) ? 'x' : 'y'),
            (ce = !0)),
            ge !== 'y' && ((_e[2] += ne), N._vx.update(ne, !0)),
            ge !== 'x' && ((ve[2] += ze), N._vy.update(ze, !0)),
            l ? ke || (ke = requestAnimationFrame(nt)) : nt());
        },
        Fe = function (ne) {
          if (!G(ne, 1)) {
            ne = Fs(ne, u);
            var ze = ne.clientX,
              q = ne.clientY,
              pe = ze - N.x,
              ie = q - N.y,
              he = N.isDragging;
            ((N.x = ze),
              (N.y = q),
              (he ||
                ((pe || ie) &&
                  (Math.abs(N.startX - ze) >= n ||
                    Math.abs(N.startY - q) >= n))) &&
                (fe || (fe = he ? 2 : 1),
                he || (N.isDragging = !0),
                Me(pe, ie)));
          }
        },
        wr = (N.onPress = function (ue) {
          G(ue, 1) ||
            (ue && ue.button) ||
            ((N.axis = ge = null),
            be.pause(),
            (N.isPressed = !0),
            (ue = Fs(ue)),
            (Pe = X = 0),
            (N.startX = N.x = ue.clientX),
            (N.startY = N.y = ue.clientY),
            N._vx.reset(),
            N._vy.reset(),
            Bt(D ? o : te, Lr[1], Fe, R, !0),
            (N.deltaX = N.deltaY = 0),
            v && v(N));
        }),
        oe = (N.onRelease = function (ue) {
          if (!G(ue, 1)) {
            Nt(D ? o : te, Lr[1], Fe, !0);
            var ne = !isNaN(N.y - N.startY),
              ze = N.isDragging,
              q =
                ze &&
                (Math.abs(N.x - N.startX) > 3 || Math.abs(N.y - N.startY) > 3),
              pe = Fs(ue);
            (!q &&
              ne &&
              (N._vx.reset(),
              N._vy.reset(),
              u &&
                Y &&
                Mt.delayedCall(0.08, function () {
                  if (nn() - de > 300 && !ue.defaultPrevented) {
                    if (ue.target.click) ue.target.click();
                    else if (te.createEvent) {
                      var ie = te.createEvent('MouseEvents');
                      (ie.initMouseEvent(
                        'click',
                        !0,
                        !0,
                        fr,
                        1,
                        pe.screenX,
                        pe.screenY,
                        pe.clientX,
                        pe.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        ue.target.dispatchEvent(ie));
                    }
                  }
                })),
              (N.isDragging = N.isGesturing = N.isPressed = !1),
              p && ze && !D && be.restart(!0),
              fe && nt(),
              w && ze && w(N),
              y && y(N, q));
          }
        }),
        Dr = function (ne) {
          return (
            ne.touches &&
            ne.touches.length > 1 &&
            (N.isGesturing = !0) &&
            z(ne, N.isDragging)
          );
        },
        gt = function () {
          return (N.isGesturing = !1) || C(N);
        },
        $e = function (ne) {
          if (!G(ne)) {
            var ze = V(),
              q = H();
            (at((ze - K) * B, (q - J) * B, 1),
              (K = ze),
              (J = q),
              p && be.restart(!0));
          }
        },
        We = function (ne) {
          if (!G(ne)) {
            ((ne = Fs(ne, u)), W && (ee = !0));
            var ze =
              (ne.deltaMode === 1
                ? c
                : ne.deltaMode === 2
                  ? fr.innerHeight
                  : 1) * f;
            (at(ne.deltaX * ze, ne.deltaY * ze, 0), p && !D && be.restart(!0));
          }
        },
        rr = function (ne) {
          if (!G(ne)) {
            var ze = ne.clientX,
              q = ne.clientY,
              pe = ze - N.x,
              ie = q - N.y;
            ((N.x = ze),
              (N.y = q),
              (j = !0),
              p && be.restart(!0),
              (pe || ie) && Me(pe, ie));
          }
        },
        Pr = function (ne) {
          ((N.event = ne), x(N));
        },
        ut = function (ne) {
          ((N.event = ne), L(N));
        },
        Ar = function (ne) {
          return G(ne) || (Fs(ne, u) && U(N));
        };
      ((be = N._dc = Mt.delayedCall(m || 0.25, Ut).pause()),
        (N.deltaX = N.deltaY = 0),
        (N._vx = Io(0, 50, !0)),
        (N._vy = Io(0, 50, !0)),
        (N.scrollX = V),
        (N.scrollY = H),
        (N.isDragging = N.isGesturing = N.isPressed = !1),
        ud(this),
        (N.enable = function (ue) {
          return (
            N.isEnabled ||
              (Bt(Ae ? te : o, 'scroll', ko),
              a.indexOf('scroll') >= 0 && Bt(Ae ? te : o, 'scroll', $e, R, F),
              a.indexOf('wheel') >= 0 && Bt(o, 'wheel', We, R, F),
              ((a.indexOf('touch') >= 0 && ld) || a.indexOf('pointer') >= 0) &&
                (Bt(o, Lr[0], wr, R, F),
                Bt(te, Lr[2], oe),
                Bt(te, Lr[3], oe),
                Y && Bt(o, 'click', Ye, !0, !0),
                U && Bt(o, 'click', Ar),
                z && Bt(te, 'gesturestart', Dr),
                C && Bt(te, 'gestureend', gt),
                x && Bt(o, Ii + 'enter', Pr),
                L && Bt(o, Ii + 'leave', ut),
                $ && Bt(o, Ii + 'move', rr)),
              (N.isEnabled = !0),
              (N.isDragging = N.isGesturing = N.isPressed = j = fe = !1),
              N._vx.reset(),
              N._vy.reset(),
              (K = V()),
              (J = H()),
              ue && ue.type && wr(ue),
              ae && ae(N)),
            N
          );
        }),
        (N.disable = function () {
          N.isEnabled &&
            (ds.filter(function (ue) {
              return ue !== N && an(ue.target);
            }).length || Nt(Ae ? te : o, 'scroll', ko),
            N.isPressed &&
              (N._vx.reset(), N._vy.reset(), Nt(D ? o : te, Lr[1], Fe, !0)),
            Nt(Ae ? te : o, 'scroll', $e, F),
            Nt(o, 'wheel', We, F),
            Nt(o, Lr[0], wr, F),
            Nt(te, Lr[2], oe),
            Nt(te, Lr[3], oe),
            Nt(o, 'click', Ye, !0),
            Nt(o, 'click', Ar),
            Nt(te, 'gesturestart', Dr),
            Nt(te, 'gestureend', gt),
            Nt(o, Ii + 'enter', Pr),
            Nt(o, Ii + 'leave', ut),
            Nt(o, Ii + 'move', rr),
            (N.isEnabled = N.isPressed = N.isDragging = !1),
            le && le(N));
        }),
        (N.kill = N.revert =
          function () {
            N.disable();
            var ue = ds.indexOf(N);
            (ue >= 0 && ds.splice(ue, 1), Zr === N && (Zr = 0));
          }),
        ds.push(N),
        D && an(o) && (Zr = N),
        N.enable(d));
    }),
    eg(s, [
      {
        key: 'velocityX',
        get: function () {
          return this._vx.getVelocity();
        },
      },
      {
        key: 'velocityY',
        get: function () {
          return this._vy.getVelocity();
        },
      },
    ]),
    s
  );
})();
ct.version = '3.14.2';
ct.create = function (s) {
  return new ct(s);
};
ct.register = hd;
ct.getAll = function () {
  return ds.slice();
};
ct.getById = function (s) {
  return ds.filter(function (e) {
    return e.vars.id === s;
  })[0];
};
dd() && Mt.registerPlugin(ct);
var Z,
  os,
  xe,
  Ge,
  cr,
  Be,
  gl,
  ba,
  Sn,
  on,
  Ws,
  Fn,
  Dt,
  La,
  Ro,
  Xt,
  gc,
  vc,
  ls,
  md,
  to,
  gd,
  Yt,
  zo,
  vd,
  _d,
  ci,
  $o,
  vl,
  ws,
  _l,
  ln,
  No,
  ro,
  Yn = 1,
  kt = Date.now,
  io = kt(),
  Mr = 0,
  Us = 0,
  _c = function (e, t, r) {
    var i = ar(e) && (e.substr(0, 6) === 'clamp(' || e.indexOf('max') > -1);
    return ((r['_' + t + 'Clamp'] = i), i ? e.substr(6, e.length - 7) : e);
  },
  wc = function (e, t) {
    return t && (!ar(e) || e.substr(0, 6) !== 'clamp(')
      ? 'clamp(' + e + ')'
      : e;
  },
  ig = function s() {
    return Us && requestAnimationFrame(s);
  },
  yc = function () {
    return (La = 1);
  },
  bc = function () {
    return (La = 0);
  },
  Br = function (e) {
    return e;
  },
  js = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  wd = function () {
    return typeof window < 'u';
  },
  yd = function () {
    return Z || (wd() && (Z = window.gsap) && Z.registerPlugin && Z);
  },
  Ki = function (e) {
    return !!~gl.indexOf(e);
  },
  bd = function (e) {
    return (
      (e === 'Height' ? _l : xe['inner' + e]) ||
      cr['client' + e] ||
      Be['client' + e]
    );
  },
  Td = function (e) {
    return (
      wi(e, 'getBoundingClientRect') ||
      (Ki(e)
        ? function () {
            return ((ca.width = xe.innerWidth), (ca.height = _l), ca);
          }
        : function () {
            return Kr(e);
          })
    );
  },
  sg = function (e, t, r) {
    var i = r.d,
      n = r.d2,
      a = r.a;
    return (a = wi(e, 'getBoundingClientRect'))
      ? function () {
          return a()[i];
        }
      : function () {
          return (t ? bd(n) : e['client' + n]) || 0;
        };
  },
  ng = function (e, t) {
    return !t || ~Hr.indexOf(e)
      ? Td(e)
      : function () {
          return ca;
        };
  },
  Xr = function (e, t) {
    var r = t.s,
      i = t.d2,
      n = t.d,
      a = t.a;
    return Math.max(
      0,
      (r = 'scroll' + i) && (a = wi(e, r))
        ? a() - Td(e)()[n]
        : Ki(e)
          ? (cr[r] || Be[r]) - bd(i)
          : e[r] - e['offset' + i]
    );
  },
  Vn = function (e, t) {
    for (var r = 0; r < ls.length; r += 3)
      (!t || ~t.indexOf(ls[r + 1])) && e(ls[r], ls[r + 1], ls[r + 2]);
  },
  ar = function (e) {
    return typeof e == 'string';
  },
  zt = function (e) {
    return typeof e == 'function';
  },
  Ks = function (e) {
    return typeof e == 'number';
  },
  Ri = function (e) {
    return typeof e == 'object';
  },
  Ys = function (e, t, r) {
    return e && e.progress(t ? 0 : 1) && r && e.pause();
  },
  so = function (e, t) {
    if (e.enabled) {
      var r = e._ctx
        ? e._ctx.add(function () {
            return t(e);
          })
        : t(e);
      r && r.totalTime && (e.callbackAnimation = r);
    }
  },
  ss = Math.abs,
  xd = 'left',
  Sd = 'top',
  wl = 'right',
  yl = 'bottom',
  Wi = 'width',
  Ui = 'height',
  cn = 'Right',
  un = 'Left',
  dn = 'Top',
  fn = 'Bottom',
  dt = 'padding',
  Tr = 'margin',
  ks = 'Width',
  bl = 'Height',
  ht = 'px',
  xr = function (e) {
    return xe.getComputedStyle(e);
  },
  ag = function (e) {
    var t = xr(e).position;
    e.style.position = t === 'absolute' || t === 'fixed' ? t : 'relative';
  },
  Tc = function (e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e;
  },
  Kr = function (e, t) {
    var r =
        t &&
        xr(e)[Ro] !== 'matrix(1, 0, 0, 1, 0, 0)' &&
        Z.to(e, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
        }).progress(1),
      i = e.getBoundingClientRect();
    return (r && r.progress(0).kill(), i);
  },
  Ta = function (e, t) {
    var r = t.d2;
    return e['offset' + r] || e['client' + r] || 0;
  },
  Ed = function (e) {
    var t = [],
      r = e.labels,
      i = e.duration(),
      n;
    for (n in r) t.push(r[n] / i);
    return t;
  },
  og = function (e) {
    return function (t) {
      return Z.utils.snap(Ed(e), t);
    };
  },
  Tl = function (e) {
    var t = Z.utils.snap(e),
      r =
        Array.isArray(e) &&
        e.slice(0).sort(function (i, n) {
          return i - n;
        });
    return r
      ? function (i, n, a) {
          a === void 0 && (a = 0.001);
          var o;
          if (!n) return t(i);
          if (n > 0) {
            for (i -= a, o = 0; o < r.length; o++) if (r[o] >= i) return r[o];
            return r[o - 1];
          } else for (o = r.length, i += a; o--; ) if (r[o] <= i) return r[o];
          return r[0];
        }
      : function (i, n, a) {
          a === void 0 && (a = 0.001);
          var o = t(i);
          return !n || Math.abs(o - i) < a || o - i < 0 == n < 0
            ? o
            : t(n < 0 ? i - e : i + e);
        };
  },
  lg = function (e) {
    return function (t, r) {
      return Tl(Ed(e))(t, r.direction);
    };
  },
  Xn = function (e, t, r, i) {
    return r.split(',').forEach(function (n) {
      return e(t, n, i);
    });
  },
  wt = function (e, t, r, i, n) {
    return e.addEventListener(t, r, { passive: !i, capture: !!n });
  },
  _t = function (e, t, r, i) {
    return e.removeEventListener(t, r, !!i);
  },
  Hn = function (e, t, r) {
    ((r = r && r.wheelHandler), r && (e(t, 'wheel', r), e(t, 'touchmove', r)));
  },
  xc = {
    startColor: 'green',
    endColor: 'red',
    indent: 0,
    fontSize: '16px',
    fontWeight: 'normal',
  },
  Gn = { toggleActions: 'play', anticipatePin: 0 },
  xa = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  na = function (e, t) {
    if (ar(e)) {
      var r = e.indexOf('='),
        i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
      (~r && (e.indexOf('%') > r && (i *= t / 100), (e = e.substr(0, r - 1))),
        (e =
          i +
          (e in xa
            ? xa[e] * t
            : ~e.indexOf('%')
              ? (parseFloat(e) * t) / 100
              : parseFloat(e) || 0)));
    }
    return e;
  },
  qn = function (e, t, r, i, n, a, o, c) {
    var l = n.startColor,
      u = n.endColor,
      p = n.fontSize,
      m = n.indent,
      h = n.fontWeight,
      f = Ge.createElement('div'),
      d = Ki(r) || wi(r, 'pinType') === 'fixed',
      g = e.indexOf('scroller') !== -1,
      w = d ? Be : r,
      _ = e.indexOf('start') !== -1,
      v = _ ? l : u,
      y =
        'border-color:' +
        v +
        ';font-size:' +
        p +
        ';color:' +
        v +
        ';font-weight:' +
        h +
        ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;';
    return (
      (y += 'position:' + ((g || c) && d ? 'fixed;' : 'absolute;')),
      (g || c || !d) &&
        (y += (i === mt ? wl : yl) + ':' + (a + parseFloat(m)) + 'px;'),
      o &&
        (y +=
          'box-sizing:border-box;text-align:left;width:' +
          o.offsetWidth +
          'px;'),
      (f._isStart = _),
      f.setAttribute('class', 'gsap-marker-' + e + (t ? ' marker-' + t : '')),
      (f.style.cssText = y),
      (f.innerText = t || t === 0 ? e + '-' + t : e),
      w.children[0] ? w.insertBefore(f, w.children[0]) : w.appendChild(f),
      (f._offset = f['offset' + i.op.d2]),
      aa(f, 0, i, _),
      f
    );
  },
  aa = function (e, t, r, i) {
    var n = { display: 'block' },
      a = r[i ? 'os2' : 'p2'],
      o = r[i ? 'p2' : 'os2'];
    ((e._isFlipped = i),
      (n[r.a + 'Percent'] = i ? -100 : 0),
      (n[r.a] = i ? '1px' : 0),
      (n['border' + a + ks] = 1),
      (n['border' + o + ks] = 0),
      (n[r.p] = t + 'px'),
      Z.set(e, n));
  },
  Te = [],
  Bo = {},
  En,
  Sc = function () {
    return kt() - Mr > 34 && (En || (En = requestAnimationFrame(Jr)));
  },
  ns = function () {
    (!Yt || !Yt.isPressed || Yt.startX > Be.clientWidth) &&
      (Se.cache++,
      Yt ? En || (En = requestAnimationFrame(Jr)) : Jr(),
      Mr || Qi('scrollStart'),
      (Mr = kt()));
  },
  no = function () {
    ((_d = xe.innerWidth), (vd = xe.innerHeight));
  },
  Zs = function (e) {
    (Se.cache++,
      (e === !0 ||
        (!Dt &&
          !gd &&
          !Ge.fullscreenElement &&
          !Ge.webkitFullscreenElement &&
          (!zo ||
            _d !== xe.innerWidth ||
            Math.abs(xe.innerHeight - vd) > xe.innerHeight * 0.25))) &&
        ba.restart(!0));
  },
  Zi = {},
  cg = [],
  Cd = function s() {
    return _t(Ce, 'scrollEnd', s) || Fi(!0);
  },
  Qi = function (e) {
    return (
      (Zi[e] &&
        Zi[e].map(function (t) {
          return t();
        })) ||
      cg
    );
  },
  sr = [],
  Md = function (e) {
    for (var t = 0; t < sr.length; t += 5)
      (!e || (sr[t + 4] && sr[t + 4].query === e)) &&
        ((sr[t].style.cssText = sr[t + 1]),
        sr[t].getBBox && sr[t].setAttribute('transform', sr[t + 2] || ''),
        (sr[t + 3].uncache = 1));
  },
  Pd = function () {
    return Se.forEach(function (e) {
      return zt(e) && ++e.cacheID && (e.rec = e());
    });
  },
  xl = function (e, t) {
    var r;
    for (Xt = 0; Xt < Te.length; Xt++)
      ((r = Te[Xt]),
        r && (!t || r._ctx === t) && (e ? r.kill(1) : r.revert(!0, !0)));
    ((ln = !0), t && Md(t), t || Qi('revert'));
  },
  Ad = function (e, t) {
    (Se.cache++,
      (t || !Ht) &&
        Se.forEach(function (r) {
          return zt(r) && r.cacheID++ && (r.rec = 0);
        }),
      ar(e) && (xe.history.scrollRestoration = vl = e));
  },
  Ht,
  ji = 0,
  Ec,
  ug = function () {
    if (Ec !== ji) {
      var e = (Ec = ji);
      requestAnimationFrame(function () {
        return e === ji && Fi(!0);
      });
    }
  },
  Od = function () {
    (Be.appendChild(ws),
      (_l = (!Yt && ws.offsetHeight) || xe.innerHeight),
      Be.removeChild(ws));
  },
  Cc = function (e) {
    return Sn(
      '.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end'
    ).forEach(function (t) {
      return (t.style.display = e ? 'none' : 'block');
    });
  },
  Fi = function (e, t) {
    if (
      ((cr = Ge.documentElement),
      (Be = Ge.body),
      (gl = [xe, Ge, cr, Be]),
      Mr && !e && !ln)
    ) {
      wt(Ce, 'scrollEnd', Cd);
      return;
    }
    (Od(), (Ht = Ce.isRefreshing = !0), ln || Pd());
    var r = Qi('refreshInit');
    (md && Ce.sort(),
      t || xl(),
      Se.forEach(function (i) {
        zt(i) && (i.smooth && (i.target.style.scrollBehavior = 'auto'), i(0));
      }),
      Te.slice(0).forEach(function (i) {
        return i.refresh();
      }),
      (ln = !1),
      Te.forEach(function (i) {
        if (i._subPinOffset && i.pin) {
          var n = i.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
            a = i.pin[n];
          (i.revert(!0, 1), i.adjustPinSpacing(i.pin[n] - a), i.refresh());
        }
      }),
      (No = 1),
      Cc(!0),
      Te.forEach(function (i) {
        var n = Xr(i.scroller, i._dir),
          a = i.vars.end === 'max' || (i._endClamp && i.end > n),
          o = i._startClamp && i.start >= n;
        (a || o) &&
          i.setPositions(
            o ? n - 1 : i.start,
            a ? Math.max(o ? n : i.start + 1, n) : i.end,
            !0
          );
      }),
      Cc(!1),
      (No = 0),
      r.forEach(function (i) {
        return i && i.render && i.render(-1);
      }),
      Se.forEach(function (i) {
        zt(i) &&
          (i.smooth &&
            requestAnimationFrame(function () {
              return (i.target.style.scrollBehavior = 'smooth');
            }),
          i.rec && i(i.rec));
      }),
      Ad(vl, 1),
      ba.pause(),
      ji++,
      (Ht = 2),
      Jr(2),
      Te.forEach(function (i) {
        return zt(i.vars.onRefresh) && i.vars.onRefresh(i);
      }),
      (Ht = Ce.isRefreshing = !1),
      Qi('refresh'));
  },
  Fo = 0,
  oa = 1,
  pn,
  Jr = function (e) {
    if (e === 2 || (!Ht && !ln)) {
      ((Ce.isUpdating = !0), pn && pn.update(0));
      var t = Te.length,
        r = kt(),
        i = r - io >= 50,
        n = t && Te[0].scroll();
      if (
        ((oa = Fo > n ? -1 : 1),
        Ht || (Fo = n),
        i &&
          (Mr && !La && r - Mr > 200 && ((Mr = 0), Qi('scrollEnd')),
          (Ws = io),
          (io = r)),
        oa < 0)
      ) {
        for (Xt = t; Xt-- > 0; ) Te[Xt] && Te[Xt].update(0, i);
        oa = 1;
      } else for (Xt = 0; Xt < t; Xt++) Te[Xt] && Te[Xt].update(0, i);
      Ce.isUpdating = !1;
    }
    En = 0;
  },
  Yo = [
    xd,
    Sd,
    yl,
    wl,
    Tr + fn,
    Tr + cn,
    Tr + dn,
    Tr + un,
    'display',
    'flexShrink',
    'float',
    'zIndex',
    'gridColumnStart',
    'gridColumnEnd',
    'gridRowStart',
    'gridRowEnd',
    'gridArea',
    'justifySelf',
    'alignSelf',
    'placeSelf',
    'order',
  ],
  la = Yo.concat([
    Wi,
    Ui,
    'boxSizing',
    'max' + ks,
    'max' + bl,
    'position',
    Tr,
    dt,
    dt + dn,
    dt + cn,
    dt + fn,
    dt + un,
  ]),
  dg = function (e, t, r) {
    ys(r);
    var i = e._gsap;
    if (i.spacerIsNative) ys(i.spacerState);
    else if (e._gsap.swappedIn) {
      var n = t.parentNode;
      n && (n.insertBefore(e, t), n.removeChild(t));
    }
    e._gsap.swappedIn = !1;
  },
  ao = function (e, t, r, i) {
    if (!e._gsap.swappedIn) {
      for (var n = Yo.length, a = t.style, o = e.style, c; n--; )
        ((c = Yo[n]), (a[c] = r[c]));
      ((a.position = r.position === 'absolute' ? 'absolute' : 'relative'),
        r.display === 'inline' && (a.display = 'inline-block'),
        (o[yl] = o[wl] = 'auto'),
        (a.flexBasis = r.flexBasis || 'auto'),
        (a.overflow = 'visible'),
        (a.boxSizing = 'border-box'),
        (a[Wi] = Ta(e, Wt) + ht),
        (a[Ui] = Ta(e, mt) + ht),
        (a[dt] = o[Tr] = o[Sd] = o[xd] = '0'),
        ys(i),
        (o[Wi] = o['max' + ks] = r[Wi]),
        (o[Ui] = o['max' + bl] = r[Ui]),
        (o[dt] = r[dt]),
        e.parentNode !== t &&
          (e.parentNode.insertBefore(t, e), t.appendChild(e)),
        (e._gsap.swappedIn = !0));
    }
  },
  fg = /([A-Z])/g,
  ys = function (e) {
    if (e) {
      var t = e.t.style,
        r = e.length,
        i = 0,
        n,
        a;
      for ((e.t._gsap || Z.core.getCache(e.t)).uncache = 1; i < r; i += 2)
        ((a = e[i + 1]),
          (n = e[i]),
          a
            ? (t[n] = a)
            : t[n] && t.removeProperty(n.replace(fg, '-$1').toLowerCase()));
    }
  },
  Wn = function (e) {
    for (var t = la.length, r = e.style, i = [], n = 0; n < t; n++)
      i.push(la[n], r[la[n]]);
    return ((i.t = e), i);
  },
  pg = function (e, t, r) {
    for (var i = [], n = e.length, a = r ? 8 : 0, o; a < n; a += 2)
      ((o = e[a]), i.push(o, o in t ? t[o] : e[a + 1]));
    return ((i.t = e.t), i);
  },
  ca = { left: 0, top: 0 },
  Mc = function (e, t, r, i, n, a, o, c, l, u, p, m, h, f) {
    (zt(e) && (e = e(c)),
      ar(e) &&
        e.substr(0, 3) === 'max' &&
        (e = m + (e.charAt(4) === '=' ? na('0' + e.substr(3), r) : 0)));
    var d = h ? h.time() : 0,
      g,
      w,
      _;
    if ((h && h.seek(0), isNaN(e) || (e = +e), Ks(e)))
      (h &&
        (e = Z.utils.mapRange(
          h.scrollTrigger.start,
          h.scrollTrigger.end,
          0,
          m,
          e
        )),
        o && aa(o, r, i, !0));
    else {
      zt(t) && (t = t(c));
      var v = (e || '0').split(' '),
        y,
        b,
        P,
        T;
      ((_ = jt(t, c) || Be),
        (y = Kr(_) || {}),
        (!y || (!y.left && !y.top)) &&
          xr(_).display === 'none' &&
          ((T = _.style.display),
          (_.style.display = 'block'),
          (y = Kr(_)),
          T ? (_.style.display = T) : _.style.removeProperty('display')),
        (b = na(v[0], y[i.d])),
        (P = na(v[1] || '0', r)),
        (e = y[i.p] - l[i.p] - u + b + n - P),
        o && aa(o, P, i, r - P < 20 || (o._isStart && P > 20)),
        (r -= r - P));
    }
    if ((f && ((c[f] = e || -0.001), e < 0 && (e = 0)), a)) {
      var O = e + r,
        S = a._isStart;
      ((g = 'scroll' + i.d2),
        aa(
          a,
          O,
          i,
          (S && O > 20) ||
            (!S && (p ? Math.max(Be[g], cr[g]) : a.parentNode[g]) <= O + 1)
        ),
        p &&
          ((l = Kr(o)),
          p && (a.style[i.op.p] = l[i.op.p] - i.op.m - a._offset + ht)));
    }
    return (
      h &&
        _ &&
        ((g = Kr(_)),
        h.seek(m),
        (w = Kr(_)),
        (h._caScrollDist = g[i.p] - w[i.p]),
        (e = (e / h._caScrollDist) * m)),
      h && h.seek(d),
      h ? e : Math.round(e)
    );
  },
  hg = /(webkit|moz|length|cssText|inset)/i,
  Pc = function (e, t, r, i) {
    if (e.parentNode !== t) {
      var n = e.style,
        a,
        o;
      if (t === Be) {
        ((e._stOrig = n.cssText), (o = xr(e)));
        for (a in o)
          !+a &&
            !hg.test(a) &&
            o[a] &&
            typeof n[a] == 'string' &&
            a !== '0' &&
            (n[a] = o[a]);
        ((n.top = r), (n.left = i));
      } else n.cssText = e._stOrig;
      ((Z.core.getCache(e).uncache = 1), t.appendChild(e));
    }
  },
  Ld = function (e, t, r) {
    var i = t,
      n = i;
    return function (a) {
      var o = Math.round(e());
      return (
        o !== i &&
          o !== n &&
          Math.abs(o - i) > 3 &&
          Math.abs(o - n) > 3 &&
          ((a = o), r && r()),
        (n = i),
        (i = Math.round(a)),
        i
      );
    };
  },
  Un = function (e, t, r) {
    var i = {};
    ((i[t.p] = '+=' + r), Z.set(e, i));
  },
  Ac = function (e, t) {
    var r = Ei(e, t),
      i = '_scroll' + t.p2,
      n = function a(o, c, l, u, p) {
        var m = a.tween,
          h = c.onComplete,
          f = {};
        l = l || r();
        var d = Ld(r, l, function () {
          (m.kill(), (a.tween = 0));
        });
        return (
          (p = (u && p) || 0),
          (u = u || o - l),
          m && m.kill(),
          (c[i] = o),
          (c.inherit = !1),
          (c.modifiers = f),
          (f[i] = function () {
            return d(l + u * m.ratio + p * m.ratio * m.ratio);
          }),
          (c.onUpdate = function () {
            (Se.cache++, a.tween && Jr());
          }),
          (c.onComplete = function () {
            ((a.tween = 0), h && h.call(m));
          }),
          (m = a.tween = Z.to(e, c)),
          m
        );
      };
    return (
      (e[i] = r),
      (r.wheelHandler = function () {
        return n.tween && n.tween.kill() && (n.tween = 0);
      }),
      wt(e, 'wheel', r.wheelHandler),
      Ce.isTouch && wt(e, 'touchmove', r.wheelHandler),
      n
    );
  },
  Ce = (function () {
    function s(t, r) {
      (os ||
        s.register(Z) ||
        console.warn('Please gsap.registerPlugin(ScrollTrigger)'),
        $o(this),
        this.init(t, r));
    }
    var e = s.prototype;
    return (
      (e.init = function (r, i) {
        if (
          ((this.progress = this.start = 0),
          this.vars && this.kill(!0, !0),
          !Us)
        ) {
          this.update = this.refresh = this.kill = Br;
          return;
        }
        r = Tc(ar(r) || Ks(r) || r.nodeType ? { trigger: r } : r, Gn);
        var n = r,
          a = n.onUpdate,
          o = n.toggleClass,
          c = n.id,
          l = n.onToggle,
          u = n.onRefresh,
          p = n.scrub,
          m = n.trigger,
          h = n.pin,
          f = n.pinSpacing,
          d = n.invalidateOnRefresh,
          g = n.anticipatePin,
          w = n.onScrubComplete,
          _ = n.onSnapComplete,
          v = n.once,
          y = n.snap,
          b = n.pinReparent,
          P = n.pinSpacer,
          T = n.containerAnimation,
          O = n.fastScrollEnd,
          S = n.preventOverlaps,
          E =
            r.horizontal || (r.containerAnimation && r.horizontal !== !1)
              ? Wt
              : mt,
          I = !p && p !== 0,
          A = jt(r.scroller || xe),
          k = Z.core.getCache(A),
          x = Ki(A),
          L =
            ('pinType' in r
              ? r.pinType
              : wi(A, 'pinType') || (x && 'fixed')) === 'fixed',
          $ = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
          M = I && r.toggleActions.split(' '),
          D = 'markers' in r ? r.markers : Gn.markers,
          z = x ? 0 : parseFloat(xr(A)['border' + E.p2 + ks]) || 0,
          C = this,
          W =
            r.onRefreshInit &&
            function () {
              return r.onRefreshInit(C);
            },
          ae = sg(A, x, E),
          le = ng(A, x),
          U = 0,
          B = 0,
          F = 0,
          Y = Ei(A, E),
          Q,
          se,
          ke,
          be,
          fe,
          j,
          ee,
          ce,
          ge,
          N,
          Pe,
          X,
          R,
          V,
          H,
          K,
          J,
          re,
          Ae,
          te,
          _e,
          ve,
          de,
          Ye,
          G,
          Ut,
          nt,
          at,
          Me,
          Fe,
          wr,
          oe,
          Dr,
          gt,
          $e,
          We,
          rr,
          Pr,
          ut;
        if (
          ((C._startClamp = C._endClamp = !1),
          (C._dir = E),
          (g *= 45),
          (C.scroller = A),
          (C.scroll = T ? T.time.bind(T) : Y),
          (be = Y()),
          (C.vars = r),
          (i = i || r.animation),
          'refreshPriority' in r &&
            ((md = 1), r.refreshPriority === -9999 && (pn = C)),
          (k.tweenScroll = k.tweenScroll || {
            top: Ac(A, mt),
            left: Ac(A, Wt),
          }),
          (C.tweenTo = Q = k.tweenScroll[E.p]),
          (C.scrubDuration = function (q) {
            ((Dr = Ks(q) && q),
              Dr
                ? oe
                  ? oe.duration(q)
                  : (oe = Z.to(i, {
                      ease: 'expo',
                      totalProgress: '+=0',
                      inherit: !1,
                      duration: Dr,
                      paused: !0,
                      onComplete: function () {
                        return w && w(C);
                      },
                    }))
                : (oe && oe.progress(1).kill(), (oe = 0)));
          }),
          i &&
            ((i.vars.lazy = !1),
            (i._initted && !C.isReverted) ||
              (i.vars.immediateRender !== !1 &&
                r.immediateRender !== !1 &&
                i.duration() &&
                i.render(0, !0, !0)),
            (C.animation = i.pause()),
            (i.scrollTrigger = C),
            C.scrubDuration(p),
            (Fe = 0),
            c || (c = i.vars.id)),
          y &&
            ((!Ri(y) || y.push) && (y = { snapTo: y }),
            'scrollBehavior' in Be.style &&
              Z.set(x ? [Be, cr] : A, { scrollBehavior: 'auto' }),
            Se.forEach(function (q) {
              return (
                zt(q) &&
                q.target === (x ? Ge.scrollingElement || cr : A) &&
                (q.smooth = !1)
              );
            }),
            (ke = zt(y.snapTo)
              ? y.snapTo
              : y.snapTo === 'labels'
                ? og(i)
                : y.snapTo === 'labelsDirectional'
                  ? lg(i)
                  : y.directional !== !1
                    ? function (q, pe) {
                        return Tl(y.snapTo)(
                          q,
                          kt() - B < 500 ? 0 : pe.direction
                        );
                      }
                    : Z.utils.snap(y.snapTo)),
            (gt = y.duration || { min: 0.1, max: 2 }),
            (gt = Ri(gt) ? on(gt.min, gt.max) : on(gt, gt)),
            ($e = Z.delayedCall(y.delay || Dr / 2 || 0.1, function () {
              var q = Y(),
                pe = kt() - B < 500,
                ie = Q.tween;
              if (
                (pe || Math.abs(C.getVelocity()) < 10) &&
                !ie &&
                !La &&
                U !== q
              ) {
                var he = (q - j) / V,
                  vt = i && !I ? i.totalProgress() : he,
                  Oe = pe ? 0 : ((vt - wr) / (kt() - Ws)) * 1e3 || 0,
                  ot = Z.utils.clamp(-he, 1 - he, (ss(Oe / 2) * Oe) / 0.185),
                  At = he + (y.inertia === !1 ? 0 : ot),
                  rt,
                  Ue,
                  Ve = y,
                  Or = Ve.onStart,
                  Ze = Ve.onInterrupt,
                  ir = Ve.onComplete;
                if (
                  ((rt = ke(At, C)),
                  Ks(rt) || (rt = At),
                  (Ue = Math.max(0, Math.round(j + rt * V))),
                  q <= ee && q >= j && Ue !== q)
                ) {
                  if (ie && !ie._initted && ie.data <= ss(Ue - q)) return;
                  (y.inertia === !1 && (ot = rt - he),
                    Q(
                      Ue,
                      {
                        duration: gt(
                          ss(
                            (Math.max(ss(At - vt), ss(rt - vt)) * 0.185) /
                              Oe /
                              0.05 || 0
                          )
                        ),
                        ease: y.ease || 'power3',
                        data: ss(Ue - q),
                        onInterrupt: function () {
                          return $e.restart(!0) && Ze && Ze(C);
                        },
                        onComplete: function () {
                          (C.update(),
                            (U = Y()),
                            i &&
                              !I &&
                              (oe
                                ? oe.resetTo(
                                    'totalProgress',
                                    rt,
                                    i._tTime / i._tDur
                                  )
                                : i.progress(rt)),
                            (Fe = wr =
                              i && !I ? i.totalProgress() : C.progress),
                            _ && _(C),
                            ir && ir(C));
                        },
                      },
                      q,
                      ot * V,
                      Ue - q - ot * V
                    ),
                    Or && Or(C, Q.tween));
                }
              } else C.isActive && U !== q && $e.restart(!0);
            }).pause())),
          c && (Bo[c] = C),
          (m = C.trigger = jt(m || (h !== !0 && h))),
          (ut = m && m._gsap && m._gsap.stRevert),
          ut && (ut = ut(C)),
          (h = h === !0 ? m : jt(h)),
          ar(o) && (o = { targets: m, className: o }),
          h &&
            (f === !1 ||
              f === Tr ||
              (f =
                !f &&
                h.parentNode &&
                h.parentNode.style &&
                xr(h.parentNode).display === 'flex'
                  ? !1
                  : dt),
            (C.pin = h),
            (se = Z.core.getCache(h)),
            se.spacer
              ? (H = se.pinState)
              : (P &&
                  ((P = jt(P)),
                  P && !P.nodeType && (P = P.current || P.nativeElement),
                  (se.spacerIsNative = !!P),
                  P && (se.spacerState = Wn(P))),
                (se.spacer = re = P || Ge.createElement('div')),
                re.classList.add('pin-spacer'),
                c && re.classList.add('pin-spacer-' + c),
                (se.pinState = H = Wn(h))),
            r.force3D !== !1 && Z.set(h, { force3D: !0 }),
            (C.spacer = re = se.spacer),
            (Me = xr(h)),
            (Ye = Me[f + E.os2]),
            (te = Z.getProperty(h)),
            (_e = Z.quickSetter(h, E.a, ht)),
            ao(h, re, Me),
            (J = Wn(h))),
          D)
        ) {
          ((X = Ri(D) ? Tc(D, xc) : xc),
            (N = qn('scroller-start', c, A, E, X, 0)),
            (Pe = qn('scroller-end', c, A, E, X, 0, N)),
            (Ae = N['offset' + E.op.d2]));
          var Ar = jt(wi(A, 'content') || A);
          ((ce = this.markerStart = qn('start', c, Ar, E, X, Ae, 0, T)),
            (ge = this.markerEnd = qn('end', c, Ar, E, X, Ae, 0, T)),
            T && (Pr = Z.quickSetter([ce, ge], E.a, ht)),
            !L &&
              !(Hr.length && wi(A, 'fixedMarkers') === !0) &&
              (ag(x ? Be : A),
              Z.set([N, Pe], { force3D: !0 }),
              (Ut = Z.quickSetter(N, E.a, ht)),
              (at = Z.quickSetter(Pe, E.a, ht))));
        }
        if (T) {
          var ue = T.vars.onUpdate,
            ne = T.vars.onUpdateParams;
          T.eventCallback('onUpdate', function () {
            (C.update(0, 0, 1), ue && ue.apply(T, ne || []));
          });
        }
        if (
          ((C.previous = function () {
            return Te[Te.indexOf(C) - 1];
          }),
          (C.next = function () {
            return Te[Te.indexOf(C) + 1];
          }),
          (C.revert = function (q, pe) {
            if (!pe) return C.kill(!0);
            var ie = q !== !1 || !C.enabled,
              he = Dt;
            ie !== C.isReverted &&
              (ie &&
                ((We = Math.max(Y(), C.scroll.rec || 0)),
                (F = C.progress),
                (rr = i && i.progress())),
              ce &&
                [ce, ge, N, Pe].forEach(function (vt) {
                  return (vt.style.display = ie ? 'none' : 'block');
                }),
              ie && ((Dt = C), C.update(ie)),
              h &&
                (!b || !C.isActive) &&
                (ie ? dg(h, re, H) : ao(h, re, xr(h), G)),
              ie || C.update(ie),
              (Dt = he),
              (C.isReverted = ie));
          }),
          (C.refresh = function (q, pe, ie, he) {
            if (!((Dt || !C.enabled) && !pe)) {
              if (h && q && Mr) {
                wt(s, 'scrollEnd', Cd);
                return;
              }
              (!Ht && W && W(C),
                (Dt = C),
                Q.tween && !ie && (Q.tween.kill(), (Q.tween = 0)),
                oe && oe.pause(),
                d &&
                  i &&
                  (i.revert({ kill: !1 }).invalidate(),
                  i.getChildren
                    ? i.getChildren(!0, !0, !1).forEach(function (ii) {
                        return ii.vars.immediateRender && ii.render(0, !0, !0);
                      })
                    : i.vars.immediateRender && i.render(0, !0, !0)),
                C.isReverted || C.revert(!0, !0),
                (C._subPinOffset = !1));
              var vt = ae(),
                Oe = le(),
                ot = T ? T.duration() : Xr(A, E),
                At = V <= 0.01 || !V,
                rt = 0,
                Ue = he || 0,
                Ve = Ri(ie) ? ie.end : r.end,
                Or = r.endTrigger || m,
                Ze = Ri(ie)
                  ? ie.start
                  : r.start || (r.start === 0 || !m ? 0 : h ? '0 0' : '0 100%'),
                ir = (C.pinnedContainer =
                  r.pinnedContainer && jt(r.pinnedContainer, C)),
                kr = (m && Math.max(0, Te.indexOf(C))) || 0,
                xt = kr,
                St,
                Ot,
                Pi,
                Pn,
                Lt,
                pt,
                Ir,
                Da,
                Sl,
                Rs,
                Rr,
                zs,
                An;
              for (
                D &&
                Ri(ie) &&
                ((zs = Z.getProperty(N, E.p)), (An = Z.getProperty(Pe, E.p)));
                xt-- > 0;
              )
                ((pt = Te[xt]),
                  pt.end || pt.refresh(0, 1) || (Dt = C),
                  (Ir = pt.pin),
                  Ir &&
                    (Ir === m || Ir === h || Ir === ir) &&
                    !pt.isReverted &&
                    (Rs || (Rs = []), Rs.unshift(pt), pt.revert(!0, !0)),
                  pt !== Te[xt] && (kr--, xt--));
              for (
                zt(Ze) && (Ze = Ze(C)),
                  Ze = _c(Ze, 'start', C),
                  j =
                    Mc(
                      Ze,
                      m,
                      vt,
                      E,
                      Y(),
                      ce,
                      N,
                      C,
                      Oe,
                      z,
                      L,
                      ot,
                      T,
                      C._startClamp && '_startClamp'
                    ) || (h ? -0.001 : 0),
                  zt(Ve) && (Ve = Ve(C)),
                  ar(Ve) &&
                    !Ve.indexOf('+=') &&
                    (~Ve.indexOf(' ')
                      ? (Ve = (ar(Ze) ? Ze.split(' ')[0] : '') + Ve)
                      : ((rt = na(Ve.substr(2), vt)),
                        (Ve = ar(Ze)
                          ? Ze
                          : (T
                              ? Z.utils.mapRange(
                                  0,
                                  T.duration(),
                                  T.scrollTrigger.start,
                                  T.scrollTrigger.end,
                                  j
                                )
                              : j) + rt),
                        (Or = m))),
                  Ve = _c(Ve, 'end', C),
                  ee =
                    Math.max(
                      j,
                      Mc(
                        Ve || (Or ? '100% 0' : ot),
                        Or,
                        vt,
                        E,
                        Y() + rt,
                        ge,
                        Pe,
                        C,
                        Oe,
                        z,
                        L,
                        ot,
                        T,
                        C._endClamp && '_endClamp'
                      )
                    ) || -0.001,
                  rt = 0,
                  xt = kr;
                xt--;
              )
                ((pt = Te[xt] || {}),
                  (Ir = pt.pin),
                  Ir &&
                    pt.start - pt._pinPush <= j &&
                    !T &&
                    pt.end > 0 &&
                    ((St =
                      pt.end -
                      (C._startClamp ? Math.max(0, pt.start) : pt.start)),
                    ((Ir === m && pt.start - pt._pinPush < j) || Ir === ir) &&
                      isNaN(Ze) &&
                      (rt += St * (1 - pt.progress)),
                    Ir === h && (Ue += St)));
              if (
                ((j += rt),
                (ee += rt),
                C._startClamp && (C._startClamp += rt),
                C._endClamp &&
                  !Ht &&
                  ((C._endClamp = ee || -0.001), (ee = Math.min(ee, Xr(A, E)))),
                (V = ee - j || ((j -= 0.01) && 0.001)),
                At && (F = Z.utils.clamp(0, 1, Z.utils.normalize(j, ee, We))),
                (C._pinPush = Ue),
                ce &&
                  rt &&
                  ((St = {}),
                  (St[E.a] = '+=' + rt),
                  ir && (St[E.p] = '-=' + Y()),
                  Z.set([ce, ge], St)),
                h && !(No && C.end >= Xr(A, E)))
              )
                ((St = xr(h)),
                  (Pn = E === mt),
                  (Pi = Y()),
                  (ve = parseFloat(te(E.a)) + Ue),
                  !ot &&
                    ee > 1 &&
                    ((Rr = (x ? Ge.scrollingElement || cr : A).style),
                    (Rr = {
                      style: Rr,
                      value: Rr['overflow' + E.a.toUpperCase()],
                    }),
                    x &&
                      xr(Be)['overflow' + E.a.toUpperCase()] !== 'scroll' &&
                      (Rr.style['overflow' + E.a.toUpperCase()] = 'scroll')),
                  ao(h, re, St),
                  (J = Wn(h)),
                  (Ot = Kr(h, !0)),
                  (Da = L && Ei(A, Pn ? Wt : mt)()),
                  f
                    ? ((G = [f + E.os2, V + Ue + ht]),
                      (G.t = re),
                      (xt = f === dt ? Ta(h, E) + V + Ue : 0),
                      xt &&
                        (G.push(E.d, xt + ht),
                        re.style.flexBasis !== 'auto' &&
                          (re.style.flexBasis = xt + ht)),
                      ys(G),
                      ir &&
                        Te.forEach(function (ii) {
                          ii.pin === ir &&
                            ii.vars.pinSpacing !== !1 &&
                            (ii._subPinOffset = !0);
                        }),
                      L && Y(We))
                    : ((xt = Ta(h, E)),
                      xt &&
                        re.style.flexBasis !== 'auto' &&
                        (re.style.flexBasis = xt + ht)),
                  L &&
                    ((Lt = {
                      top: Ot.top + (Pn ? Pi - j : Da) + ht,
                      left: Ot.left + (Pn ? Da : Pi - j) + ht,
                      boxSizing: 'border-box',
                      position: 'fixed',
                    }),
                    (Lt[Wi] = Lt['max' + ks] = Math.ceil(Ot.width) + ht),
                    (Lt[Ui] = Lt['max' + bl] = Math.ceil(Ot.height) + ht),
                    (Lt[Tr] =
                      Lt[Tr + dn] =
                      Lt[Tr + cn] =
                      Lt[Tr + fn] =
                      Lt[Tr + un] =
                        '0'),
                    (Lt[dt] = St[dt]),
                    (Lt[dt + dn] = St[dt + dn]),
                    (Lt[dt + cn] = St[dt + cn]),
                    (Lt[dt + fn] = St[dt + fn]),
                    (Lt[dt + un] = St[dt + un]),
                    (K = pg(H, Lt, b)),
                    Ht && Y(0)),
                  i
                    ? ((Sl = i._initted),
                      to(1),
                      i.render(i.duration(), !0, !0),
                      (de = te(E.a) - ve + V + Ue),
                      (nt = Math.abs(V - de) > 1),
                      L && nt && K.splice(K.length - 2, 2),
                      i.render(0, !0, !0),
                      Sl || i.invalidate(!0),
                      i.parent || i.totalTime(i.totalTime()),
                      to(0))
                    : (de = V),
                  Rr &&
                    (Rr.value
                      ? (Rr.style['overflow' + E.a.toUpperCase()] = Rr.value)
                      : Rr.style.removeProperty('overflow-' + E.a)));
              else if (m && Y() && !T)
                for (Ot = m.parentNode; Ot && Ot !== Be; )
                  (Ot._pinOffset &&
                    ((j -= Ot._pinOffset), (ee -= Ot._pinOffset)),
                    (Ot = Ot.parentNode));
              (Rs &&
                Rs.forEach(function (ii) {
                  return ii.revert(!1, !0);
                }),
                (C.start = j),
                (C.end = ee),
                (be = fe = Ht ? We : Y()),
                !T && !Ht && (be < We && Y(We), (C.scroll.rec = 0)),
                C.revert(!1, !0),
                (B = kt()),
                $e && ((U = -1), $e.restart(!0)),
                (Dt = 0),
                i &&
                  I &&
                  (i._initted || rr) &&
                  i.progress() !== rr &&
                  i.progress(rr || 0, !0).render(i.time(), !0, !0),
                (At || F !== C.progress || T || d || (i && !i._initted)) &&
                  (i &&
                    !I &&
                    (i._initted || F || i.vars.immediateRender !== !1) &&
                    i.totalProgress(
                      T && j < -0.001 && !F ? Z.utils.normalize(j, ee, 0) : F,
                      !0
                    ),
                  (C.progress = At || (be - j) / V === F ? 0 : F)),
                h && f && (re._pinOffset = Math.round(C.progress * de)),
                oe && oe.invalidate(),
                isNaN(zs) ||
                  ((zs -= Z.getProperty(N, E.p)),
                  (An -= Z.getProperty(Pe, E.p)),
                  Un(N, E, zs),
                  Un(ce, E, zs - (he || 0)),
                  Un(Pe, E, An),
                  Un(ge, E, An - (he || 0))),
                At && !Ht && C.update(),
                u && !Ht && !R && ((R = !0), u(C), (R = !1)));
            }
          }),
          (C.getVelocity = function () {
            return ((Y() - fe) / (kt() - Ws)) * 1e3 || 0;
          }),
          (C.endAnimation = function () {
            (Ys(C.callbackAnimation),
              i &&
                (oe
                  ? oe.progress(1)
                  : i.paused()
                    ? I || Ys(i, C.direction < 0, 1)
                    : Ys(i, i.reversed())));
          }),
          (C.labelToScroll = function (q) {
            return (
              (i &&
                i.labels &&
                (j || C.refresh() || j) + (i.labels[q] / i.duration()) * V) ||
              0
            );
          }),
          (C.getTrailing = function (q) {
            var pe = Te.indexOf(C),
              ie =
                C.direction > 0 ? Te.slice(0, pe).reverse() : Te.slice(pe + 1);
            return (
              ar(q)
                ? ie.filter(function (he) {
                    return he.vars.preventOverlaps === q;
                  })
                : ie
            ).filter(function (he) {
              return C.direction > 0 ? he.end <= j : he.start >= ee;
            });
          }),
          (C.update = function (q, pe, ie) {
            if (!(T && !ie && !q)) {
              var he = Ht === !0 ? We : C.scroll(),
                vt = q ? 0 : (he - j) / V,
                Oe = vt < 0 ? 0 : vt > 1 ? 1 : vt || 0,
                ot = C.progress,
                At,
                rt,
                Ue,
                Ve,
                Or,
                Ze,
                ir,
                kr;
              if (
                (pe &&
                  ((fe = be),
                  (be = T ? Y() : he),
                  y && ((wr = Fe), (Fe = i && !I ? i.totalProgress() : Oe))),
                g &&
                  h &&
                  !Dt &&
                  !Yn &&
                  Mr &&
                  (!Oe && j < he + ((he - fe) / (kt() - Ws)) * g
                    ? (Oe = 1e-4)
                    : Oe === 1 &&
                      ee > he + ((he - fe) / (kt() - Ws)) * g &&
                      (Oe = 0.9999)),
                Oe !== ot && C.enabled)
              ) {
                if (
                  ((At = C.isActive = !!Oe && Oe < 1),
                  (rt = !!ot && ot < 1),
                  (Ze = At !== rt),
                  (Or = Ze || !!Oe != !!ot),
                  (C.direction = Oe > ot ? 1 : -1),
                  (C.progress = Oe),
                  Or &&
                    !Dt &&
                    ((Ue = Oe && !ot ? 0 : Oe === 1 ? 1 : ot === 1 ? 2 : 3),
                    I &&
                      ((Ve =
                        (!Ze && M[Ue + 1] !== 'none' && M[Ue + 1]) || M[Ue]),
                      (kr =
                        i &&
                        (Ve === 'complete' || Ve === 'reset' || Ve in i)))),
                  S &&
                    (Ze || kr) &&
                    (kr || p || !i) &&
                    (zt(S)
                      ? S(C)
                      : C.getTrailing(S).forEach(function (Pi) {
                          return Pi.endAnimation();
                        })),
                  I ||
                    (oe && !Dt && !Yn
                      ? (oe._dp._time - oe._start !== oe._time &&
                          oe.render(oe._dp._time - oe._start),
                        oe.resetTo
                          ? oe.resetTo('totalProgress', Oe, i._tTime / i._tDur)
                          : ((oe.vars.totalProgress = Oe),
                            oe.invalidate().restart()))
                      : i && i.totalProgress(Oe, !!(Dt && (B || q)))),
                  h)
                ) {
                  if ((q && f && (re.style[f + E.os2] = Ye), !L))
                    _e(js(ve + de * Oe));
                  else if (Or) {
                    if (
                      ((ir =
                        !q && Oe > ot && ee + 1 > he && he + 1 >= Xr(A, E)),
                      b)
                    )
                      if (!q && (At || ir)) {
                        var xt = Kr(h, !0),
                          St = he - j;
                        Pc(
                          h,
                          Be,
                          xt.top + (E === mt ? St : 0) + ht,
                          xt.left + (E === mt ? 0 : St) + ht
                        );
                      } else Pc(h, re);
                    (ys(At || ir ? K : J),
                      (nt && Oe < 1 && At) ||
                        _e(ve + (Oe === 1 && !ir ? de : 0)));
                  }
                }
                (y && !Q.tween && !Dt && !Yn && $e.restart(!0),
                  o &&
                    (Ze || (v && Oe && (Oe < 1 || !ro))) &&
                    Sn(o.targets).forEach(function (Pi) {
                      return Pi.classList[At || v ? 'add' : 'remove'](
                        o.className
                      );
                    }),
                  a && !I && !q && a(C),
                  Or && !Dt
                    ? (I &&
                        (kr &&
                          (Ve === 'complete'
                            ? i.pause().totalProgress(1)
                            : Ve === 'reset'
                              ? i.restart(!0).pause()
                              : Ve === 'restart'
                                ? i.restart(!0)
                                : i[Ve]()),
                        a && a(C)),
                      (Ze || !ro) &&
                        (l && Ze && so(C, l),
                        $[Ue] && so(C, $[Ue]),
                        v && (Oe === 1 ? C.kill(!1, 1) : ($[Ue] = 0)),
                        Ze || ((Ue = Oe === 1 ? 1 : 3), $[Ue] && so(C, $[Ue]))),
                      O &&
                        !At &&
                        Math.abs(C.getVelocity()) > (Ks(O) ? O : 2500) &&
                        (Ys(C.callbackAnimation),
                        oe
                          ? oe.progress(1)
                          : Ys(i, Ve === 'reverse' ? 1 : !Oe, 1)))
                    : I && a && !Dt && a(C));
              }
              if (at) {
                var Ot = T ? (he / T.duration()) * (T._caScrollDist || 0) : he;
                (Ut(Ot + (N._isFlipped ? 1 : 0)), at(Ot));
              }
              Pr && Pr((-he / T.duration()) * (T._caScrollDist || 0));
            }
          }),
          (C.enable = function (q, pe) {
            C.enabled ||
              ((C.enabled = !0),
              wt(A, 'resize', Zs),
              x || wt(A, 'scroll', ns),
              W && wt(s, 'refreshInit', W),
              q !== !1 && ((C.progress = F = 0), (be = fe = U = Y())),
              pe !== !1 && C.refresh());
          }),
          (C.getTween = function (q) {
            return q && Q ? Q.tween : oe;
          }),
          (C.setPositions = function (q, pe, ie, he) {
            if (T) {
              var vt = T.scrollTrigger,
                Oe = T.duration(),
                ot = vt.end - vt.start;
              ((q = vt.start + (ot * q) / Oe),
                (pe = vt.start + (ot * pe) / Oe));
            }
            (C.refresh(
              !1,
              !1,
              {
                start: wc(q, ie && !!C._startClamp),
                end: wc(pe, ie && !!C._endClamp),
              },
              he
            ),
              C.update());
          }),
          (C.adjustPinSpacing = function (q) {
            if (G && q) {
              var pe = G.indexOf(E.d) + 1;
              ((G[pe] = parseFloat(G[pe]) + q + ht),
                (G[1] = parseFloat(G[1]) + q + ht),
                ys(G));
            }
          }),
          (C.disable = function (q, pe) {
            if (
              (q !== !1 && C.revert(!0, !0),
              C.enabled &&
                ((C.enabled = C.isActive = !1),
                pe || (oe && oe.pause()),
                (We = 0),
                se && (se.uncache = 1),
                W && _t(s, 'refreshInit', W),
                $e && ($e.pause(), Q.tween && Q.tween.kill() && (Q.tween = 0)),
                !x))
            ) {
              for (var ie = Te.length; ie--; )
                if (Te[ie].scroller === A && Te[ie] !== C) return;
              (_t(A, 'resize', Zs), x || _t(A, 'scroll', ns));
            }
          }),
          (C.kill = function (q, pe) {
            (C.disable(q, pe), oe && !pe && oe.kill(), c && delete Bo[c]);
            var ie = Te.indexOf(C);
            (ie >= 0 && Te.splice(ie, 1),
              ie === Xt && oa > 0 && Xt--,
              (ie = 0),
              Te.forEach(function (he) {
                return he.scroller === C.scroller && (ie = 1);
              }),
              ie || Ht || (C.scroll.rec = 0),
              i &&
                ((i.scrollTrigger = null),
                q && i.revert({ kill: !1 }),
                pe || i.kill()),
              ce &&
                [ce, ge, N, Pe].forEach(function (he) {
                  return he.parentNode && he.parentNode.removeChild(he);
                }),
              pn === C && (pn = 0),
              h &&
                (se && (se.uncache = 1),
                (ie = 0),
                Te.forEach(function (he) {
                  return he.pin === h && ie++;
                }),
                ie || (se.spacer = 0)),
              r.onKill && r.onKill(C));
          }),
          Te.push(C),
          C.enable(!1, !1),
          ut && ut(C),
          i && i.add && !V)
        ) {
          var ze = C.update;
          ((C.update = function () {
            ((C.update = ze), Se.cache++, j || ee || C.refresh());
          }),
            Z.delayedCall(0.01, C.update),
            (V = 0.01),
            (j = ee = 0));
        } else C.refresh();
        h && ug();
      }),
      (s.register = function (r) {
        return (
          os ||
            ((Z = r || yd()), wd() && window.document && s.enable(), (os = Us)),
          os
        );
      }),
      (s.defaults = function (r) {
        if (r) for (var i in r) Gn[i] = r[i];
        return Gn;
      }),
      (s.disable = function (r, i) {
        ((Us = 0),
          Te.forEach(function (a) {
            return a[i ? 'kill' : 'disable'](r);
          }),
          _t(xe, 'wheel', ns),
          _t(Ge, 'scroll', ns),
          clearInterval(Fn),
          _t(Ge, 'touchcancel', Br),
          _t(Be, 'touchstart', Br),
          Xn(_t, Ge, 'pointerdown,touchstart,mousedown', yc),
          Xn(_t, Ge, 'pointerup,touchend,mouseup', bc),
          ba.kill(),
          Vn(_t));
        for (var n = 0; n < Se.length; n += 3)
          (Hn(_t, Se[n], Se[n + 1]), Hn(_t, Se[n], Se[n + 2]));
      }),
      (s.enable = function () {
        if (
          ((xe = window),
          (Ge = document),
          (cr = Ge.documentElement),
          (Be = Ge.body),
          Z &&
            ((Sn = Z.utils.toArray),
            (on = Z.utils.clamp),
            ($o = Z.core.context || Br),
            (to = Z.core.suppressOverwrites || Br),
            (vl = xe.history.scrollRestoration || 'auto'),
            (Fo = xe.pageYOffset || 0),
            Z.core.globals('ScrollTrigger', s),
            Be))
        ) {
          ((Us = 1),
            (ws = document.createElement('div')),
            (ws.style.height = '100vh'),
            (ws.style.position = 'absolute'),
            Od(),
            ig(),
            ct.register(Z),
            (s.isTouch = ct.isTouch),
            (ci =
              ct.isTouch &&
              /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            (zo = ct.isTouch === 1),
            wt(xe, 'wheel', ns),
            (gl = [xe, Ge, cr, Be]),
            Z.matchMedia
              ? ((s.matchMedia = function (l) {
                  var u = Z.matchMedia(),
                    p;
                  for (p in l) u.add(p, l[p]);
                  return u;
                }),
                Z.addEventListener('matchMediaInit', function () {
                  (Pd(), xl());
                }),
                Z.addEventListener('matchMediaRevert', function () {
                  return Md();
                }),
                Z.addEventListener('matchMedia', function () {
                  (Fi(0, 1), Qi('matchMedia'));
                }),
                Z.matchMedia().add('(orientation: portrait)', function () {
                  return (no(), no);
                }))
              : console.warn('Requires GSAP 3.11.0 or later'),
            no(),
            wt(Ge, 'scroll', ns));
          var r = Be.hasAttribute('style'),
            i = Be.style,
            n = i.borderTopStyle,
            a = Z.core.Animation.prototype,
            o,
            c;
          for (
            a.revert ||
              Object.defineProperty(a, 'revert', {
                value: function () {
                  return this.time(-0.01, !0);
                },
              }),
              i.borderTopStyle = 'solid',
              o = Kr(Be),
              mt.m = Math.round(o.top + mt.sc()) || 0,
              Wt.m = Math.round(o.left + Wt.sc()) || 0,
              n ? (i.borderTopStyle = n) : i.removeProperty('border-top-style'),
              r || (Be.setAttribute('style', ''), Be.removeAttribute('style')),
              Fn = setInterval(Sc, 250),
              Z.delayedCall(0.5, function () {
                return (Yn = 0);
              }),
              wt(Ge, 'touchcancel', Br),
              wt(Be, 'touchstart', Br),
              Xn(wt, Ge, 'pointerdown,touchstart,mousedown', yc),
              Xn(wt, Ge, 'pointerup,touchend,mouseup', bc),
              Ro = Z.utils.checkPrefix('transform'),
              la.push(Ro),
              os = kt(),
              ba = Z.delayedCall(0.2, Fi).pause(),
              ls = [
                Ge,
                'visibilitychange',
                function () {
                  var l = xe.innerWidth,
                    u = xe.innerHeight;
                  Ge.hidden
                    ? ((gc = l), (vc = u))
                    : (gc !== l || vc !== u) && Zs();
                },
                Ge,
                'DOMContentLoaded',
                Fi,
                xe,
                'load',
                Fi,
                xe,
                'resize',
                Zs,
              ],
              Vn(wt),
              Te.forEach(function (l) {
                return l.enable(0, 1);
              }),
              c = 0;
            c < Se.length;
            c += 3
          )
            (Hn(_t, Se[c], Se[c + 1]), Hn(_t, Se[c], Se[c + 2]));
        }
      }),
      (s.config = function (r) {
        'limitCallbacks' in r && (ro = !!r.limitCallbacks);
        var i = r.syncInterval;
        ((i && clearInterval(Fn)) || ((Fn = i) && setInterval(Sc, i)),
          'ignoreMobileResize' in r &&
            (zo = s.isTouch === 1 && r.ignoreMobileResize),
          'autoRefreshEvents' in r &&
            (Vn(_t) || Vn(wt, r.autoRefreshEvents || 'none'),
            (gd = (r.autoRefreshEvents + '').indexOf('resize') === -1)));
      }),
      (s.scrollerProxy = function (r, i) {
        var n = jt(r),
          a = Se.indexOf(n),
          o = Ki(n);
        (~a && Se.splice(a, o ? 6 : 2),
          i && (o ? Hr.unshift(xe, i, Be, i, cr, i) : Hr.unshift(n, i)));
      }),
      (s.clearMatchMedia = function (r) {
        Te.forEach(function (i) {
          return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0);
        });
      }),
      (s.isInViewport = function (r, i, n) {
        var a = (ar(r) ? jt(r) : r).getBoundingClientRect(),
          o = a[n ? Wi : Ui] * i || 0;
        return n
          ? a.right - o > 0 && a.left + o < xe.innerWidth
          : a.bottom - o > 0 && a.top + o < xe.innerHeight;
      }),
      (s.positionInViewport = function (r, i, n) {
        ar(r) && (r = jt(r));
        var a = r.getBoundingClientRect(),
          o = a[n ? Wi : Ui],
          c =
            i == null
              ? o / 2
              : i in xa
                ? xa[i] * o
                : ~i.indexOf('%')
                  ? (parseFloat(i) * o) / 100
                  : parseFloat(i) || 0;
        return n ? (a.left + c) / xe.innerWidth : (a.top + c) / xe.innerHeight;
      }),
      (s.killAll = function (r) {
        if (
          (Te.slice(0).forEach(function (n) {
            return n.vars.id !== 'ScrollSmoother' && n.kill();
          }),
          r !== !0)
        ) {
          var i = Zi.killAll || [];
          ((Zi = {}),
            i.forEach(function (n) {
              return n();
            }));
        }
      }),
      s
    );
  })();
Ce.version = '3.14.2';
Ce.saveStyles = function (s) {
  return s
    ? Sn(s).forEach(function (e) {
        if (e && e.style) {
          var t = sr.indexOf(e);
          (t >= 0 && sr.splice(t, 5),
            sr.push(
              e,
              e.style.cssText,
              e.getBBox && e.getAttribute('transform'),
              Z.core.getCache(e),
              $o()
            ));
        }
      })
    : sr;
};
Ce.revert = function (s, e) {
  return xl(!s, e);
};
Ce.create = function (s, e) {
  return new Ce(s, e);
};
Ce.refresh = function (s) {
  return s ? Zs(!0) : (os || Ce.register()) && Fi(!0);
};
Ce.update = function (s) {
  return ++Se.cache && Jr(s === !0 ? 2 : 0);
};
Ce.clearScrollMemory = Ad;
Ce.maxScroll = function (s, e) {
  return Xr(s, e ? Wt : mt);
};
Ce.getScrollFunc = function (s, e) {
  return Ei(jt(s), e ? Wt : mt);
};
Ce.getById = function (s) {
  return Bo[s];
};
Ce.getAll = function () {
  return Te.filter(function (s) {
    return s.vars.id !== 'ScrollSmoother';
  });
};
Ce.isScrolling = function () {
  return !!Mr;
};
Ce.snapDirectional = Tl;
Ce.addEventListener = function (s, e) {
  var t = Zi[s] || (Zi[s] = []);
  ~t.indexOf(e) || t.push(e);
};
Ce.removeEventListener = function (s, e) {
  var t = Zi[s],
    r = t && t.indexOf(e);
  r >= 0 && t.splice(r, 1);
};
Ce.batch = function (s, e) {
  var t = [],
    r = {},
    i = e.interval || 0.016,
    n = e.batchMax || 1e9,
    a = function (l, u) {
      var p = [],
        m = [],
        h = Z.delayedCall(i, function () {
          (u(p, m), (p = []), (m = []));
        }).pause();
      return function (f) {
        (p.length || h.restart(!0),
          p.push(f.trigger),
          m.push(f),
          n <= p.length && h.progress(1));
      };
    },
    o;
  for (o in e)
    r[o] =
      o.substr(0, 2) === 'on' && zt(e[o]) && o !== 'onRefreshInit'
        ? a(o, e[o])
        : e[o];
  return (
    zt(n) &&
      ((n = n()),
      wt(Ce, 'refresh', function () {
        return (n = e.batchMax());
      })),
    Sn(s).forEach(function (c) {
      var l = {};
      for (o in r) l[o] = r[o];
      ((l.trigger = c), t.push(Ce.create(l)));
    }),
    t
  );
};
var Oc = function (e, t, r, i) {
    return (
      t > i ? e(i) : t < 0 && e(0),
      r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1
    );
  },
  oo = function s(e, t) {
    (t === !0
      ? e.style.removeProperty('touch-action')
      : (e.style.touchAction =
          t === !0
            ? 'auto'
            : t
              ? 'pan-' + t + (ct.isTouch ? ' pinch-zoom' : '')
              : 'none'),
      e === cr && s(Be, t));
  },
  jn = { auto: 1, scroll: 1 },
  mg = function (e) {
    var t = e.event,
      r = e.target,
      i = e.axis,
      n = (t.changedTouches ? t.changedTouches[0] : t).target,
      a = n._gsap || Z.core.getCache(n),
      o = kt(),
      c;
    if (!a._isScrollT || o - a._isScrollT > 2e3) {
      for (
        ;
        n &&
        n !== Be &&
        ((n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth) ||
          !(jn[(c = xr(n)).overflowY] || jn[c.overflowX]));
      )
        n = n.parentNode;
      ((a._isScroll =
        n &&
        n !== r &&
        !Ki(n) &&
        (jn[(c = xr(n)).overflowY] || jn[c.overflowX])),
        (a._isScrollT = o));
    }
    (a._isScroll || i === 'x') && (t.stopPropagation(), (t._gsapAllow = !0));
  },
  Dd = function (e, t, r, i) {
    return ct.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: (i = i && mg),
      onPress: i,
      onDrag: i,
      onScroll: i,
      onEnable: function () {
        return r && wt(Ge, ct.eventTypes[0], Dc, !1, !0);
      },
      onDisable: function () {
        return _t(Ge, ct.eventTypes[0], Dc, !0);
      },
    });
  },
  gg = /(input|label|select|textarea)/i,
  Lc,
  Dc = function (e) {
    var t = gg.test(e.target.tagName);
    (t || Lc) && ((e._gsapAllow = !0), (Lc = t));
  },
  vg = function (e) {
    (Ri(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = 'wheel,touch'),
      (e.debounce = !!e.debounce),
      (e.id = e.id || 'normalizer'));
    var t = e,
      r = t.normalizeScrollX,
      i = t.momentum,
      n = t.allowNestedScroll,
      a = t.onRelease,
      o,
      c,
      l = jt(e.target) || cr,
      u = Z.core.globals().ScrollSmoother,
      p = u && u.get(),
      m =
        ci &&
        ((e.content && jt(e.content)) ||
          (p && e.content !== !1 && !p.smooth() && p.content())),
      h = Ei(l, mt),
      f = Ei(l, Wt),
      d = 1,
      g =
        (ct.isTouch && xe.visualViewport
          ? xe.visualViewport.scale * xe.visualViewport.width
          : xe.outerWidth) / xe.innerWidth,
      w = 0,
      _ = zt(i)
        ? function () {
            return i(o);
          }
        : function () {
            return i || 2.8;
          },
      v,
      y,
      b = Dd(l, e.type, !0, n),
      P = function () {
        return (y = !1);
      },
      T = Br,
      O = Br,
      S = function () {
        ((c = Xr(l, mt)),
          (O = on(ci ? 1 : 0, c)),
          r && (T = on(0, Xr(l, Wt))),
          (v = ji));
      },
      E = function () {
        ((m._gsap.y = js(parseFloat(m._gsap.y) + h.offset) + 'px'),
          (m.style.transform =
            'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
            parseFloat(m._gsap.y) +
            ', 0, 1)'),
          (h.offset = h.cacheID = 0));
      },
      I = function () {
        if (y) {
          requestAnimationFrame(P);
          var D = js(o.deltaY / 2),
            z = O(h.v - D);
          if (m && z !== h.v + h.offset) {
            h.offset = z - h.v;
            var C = js((parseFloat(m && m._gsap.y) || 0) - h.offset);
            ((m.style.transform =
              'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
              C +
              ', 0, 1)'),
              (m._gsap.y = C + 'px'),
              (h.cacheID = Se.cache),
              Jr());
          }
          return !0;
        }
        (h.offset && E(), (y = !0));
      },
      A,
      k,
      x,
      L,
      $ = function () {
        (S(),
          A.isActive() &&
            A.vars.scrollY > c &&
            (h() > c ? A.progress(1) && h(c) : A.resetTo('scrollY', c)));
      };
    return (
      m && Z.set(m, { y: '+=0' }),
      (e.ignoreCheck = function (M) {
        return (
          (ci && M.type === 'touchmove' && I()) ||
          (d > 1.05 && M.type !== 'touchstart') ||
          o.isGesturing ||
          (M.touches && M.touches.length > 1)
        );
      }),
      (e.onPress = function () {
        y = !1;
        var M = d;
        ((d = js(((xe.visualViewport && xe.visualViewport.scale) || 1) / g)),
          A.pause(),
          M !== d && oo(l, d > 1.01 ? !0 : r ? !1 : 'x'),
          (k = f()),
          (x = h()),
          S(),
          (v = ji));
      }),
      (e.onRelease = e.onGestureStart =
        function (M, D) {
          if ((h.offset && E(), !D)) L.restart(!0);
          else {
            Se.cache++;
            var z = _(),
              C,
              W;
            (r &&
              ((C = f()),
              (W = C + (z * 0.05 * -M.velocityX) / 0.227),
              (z *= Oc(f, C, W, Xr(l, Wt))),
              (A.vars.scrollX = T(W))),
              (C = h()),
              (W = C + (z * 0.05 * -M.velocityY) / 0.227),
              (z *= Oc(h, C, W, Xr(l, mt))),
              (A.vars.scrollY = O(W)),
              A.invalidate().duration(z).play(0.01),
              ((ci && A.vars.scrollY >= c) || C >= c - 1) &&
                Z.to({}, { onUpdate: $, duration: z }));
          }
          a && a(M);
        }),
      (e.onWheel = function () {
        (A._ts && A.pause(), kt() - w > 1e3 && ((v = 0), (w = kt())));
      }),
      (e.onChange = function (M, D, z, C, W) {
        if (
          (ji !== v && S(),
          D && r && f(T(C[2] === D ? k + (M.startX - M.x) : f() + D - C[1])),
          z)
        ) {
          h.offset && E();
          var ae = W[2] === z,
            le = ae ? x + M.startY - M.y : h() + z - W[1],
            U = O(le);
          (ae && le !== U && (x += U - le), h(U));
        }
        (z || D) && Jr();
      }),
      (e.onEnable = function () {
        (oo(l, r ? !1 : 'x'),
          Ce.addEventListener('refresh', $),
          wt(xe, 'resize', $),
          h.smooth &&
            ((h.target.style.scrollBehavior = 'auto'),
            (h.smooth = f.smooth = !1)),
          b.enable());
      }),
      (e.onDisable = function () {
        (oo(l, !0),
          _t(xe, 'resize', $),
          Ce.removeEventListener('refresh', $),
          b.kill());
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (o = new ct(e)),
      (o.iOS = ci),
      ci && !h() && h(1),
      ci && Z.ticker.add(Br),
      (L = o._dc),
      (A = Z.to(o, {
        ease: 'power4',
        paused: !0,
        inherit: !1,
        scrollX: r ? '+=0.1' : '+=0',
        scrollY: '+=0.1',
        modifiers: {
          scrollY: Ld(h, h(), function () {
            return A.pause();
          }),
        },
        onUpdate: Jr,
        onComplete: L.vars.onComplete,
      })),
      o
    );
  };
Ce.sort = function (s) {
  if (zt(s)) return Te.sort(s);
  var e = xe.pageYOffset || 0;
  return (
    Ce.getAll().forEach(function (t) {
      return (t._sortY = t.trigger
        ? e + t.trigger.getBoundingClientRect().top
        : t.start + xe.innerHeight);
    }),
    Te.sort(
      s ||
        function (t, r) {
          return (
            (t.vars.refreshPriority || 0) * -1e6 +
            (t.vars.containerAnimation ? 1e6 : t._sortY) -
            ((r.vars.containerAnimation ? 1e6 : r._sortY) +
              (r.vars.refreshPriority || 0) * -1e6)
          );
        }
    )
  );
};
Ce.observe = function (s) {
  return new ct(s);
};
Ce.normalizeScroll = function (s) {
  if (typeof s > 'u') return Yt;
  if (s === !0 && Yt) return Yt.enable();
  if (s === !1) {
    (Yt && Yt.kill(), (Yt = s));
    return;
  }
  var e = s instanceof ct ? s : vg(s);
  return (
    Yt && Yt.target === e.target && Yt.kill(),
    Ki(e.target) && (Yt = e),
    e
  );
};
Ce.core = {
  _getVelocityProp: Io,
  _inputObserver: Dd,
  _scrollers: Se,
  _proxies: Hr,
  bridge: {
    ss: function () {
      (Mr || Qi('scrollStart'), (Mr = kt()));
    },
    ref: function () {
      return Dt;
    },
  },
};
yd() && Z.registerPlugin(Ce);
ml.registerPlugin(Si, Ce);
function _g() {
  Si.create({
    wrapper: '#wrapper',
    content: '#content',
    speed: 1,
    smooth: 0.7,
    effects: !0,
  });
}
function wg(s) {
  Si.get().effects(s, { speed: () => 0.5 });
}
function yg() {
  const s = ml.timeline({
    scrollTrigger: {
      trigger: '.triger-1',
      start: 'top bottom-=50',
      endTrigger: '.triger-1',
      toggleActions: 'play none none reverse',
    },
  });
  (s.from(
    '.timeline-1',
    { y: 100, duration: 0.9, opacity: 0, ease: 'sine.inOut' },
    '-=0.5'
  ),
    s.from(
      '.timeline-2',
      { y: 100, duration: 0.9, opacity: 0, ease: 'sine.inOut' },
      '-=0.5'
    ));
}
const kd = /Mobi|Android/i.test(navigator.userAgent);
function bg() {
  (zd(),
    Nd(),
    kp('.partners-slide'),
    Ip(),
    _g(),
    kd || (Rp(), Ph(), Ah(), yg(), wg('.parallax')));
}
document.addEventListener('DOMContentLoaded', bg);
kd ||
  document.addEventListener('DOMContentLoaded', function () {
    new Fp('.rellax');
  });
Id('.preloader');
document.addEventListener('DOMContentLoaded', Bd);
$d();
let Tg = null;
new Rd({
  headerSelector: '.offset-header',
  selector: '.anchor-link',
  smoother: Tg,
  onCloseSidebar: (s) => s?.classList.remove('_show'),
  onCloseButton: (s) => s?.classList.remove('_open'),
});
window.addEventListener('activeSectionChanged', (s) => {
  console.log('Active section changed:', s.detail);
});
document.addEventListener('DOMContentLoaded', () => {
  const s = document.querySelectorAll('.faq-item');
  s.forEach((e) => {
    e.querySelector('.faq-item__trigger').addEventListener('click', () => {
      (s.forEach((r) => {
        r !== e && r.classList.remove('is-active');
      }),
        e.classList.toggle('is-active'));
    });
  });
});
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;'
);
