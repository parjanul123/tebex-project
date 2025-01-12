<template>
  <div class="main-container">
    <!-- Secțiunea cu fundal negru -->
    <div class="bg-black text-white py-6 px-4 flex items-center">
      <img
        src="/Images/case.png"
        alt="Case VIP Logo"
        class="w-16 h-16 mr-4"
      />
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
      <div
        id="zoom-container"
        ref="zoomContainer"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @wheel="handleWheel"
      >
        <img
          id="map-image"
          src="/Images/rdr2-map.png"
          alt="Interactive Map"
          :style="{ transform: `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)` }"
        />
        <div class="zoom-controls">
          <button @click="zoomIn">Zoom In</button>
          <button @click="zoomOut">Zoom Out</button>
          <button @click="resetView">Reset</button>
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
      dragging: false, // Starea de drag
      lastMouseX: null, // Ultima poziție X a mouse-ului
      lastMouseY: null, // Ultima poziție Y a mouse-ului
      houses: [
        {
          id: 1,
          name: "Luxury Villa",
          price: 500000,
          image: "/Images/villa.jpg",
        },
        {
          id: 2,
          name: "Mountain Cabin",
          price: 250000,
          image: "/Images/cabin.jpg",
        },
        {
          id: 3,
          name: "Beach House",
          price: 750000,
          image: "/Images/beachhouse.jpg",
        },
      ],
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
    startDrag(event) {
      this.dragging = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    },
    drag(event) {
      if (!this.dragging) return;

      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;

      this.translateX += deltaX / this.zoomLevel;
      this.translateY += deltaY / this.zoomLevel;

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    },
    endDrag() {
      this.dragging = false;
    },
    selectHouse(house) {
      alert(`You selected the ${house.name}! Price: $${house.price}`);
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

/* Harta Leaflet */
#zoom-container {
  flex: 1;
  height: 800px; /* Înălțimea containerului */
  background-color: #e3d2b0; /* Culoare similară cu harta */
  overflow: hidden; /* Ascunde marginile imaginii la drag */
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Imaginea hărții */
#map-image {
  width: 100%;
  transition: transform 0.2s ease; /* Tranziție pentru zoom */
  cursor: grab; /* Iconiță pentru drag */
}

#map-image:active {
  cursor: grabbing; /* Iconiță pentru drag activ */
}

/* Controale pentru zoom */
.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.zoom-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.zoom-controls button:hover {
  background-color: #0056b3;
}

/* Controale săgeți */
.arrow-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.arrow-controls button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.arrow-controls button:hover {
  background-color: #218838;
}
</style> 