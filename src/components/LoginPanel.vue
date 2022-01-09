<template>
  <section class="panel login-panel center-panel">
    <h1>Login_</h1>
    <form class="login-form" @submit="handleLoginFormSubmit">
      <div class="username-input">
        <base-input
          name="input-username"
          id="input-username"
          v-model="inputUsername"
          :placeholder="'username'"
          required
        />
      </div>
      <div class="submit-buttons">
        <base-button :clickHandler="handleCreateGameButton"
          >create a room</base-button
        >
        <p>or</p>
        <div class="join-room">
          <base-input
            :placeholder="'room code'"
            v-model="inputRoomId"
            name="room-id"
            id="input-room-id"
          />

          <base-button :clickHandler="handleJoinGameButton"
            >join a room
          </base-button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { API_URL } from "../config/env";
import { joinRoom } from "../socket";
import { store } from "../store";
import BaseButton from "./Interface/BaseButton.vue";
import BaseInput from "./Interface/BaseInput.vue";

export default {
  name: "login-panel",
  props: ["updatePlayer"],
  components: { BaseButton, BaseInput },
  data() {
    return {
      inputUsername: "",
      inputRoomId: "",
      testValue: "",
      sharedState: store.state,
    };
  },
  methods: {
    handleCreateGameButton(e) {
      e.preventDefault();
      console.log("Creating a new game...");
      axios
        .post(API_URL + "/room/", { username: this.inputUsername })
        .then((res) => {
          const { room, user } = res.data;
          this.updatePlayer(user);
          store.setRoomAction(room);
          joinRoom(this.sharedState.player.id, room.id);
        });
    },
    handleJoinGameButton(e) {
      e.preventDefault();
      console.log(`Joining the game with id ${this.inputRoomId} ...`);
      axios
        .post(API_URL + `/room/${this.inputRoomId}`, {
          username: this.inputUsername,
        })
        .then((res) => {
          const { room, user } = res.data;
          this.updatePlayer(user);
          store.setRoomAction(room);
          joinRoom(this.sharedState.player.id, room.id);
        });
    },
    handleLoginFormSubmit(e) {
      e.preventDefault();
    },
    createRoom() {
      axios.post(API_URL + "/room", {});
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="button"] {
  background: white;
}
label {
  font-size: 0.8em;
  font-weight: 200;
  text-align: left;
}
.login-panel {
  margin-top: 12px;
}
.login-form {
  display: flex;
  flex-direction: column;
  .username-input {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }
}
.submit-buttons {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 12px;
  .join-room {
    display: flex;
    flex-direction: column;
  }
}
</style>
