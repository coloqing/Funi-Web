import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入阿里巴巴矢量图标库
import '../public/download/font_4600300_aq82i5qdu5q/iconfont.css';
import App from './App.vue'
import router from './router'
import store from './store'
// 单车级组件
import  train  from "./components/train.vue";
// 复用 警示list
import  warning  from "./components/warning.vue";
Vue.component('train', train);
Vue.component('warning', warning);
Vue.config.productionTip = false;
// 引入HomeView组件 
// import HomeView from './views/HomeView.vue'; 
// 全局注册HomeView组件
// Vue.component('HomeView', HomeView); 
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
