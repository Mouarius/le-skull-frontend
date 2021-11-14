<template>
  <div class="app">
    <h1>Le Skull</h1>
    <login-form></login-form>
    <form @submit="handleFormSubmit">
      <input
        type="text"
        name="input-username"
        id="input-username"
        v-model="player.username"
      />
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
    </form>
    <h2>Control Panel</h2>
    <div class="control-panel">
      <div class="debug-panel debug-buttons">
        <ul>
          <li><button @click="handleHelloButton">hello</button></li>
          <li>
            <button
              @click="handleTestButton"
              name="test-button-player-list"
              value="player-list"
            >
              update player list
            </button>
          </li>
        </ul>
      </div>
      <div class="debug-panel debug-display">
        <ul class="player-list">
          <li v-for="player in players" :key="player.id">{{ player.id }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import LoginForm from "./components/LoginForm.vue";
const socket = io("http://localhost:4000");

export default {
  name: "App",
  components: { LoginForm },
  data() {
    return {
      players: [],
      player: {
        username: "",
        color: "",
        socket: "",
      },
    };
  },
  methods: {
    handleHelloButton() {
      console.log("hello");
      socket.emit("hello");
    },
    handleTestButton(e) {
      const button = e.target;
      if (button.value === "player-list") {
        console.log("🛠 TEST - Requesting the list of players");
        socket.emit("GET/PLAYER_LIST");
      }
    },
    handleFormSubmit(e) {
      e.preventDefault();
      joinGame(player);
    },
    joinGame(player) {
      console.log("Requesting to join the game :", this.player);
      socket.emit("REQUEST/JOIN_GAME", JSON.stringify(this.player));
    },
  },
  created() {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.on("GET/PLAYER_LIST/RESPONSE", (res) => {
      console.log(res);
      const newPlayers = JSON.parse(res);
      this.players = newPlayers;
    });
  },
};
</script>

<style>
ul {
  list-style-type: none;
}
.control-panel {
  display: flex;
}
.control-panel h2 {
  flex: 0;
}
</style>
