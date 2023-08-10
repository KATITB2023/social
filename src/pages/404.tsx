import React from "react";
import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Layout from "~/layout";

const NotFound = () => {
  return (
    <Layout title={"Not found"}>
      <BackgroundAndNavbar>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="14px"
          mx="40px"
          my="140px"
        >
          <Image
            src="/404.svg"
            alt="404"
            height="100%"
            position="relative"
            minWidth="100%"
            width="100%"
          />
          <Heading size="H3" alignSelf="center">
            Ups!
          </Heading>
          <Heading size="SH4" alignSelf="center">
            Sepertinya kamu tersesat!
          </Heading>
          <Text
            fontFamily="body"
            fontSize="14px"
            marginBottom="8px"
            align="center"
          >
            Jangan khawatir, Voyagers! Kalian bisa kembali ke{" "}
            <Link color="#FE06BE" href="/">
              home
            </Link>{" "}
            atau kunjungi fitur menarik lainnya di bawah ini.
          </Text>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
};

export default NotFound;