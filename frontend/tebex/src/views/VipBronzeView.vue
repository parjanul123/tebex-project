
<template>
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold mb-4">Bronze VIP</h1>
        <p class="text-gray-700 mb-4">
          Pachetul Bronz iti oferta prioritate in queue nivel 3 si urmatoarele: 

-1 Cal  

- 1 Caruta de Vanatoare

-Salariu de 2$ + 0.2 Gold pe ora.
        </p>
        <h3 class="text-xl font-semibold mb-4">Price: 10 €</h3>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="subscribe"
        >
          Abonează-te
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VipBronzeView",
    methods: {
      subscribe() {
        alert("Te-ai abonat la Bronze VIP!");
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .bg-white {
    background-color: #fff;
  }
  </style>
  