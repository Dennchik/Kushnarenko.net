//! ✅ vite.config.js
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
//* ✅ Plugins
import autoprefixer from 'autoprefixer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcssMediaMinMax from 'postcss-media-minmax';
import sortMediaQueries from 'postcss-sort-media-queries';
import { defineConfig } from 'vite';
//* ✅ config
import { app } from './vite/config/app.js';
//* ✅ Path
import { paths } from './vite/config/path.js';
//* ✅ Tasks
import { getPugConfig } from './vite/config/pug-config.js';
import { compileScss } from './vite/tasks/compileScss.js';
import { fontStyle } from './vite/tasks/fontsStyle.js';
import { moveHtmlFiles } from './vite/tasks/moveHtmlFiles.js';
import { convertImagesToWebp } from './vite/tasks/webp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ✅ Вызываем fontStyle ДО конфигурации
fontStyle(paths.fonts.src, paths.fonts.dest);

export default defineConfig(({ command }) => {
  const isProd = command === 'build';
  const isDev = command === 'dev';

  // ✅ Вызываем compileScss() только для продакшн сборки
  if (isProd) {
    compileScss();
  }
  return {
    base: './',

    plugins: [
      convertImagesToWebp(app.webp),
      viteConvertPugInHtml(getPugConfig(isProd)),
      moveHtmlFiles(),
    ],

    server: {
      open: true,
    },

    css: {
      devSourcemap: !isProd,
      postcss: {
        plugins: [
          autoprefixer(app.autoprefixer),
          ...(isProd ? [] : [sortMediaQueries(app.postcssSortMediaQueries)]),
          ...(isProd ? [] : [postcssMediaMinMax(app.postcssMediaMinMax)]),
        ],
      },
      preprocessorOptions: { scss: {} },
    },

    resolve: {
      alias: { '@': resolve(__dirname, 'src') },
    },

    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: isDev,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 264,
      modulePreload: {
        polyfill: true,
      },
      minify: 'esbuild',
      commonjsOptions: {
        transformMixedEsModules: true,
      },

      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/js/main.js'),
          index: resolve(__dirname, 'src/js/index.js'),
          // about: resolve(__dirname, 'src/js/about.js'),
          // catalog: resolve(__dirname, 'src/js/catalog.js'),
          // news: resolve(__dirname, 'src/js/news.js'),
          // card: resolve(__dirname, 'src/js/card.js'),
          // 'card-product': resolve(__dirname, 'src/js/card.js'),
        },
        output: {
          entryFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
          chunkFileNames: 'assets/vendors/[name].js',
        },
      },
      optimizeDeps: {
        include: ['lodash', 'axios'],
        exclude: [],
      },
    },

    preview: {
      port: 4173,
      host: true,
    },
  };
});
