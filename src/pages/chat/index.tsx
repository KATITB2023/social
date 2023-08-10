import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import Footer from "~/components/newchat/Footer";
import React, { useState } from "react";
import ChatPageHeader from "~/components/chat/ChatPageHeader";
import ExistingChat from "~/components/chat/ExistingChat";
import AddChatFromFriend from "~/components/chat/AddChatFromFriend";
import Header from "~/components/chat/Header";
import {FUTUREFLAG} from "~/constant";
import ComingSoon from "~/components/screen/ComingSoon";

const ChatHome: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const [openAddChat, setOpenAddChat] = useState(false);
  const [isNoChat, setIsNoChat] = useState(true);
  if(!FUTUREFLAG) {
    return <ComingSoon />
  }
  const addChatHandler = () => {
    setOpenAddChat(!openAddChat);
  };

  const isNoChatHandler = (val: boolean) => {
    setIsNoChat(val);
  };

  return (
    <Layout title="Home">
      <Flex
        h="100vh"
        direction="column"
        position="relative"
        bg={openAddChat ? "url(./addchatbg.png)" : "url(./homechatbg.png)"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        alignItems="center"
      >
        {/* <Box position="absolute"> */}
          {!openAddChat && <Navbar/>}
          {openAddChat && (
            <Header
              name={undefined}
              image={undefined}
              isTyping={false}
              isAnon={false}
              handleClick={() => setOpenAddChat(!openAddChat)}
            />
          )}
        {/* </Box> */}

        <ChatPageHeader hidden={openAddChat || !isNoChat} />
        <AddChatFromFriend hidden={!openAddChat} />
        <ExistingChat
          hidden={openAddChat !== isNoChat}
          onNoChat={isNoChatHandler}
        />

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
          hidden={openAddChat}
        />
        <Footer />
      </Flex>
    </Layout>
  );
};

export default ChatHome;
