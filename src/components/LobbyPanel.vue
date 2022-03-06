<template>
  <div id="lobby-panel" class="panel">
    <h1>Lobby_</h1>
    <div id="lobby-player-panel">
      <h2>Player settings</h2>
      <ul>
        <li>
          Your color :
          <span class="picked-color" :style="{ color: pickedColor.hex }">{{
            pickedColor.name
          }}</span>
        </li>
        <li>Your name : {{ playerStore.username }}</li>
      </ul>
      <h3>Select your color :</h3>
      <ul class="color-selector">
        <li v-for="(color, index) in store.colors" :key="color.name">
          <input
            type="radio"
            name="color-selector"
            :id="`color-${index}`"
            :value="color"
            v-model="pickedColor"
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

<script setup>
import { ref } from "vue";
import { useStore } from "../store/mainStore";
import { usePlayerStore } from "../store/playerStore";

const pickedColor = ref({});
const store = useStore();
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped></style>
