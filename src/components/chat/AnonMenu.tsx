import { Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useEmit from "~/hooks/useEmit";
import KamuYakin from "../PopupChat/KamuYakin";
import BerhasilRequest from "../PopupChat/BerhasilRequest";

export const AnonMenu = ({
  setOpen,
  setSender,
  isRevealed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSender: React.Dispatch<React.SetStateAction<boolean>>;
  isRevealed: boolean;
}) => {
  const endMatch = useEmit("endMatch");
  const askReveal = useEmit("askReveal");
  const [isKamuYakin, setKamuYakin] = useState(false);
  const [isBerhasilRequest, setBerhasilRequest] = useState(false);
  const toast = useToast();
  console.log(isRevealed);

  // End Match Handling
  const handleEndMatch = () => {
    setKamuYakin(true);
    setSender(true);
  };

  const handleAskReveal = () => {
    setBerhasilRequest(true);
    askReveal.mutate({ agree: true });
  };

  const closeAll = () => {
    setKamuYakin(false);
    setBerhasilRequest(false);
  }

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
        onClick={() => setOpen(false)}
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

        {!isRevealed && (
          <Flex
            cursor={"pointer"}
            gap={3}
            p={1.5}
            borderRadius={20}
            _hover={{ bgColor: "#4D5668" }}
            onClick={handleAskReveal}
          >
            <Text> &#128064; &nbsp; Minta Reveal Profile </Text>
          </Flex>
        )}

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

      {/* For Popup */}
      <Flex
        position={"fixed"}
        display={isKamuYakin || isBerhasilRequest ? "block" : "none"}
        w={"100vw"}
        h={"100vh"}
        top={0}
        left={0}
        zIndex={3}
      >
        <Flex
          position={"relative"}
          w={"full"}
          h={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* Black overlay */}
          <Flex
            position={"absolute"}
            w={"100vw"}
            h={"100vh"}
            bg={"black"}
            opacity={0.7}
            onClick={() => closeAll}
          />

          <Flex zIndex={4}>
            {isKamuYakin && (
              <KamuYakin setOpen={setKamuYakin} setSender={setSender} />
            )}
            {isBerhasilRequest && <BerhasilRequest setOpen={setBerhasilRequest} />}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
