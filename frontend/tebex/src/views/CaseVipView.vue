<template>
  <div class="main-container">
    <!-- Secțiunea cu fundal negru -->
    <div class="bg-black text-white py-6 px-4 flex items-center">
      <img src="/Images/case.png" alt="Case VIP Logo" class="w-16 h-16 mr-4" />
      <div>
        <h1 class="text-3xl font-bold">Case VIP</h1>
        <p class="text-gray-300">Explore the most luxurious VIP houses!</p>
      </div>
    </div>

    <!-- Conținutul principal -->
    <div class="content-container">
      <!-- Bara laterală pentru case -->
      <div class="sidebar">
        <h2 class="text-lg font-bold mb-4">Available Houses</h2>
        <ul class="house-list">
          <li
            v-for="house in houses"
            :key="house.id"
            class="house-item"
            @click="selectHouse(house)"
          >
            <img :src="house.image" alt="House Image" class="house-image" />
            <div>
              <h3 class="text-md font-bold">{{ house.name }}</h3>
              <p class="text-gray-700">Price: {{ house.price }} $</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Container pentru harta interactivă -->
      <div class="map-and-sidebar">
        <div id="zoom-container" class="map-container">
          <div class="map-wrapper" :style="{ transform: `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)` }">
            <img
              src="/Images/rdr2-map.png"
              alt="Interactive Map"
              class="map-image"
            />
            <!-- Checkpoint pentru casa selectată -->
            <div
              v-if="selectedHouse"
              class="checkpoint"
              :style="{
                top: `${selectedHouse.coordinates.y}%`,
                left: `${selectedHouse.coordinates.x}%`,
              }"
            >
              🏠
            </div>
          </div>

          <!-- Controale pentru deplasare -->
          <div class="arrow-controls">
            <button @click="move('up')">⬆️</button>
            <button @click="move('left')">⬅️</button>
            <button @click="move('right')">➡️</button>
            <button @click="move('down')">⬇️</button>
          </div>

          <!-- Controale pentru zoom -->
          <div class="zoom-controls">
            <button @click="zoomIn">Zoom In</button>
            <button @click="zoomOut">Zoom Out</button>
            <button @click="resetView">Reset</button>
          </div>
        </div>

        <!-- Secțiunea din dreapta -->
        <div class="right-sidebar">
          <h2 class="text-lg font-bold mb-4">Selected House</h2>
          <div v-if="selectedHouse" class="selected-house">
            <img :src="selectedHouse.image" alt="Selected House" class="house-image-large" />
            <h3 class="text-md font-bold">{{ selectedHouse.name }}</h3>
            <p class="text-gray-700">Price: {{ selectedHouse.price }} $</p>
            <button class="subscribe-button" @click="completeOperation">
               Subscribe
            </button>
          </div>
          <div v-else class="no-selection">
            <p class="text-gray-500">No house selected. Please select a house.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaseVip",
  data() {
    return {
      zoomLevel: 1, // Nivelul de zoom
      translateX: 0, // Deplasare pe axa X
      translateY: 0, // Deplasare pe axa Y
      houses: [
        {
          id: 1,
          name: "Conac TumbleWeed",
          price: 16,
          image: "/Images/conactumbleweed.png",
          coordinates: { x: 13, y: 61 }, 
        },
        {
          id: 2,
          name: "Ferma 1",
          price: 25,
          image: "/Images/ferma 1.png",
          coordinates: { x: 65, y: 30 }, 
        },
        {
          id: 3,
          name: "Caliga Hall",
          price: 20,
          image: "/Images/caligahall.png",
          coordinates: { x: 74, y: 48}, 
        },
      ],
      selectedHouse: null, // Casa selectată
    };
  },
  methods: {
    zoomIn() {
      if (this.zoomLevel < 4) this.zoomLevel += 0.2;
    },
    zoomOut() {
      if (this.zoomLevel > 1) this.zoomLevel -= 0.2;
    },
    resetView() {
      this.zoomLevel = 1;
      this.translateX = 0;
      this.translateY = 0;
    },
    selectHouse(house) {
      this.selectedHouse = house;
    },
    completeOperation() {
      if (this.selectedHouse) {
        alert(`Operation completed for ${this.selectedHouse.name}!`);
      } else {
        alert("No house selected. Please select a house first.");
      }
    },
    move(direction) {
      const step = 10; // Magnitudinea deplasării
      if (direction === "up") this.translateY -= step / this.zoomLevel;
      if (direction === "down") this.translateY += step / this.zoomLevel;
      if (direction === "left") this.translateX -= step / this.zoomLevel;
      if (direction === "right") this.translateX += step / this.zoomLevel;
    },
  },
};
</script>

<style scoped>
/* Fundal negru pentru titlu */
.bg-black {
  background-color: #000;
}

/* Containerul principal */
.main-container {
  display: flex;
  flex-direction: column;
}

/* Conținutul principal */
.content-container {
  display: flex;
  margin-top: 20px;
}

.map-and-sidebar {
  display: flex;
  flex: 1;
}

/* Bara laterală */
.sidebar {
  width: 300px;
  background-color: #f9f9f9;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.house-list {
  list-style: none;
  padding: 0;
}

.house-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.house-item:hover {
  background-color: #f0f0f0;
}

.house-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 4px;
}

.house-image-large {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
}

.no-selection {
  text-align: center;
  color: #999;
}

/* Harta interactivă */
.map-container {
  flex: 3; /* Ocupă 3/4 din spațiu */
  height: 800px; /* Înălțimea containerului */
  position: relative;
  background-color: #e3d2b0; /* Culoare similară cu harta */
  border-radius: 8px;
  overflow: hidden;
}

.map-wrapper {
  position: relative;
  height: 100%;
}

.map-image {
  width: 100%;
}

.checkpoint {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 20px;
  cursor: pointer;
}

.zoom-controls,
.arrow-controls {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 10px;
}

.zoom-controls {
  right: 20px;
}

.arrow-controls {
  left: 20px;
  flex-direction: column;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Secțiunea din dreapta */
.right-sidebar {
  flex: 1; /* Ocupă 1/4 din spațiu */
  background-color: #f9f9f9;
  padding: 20px;
  border-left: 1px solid #ddd;
}
</style>
