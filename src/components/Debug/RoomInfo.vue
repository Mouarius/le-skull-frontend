<template>
  <section class="info room-info">
    <h2>Room Info :</h2>
    <ul class="var-list">
      <li>
        id : <em>{{ sharedState.room.id }}</em>
      </li>
      <li>
        players :
        <ul class="player-list">
          <li v-for="player in sharedState.room.players" :key="player.id">
            <em>{{ player.username }}</em>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { store } from "../../store";
export default {
  name: "room-info",
  data() {
    return {
      sharedState: store.state,
    };
  },
};
</script>

<style lang="scss" scoped>
.room-info {
  margin-top: 18px;
}
.player-list {
  padding-left: 12px;
}
</style>
