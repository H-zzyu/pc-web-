import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default ({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
 
  server: {
    host: "0.0.0.0",
    cors: true,
    port: 8991,
    open: false, //自动打开
    
    proxy: {
      // 这里的ccc可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
      // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
     
      '/api': {
        target: 'https://apis.map.qq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        pathRewrite: { '^/api': '' }
      },
      '/weathers': {
        target: 'https://wis.qq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weathers/, ''),
        pathRewrite: { '^/weathers': '' }
      },
      '/music': {
        target: 'https://music.163.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/music/, ''),
        pathRewrite: { '^/music': '' }
      },
      "/oneday":{
        target: 'http://v3.wufazhuce.com:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oneday/, ''),
        pathRewrite: { '^/oneday': '' }
      }
      
    },
  },
    }
)
