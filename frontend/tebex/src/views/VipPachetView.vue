<template>
    <div class="container mx-auto p-4">
      <!-- Secțiunea de sus cu fundal negru -->
      <div class="bg-black text-white py-6 px-4 flex items-center">
        <img
          src="/Images/vip.png"
          alt="VIP Logo"
          class="w-20 h-14 mr-4"
        />
        <div>
          <h1 class="text-3xl font-bold">VIP Packages</h1>
          <p class="text-gray-300">
            Choose your VIP subscription and enjoy exclusive benefits!
          </p>
        </div>
      </div>
  
      <!-- Lista pachetelor VIP -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <!-- Card Gold -->
        <router-link
          to="/redm/erebor/vip/vipgold"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition-all cursor-pointer"
        >
          <img
            src="/Images/gold.png"
            alt="Gold VIP Image"
            class="w-full h-32 object-cover rounded"
          />
          <h2 class="mt-2 text-lg font-semibold">Gold VIP</h2>
          <h3 class="mt-1 text-gray-700 font-medium">Price: 20 €</h3>
        </router-link>
  
        <!-- Card Silver -->
        <router-link
          to="/redm/erebor/vip/vipsilver"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition-all cursor-pointer"
        >
          <img
            src="/Images/silver.png"
            alt="Silver VIP Image"
            class="w-full h-32 object-cover rounded"
          />
          <h2 class="mt-2 text-lg font-semibold">Silver VIP</h2>
          <h3 class="mt-1 text-gray-700 font-medium">Price: 15 €</h3>
        </router-link>
  
        <!-- Card Bronze -->
        <router-link
          to="/redm/erebor/vip/vipbronze"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition-all cursor-pointer"
        >
          <img
            src="/Images/bronze.png"
            alt="Bronze VIP Image"
            class="w-full h-32 object-cover rounded"
          />
          <h2 class="mt-2 text-lg font-semibold">Bronze VIP</h2>
          <h3 class="mt-1 text-gray-700 font-medium">Price: 10 €</h3>
        </router-link>
  
        <!-- Card Costum Cal -->
        <router-link
          to="/redm/erebor/vip/costumcal"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition-all cursor-pointer"
        >
          <img
            src="/Images/calgeneral.png"
            alt="Costum Cal Image"
            class="w-full h-32 object-cover rounded"
          />
          <h2 class="mt-2 text-lg font-semibold">Costum cal</h2>
          <h3 class="mt-1 text-gray-700 font-medium">Price: 9 €</h3>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VipPachetView",
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  
  .bg-black {
    background-color: #000;
  }
  
  .router-link {
    text-decoration: none;
  }
  
  .router-link:hover {
    background-color: #f0f0f0;
  }
  </style>
  