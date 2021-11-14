<template>
  <div class="login-form">
    <h2>login form</h2>
    <form @submit="handleLoginFormSubmit">
      <label for="input-username">username</label>
      <input
        type="text"
        name="input-username"
        id="input-username"
        v-model="playerInput.username"
        required
      />
      <label for="input-password">password</label>
      <input
        type="password"
        name="input-password"
        id="input-password"
        v-model="playerInput.password"
        required
      />
      <input type="submit" value="login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../config/variables";

export default {
  name: "login-form",
  props: ["player"],
  data() {
    return {
      playerInput: {
        username: "",
        password: "",
      },
      playerError: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLoginFormSubmit(e) {
      e.preventDefault();
      axios
        .post(`${BASE_URL}/login`, { ...this.playerInput })
        .then((res) => console.log(res));
    },
  },
};
</script>

<style scoped>
.login-form {
  border: solid black 1px;
}
</style>
