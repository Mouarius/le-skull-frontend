import { reactive } from "vue";
export const store = {
  debug: true,
  state: reactive({
    room: {
      id: "",
      players: [],
    },
    player: {
      id: "",
      username: "",
      color: "",
      socket: "",
    },
  }),
  setRoomAction(newRoom) {
    if (this.debug) {
      console.log("[STORE] - Updating the room to :", newRoom);
    }
    this.state.room = newRoom;
  },
  setPlayerAction(newPlayer) {
    if (this.debug) {
      console.log("[STORE] - Updating the player to :", newPlayer);
    }
    this.state.player = newPlayer;
  },
};
