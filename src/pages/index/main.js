import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
