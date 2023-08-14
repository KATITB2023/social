import { type Gender, type Message, type UserMatch } from "@prisma/client";

export enum ChatTopic {
  ITB = "ITB",
  JEPANG = "Jepang",
  KOREA = "Korea",
  FILM = "Film",
  BANDUNG = "Bandung",
  MAKANAN = "Makanan",
  MUSIK = "Musik",
  OLAHRAGA = "Olahraga",
  OSKM2023 = "OSKM 2023",
  PENGENCURHAT = "#PengenCurhat",
}

export interface AnonChatHeader {
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  userMatch: UserMatch;
}

export interface NonAnonChatHeader {
  lastMessage: Message;
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  unreadMessageCount: number;
}

export interface UserQueue {
  userId: string;
  isAnonymous: boolean;
  topic: ChatTopic;
  isFindingFriend: boolean;
  gender: Gender;
}

export enum AskRevealStatus {
  REJECTED,
  ASK,
  ACCEPTED,
}
