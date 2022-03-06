import { defineStore } from "pinia";

export const useRoomStore = defineStore("roomStore", {
  state: () => {
    return {
      id: "",
      players: [],
    };
  },
  actions: {
    setPlayers(players) {
      this.players = players;
    },
    setId(id) {
      this.id = id;
    },
    setRoom(newRoom) {
      this.players = newRoom.players;
      this.id = newRoom.id;
    },
  },
});
