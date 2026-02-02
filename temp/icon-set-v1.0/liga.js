/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'location': '&#xe909;',
            'check-box': '&#xe900;',
            'pencil-alt': '&#xe901;',
            'check': '&#xe910;',
            'check': '&#xe911;',
            'check': '&#xe912;',
            'check': '&#xe913;',
            'check': '&#xe914;',
            'check': '&#xe90f;',
            'volume-control-phone': '&#xf2a0;',
            'phone-call': '&#xe915;',
            'vk-draw': '&#xe902;',
            'telegram-draw': '&#xe903;',
            'whatsapp-draw': '&#xe904;',
            'contacts': '&#xe907;',
            'arrow-down': '&#xe92c;',
            'arrow-left': '&#xe92d;',
            'arrow-thin': '&#xe950;',
            'arrow-up': '&#xe95c;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
