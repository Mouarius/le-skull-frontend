import { io } from "socket.io-client";
import { CreateRoomResponse, JoinRoomResponse, Player, Room } from "./types";
import { store } from "./store";

const SOCKET_URL = "http://localhost:4001";
type SocketSessionData = { sessionId: string; userId: string; username?: string } ;

export class SocketClient {
  client: any;
  username: string | null;
  sessionId: string | null;

  constructor() {
    this.sessionId = localStorage.getItem("sessionId");
    this.username = null;
    this.client = null;
  }

  init(callback: (data:SocketSessionData) => any) {
    this.sessionId = localStorage.getItem("sessionId");
    this.client = io(SOCKET_URL, { auth: { sessionId: this.sessionId } });
    this.client.on(
      "SESSION",
      (data: SocketSessionData) => {
        localStorage.setItem("sessionId", data.sessionId);
        callback(data);
      },
    );
  }

  async updatePlayer(player: Player){
    try{
      const response = await this.client.timeout(5000).emitWithAck("UPDATE_USER", player)
      console.log(response)
    }catch(e){
      console.log(e)
    }
  }

  async updateUsername(username: string){
    await this.updatePlayer({username: username})
  }

  async connect(username: string) {
    this.username = username;
    this.client = io("http://localhost:4001", {
      auth: { username: this.username, sessionId: this.sessionId },
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
    if (!this.username) throw new Error("Invalid or missing username");
    const response: CreateRoomResponse = await this.client
      .timeout(5000)
      .emitWithAck("CREATE_ROOM", this.username);
    console.log(response);
    if (response.status == "SUCCESS") {
      console.log(`Successfully created the room ${response.data.room.id}`);
      store.setRoomAction(response.data.room);
    }
    return response;
  }
}
export const socketClient = new SocketClient();
