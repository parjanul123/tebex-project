<template>
  <div class="home-container min-h-screen bg-gray-100 flex flex-col">
    <!-- Profilurile -->
    <div class="profiles-container max-w-4xl mx-auto mt-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold">Choose Your Profile</h1>
        <p class="text-lg text-gray-700">Select the profile you want to explore.</p>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <!-- Profil RedM -->
        <button
          @click="navigateToRedM"
          class="profile-card bg-white rounded-lg shadow-md p-6 flex items-center hover:bg-gray-100 transition"
        >
          <img src="/Images/Redm.png" alt="RedM Icon" class="mr-4 w-12 h-12" />
          <div>
            <h2 class="text-2xl font-bold mb-2">RedM</h2>
            <p class="text-gray-700">
              Dive into the immersive world of Red Dead Redemption multiplayer.
            </p>
          </div>
        </button>
      </div>

      <!-- Buton pentru monetizare -->
      <div class="text-center mt-8">
        <button
          @click="toggleMonetization"
          class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 text-lg"
        >
          Monetize Your Server
        </button>
      </div>
    </div>

    <!-- Secțiunea pentru Login/Register -->
    <div
      v-if="showMonetization"
      class="monetize-container max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-md p-6"
    >
      <h2 class="text-3xl font-bold mb-4 text-center">Monetize Your Server</h2>
      <p class="text-gray-700 mb-6 text-center">Select an option to continue.</p>

      <!-- Tabel pentru Login/Register -->
      <div class="flex border-b mb-4">
        <button
          @click="isLogin = true"
          :class="{
            'border-b-2 border-blue-500': isLogin,
            'text-blue-500': isLogin,
          }"
          class="flex-1 text-center py-2 font-bold"
        >
          Login
        </button>
        <button
          @click="isLogin = false"
          :class="{
            'border-b-2 border-green-500': !isLogin,
            'text-green-500': !isLogin,
          }"
          class="flex-1 text-center py-2 font-bold"
        >
          Register
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="bg-gray-100 p-4 rounded">
        <h3 class="text-lg font-bold mb-4">Login</h3>
        <input
          v-model="loginForm.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>

      <!-- Register Form -->
      <form
        v-else
        @submit.prevent="handleRegister"
        class="bg-gray-100 p-4 rounded"
      >
        <h3 class="text-lg font-bold mb-4">Register</h3>
        <input
          v-model="registerForm.username"
          type="text"
          placeholder="Username"
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          v-model="registerForm.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          v-model="registerForm.password"
          type="password"
          placeholder="Password"
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      showMonetization: false, // Controlul afișării secțiunii de monetizare
      isLogin: true, // Starea formularului activ (Login sau Register)
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    navigateToRedM() {
      this.$router.push("/redm"); // Navighează către profilul RedM
    },
    toggleMonetization() {
      this.showMonetization = !this.showMonetization; // Ascunde/Afișează secțiunea
    },
    async handleLogin() {
      try {
        const { data } = await axios.post("http://localhost:3500/api/login", this.loginForm);
        alert(`Logged in successfully! Welcome, ${data.user.username}`);
        this.loginForm = { email: "", password: "" }; // Resetează formularul
        this.$router.push("/upload-project"); // Redirecționează către pagina de upload
      } catch (error) {
        console.error("Error during login:", error);
        alert(error.response?.data?.message || "Login failed.");
      }
    },
    async handleRegister() {
      try {
        await axios.post("http://localhost:3500/api/register", this.registerForm);
        alert("Registered successfully!");
        this.registerForm = { username: "", email: "", password: "" }; // Resetează formularul
      } catch (error) {
        console.error("Error during registration:", error);
        alert(error.response?.data?.message || "Registration failed.");
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.profiles-container {
  padding: 20px;
}

.profile-card {
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.profile-card img {
  flex-shrink: 0;
}

.profile-card:hover {
  background-color: #f9f9f9;
}

button {
  transition: background-color 0.3s ease;
}
</style>
