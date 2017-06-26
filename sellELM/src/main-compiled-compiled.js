// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
// import routerHello from './router'
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
// 安装插件
Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [{ path: '/goods', component: goods }, { path: '/seller', component: seller }, { path: '/ratings', component: ratings }];

var router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: function render(h) {
    return h(App);
  }
});

/* eslint-disable no-new */

//# sourceMappingURL=main-compiled.js.map

//# sourceMappingURL=main-compiled-compiled.js.map