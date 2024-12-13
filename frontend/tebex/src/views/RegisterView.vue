<template>
  <div>
    <form @submit.prevent="registerUser" class="form-container">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch("http://localhost:3500/api/register", {
          // Change this line
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        if (response.ok) {
          alert("User registered successfully!");
          this.username = "";
          this.email = "";
          this.password = "";
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error during registration:", err);
        alert("Something went wrong. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Stiluri personalizate */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Spațiere între elemente */
  max-width: 300px; /* Lățime maximă */
  margin: 0 auto; /* Centrare pe pagină */
}

input,
button {
  padding: 0.5rem; /* Adaugă spațiu în interior */
  font-size: 1rem; /* Dimensiunea textului */
  border: 1px solid #ccc; /* Adaugă un contur */
  border-radius: 5px; /* Rotunjire colțuri */
}

button {
  background-color: #007bff; /* Culoare buton */
  color: rgb(255, 255, 255); /* Text alb */
  cursor: pointer; /* Cursor pointer pentru hover */
}

button:hover {
  background-color: #0056b3; /* Culoare la hover */
}
</style>
