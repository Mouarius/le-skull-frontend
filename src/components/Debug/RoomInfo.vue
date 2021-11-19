<template>
  <div>
    <h2>Room Info :</h2>
    <ul>
      <li>id : {{ room.id }}</li>
      <li>
        players :
        <ul>
          <li v-for="player in room.players" :key="player.id">
            {{ player.username }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "room-info",
  props: ["room"],
};
</script>
