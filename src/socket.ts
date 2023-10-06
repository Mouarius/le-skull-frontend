import { io } from "socket.io-client";
import { CreateRoomResponse, JoinRoomResponse, Room } from "./types";
import { store } from "./store";

export class SocketClient {
  client;
  constructor() {
    const sessionId = localStorage.getItem("sessionId");
    this.client = io("http://localhost:4001", {
      auth: { username: "bibo", sessionId },
    });
    this.client.on("SESSION", (data: { sessionId: string; userId: string }) => {
      localStorage.setItem("sessionId", data.sessionId);
    });
    this.client.on("connect", () => {
      console.log("Successfully connected to the socket server.");
    });
    this.client.on("ROOM_UPDATED", (room: Room) => {
      console.log("Room updated");
      store.setRoomAction(room);
    });
  }

  async joinRoom(roomId: string) {
    console.log("Trying to join the socket room...");
    const response: JoinRoomResponse = await this.client
      .timeout(5000)
      .emitWithAck("JOIN_ROOM", roomId);
    if (response.status === "SUCCESS") {
      console.log(`Successfully joined the room ${response.data.room.id}`);
      store.setRoomAction(response.data.room);
    }
    return response;
  }

  async createRoom() {
    console.log("Creating room...");
    const response: CreateRoomResponse = await this.client
      .timeout(5000)
      .emitWithAck("CREATE_ROOM", "test");
    console.log(response);
    if (response.status == "SUCCESS") {
      console.log(`Successfully created the room ${response.data.room.id}`);
      store.setRoomAction(response.data.room);
    }
    return response;
  }
}

export const socketClient = new SocketClient();
