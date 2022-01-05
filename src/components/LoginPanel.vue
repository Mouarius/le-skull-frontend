<template>
  <div class="panel login-panel center-panel">
    <h2>login form</h2>
    <form class="login-form" @submit="handleLoginFormSubmit">
      <div class="username-input">
        <input
          type="text"
          name="input-username"
          id="input-username"
          v-model="inputUsername"
          placeholder="username"
          required
        />
      </div>
      <div class="submit-buttons">
        <input
          @click="handleCreateGameButton"
          type="button"
          value="create a room"
        />
        <p>or</p>
        <div class="join-room">
          <input
            type="text"
            name="room-id"
            id="input-room-id"
            v-model="inputRoomId"
            placeholder="room code"
          />
          <input
            @click="handleJoinGameButton"
            type="button"
            value="join a room"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../config/env";
import { joinRoom } from "../socket";
import { store } from "../store";

export default {
  name: "login-panel",
  props: ["updatePlayer"],
  data() {
    return {
      inputUsername: "",
      inputRoomId: "",
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
          console.log(res.data);
          this.updatePlayer(user);
          store.setRoomAction(room);
          joinRoom(room.id);
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
          joinRoom(room.id);
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
label {
  font-size: 0.8em;
  font-weight: 200;
  text-align: left;
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
  margin-top: 24px;
  text-align: center;
  .join-room {
    display: flex;
    flex-direction: column;
  }
}
</style>
