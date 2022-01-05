<template>
  <section class="info player-info">
    <h2>Player Info :</h2>
    <ul class="var-list">
      <li>
        username : <em>{{ sharedState.player.username }}</em>
      </li>
      <li>
        id :<em>{{ sharedState.player.id }}</em>
      </li>
      <li>
        color :<em>{{ sharedState.player.color }}</em>
      </li>
    </ul>
  </section>
</template>

<script>
import { store } from "../../store";
export default {
  name: "player-info",
  data() {
    return {
      sharedState: store.state,
    };
  },
};
</script>
<style lang="scss"></style>
