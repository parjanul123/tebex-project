<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">RedM Profile</h1>
    <button
      @click="goToErebor"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
    > 
      <img
        src="https://imgur.com/XWNyS70.png"
        alt="Logo"
        class="w-8 h-8 inline mr-4"
      />
      Erebor
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToErebor() {
      this.$router.push("/redm/erebor");
    },
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.2s ease;
}
button:hover {
  cursor: pointer;
}
img {
  display: inline-block;
  vertical-align: middle;
}
</style>
