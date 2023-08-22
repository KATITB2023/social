import { Server } from "socket.io";
import parser from "socket.io-msgpack-parser";
import { env } from "~/env.cjs";
import {
  type SocketServer,
  getAdapter,
  setupSocket,
} from "~/server/socket/setup";
import { updatePinPerUnitSchedule } from "~/server/cron-job/update-pin-per-unit";

void (() => {
  const port = parseInt(process.env.PORT || "3001", 10);

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

  // Start Schedule
  updatePinPerUnitSchedule.start();

  // On SIGTERM
  process.on("SIGTERM", () => {
    console.log("SIGTERM");

    // Stop Schedule
    updatePinPerUnitSchedule.stop();

    // Close WebSocket Server
    io.close();
  });
})();
