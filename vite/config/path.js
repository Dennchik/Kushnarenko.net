import { resolve } from 'path';

export const paths = {
  fontsSrc: resolve('public/fonts'),
  fontsScss: resolve('src/scss/core/_fonts.scss'),

  fonts: {
    src: resolve('public/fonts'),
    dest: resolve('src/scss/core/_fonts.scss'),
  },
};
