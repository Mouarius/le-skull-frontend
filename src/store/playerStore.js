import { defineStore } from "pinia";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    id: "",
    username: "",
    color: "",
    socket: "",
  }),
  actions: {
    updatePlayer(newPlayer) {
      this.id = newPlayer.id;
      this.username = newPlayer.username;
      this.color = newPlayer.color;
      this.socket = newPlayer.socket;
    },
  },
});
