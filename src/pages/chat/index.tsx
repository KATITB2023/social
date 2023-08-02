import {
  Flex,
  Heading,
  Image,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import { api } from "~/utils/api";

const ChatHome: NextPage = () => {
  useSession({ required: true });
  const availableUsers = api.message.availableUser.useQuery();

  return (
    <Layout title="Home">
      <div className="flex h-screen flex-col md:flex-row ">
        <div className="flex w-full flex-col">
          {availableUsers.isLoading ? <p>Loading</p> : <></>}
          <Tabs
            variant="unstyled"
            isFitted
            h="100vh"
            bg="url('./homechatbg.svg')"
            maxW="375px"
            position="relative"
          >
            <Navbar />
            <TabPanels h="90%">
              <TabPanel h="100%">
                <Flex h="100%" direction="column">
                  <Spacer />
                  <Image alt="maskot oskm" src="maskotglow.svg" />
                  <Heading
                    as="h3"
                    size="xl"
                    color="yellow.400"
                    textAlign="center"
                    fontWeight="normal"
                  >
                    TAMBAHIN PERCAKAPAN DULU YUK!
                  </Heading>
                  <Spacer />
                </Flex>
              </TabPanel>
              <TabPanel>
                <p>Tab 2 content goes here</p>
              </TabPanel>
              <TabPanel>
                <p>Tab 3 content goes here</p>
              </TabPanel>
            </TabPanels>
            <TabList
              mb="0px"
              h="10%"
              bg="#1A1422"
              color="gray.300"
              borderTopRadius="3xl"
            >
              <Tab _selected={{ color: "yellow.5" }}>
                Tab 1
                <BiMessageDetail />
              </Tab>
              <Tab _selected={{ color: "yellow.5" }}>Tab 2</Tab>
              <Tab _selected={{ color: "yellow.5" }}>Tab 3</Tab>
            </TabList>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ChatHome;
