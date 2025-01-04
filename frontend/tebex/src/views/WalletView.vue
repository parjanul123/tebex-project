<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Connect Your MultiversX Wallet</h1>

    <!-- Câmp pentru introducerea adresei portofelului -->
    <div class="mb-4">
      <label for="walletAddress" class="block text-gray-700 font-medium mb-2">
        Enter your MultiversX Wallet Address:
      </label>
      <input
        type="text"
        id="walletAddress"
        v-model="walletAddress"
        class="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Enter your wallet address"
      />
    </div>

    <!-- Buton pentru salvarea portofelului -->
    <button
      @click="registerWallet"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Register Wallet
    </button>

    <!-- În caz că utilizatorul nu are portofel -->
    <div class="mt-4">
      <p class="text-gray-700">
        Don't have a MultiversX wallet?
        <a
          href="https://wallet.multiversx.com/"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          Click here to create one
        </a>.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      walletAddress: "", // Variabila pentru stocarea adresei portofelului
    };
  },
  methods: {
    ...mapActions(["connectWallet"]),
    registerWallet() {
      if (this.walletAddress.trim() === "") {
        alert("Please enter your wallet address!");
        return;
      }
      // Marcare portofel ca fiind conectat
      this.connectWallet(this.walletAddress);
      alert("Wallet address registered successfully!");
      this.$router.push("/"); // Navigăm înapoi la Home
    },
  },
};
</script>
