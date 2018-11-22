import Vue from 'vue';
import './plugins/bootstrapVue';
import './plugins/icon';
import './plugins/tagInput';
import './validator';

import App from './App.vue';

// Import dos componentes responsáveis pelo roteamento 
// entre as páginas e gerenciamento de estados
import { router } from './router'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
