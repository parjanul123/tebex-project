
<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Upload Your Server Project</h1>
      <form @submit.prevent="handleUpload" class="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="serverName">
            Server Name
          </label>
          <input
            id="serverName"
            v-model="serverName"
            type="text"
            placeholder="Enter your server name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="serverDescription">
            Server Description
          </label>
          <textarea
            id="serverDescription"
            v-model="serverDescription"
            placeholder="Describe your server"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="serverFile">
            Server File
          </label>
          <input
            id="serverFile"
            type="file"
            @change="handleFileChange"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProjectUploadView",
    data() {
      return {
        serverName: "",
        serverDescription: "",
        serverFile: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.serverFile = event.target.files[0];
      },
      handleUpload() {
        if (this.serverName && this.serverDescription && this.serverFile) {
          alert(`Server uploaded: ${this.serverName}`);
          // Aici poți adăuga logica pentru a trimite datele către backend
        } else {
          alert("Please fill out all fields before submitting.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  