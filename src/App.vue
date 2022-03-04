<template>
  <div class="container">
    <div class="page-title">
      <h1>Le Skull</h1>
      <div class="title-decoration"></div>
    </div>
    <DebugPanel />
    <LoginPanel v-if="!player.id" :update-player="updatePlayer"></LoginPanel>
    <LobbyPanel v-if="player.id"></LobbyPanel>
  </div>
</template>

<script setup>
import axios from "axios";
import { API_URL } from "./config/env";
import { store } from "./store";
import LoginPanel from "./components/LoginPanel.vue";
import LobbyPanel from "./components/LobbyPanel.vue";
import DebugPanel from "./components/Debug/DebugPanel.vue";
import { onMounted, reactive, ref } from "vue";

const players = ref([]);

const player = reactive({
  id: "",
  username: "",
  color: "",
  socket: "",
});

const sharedState = store.state;

function updatePlayer(newPlayer) {
  console.log("Update player");
  this.player.id = newPlayer.id;
  this.player.username = newPlayer.username;
  store.setPlayerAction(this.player);
}

function retrieveColorsList() {
  axios.get(API_URL + "/colors").then((res) => {
    //dispatch the list of colors to store
    //TODO : Validate the values
    store.setColorsAction(res.data);
  });
}

onMounted(() => {
  retrieveColorsList();
});
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100%;
  background: $light-grey;
  border: solid $primary 12px;
  font-family: "Public Sans", Arial, sans-serif;
}
.container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 30px 50px;
}
.panel {
  display: block;
  width: 100%;
  background-color: white;

  border: solid 4px $charcoal;
  padding: 12px;
  box-sizing: border-box;
  h1 {
    font-family: "Heebo", sans-serif;
    font-weight: 800;
    font-size: 1.8em;
    text-align: left;
  }
}
.page-title {
  position: relative;
  h1 {
    position: relative;
    font-family: "Heebo", sans-serif;
    color: $charcoal;
    font-size: 6em;
    font-weight: 900;
    z-index: 10;
  }
  .title-decoration {
    position: absolute;
    background: $primary;
    height: 32px;
    width: 100%;
    transform: translateX(12px) translateY(-38px);
    z-index: 1;
  }
}
h2 {
  font-size: 1.8em;
  font-weight: 600;
}
h3 {
  font-size: 1.2em;
  font-weight: 600;
}
.card {
  padding: 1.2em;
  border: solid black 3px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.center-panel {
  width: 100%;
  max-width: 400px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
