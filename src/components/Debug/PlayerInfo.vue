<template>
  <section class="info player-info">
    <h2>Player Info :</h2>
    <ul class="var-list">
      <li>
        username : <em>{{ playerStore.username }}</em>
      </li>
      <li>
        id :<em>{{ playerStore.id }}</em>
      </li>
      <li>
        color :<em>{{ playerStore.color }}</em>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { usePlayerStore } from "../../store/playerStore";

const playerStore = usePlayerStore();
</script>
<style lang="scss"></style>
