import { io } from "socket.io-client";
import { store } from "./store";

const socket = io("http://localhost:4001");

export const joinRoom = (playerId, roomId) => {
  console.log(`[SOCKET] ~ Trying to join the socket room : ${roomId}`);
  socket.emit("JOIN_ROOM", playerId, roomId, (response) => {
    console.log(`The server responded with :`, response);
  });
};

socket.on("PLAYER_JOINED", (player, updatedRoom) => {
  // response object is {playerWhoJoined, updatedRoom}
  console.log(`${player.username} has joined the room :`, updatedRoom);
  if (updatedRoom) {
    store.setRoomAction(updatedRoom);
  }
});
socket.on("PLAYER_LEFT", (player, updatedRoom) => {
  console.log(`${player.username} has left the room :`, updatedRoom);
  if (updatedRoom) {
    store.setRoomAction(updatedRoom);
  }
});

export default socket;
