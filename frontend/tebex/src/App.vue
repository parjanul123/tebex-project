<template>
  <div id="app" class="min-h-screen bg-gray-100 flex flex-col">
    <nav class="bg-white shadow-md">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
      >
        <!-- Image added here -->

        <div class="text-lg font-bold text-gray-800">
          <img
            src="https://imgur.com/XWNyS70.png"
            alt="Logo"
            class="h-8 mr-2"
          />
          <div>Tebex</div>
        </div>
        <div>
          <router-link to="/" class="text-gray-600 hover:text-blue-500 mx-2"
            >Home</router-link
          >
          <router-link
            v-if="isLoggedIn"
            to="/cart"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Cart</router-link
          >
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Login</router-link
          >
          <router-link
            v-if="!isLoggedIn"
            to="/register"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Register</router-link
          >
          <router-link
            v-if="isLoggedIn"
            to="/profile"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Profile</router-link
          >
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="text-gray-600 hover:text-blue-500 mx-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["count", "user"]), // Assuming you have user state in Vuex
    isLoggedIn() {
      return !!this.user; // Check if user is logged in
    },
  },
  methods: {
    ...mapActions(["increment", "decrement", "logout"]), // Add logout action
  },
};
</script>

<style>
/* Add any additional styles if needed */
</style>
