<template>
  <div id="lobby-panel" class="panel">
    <h1>Lobby_</h1>
    <div id="lobby-player-panel">
      <h2>Player settings</h2>
      <ul>
        <li>
          Your color :
          <span class="picked-color" :style="{ color: colorPicked.hex }">{{
            colorPicked.name
          }}</span>
        </li>
        <li>Your name : {{ sharedState.player.username }}</li>
      </ul>
      <h3>Select your color :</h3>
      <ul class="color-selector">
        <li v-for="(color, index) in sharedState.colors" :key="color.name">
          <input
            type="radio"
            name="color-selector"
            :id="`color-${index}`"
            :value="color"
            v-model="colorPicked"
          />
          <label :for="`color-${index}`">{{ color.name }}</label>
        </li>
      </ul>
    </div>
    <div id="lobby-players-list">
      <h2>Players in lobby</h2>
      <ul>
        <li>Player1</li>
        <li>Player2</li>
        <li>Player3</li>
        <li>Player4</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  name: "lobby-panel",
  data() {
    return {
      colorPicked: { name: "", hex: "#000000" },
      sharedState: store.state,
    };
  },
  watch: {
    colorPicked(newColor, lastColor) {
      //Ask the server if the color is available
      //Gets the response as a color object and dispatch to store the new color
    },
  },
};
</script>

<style lang="scss" scoped></style>
