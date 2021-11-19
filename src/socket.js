import { io } from "socket.io-client";

const socket = io("http://localhost:4001");

export const joinRoom = (roomId) => {
  console.log("Trying to join the socket room...");
  socket.emit("JOIN_ROOM", roomId, (response) => {
    console.log(response);
  });
};

socket.on("PLAYER_JOINED", (updatedRoom) => {
  //TODO Update the room object
  console.log("A new player has joined the room");
});

export default socket;
