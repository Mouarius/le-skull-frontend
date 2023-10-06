export interface SocketServerResponse {
  status: "SUCCESS" | "ERROR";
  data: unknown;
}

export interface Player {
  id: string;
  username: string;
  color: string;
  socketId: string;
}
export interface Room {
  id: string;
  players: Player[];
  status: string;
}

export interface JoinRoomResponse extends SocketServerResponse {
  data: {
    room: Room;
  };
}
export interface CreateRoomResponse extends SocketServerResponse {
  data: {
    room: Room;
  };
}
