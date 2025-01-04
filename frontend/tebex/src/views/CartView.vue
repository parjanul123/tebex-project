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
  class="bg-white rounded-lg shadow-md p-4 mb-4"
>
  <div class="flex flex-col">
    <h2 class="text-lg font-semibold">{{ item.title }}</h2>
    <p class="text-sm text-gray-600">
      Profile: {{ item.profile }} → Server: {{ item.server }} → Package: {{ item.package }}
    </p>
    <p class="text-gray-700 font-medium">Price: {{ item.price }}€</p>
  </div>
  <button
    @click="removeFromCart(item.id)"
    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
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
