import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CartView from "./views/CartView.vue"; // Import the Cart view
import LoginView from "./views/LoginView.vue"; // Import the Login view

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView, // Add the Cart route
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView, // Add the Login route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
