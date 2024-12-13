<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    <div v-if="user">
      <div class="bg-white p-4 rounded shadow-md">
        <h2 class="text-xl font-semibold mb-2">Profile Details</h2>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>User ID:</strong> {{ user.id }}</p>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">No user information available. Please log in.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.getUser; // Get user information from Vuex store
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
