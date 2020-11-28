import Vue from 'vue';
import VuePikaday from '@netcz/vue-pikaday';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VuePikaday);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
