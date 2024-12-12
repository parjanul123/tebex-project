<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shop</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        <button
          @click="
            addToCart({ id: index, title: item.title, image: item.image })
          "
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
  name: "HomeView",
  data() {
    return {
      shopItems: [
        {
          title: "Item 1",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Item 2",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Item 3",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Item 4",
          image: "https://via.placeholder.com/150",
        },
        {
          title: "Item 5",
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
