<template>
  <div class="container">
    <h1>Le Skull</h1>
    <player-info :player="player"></player-info>
    <room-info :room="room" v-if="room !== {}" />
    <login-panel
      v-if="!player.id"
      :update-player="updatePlayer"
      :update-room="updateRoom"
    ></login-panel>
    <!-- <form @submit="handleFormSubmit">
      <input
        type="radio"
        id="input-player-color"
        value="red"
        v-model="player.color"
      />
      <input
        type="radio"
        id="input-player-color"
        value="orange"
        v-model="player.color"
      />
      <input
        type="radio"
        id="input-player-color"
        value="yellow"
        v-model="player.color"
      />
      <input type="submit" value="Join" />
    </form> -->
    <div class="control-panel center-panel card">
      <h2>Control Panel</h2>
      <div class="debug-panel debug-buttons">
        <ul>
          <li><button @click="handleHelloButton">hello</button></li>
          <li>
            <button
              @click="handleTestButton"
              name="test-button-user-list"
              value="user-list"
            >
              update user list
            </button>
          </li>
        </ul>
      </div>
      <div class="debug-panel debug-display">
        <ul class="user-list">
          <li v-for="user in users" :key="user.id">{{ user.username }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import LoginPanel from "./components/LoginPanel.vue";
import PlayerInfo from "./components/Debug/PlayerInfo.vue";
import axios from "axios";
import { API_URL } from "./config/env";
import RoomInfo from "./components/Debug/RoomInfo.vue";
const socket = io("http://localhost:4001");

export default {
  name: "App",
  components: { LoginPanel, PlayerInfo, RoomInfo },
  data() {
    return {
      players: [],
      users: [],
      player: {
        id: "",
        username: "",
        color: "",
        socket: "",
      },
      room: {},
    };
  },
  methods: {
    updatePlayer(newPlayer) {
      this.player.id = newPlayer.id;
      this.player.username = newPlayer.username;
    },
    updateRoom(newRoom) {
      this.room = newRoom;
    },
    handleHelloButton() {
      socket.emit("hello");
    },
    handleTestButton(e) {
      const button = e.target;
      if (button.value === "user-list") {
        console.log("🛠 TEST - Requesting the list of users");
        axios.get(API_URL + "/player/").then((res) => {
          console.log(res.data);
          this.users = res.data;
        });
      }
    },
  },
  created() {},
};
</script>

<style lang="scss">
body {
  font-family: "Public Sans", Arial, sans-serif;
}
h1 {
  font-size: 3em;
  font-weight: 600;
}
h2 {
  font-size: 1.2em;
  font-weight: 600;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5%;
}
.card {
  padding: 1.2em;
  border: solid black 3px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.control-panel {
  display: flex;
}
.control-panel h2 {
  flex: 0;
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
