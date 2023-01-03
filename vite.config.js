import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  build:{
    outDir:path.resolve(__dirname, "./server/dist")
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80/',
        changeOrigin: true
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production'
})
