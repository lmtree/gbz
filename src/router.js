/**
 * Created by w on 2017/1/4.
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const login = resolve => require(['./view/login.vue'], resolve)
const index = resolve => require(['./view/index.vue'], resolve)
// const register = resolve => require(['./view/register.vue'], resolve)
const enter = resolve => require(['./view/enter.vue'], resolve)
const home = resolve => require(['./view/home.vue'], resolve)
const my = resolve => require(['./view/my.vue'], resolve)
const aaa = resolve => require(['./view/aaa.vue'], resolve)
const setting = resolve => require(['./view/setting.vue'], resolve)
const userinfo= resolve => require(['./view/userinfo.vue'], resolve)
const details= resolve => require(['./view/details.vue'], resolve)
const cart = resolve => require(['./view/cart.vue'], resolve)
const pay = resolve => require(['./view/pay.vue'], resolve)
const paydone = resolve => require(['./view/paydone.vue'], resolve)
const service = resolve => require(['./view/service.vue'], resolve)
const router = new VueRouter({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/index', name: 'index', component: index},
    // { path: '/register', name: 'register', component: register},
    { path: '/enter', name: 'enter', component: enter},
    { path: '/home', name: 'home', component: home},
    { path: '/my', name: 'my', component: my},
    { path: '/aaa', name: 'aaa', component: aaa},
    { path: '/setting', name: 'setting', component:setting},
    { path: '/userinfo', name: 'userinfo', component: userinfo },
    { path: '/details/:id', name: 'details', component: details },
    { path: '/cart', name: 'cart', component: cart },
    { path: '/pay', name: 'pay', component: pay },
    { path: '/paydone', name: 'paydone', component: paydone },
    { path: '/service', name: 'service', component: service },
  ]
})

export default router;
