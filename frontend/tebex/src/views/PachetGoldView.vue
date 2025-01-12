<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <div
        v-for="(item, index) in shopItems"
        :key="index"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <img :src="item.image" alt="Product" class="w-full h-32 object-cover rounded" />
        <h2 class="mt-2 text-lg font-semibold">{{ item.title }}</h2>
        <h3 class="mt-1 text-gray-700 font-medium">Price: {{ item.price }} €</h3>
        <button
          @click="handleAddToCart(item)"
          class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PachetGoldView",
  data() {
    return {
      shopItems: [
        { title: "Gold 100", image: "/Images/Gold1.jpg", price: 5 },
        { title: "Gold 200", image: "/Images/Gold2.jpg", price: 10 },
        { title: "Gold 500", image: "/Images/Gold3.jpg", price: 15 },
      ],
    };
  },
  methods: {
    ...mapActions(["addToCart"]),
    handleAddToCart(item) {
      const cartItem = {
        title: item.title,
        image: item.image,
        price: item.price,
        userId: 123, // Exemplu de ID utilizator
        profile: "RedM",
        server: "Erebor",
        packageType: "Gold Package",
      };
      this.addToCart(cartItem);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 100vh; /* Face pagina să ocupe întreg ecranul */
}

.bg-black {
  background-color: #000; /* Fundal negru */
}

img {
  object-fit: cover;
}

.relative {
  position: relative;
  z-index: 10;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  cursor: pointer;
}
</style>
