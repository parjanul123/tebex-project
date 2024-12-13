<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="loginUser" class="bg-white p-4 rounded shadow-md">
      <div class="mb-4">
        <label for="username" class="block text-sm font-semibold mb-2"
          >Username</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          class="border rounded w-full p-2"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-semibold mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          class="border rounded w-full p-2"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
    <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["login"]), // Map the login action from Vuex

    async loginUser() {
      try {
        await this.login({ username: this.username, password: this.password }); // Call Vuex action
        this.$router.push("/"); // Redirect to home page or cart after successful login
      } catch (error) {
        this.errorMessage = error.response.data.message; // Show error message
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
