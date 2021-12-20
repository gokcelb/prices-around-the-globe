import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Country from '../views/Country';
import Category from "../views/Category";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/countries/:country',
    name: 'Country',
    component: Country
  },
  {
    path: '/categories/:category',
    name: 'Category',
    component: Category
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
