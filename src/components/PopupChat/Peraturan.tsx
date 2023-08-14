import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";

export const Peraturan = () => {
  return (
    <Flex
      bg={"#1F1F2E"}
      borderRadius={"20px"}
      maxW={"450px"}
      w={"80%"}
      flexDir={"column"}
      gap={5}
      py={10}
      px={5}
      mx={"auto"}
    >
      <Text
        fontSize={"24px"}
        color={"yellow.5"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        {" "}
        Sebelum mulai percakapan yuk janji dulu!{" "}
      </Text>
      <Flex bg={"white"} p={3}>
        <Text color={"black"} borderRadius={"4px"} whiteSpace={"pre-line"}>
      {`1. Tidak boleh melakukan harassment
        2. Tidak boleh melakukan chat yang inappropriate
        3. Tidak boleh menyinggung SARA
        4. Menggunakan bahasa yang baik dan sopan
      `}
        </Text>
      </Flex>
      <Button bg={"yellow.5"}>
        {" "}
        <Text color={"purple.2"} fontWeight={"bold"}>
          {" "}
          Siap laksanakan!{" "}
        </Text>{" "}
      </Button>
    </Flex>
  );
};
