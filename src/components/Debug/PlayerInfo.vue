<template>
  <div>
    <h2>Player Info :</h2>
    <ul>
      <li>username : {{ player.username }}</li>
      <li>id : {{ player.id }}</li>
      <li>color : {{ player.color }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "player-info",
  props: ["player"],
};
</script>
