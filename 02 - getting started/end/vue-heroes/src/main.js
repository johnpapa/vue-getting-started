import Vue from 'vue';
import App from '@/app';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
