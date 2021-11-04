<template>
  <div class="app">
    <h1>Le Skull</h1>
    <button @click="handleConnectButton">connect</button>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  name: "App",
  methods: {
    handleConnectButton() {
      console.log("connect");
    },
  },
  created() {
    const socket = io("http://localhost:4000");
    socket.on("connect", (socket) => {
      console.log("Connected to the server");
    });
  },
};
</script>

<style></style>
