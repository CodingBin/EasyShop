import Vue from 'vue'
import App from './App'
import store from './store/index'
//引入路由
import router from './router/index'
//引入lytab
import LyTab from 'ly-tab'
Vue.use(LyTab);
import "@/common/css/style.css";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

//配置图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading:loading,
  attempt: 1
});

new Vue({
  el:"#app",
  router,
  store,
  render:h=>h(App)
});
