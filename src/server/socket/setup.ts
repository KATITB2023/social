import { type Message, type RoomChat, type UserMatch } from "@prisma/client";
import { createAdapter } from "@socket.io/redis-adapter";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import type { Server, Socket } from "socket.io";
import { Redis } from "~/server/redis";
import {
  anonTypingEvent,
  anonymousMessageEvent,
  isTypingEvent,
  messageEvent,
  askRevealEvent,
} from "~/server/socket/events/message";
import {
  cancelMatchEvent,
  checkMatchEvent,
  endMatchEvent,
  findMatchEvent,
} from "~/server/socket/events/queue";
import type { ServerEventsResolver } from "~/server/socket/helper";
import { setupScheduleSocket } from "~/server/socket/schedule";
import { type UserQueue } from "~/server/types/message";

/**
 * @description server events are events that are emmited from the client to the server.
 * server event is created by calling `createEvent` function. After creating the event, add it to the `serverEvents` array.
 * The types will be inferred and showed up in useEmit on client.
 *
 * @summary
 * DONT FORGET TO ADD THE EVENT TO THIS ARRAY
 */
const serverEvents = [
  messageEvent,
  isTypingEvent,
  anonTypingEvent,
  findMatchEvent,
  endMatchEvent,
  cancelMatchEvent,
  checkMatchEvent,
  anonymousMessageEvent,
  askRevealEvent,
] as const;

/**
 * @description
 * This type is inferred from the `serverEvents` array.
 * From frontend, you can use `useEmit` hook to emit the event.
 * From backend, all of the events are created by using `createEvent` function.
 */
export type ClientToServerEvents = ServerEventsResolver<typeof serverEvents>;

/**
 * @description
 * This type must be manually created by server to make omit event to client.
 * Every event included in this type can be used by frontend using `useSubscription` hook.
 * From backend, types here are required so that server can do `io.emit` or `client.emit` to client.
 *
 * @example
 * ```ts
 * export type ServerToClientEvents = {
 *  hello: (name: string) => void;
 * };
 *
 * // frontend
 * const { data } = useSubscription("hello", (name: string) => {
 *   console.log(name);
 * });
 *
 * // backend
 * io.emit("hello", "world");
 * client.emit("hello", "world");
 * ```
 */
export type ServerToClientEvents = {
  hello: (name: string) => void;
  whoIsTyping: (data: string) => void;
  anonIsTyping: (data: string) => void;
  add: (post: Message) => void;
  match: (match: UserMatch) => void;
  endMatch: (match: UserMatch) => void;
  askReveal: (match: UserMatch, askReveal: boolean) => void;
};

interface InterServerEvents {
  ping: () => void;
}

/**
 * @description
 * This type is used to store data on socket client.
 *
 * @example
 * ```ts
 * const userId = client.data.session.user.id
 * ```
 */
export type SocketData<AuthRequired = false> = {
  session: AuthRequired extends true ? Session : Session | null;
  match: UserMatch | null;
  matchQueue: UserQueue | null;
  roomChat: Map<string, RoomChat>;
};

/**
 * @description
 * Socket io server. Can be used to emit event to all clients or to specific client.
 *
 * @example
 * ```ts
 * // emit to all clients
 * io.emit("hello", "world");
 *
 * // emit to specific client
 * io.to(client.id).emit("hello", "world");
 * ```
 */
export type SocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData<boolean>
>;

/**
 * @description
 * Socket io client connection on the server. Indicating client state on the server.
 * client.id is unique for each socket connection.
 *
 * @example
 * ```ts
 * // emit to the client
 * client.emit("hello", "world");
 * // above is equivalent to
 * io.to(client.id).emit("hello", "world");
 *
 * // emit to all clients except the client
 * client.broadcast.emit("hello", "world");
 * // above is equivalent to
 * io.except(client.id).emit("hello", "world");
 *
 * ```
 */
export type SocketClientInServer<AuthRequired = false> = Socket<
  never,
  ServerToClientEvents,
  InterServerEvents,
  SocketData<AuthRequired>
>;

export function setupSocket(io: SocketServer) {
  setupScheduleSocket(io);
  io.use((socket, next) => {
    getSession({ req: socket.request })
      .then((session) => {
        socket.data.session = session;
        next();
      })
      .catch(next);
  });

  io.use((socket, next) => {
    socket.data.match = null;
    socket.data.matchQueue = null;
    socket.data.roomChat = new Map<string, RoomChat>();
    next();
  });

  // Setup all socket events here
  io.on("connection", (socket) => {
    if (socket.data.session) {
      serverEvents.forEach((event) => event(io, socket));
      const userId = socket.data.session.user.id;

      void socket.join(userId);

      socket.on("disconnect", () => {
        void socket.leave(userId);
      });
    }
  });
}

export function getAdapter() {
  const redisClient = Redis.getClient();
  return createAdapter(redisClient.duplicate(), redisClient.duplicate());
}
