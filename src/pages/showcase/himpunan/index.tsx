import React, { useState } from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import SearchedHMJ from "~/components/listpage/SearchedHMJ";
import Fakultas from "~/components/listpage/Fakultas";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Accordion,
} from "@chakra-ui/react";

import TextInput from "~/components/friends/TextInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import ListPage from "~/components/listpage/ListPage";

export const getServerSideProps = withSession({ force: true });

export default function HimpunanPage() {
  const router = useRouter();
  const { data, isFetching } = api.showcase.getGroups.useQuery({
    lembaga: "HMJ",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useSession({ required: true });
  return (
    <Layout title="Himpunan">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title="Himpunan" withbackbutton={true} lembaga="HMJ"/>
        <Flex
          w={"full"}
          alignItems={"center"}
          flexDirection={"column"}
          position={"relative"}
          px={"25px"}
          gap="25px"
          pt={"50px"}
        >
          <Button
            onClick={() => router.back()}
            bgColor={"transparent"}
            position={"absolute"}
            top={0}
            left={3}
            borderRadius={"full"}
            width={10}
            height={10}
            padding={0}
          >
            <Image src="/backbutton-logo.svg" alt="Back button" />
          </Button>

          {/* Page title */}
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
              textAlign={"center"}
            >
              Himpunan
            </Heading>
          </Flex>

          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
          />
          {searchQuery == "" && data ? (
            <Accordion
              width={"full"}
              paddingY={2}
              defaultIndex={[0]}
              allowMultiple
            >
              {isFetching ? (
                <Text align={"center"}>Loading ...</Text>
              ) : (
                data?.map((group, index) => (
                  <Fakultas key={index} title={group} />
                ))
              )}
            </Accordion>
          ) : (
            <SearchedHMJ searchQuery={searchQuery} />
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
