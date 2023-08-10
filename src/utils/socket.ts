import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import parser from "socket.io-msgpack-parser";
import { env } from "~/env.cjs";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "~/server/socket/setup";

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: SocketClient = io(env.NEXT_PUBLIC_WS_URL, {
  withCredentials: true,
  parser,
  transports: ["websocket"],
  autoConnect: false,
});
