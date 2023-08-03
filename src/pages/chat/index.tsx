import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
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

const ChatHome: NextPage = () => {
  useSession({ required: true });
  const [openAddChat, setOpenAddChat] = useState(false);
  const availableUsers = api.message.availableUser.useQuery();

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
            justifyContent="center"
          >
            <Navbar />
            <Spacer />
            <Image
              alt="maskot oskm"
              src="maskotglow.svg"
              w="80%"
              hidden={openAddChat}
            />
            <Heading
              hidden={openAddChat}
              as="h3"
              size="lg"
              color="yellow.400"
              textAlign="center"
              fontWeight="normal"
              w="80%"
            >
              TAMBAHIN PERCAKAPAN DULU YUK!
            </Heading>
            <CardHomeChat >

            </CardHomeChat>
            <Spacer />
            <Spacer />
            {/* "addchatbg.svg" */}
            <IconButton
              isRound
              onClick={addChatHandler}
              variant="unstyled"
              aria-label="add chat"
              border="0"
              boxShadow="inset 0px -4px 12px 2px rgba(255,255,255,0.42), 0px 5px 15px 5px rgba(255,255,255,0.42)"
              icon={<Icon as={AiFillPlusCircle} boxSize="100%" />}
              color="yellow.400"
              boxSize="4rem"
              bottom="120px"
              right="20px"
              position="absolute"
              bg="transparent"
              p="0"
              _hover={{ color: "yellow.200" }}
              _active={{ color: "yellow.400" }}
            />
            <Footer />
          </Flex>
        </div>
      </div>
    </Layout>
  );
};

export default ChatHome;
