<template>
  <section class="panel login-panel center-panel">
    <h1>Login_</h1>
    <form class="login-form" @submit="handleLoginFormSubmit">
      <div class="username-input">
        <BaseInput
          name="input-username"
          id="input-username"
          v-model="inputUsername"
          :placeholder="'username'"
          required
        />
      </div>
      <div class="submit-buttons">
        <BaseButton :clickHandler="handleCreateGameButton"
          >create a room</BaseButton
        >
        <p>or</p>
        <div class="join-room">
          <BaseInput
            :placeholder="'room code'"
            v-model="inputRoomId"
            name="room-id"
            id="input-room-id"
          />

          <BaseButton :clickHandler="handleJoinGameButton"
            >join a room
          </BaseButton>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../config/env";
import { joinRoom } from "../socket";
import { usePlayerStore } from "../store/playerStore";
import { useRoomStore } from "../store/roomStore";
import BaseButton from "./Interface/BaseButton.vue";
import BaseInput from "./Interface/BaseInput.vue";

const inputUsername = ref("");
const inputRoomId = ref("");

const playerStore = usePlayerStore();
const roomStore = useRoomStore();

function handleCreateGameButton(e) {
  e.preventDefault();
  console.log("Creating a new game...");
  axios
    .post(API_URL + "/room/", { username: inputUsername.value })
    .then((res) => {
      const { room, user } = res.data;
      playerStore.updatePlayer(user);
      roomStore.setRoom(room);
      joinRoom(playerStore.id, room.id);
    });
}
function handleJoinGameButton(e) {
  e.preventDefault();
  console.log(`Joining the game with id ${this.inputRoomId} ...`);
  axios
    .post(API_URL + `/room/${inputRoomId.value}`, {
      username: inputUsername.value,
    })
    .then((res) => {
      const { room, user } = res.data;
      playerStore.updatePlayer(user);
      roomStore.setRoom(room);
      joinRoom(playerStore.id, room.id);
    });
}
function handleLoginFormSubmit(e) {
  e.preventDefault();
}
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
