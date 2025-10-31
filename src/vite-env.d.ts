// src/vite-env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为 Vite 插件添加类型声明
declare module '@vitejs/plugin-vue' {
  import { Plugin } from 'vite'
  const vue: () => Plugin
  export default vue
}

declare module 'unplugin-auto-import/vite' {
  import { Plugin } from 'vite'
  interface AutoImportOptions {
    // 根据实际需要添加选项类型
    resolvers?: any[]
  }
  const autoImport: (options: AutoImportOptions) => Plugin
  export default autoImport
}

declare module 'unplugin-vue-components/vite' {
  import { Plugin } from 'vite'
  interface ComponentsOptions {
    // 根据实际需要添加选项类型
    resolvers?: any[]
  }
  const components: (options: ComponentsOptions) => Plugin
  export default components
}

declare module 'vite-plugin-compression' {
  import { Plugin } from 'vite'
  interface CompressionOptions {
    threshold?: number
  }
  const compression: (options: CompressionOptions) => Plugin
  export default compression
}