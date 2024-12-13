import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue"; // Verifică că fișierul există
import CartView from "./views/CartView.vue"; // Verifică că fișierul există
import LoginView from "./views/LoginView.vue"; // Verifică că fișierul există
import RegisterView from "./views/RegisterView.vue";
import AboutView from "./views/AboutView.vue";
import ProfileView from "./views/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  { path: "/about", name: "About", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
