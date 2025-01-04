import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    count: 0,
    cart: [], // Elemente din coșul de cumpărături
    user: null, // Utilizatorul autentificat
    selectedProfile: null, // Profilul selectat (ex: RedM, Erebor)
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
    },
    setSelectedProfile(state, profile) {
      state.selectedProfile = profile; // Setează profilul selectat
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
  },
});

export default store;
