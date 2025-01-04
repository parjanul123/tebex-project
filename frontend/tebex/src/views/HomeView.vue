<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Shop</h1>

    <!-- Buton pentru RedM -->
    <div class="mt-4">
      <button
        @click="selectRedM"
        class="bg-red-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-full flex items-center justify-start"
      >
        <img
          src="/Images/RedM.png"
          alt="RedM Logo"
          class="w-8 h-8 inline mr-4"
        />
        RedM Profile
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["selectProfile"]),
    selectRedM() {
      this.selectProfile("RedM");
      this.$router.push("/redm");
    },
  },
};
</script>
