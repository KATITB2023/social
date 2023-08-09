import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import useEmit from "~/hooks/useEmit";

export const AnonMenu = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const endMatch = useEmit("endMatch");
  const handleEndMatch = () => {
    endMatch.mutate(undefined);
  };

  return (
    <>
      {/* Black overlay */}
      <Flex
        position={"fixed"}
        h={"full"}
        w={"full"}
        bg={"black"}
        opacity={0.5}
        top={0}
        left={0}
        zIndex={1}
      />

      <Flex
        backgroundColor={"#2D3648"}
        w={"375px"}
        position={"absolute"}
        flexDir={"column"}
        bottom={0}
        left={0}
        mx={"auto"}
        zIndex={2}
        gap={"16px"}
        px={"16px"}
        pt={"8px"}
        pb={"24px"}
        borderTopLeftRadius={"20px"}
        borderTopRightRadius={"20px"}
        boxShadow={"0px 4px 30px white"}
      >
        <Flex
          cursor={"pointer"}
          onClick={() => setOpen(false)}
          w={"full"}
          borderRadius={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          py={1}
          _hover={{ bgColor: "#4D5668" }}
        >
          <Flex
            my={2}
            minW={"49px"}
            minH={"8px"}
            bgColor={"#D9D9D9"}
            borderRadius={"20px"}
          />
        </Flex>

        <Flex
          cursor={"pointer"}
          gap={3}
          p={1.5}
          borderRadius={20}
          _hover={{ bgColor: "#4D5668" }}
          onClick={handleEndMatch}
        >
          <Text> &#128721; &nbsp; Stop Pembicaraan </Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          gap={3}
          p={1.5}
          borderRadius={20}
          _hover={{ bgColor: "#4D5668" }}
          // onClick={() => {}}
        >
          <Text> &#128680; &nbsp; Laporkan Teman </Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          gap={3}
          p={1.5}
          borderRadius={20}
          _hover={{ bgColor: "#4D5668" }}
          // onClick={() => {}}
        >
          <Text> &#128064; &nbsp; Minta Reveal Profile </Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          gap={3}
          p={1.5}
          borderRadius={20}
          _hover={{ bgColor: "#4D5668" }}
          // onClick={() => {}}
        >
          <Text> &#128220; &nbsp; Peraturan </Text>
        </Flex>
      </Flex>
    </>
  );
};
