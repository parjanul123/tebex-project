
<template>
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold mb-4">Gold VIP</h1>
        <p class="text-gray-700 mb-4">
          Package Description
Pachetul Aur iti oferta prioritate in queue nivel 1 si urmatoarele: 

- Carutele de la Bronz + Argint

- Un Cal Custom la alegere. Calul ales ramne pana moare dupa care poate fi schimbat cu altul.

- O caruta de vanatoare de 1200 sloturi si 40 animale

- Un balon Balon cu aer

- Salariu de 10$ + 0.7 Gold la fiecare 20 de minute.  
        </p>
        <h3 class="text-xl font-semibold mb-4">Price: 20 €</h3>
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
    name: "VipGoldView",
    methods: {
      subscribe() {
        alert("Te-ai abonat la Gold VIP!");
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
  