<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Register - Creează un Magazin pentru Serverul Tău</h1>
      <form @submit.prevent="handleRegister" class="bg-white shadow-md rounded p-6">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-medium mb-2">Nume Server</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="border border-gray-300 p-3 w-full rounded"
            required
          />
        </div>
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
          class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ServerRegister",
    data() {
      return {
        username: "",
        email: "",
        password: "",
      };
    },
    methods: {
      async handleRegister() {
        try {
          const payload = {
            username: this.username.trim(),
            email: this.email.trim(),
            password: this.password.trim(),
          };
  
          await axios.post("http://localhost:3500/api/auth/server/register", payload);
          alert("Server registered successfully!");
          this.$router.push("/server-login");
        } catch (error) {
          console.error("Error during registration:", error);
          alert(error.response?.data?.message || "Registration failed.");
        }
      },
    },
  };
  </script>
  