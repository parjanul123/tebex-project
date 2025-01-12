<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Login - Administrează Serverul Tău</h1>
      <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded p-6">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="border border-gray-300 p-3 w-full rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="border border-gray-300 p-3 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ServerLogin",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const payload = {
            email: this.email.trim(),
            password: this.password.trim(),
          };
  
          const response = await axios.post("http://localhost:3500/api/auth/server/login", payload);
          alert(`Welcome, ${response.data.username}!`);
          this.$router.push("/server-dashboard");
        } catch (error) {
          console.error("Login error:", error);
          alert(error.response?.data?.message || "Login failed.");
        }
      },
    },
  };
  </script>
  