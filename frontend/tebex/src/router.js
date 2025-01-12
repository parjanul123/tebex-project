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
import WalletView from "./views/WalletView.vue";
import VipPachetView from "./views/VipPachetView.vue";
import CaseVipView from "./views/CaseVipView.vue";
import VipGoldView from "./views/VipGoldView.vue";
import VipSilverView from "./views/VipSilverView.vue";
import VipBronzeView from "./views/VipBronzeView.vue";
import CostumCalView from "./views/CostumCalView.vue";
import RegisterServer from "./views/RegisterServer.vue";
import LoginServer from "./views/LoginServer.vue";
import ProjectUploadView from "./views/ProjectUploadView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/project-upload",
    name: "ProjectUpload",
    component: ProjectUploadView,
    meta: { requiresAuth: true },
  },
  {
    path: "/connect-wallet",
    name: "ConnectWallet",
    component: WalletView,
  },
  {
    path: "/server-login",
    name: "ServerLogin",
    component: LoginServer,
  },
  {
    path: "/server-register",
    name: "ServerRegister",
    component: RegisterServer,
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
    path: "/redm/erebor/vip",
    name: "VipPachet",
    component: VipPachetView,
  },
  {
    path: "/redm/erebor/vip/vipgold",
    name: "VipGold",
    component: VipGoldView,
  },
  {
    path: "/redm/erebor/vip/vipsilver",
    name: "VipSilver",
    component: VipSilverView,
  },
  {
    path: "/redm/erebor/vip/vipbronze",
    name: "VipBronze",
    component: VipBronzeView,
  },
  {
    path: "/redm/erebor/vip/costumcal",
    name: "CostumCal",
    component: CostumCalView,
  },
  {
    path: "/redm/erebor/casevip",
    name: "CaseVip",
    component: CaseVipView,
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
