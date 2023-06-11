import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Store from "../views/StoreView.vue";
import Cart from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Register",
    component: Register,
  },

  {
    path: "/Store",
    component: Store,
  },/*
  {
    path: "/Cart",
    component: Cart,
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
