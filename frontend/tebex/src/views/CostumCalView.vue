<template>
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold mb-4">Costum Cal</h1>
        <p class="text-gray-700 mb-4">
          Selectează modelul și culoarea calului preferat.
        </p>
        <h3 class="text-xl font-semibold mb-4">Price: 9 €</h3>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="openModal"
        >
          Select Model
        </button>
      </div>
  
      <!-- Modal pentru selectarea modelului -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-lg p-6 w-2/3">
          <h2 class="text-xl font-bold mb-4">Alege un model și o culoare pentru cal</h2>
  
          <!-- Modelele de cal -->
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(model, index) in horseModels"
              :key="index"
              class="relative flex flex-col items-center"
            >
              <input
                type="radio"
                :id="model.id"
                :value="model.id"
                v-model="selectedModel"
                class="mb-2"
              />
              <label :for="model.id" class="text-gray-700 font-medium">
                {{ model.name }}
              </label>
              <img
                :src="getHorseImage(model.id)"
                alt="Horse Model"
                class="w-32 h-32 object-cover rounded"
              />
            </div>
          </div>
  
          <!-- Selectarea culorii -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-2">Alege o culoare:</h3>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="color in predefinedColors"
                :key="color.name"
                :style="{ backgroundColor: color.code }"
                class="w-8 h-8 rounded cursor-pointer border border-gray-300"
                @click="selectColor(color.code)"
                :title="color.name"
              ></div>
            </div>
          </div>
  
          <!-- Butoane pentru finalizarea selecției -->
          <div class="mt-6 flex justify-end space-x-4">
            <button
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              @click="closeModal"
            >
              Renunță
            </button>
            <button
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              @click="addToCart"
              :disabled="!selectedModel"
            >
              Adaugă în Coș
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CostumCalView",
    data() {
      return {
        showModal: false, // Controlul afișării ferestrei modal
        selectedModel: null, // Modelul selectat
        selectedColor: "#FFFFFF", // Culoarea selectată (implicit Alb)
        horseModels: [
          {
            id: "model1",
            name: "Arabian",
            images: {
              "#FFFFFF": "/Images/arabianalb.jpg",
              "#808080": "/Images/arabiangri.jpg",
              "#000000": "/Images/arabiannegru.jpg",
              "#FF0000": "/Images/arabianrosu.jpg",
            },
          },
          {
            id: "model2",
            name: "Breton",
            images: {
              "#FFFFFF": "/Images/bretonalb.jpg",
              "#808080": "/Images/bretongri.jpg",
              "#000000": "/Images/bretonnegru.jpg",
              "#FF0000": "/Images/bretonrosu.jpg",
            },
          },
          {
            id: "model3",
            name: "Mustang",
            images: {
              "#FFFFFF": "/Images/mustangalb.jpg",
              "#808080": "/Images/mustanggri.jpg",
              "#000000": "/Images/mustangnegru.jpg",
              "#FF0000": "/Images/mustangrosu.jpg",
            },
          },
        ],
        predefinedColors: [
          { name: "Alb", code: "#FFFFFF" },
          { name: "Gri", code: "#808080" },
          { name: "Negru", code: "#000000" },
          { name: "Roșu", code: "#FF0000" },
        ],
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.selectedModel = null; // Resetează modelul selectat
        this.selectedColor = "#FFFFFF"; // Resetează culoarea selectată
      },
      selectColor(colorCode) {
        this.selectedColor = colorCode; // Setează culoarea selectată
      },
      getHorseImage(modelId) {
        const model = this.horseModels.find((m) => m.id === modelId);
        return model.images[this.selectedColor];
      },
      addToCart() {
        if (this.selectedModel) {
          const selectedHorse = this.horseModels.find(
            (m) => m.id === this.selectedModel
          );
          const selectedColorName = this.predefinedColors.find(
            (c) => c.code === this.selectedColor
          ).name;
          alert(
            `Ai adăugat în coș ${selectedHorse.name} cu culoarea ${selectedColorName}!`
          );
          this.closeModal();
        } else {
          alert("Te rog să selectezi un model și o culoare înainte de a continua!");
        }
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
  
  input[type="radio"] {
    cursor: pointer;
  }
  
  button {
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    cursor: pointer;
  }
  
  div[style] {
    transition: transform 0.3s ease;
  }
  
  div[style]:hover {
    transform: scale(1.2);
  }
  </style>
  