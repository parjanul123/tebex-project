import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    count: 0,
    cart: [], // Array to hold cart items
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setCart(state, items) {
      state.cart = items; // Set cart items
    },
    addToCart(state, item) {
      state.cart.push(item); // Add item to cart
    },
    removeFromCart(state, itemId) {
      state.cart = state.cart.filter((item) => item.id !== itemId); // Remove item from cart
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
      const response = await axios.get("http://localhost:3500/api/cart");
      commit("setCart", response.data); // Fetch and set cart items
    },
    async addToCart({ commit }, item) {
      const response = await axios.post("http://localhost:3500/api/cart", item);
      commit("addToCart", response.data); // Commit add to cart action
    },
    async removeFromCart({ commit }, itemId) {
      await axios.delete(`http://localhost:3500/api/cart/${itemId}`);
      commit("removeFromCart", itemId); // Commit remove from cart action
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getCart(state) {
      return state.cart; // Getter for cart items
    },
  },
});

export default store;
