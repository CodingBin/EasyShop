import Vue from 'vue'
import App from './App'
import store from './store/index'
import "@/common/css/style.css";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router/index'
import LyTab from 'ly-tab'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'

Vue.use(LyTab);
Vue.use(MintUI);
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
