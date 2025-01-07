<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    <!-- Traditional Login Form -->
    <form
      @submit.prevent="loginUser"
      class="bg-white p-4 rounded shadow-md mb-4"
    >
      <div class="mb-4">
        <label for="username" class="block text-sm font-semibold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="border rounded w-full p-2"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-semibold mb-2">
          Password
        </label>
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
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Login
      </button>
    </form>
    <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>

    <!-- Login with Discord -->
    <div class="mt-4 text-center">
      <p class="text-gray-600 mb-2">Step 1: Login with Discord</p>
      <button
        @click="loginWithDiscord"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full flex items-center justify-center"
      >
        Login with Discord
        <img
          src="/Images/discord.png"
          alt="Discord Logo"
          class="w-6 h-6 ml-2"
        />
      </button>
    </div>

    <!-- Login with Cfx.re -->
    <div v-if="discordLoggedIn" class="mt-4 text-center">
      <p class="text-gray-600 mb-2">Step 2: Login with Cfx.re</p>
      <button
        @click="loginWithRedm"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full flex items-center justify-center"
      >
        Login with
        <span class="mx-1 flex items-center">
          <img src="/Images/cfx.png" alt="Cfx.re Logo" class="w-6 h-6" />
        </span>
        Cfx.re
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      discordLoggedIn: false, // Control flag for step 2
    };
  },
  methods: {
    loginWithDiscord() {
      // Simulate successful Discord login
      this.discordLoggedIn = true;
    },
    loginWithRedm() {
      // Redirect to backend route for Cfx.re login
      window.location.href = "http://localhost:3500/api/cfx/login";
    },
    async loginUser() {
      try {
        // Simulate backend login
        console.log("login");
        const response = this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
        console.log("User logged in:", response.data);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed!";
      }
    },
  },
};
</script>

<style scoped>
/* Button styling */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.bg-purple-500 {
  background-color: #5865f2;
}
.bg-purple-500:hover {
  background-color: #4854c7;
}
.bg-red-500 {
  background-color: #ff5500;
}
.bg-red-500:hover {
  background-color: #cc4400;
}
</style>
