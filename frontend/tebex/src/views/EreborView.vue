<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Erebor Profile</h1>
      <p class="text-gray-700">Welcome to the Erebor section.</p>
  
      <!-- Buton pentru navigare la Pachet Gold -->
      <div class="mt-4">
        <button
          @click="goToGold"
          class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
        >
          <img
            src="/Images/coin.png"
            alt="coin Logo"
            class="w-8 h-8 inline mr-4"
          />
          Gold Packages
        </button>
      </div>
  
      <!-- Afișează componentele copil -->
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToGold() {
        this.$router.push("/redm/erebor/gold");
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.3s ease;
  }
  button:hover {
    cursor: pointer;
  }
  </style>
  