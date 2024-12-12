<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
      >
        <div class="flex items-center">
          <img
            :src="item.image"
            alt="Product Image"
            class="w-16 h-16 object-cover rounded"
          />
          <h2 class="ml-4 text-lg font-semibold">{{ item.title }}</h2>
        </div>
        <button
          @click="removeFromCart(item.id)"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartView",
  computed: {
    ...mapGetters(["getCart"]),
    cartItems() {
      return this.getCart; // Return the cart items from Vuex
    },
  },
  methods: {
    ...mapActions(["fetchCart", "removeFromCart"]),
  },
  created() {
    this.fetchCart(); // Fetch cart items when the component is created
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
