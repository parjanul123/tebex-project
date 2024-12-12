<template>
  <div id="app" class="min-h-screen bg-gray-100 flex flex-col">
    <nav class="bg-white shadow-md">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="text-lg font-bold text-gray-800">My App</div>
        <div>
          <router-link to="/" class="text-gray-600 hover:text-blue-500 mx-2"
            >Home</router-link
          >
          <router-link to="/cart" class="text-gray-600 hover:text-blue-500 mx-2"
            >Cart</router-link
          >
          <router-link
            to="/login"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Login</router-link
          >
          <!-- Add Login link -->
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
    ...mapState(["count"]),
  },
  methods: {
    ...mapActions(["increment", "decrement"]),
  },
};
</script>
