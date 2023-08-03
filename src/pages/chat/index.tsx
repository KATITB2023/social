import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import { api } from "~/utils/api";
import Footer from "~/components/newchat/Footer";
import { useState } from "react";
import CardHomeChat from "~/components/chat/CardHomeChat";

const ChatHeader = () => {
  return (
    <>
      <Spacer />
      <Image alt="maskot oskm" src="maskotglow.svg" w="80%" />
      <Heading
        as="h3"
        size="lg"
        color="yellow.400"
        textAlign="center"
        fontWeight="normal"
        w="80%"
      >
        TAMBAHIN PERCAKAPAN DULU YUK!
      </Heading>
      <Spacer />
      <Spacer />
    </>
  );
};

const AddChatFromFriend = () => {
  interface cardAddChatFromFriendProps {
    name: string;
    src: string;
  }

  const CardAddChatFromFriend: React.FC<cardAddChatFromFriendProps> = ({
    name,
    src,
  }) => {
    return (
      <CardHomeChat>
        <HStack p="0" m="0" spacing={3}>
          <Avatar name={name} src={src} size="md" />
          <Text color="yellow.5" as="b">
            {name}
          </Text>
        </HStack>
      </CardHomeChat>
    );
  };
  return (
    <VStack spacing={5} w="100%" mt="11rem" maxH="60%" overflowY="auto">
      <CardAddChatFromFriend
        name="Dan Abrahmov 1"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 2"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
    </VStack>
  );
};

const ExistingChat = () => {
  interface CardExistingChatProps {
    name: string;
    src: string;
    text: string;
    count: number;
    time: Date;
  }

  const CardExistingChat: React.FC<CardExistingChatProps> = ({
    name,
    src,
    text,
    count,
    time,
  }) => {
    return (
      <CardHomeChat>
        <HStack p="0" m="0" spacing={3}>
          <Avatar name={name} src={src} size="md" />
          <Flex direction="column" justify="center" align="flex-start" w="100%">
            <Text color="yellow.5" fontSize={"16px"}>
              {name}
            </Text>
            <Text
              color="yellow.3"
              fontSize={"12px"}
              overflow={"hidden"}
              maxW="100%"
              maxH="2rem"
            >
              {text}
            </Text>
          </Flex>
          <Flex direction="column" justify="space-between" align="flex-end" h="100%" >
            <Text color="yellow.3" >
              {time.getHours()}.{time.getMinutes()}
            </Text>{" "}
        
            <Text color="yellow.5" bg="#E8553E" borderRadius="5px" p="2px 5px 0px 5px" >
              {count}
            </Text>
          </Flex>
        </HStack>
      </CardHomeChat>
    );
  };

  return (
    <VStack spacing={5} w="100%" mt="11rem" maxH="60%" overflowY="auto">
      <CardExistingChat
        name="ben ten 10"
        src="https://bit.ly/dan-abramov"
        text="test chat 2 asdasasd asdasdasd asdasdasd asdasdasd 1211212 1211212 1211212 asdasdasd"
        count={5}
        time={new Date("October 13, 2014 11:13:00")}
      />
    </VStack>
  );
};

const ChatHome: NextPage = () => {
  useSession({ required: true });
  const availableUsers = api.message.availableUser.useQuery();

  const [openAddChat, setOpenAddChat] = useState(false);
  const [availableChat, setAvailableChat] = useState(true);
  const addChatHandler = () => {
    setOpenAddChat(!openAddChat);
  };

  return (
    <Layout title="Home">
      <div className="flex h-screen flex-col md:flex-row ">
        <div className="flex w-full flex-col">
          {availableUsers.isLoading ? <p>Loading</p> : <></>}
          <Flex
            h="100vh"
            direction="column"
            position="relative"
            bg={openAddChat ? "url(./addchatbg.svg)" : "url(./homechatbg.svg)"}
            alignItems="center"
          >
            <Navbar />
            {!openAddChat && !availableChat && <ChatHeader />}
            {!openAddChat && availableChat && <ExistingChat />}
            {openAddChat && <AddChatFromFriend />}
            <IconButton
              isRound
              onClick={addChatHandler}
              variant="unstyled"
              aria-label="add chat"
              border="0"
              boxShadow="inset 0px -4px 12px 2px rgba(255,255,255,0.42), 0px 5px 15px 5px rgba(255,255,255,0.42)"
              icon={<Icon as={AiFillPlusCircle} boxSize="100%" />}
              color="yellow.3"
              boxSize="4rem"
              bottom="120px"
              right="20px"
              position="absolute"
              bg="transparent"
              p="0"
              _hover={{ color: "yellow.4" }}
              _active={{ color: "yellow.2" }}
            />
            <Footer />
          </Flex>
        </div>
      </div>
    </Layout>
  );
};

export default ChatHome;
