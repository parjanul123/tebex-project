import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    count: 0, // Contor pentru testare
    cart: [], // Elemente din coșul de cumpărături
    user: null, // Utilizatorul autentificat
    selectedProfile: null, // Profilul selectat (ex: RedM, Erebor)
    walletConnected: false, // Statusul conectării la portofel
    walletAddress: null, // Adresa portofelului conectat
    egldPrice: null, // Prețul EGLD în EUR
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setCart(state, items) {
      state.cart = items; // Setează produsele în coș
    },
    addToCart(state, item) {
      state.cart.push(item); // Adaugă un produs în coș
    },
    removeFromCart(state, itemId) {
      state.cart = state.cart.filter((item) => item.id !== itemId); // Elimină produsul din coș
    },
    setUser(state, user) {
      state.user = user; // Setează informațiile utilizatorului
    },
    logout(state) {
      state.user = null; // Resetează utilizatorul
      state.cart = []; // Golește coșul de cumpărături
      state.selectedProfile = null; // Resetează profilul selectat
      state.walletConnected = false; // Deconectează portofelul
      state.walletAddress = null; // Resetează adresa portofelului
    },
    setSelectedProfile(state, profile) {
      state.selectedProfile = profile; // Setează profilul selectat
    },
    setWalletConnected(state, walletAddress) {
      state.walletConnected = true; // Marchează portofelul ca fiind conectat
      state.walletAddress = walletAddress; // Salvează adresa portofelului
    },
    setEGLDPrice(state, price) {
      state.egldPrice = price; // Setează prețul EGLD
    },
  },
  actions: {
    increment({ commit }) {
      commit("increment");
    },
    decrement({ commit }) {
      commit("decrement");
    },
    async fetchCart({ commit }) {
      try {
        const response = await axios.get("http://localhost:3500/api/cart");
        commit("setCart", response.data); // Setează produsele în coș
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    },
    async addToCart({ commit, state }, item) {
      if (!state.user) {
        console.error("User not logged in!");
        return;
      }

      const payload = {
        userId: state.user.id, // ID-ul utilizatorului autentificat
        ...item, // Include title, image, price, profile, server, package
      };

      try {
        const response = await axios.post(
          "http://localhost:3500/api/cart",
          payload
        );
        // Adaugă produsul în store cu un ID unic
        commit("addToCart", { ...item, id: response.data.itemId });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    },
    async removeFromCart({ commit }, itemId) {
      try {
        await axios.delete(`http://localhost:3500/api/cart/${itemId}`);
        commit("removeFromCart", itemId); // Elimină produsul din coș
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3500/api/login",
          credentials
        );
        commit("setUser", response.data.user); // Setează utilizatorul autentificat
      } catch (error) {
        console.error("Login failed:", error);
        throw error; // Propagă eroarea pentru gestionare ulterioară
      }
    },
    logout({ commit }) {
      commit("logout"); // Resetează starea aplicației
    },
    selectProfile({ commit }, profile) {
      commit("setSelectedProfile", profile); // Setează profilul selectat
    },
    async fetchEGLDPrice({ commit }) {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=elrond&vs_currencies=eur"
        );
        const price = response.data.elrond.eur; // Prețul EGLD în EUR
        commit("setEGLDPrice", price);
      } catch (error) {
        console.error("Failed to fetch EGLD price:", error);
      }
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getCart(state) {
      return state.cart; // Returnează produsele din coș
    },
    isLoggedIn(state) {
      return !!state.user; // Verifică dacă utilizatorul este autentificat
    },
    getUser(state) {
      return state.user; // Returnează utilizatorul autentificat
    },
    getSelectedProfile(state) {
      return state.selectedProfile; // Returnează profilul selectat
    },
    egldPrice(state) {
      return state.egldPrice; // Prețul EGLD în EUR
    },
    calculatePackagePrice: (state) => (priceInEUR) => {
      if (!state.egldPrice) return null; // Dacă prețul EGLD nu este disponibil
      return (priceInEUR / state.egldPrice).toFixed(4); // Preț în EGLD cu 4 zecimale
    },
  },
});

export default store;
