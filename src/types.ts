export interface SocketServerResponse {
  status: "SUCCESS" | "ERROR";
  data: unknown;
}

export interface User {
  id?: string;
  username?: string;
  socketId?: string;
}

export interface Player extends User {
  color?: string;
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
