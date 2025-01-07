<template>
  <div id="app" class="min-h-screen bg-gray-100 flex flex-col">
    <nav class="bg-white shadow-md">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
      >
        <!-- Logo -->
        <router-link
          to="/"
          class="text-lg font-bold text-gray-800 flex items-center"
        >
          <img
            src="https://imgur.com/XWNyS70.png"
            alt="Logo"
            class="h-8 mr-2"
          />
          <div>Tebex</div>
        </router-link>
        <div class="alignment">
          <!-- Butoane de navigare -->
          <router-link
            v-if="showLoginRegister"
            to="/login"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Login</router-link
          >
          <router-link
            v-if="showLoginRegister"
            to="/register"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Register</router-link
          >
          <router-link
            v-if="isLoggedIn"
            to="/profile"
            class="text-gray-600 hover:text-blue-500 mx-2"
            >Profile</router-link
          >
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="text-gray-600 hover:text-blue-500 mx-2"
          >
            Logout
          </button>

          <!-- Buton pentru Portofel MultiversX sau Buy EGLD -->
          <template v-if="walletConnected">
            <a
              href="https://xexchange.com/tokens/WEGLD-bd4d79?firstToken=USDC-c76f1f&secondToken=EGLD"
              target="_blank"
              class="bg-black text-white px-4 py-2 rounded flex items-center hover:bg-gray-800"
            >
              Buy EGLD
              <img
                src="/Images/Multiversx.png"
                alt="MultiversX Logo"
                class="w-6 h-6 ml-2"
              />
            </a>
          </template>
          <template v-else>
            <router-link
              to="/connect-wallet"
              class="bg-black text-white px-4 py-2 rounded flex items-center hover:bg-gray-800"
            >
              Connect MultiversX Wallet
              <img
                src="/Images/Multiversx.png"
                alt="MultiversX Logo"
                class="w-6 h-6 ml-2"
              />
            </router-link>
          </template>
        </div>
      </div>
    </nav>
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["count", "user", "walletConnected"]), // Include flag-ul walletConnected din Vuex
    isLoggedIn() {
      return !!this.user; // Check if user is logged in
    },
    showLoginRegister() {
      return this.$route.path !== "/" && this.$route.path.startsWith("/redm");
    },
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style>
/* Adaugă stiluri adiționale dacă este necesar */
.alignment {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
