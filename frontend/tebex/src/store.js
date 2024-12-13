import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    count: 0,
    cart: [], // Array to hold cart items
    user: null, // To hold user information after login
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
    setUser(state, user) {
      state.user = user; // Set user information
    },
    logout(state) {
      state.user = null; // Clear user information on logout
      // Optionally, you can clear the cart or any other user-specific data
      state.cart = []; // Clear cart on logout if desired
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
    async addToCart({ commit, state }, item) {
      // Create a payload that includes the user ID and the item details
      const payload = {
        userId: state.user.id, // Get the user ID from the state
        ...item, // Spread the item properties into the payload
      };

      const response = await axios.post(
        "http://localhost:3500/api/cart",
        payload
      );
      commit("addToCart", response.data); // Commit add to cart action
    },
    async removeFromCart({ commit }, itemId) {
      await axios.delete(`http://localhost:3500/api/cart/${itemId}`);
      commit("removeFromCart", itemId); // Commit remove from cart action
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3500/api/login",
          credentials
        );
        // Assuming the response contains user data
        commit("setUser", response.data.user); // Set user data from response
      } catch (error) {
        console.error("Login failed:", error);
        throw error; // Rethrow the error to handle it in the component if needed
      }
    },
    logout({ commit }) {
      // Optionally, you can perform any logout API call here if needed
      commit("logout"); // Clear user information on logout
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getCart(state) {
      return state.cart; // Getter for cart items
    },
    isLoggedIn(state) {
      return !!state.user; // Check if user is logged in
    },
    getUser(state) {
      return state.user; // Getter for user information
    },
  },
});

export default store;
