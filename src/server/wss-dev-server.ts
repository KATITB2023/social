import { loadEnvConfig } from "@next/env";
import { Server } from "socket.io";
import parser from "socket.io-msgpack-parser";
import {
  type SocketServer,
  getAdapter,
  setupSocket,
} from "~/server/socket/setup";
import { env } from "~/env.cjs";

// Load environment variables from .env before doing anything else
loadEnvConfig(process.cwd());

void (() => {
  const port = env.PORT;

  const io: SocketServer = new Server(port, {
    cors: {
      origin: env.NEXT_PUBLIC_API_URL,
      credentials: true,
    },
    parser,
    adapter: getAdapter(),
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log(`Connection (${io.engine.clientsCount})`);
    socket.once("disconnect", () => {
      console.log(`Connection (${io.engine.clientsCount})`);
    });
  });

  setupSocket(io);

  console.log(`WebSocket Server listening on ws://localhost:${port}`);

  // Start Schedule if Exist

  // On SIGTERM
  process.on("SIGTERM", () => {
    console.log("SIGTERM");

    // Stop Schedule if Exist

    // Close WebSocket Server
    io.close();
  });
})();
