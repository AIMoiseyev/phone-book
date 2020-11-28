import Vue from 'vue';
import VueRouter from 'vue-router';
import PhoneBookPage from '../views/PhoneBookPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'contacts',
    component: PhoneBookPage,
  },
  {
    path: '/add',
    name: 'AddContactPage',
    component: () => import('../views/AddContactPage'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
