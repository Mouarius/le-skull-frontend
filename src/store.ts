import { reactive } from "vue";
import { Player, Room } from "./types";
export const store = {
  debug: true,
  state: reactive<{ room: Room; player: Player }>({
    room: {
      id: "",
      status: "UNINITIALIZED",
      players: [],
    },
    player: {
      id: "",
      username: "",
      color: "",
      socketId: "",
    },
  }),
  setRoomAction(newRoom: Room) {
    if (this.debug) {
      console.log("[STORE] - Updating the room to :", newRoom);
    }
    this.state.room = newRoom;
  },
  setPlayerAction(newPlayer: Player) {
    if (this.debug) {
      console.log("[STORE] - Updating the player to :", newPlayer);
    }
    this.state.player = newPlayer;
  },
};
