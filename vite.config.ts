import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // 确保正确导入了 path

//elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 使用 path.resolve
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 更精细化的分包
            if (id.includes('element-plus') || id.includes('element-ui')) {
              return 'vendor-element'
            }
            if (id.includes('echarts') || id.includes('zrender')) {
              return 'vendor-charts'
            }
            if (id.includes('lodash') || id.includes('moment')) {
              return 'vendor-utils'
            }
            if (id.includes('vue')) {
              return 'vendor-vue'
            }
            // 其他依赖
            return 'vendor-other'
          }
        }
      }
    }
  }
});