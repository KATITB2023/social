import { type Feed as BaseFeed } from "@prisma/client";

export interface Feed extends BaseFeed {
  reactions: {
    [k: string]: {
      count: number;
      reacted: boolean;
    };
  };
  read: boolean;
}
