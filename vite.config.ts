import {defineConfig} from 'vite';
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve('./index.html'),
      name: 'avvoka',
    },
  }
});
