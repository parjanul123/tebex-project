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

    <!-- Butoane pentru navigare la VIP Pachet și Case VIP -->
    <div class="mt-6 flex flex-col gap-4">
      <button
        @click="goToVipPachet"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
      >
        <img
          src="/Images/Vip.png"
          alt="Vip Pachet Logo"
          class="w-12 h-8 inline mr-4"
        />
        VIP Packages
      </button>

      <button
        @click="goToCaseVip"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
      >
        <img
          src="/Images/case.png"
          alt="Case Logo"
          class="w-8 h-8 inline mr-4"
        />
        VIP Houses
      </button>
    </div>

    <!-- Afișează componentele copil -->
    <div class="mt-8">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToGold() {
      this.$router.push("/redm/erebor/gold");
    },
    goToVipPachet() {
      this.$router.push("/redm/erebor/vip");
    },
    goToCaseVip() {
      this.$router.push("/redm/erebor/casevip");
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
