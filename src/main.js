import Vue from 'vue';
import App from './App.vue';

// we need to add routers here so vue is aware of em
import router from './router';

// we need to configure vueJS tu use the store (vuex)
import store from './store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')
