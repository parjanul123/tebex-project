<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Pachet Gold</h1>
    <p class="text-gray-700 mb-4">Explore our exclusive Gold packages!</p>

    <!-- Magazinul cu produse -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(item, index) in shopItems"
        :key="index"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <img
          :src="item.image"
          alt="Product Image"
          class="w-full h-32 object-cover rounded"
        />
        <h2 class="mt-2 text-lg font-semibold">{{ item.title }}</h2>
        <h3 class="mt-1 text-gray-700 font-medium">
          Price: {{ item.price }} € / 
          <span v-if="egldPrice">
            {{ calculatePackagePrice(item.price) }} EGLD
          </span>
        </h3>
        <button
          @click="addToCart({ id: index, title: item.title, image: item.image, price: item.price })"
          class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PachetGoldView",
  computed: {
    ...mapGetters(["egldPrice", "calculatePackagePrice"]), // Obține prețul EGLD și funcția de calcul
  },
  data() {
    return {
      shopItems: [
        { title: "Gold 100", image: "/Images/Gold 1.jpg", price: 5 },
        { title: "Gold 200", image: "/Images/Gold 2.jpg", price: 10 },
        { title: "Gold 500", image: "/Images/Gold 3.jpg", price: 15 },
        { title: "Gold 1000", image: "/Images/Gold 4.jpg", price: 100 },
        { title: "Gold 2000", image: "/Images/Gold 5.jpg", price: 200 },
      ],
    };
  },
  methods: {
    ...mapActions(["addToCart", "fetchEGLDPrice"]),
  },
  created() {
    this.fetchEGLDPrice(); // Obține prețul EGLD când componenta este creată
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  cursor: pointer;
}
</style>
