import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CartView from "./views/CartView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import AboutView from "./views/AboutView.vue";
import ProfileView from "./views/ProfileView.vue";
import RedMView from "./views/RedMView.vue";
import EreborView from "./views/EreborView.vue";
import PachetGoldView from "./views/PachetGoldView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/redm",
    name: "RedM",
    component: RedMView,
  },
  {
    path: "/redm/erebor",
    name: "Erebor",
    component: EreborView,
  },
  {
    path: "/redm/erebor/gold",
    name: "PachetGold",
    component: PachetGoldView,
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
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
