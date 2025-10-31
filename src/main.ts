import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//引入初始化样式文件
import '@/styles/element/common.scss'
import '@/assets/iconfont/iconfont.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入自定义懒加载指令
import { setupLazyLoadDirective } from '@/directives/lazyLoad';

const pinia = createPinia();
const app = createApp(App);

// 在一个应用实例上安装所有插件
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus);
app.use(pinia);
app.use(router);

// 注册懒加载指令 - 这会替换原来的 vue3-lazyload
setupLazyLoadDirective(app);

app.mount('#app');