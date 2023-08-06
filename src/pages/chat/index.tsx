import {
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import { api } from "~/utils/api";
import Footer from "~/components/newchat/Footer";
import React, { useState } from "react";
import ChatPageHeader from "~/components/chat/ChatPageHeader";
import ExistingChat from "~/components/chat/ExistingChat";
import AddChatFromFriend from "~/components/chat/AddChatFromFriend";

const ChatHome: NextPage = () => {
  useSession({ required: true });

  const [currentAvailChatPage, setCurrentAvailChatPage] = useState(1);
  const availableChat = api.message.chatHeader.useQuery({
    limit: 10,
    page: currentAvailChatPage,
  });

  const [openAddChat, setOpenAddChat] = useState(false);

  const addChatHandler = () => {
    setOpenAddChat(!openAddChat);
  };

  return (
    <Layout title="Home">
      <div className="flex h-screen flex-col md:flex-row ">
        <div className="flex w-full flex-col">
          <Flex
            h="100vh"
            direction="column"
            position="relative"
            bg={
              openAddChat || availableChat.data?.length != 0
                ? "url(./addchatbg.svg)"
                : "url(./homechatbg.svg)"
            }
            alignItems="center"
          >
            <Navbar />

            {!openAddChat ? (
              <>
                {availableChat.data?.length == 0 ? (
                  <ChatPageHeader />
                ) : (
                  <ExistingChat data={availableChat.data} />
                )}
              </>
            ) : (
              <>
                <AddChatFromFriend data={[]} />
              </>
            )}

            {/* {(availableUsers.isLoading || availableChat.isLoading) && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="white"
                color="yellow.4"
                size="xl"
              />
            )} */}

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
