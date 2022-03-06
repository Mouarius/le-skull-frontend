<template>
  <div class="debug-panel panel">
    <h1>Debug_</h1>
    <div class="info-container">
      <PlayerInfo />
      <RoomInfo />
    </div>
  </div>
</template>

<script setup>
import PlayerInfo from "./PlayerInfo.vue";
import RoomInfo from "./RoomInfo.vue";
</script>

<style lang="scss">
.debug-panel {
  width: 80%;
  .info-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
section.info {
  margin-top: 12px;
  h2 {
    font-size: 1.3em;
  }
  ul.var-list {
    padding-left: 12px;
    margin-top: 6px;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
    em {
      font-weight: 200;
      font-size: 1em;
    }
  }
}
</style>
