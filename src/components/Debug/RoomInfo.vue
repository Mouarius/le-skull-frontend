<template>
  <section class="info room-info">
    <h2>Room Info :</h2>
    <ul class="var-list">
      <li>
        id : <em>{{ roomStore.id }}</em>
      </li>
      <li>
        players :
        <ul class="player-list">
          <li v-for="player in roomStore.players" :key="player.id">
            <em>{{ player.username }}</em>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useRoomStore } from "../../store/roomStore";

const roomStore = useRoomStore();
</script>

<style lang="scss" scoped>
.player-list {
  padding-left: 12px;
}
</style>
