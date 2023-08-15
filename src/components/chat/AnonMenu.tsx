import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import useEmit from "~/hooks/useEmit";
import KamuYakin from "../PopupChat/KamuYakin";
import BerhasilRequest from "../PopupChat/BerhasilRequest";
import EhAdaApaNih from "../PopupChat/EhAdaApaNih";
import { AskRevealStatus } from "~/server/types/message";
import { Peraturan } from "../PopupChat/Peraturan";
import { api } from "~/utils/api";
import SatSetSatSet from "../PopupChat/SatSetSatSet";

export const AnonMenu = ({
  setOpen,
  setSender,
  isRevealed,
  partnerId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSender: React.Dispatch<React.SetStateAction<boolean>>;
  isRevealed: boolean;
  partnerId: string;
}) => {
  const askReveal = useEmit("askReveal");
  const [isKamuYakin, setKamuYakin] = useState(false);
  const [isBerhasilRequest, setBerhasilRequest] = useState(false);
  const [isEhAdaApaNih, setEhAdaApaNih] = useState(false);
  const [isPeraturan, setPeraturan] = useState(false);
  const [isSatSet, setSatSet] = useState(false);
  const reportMutation = api.message.reportUser.useMutation();

  const handleEndMatch = () => {
    setKamuYakin(true);
  };

  const handleAskReveal = () => {
    setBerhasilRequest(true);
    askReveal.mutate({ state: AskRevealStatus.ASK });
  };

  const handleReport = () => {
    setEhAdaApaNih(true);
  };

  const handleRules = () => {
    setPeraturan(true);
  };

  const closeAll = () => {
    setKamuYakin(false);
    setBerhasilRequest(false);
    setEhAdaApaNih(false);
    setPeraturan(false);
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
        cursor={"pointer"}
        onClick={() => setOpen(false)}
      />

      <Flex
        backgroundColor={"#2D3648"}
        marginX={"auto"}
        w={"full"}
        position={"absolute"}
        flexDir={"column"}
        bottom={0}
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
          onClick={handleReport}
        >
          <Text> &#128680; &nbsp; Stop dan Laporkan Teman </Text>
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
          onClick={handleRules}
        >
          <Text> &#128220; &nbsp; Peraturan </Text>
        </Flex>
      </Flex>

      {/* For Popup */}
      <Flex
        position={"fixed"}
        display={
          isKamuYakin || isBerhasilRequest || isEhAdaApaNih || isSatSet || isPeraturan
            ? "block"
            : "none"
        }
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
            onClick={closeAll}
            cursor={"pointer"}
          />

          <Flex zIndex={4}>
            {isKamuYakin && (
              <KamuYakin setOpen={setKamuYakin} setSender={setSender} />
            )}
            {isBerhasilRequest && (
              <BerhasilRequest setOpen={setBerhasilRequest} />
            )}
            {isEhAdaApaNih && (
              <EhAdaApaNih
                setOpen={setEhAdaApaNih}
                onSubmit={ (text) => {
                  setSatSet(true);
                  void reportMutation.mutateAsync({
                    message: text,
                    userId : partnerId,
                  });
                }}
                setOpenNextPopup={setSatSet}
                setSender={setSender}
              />
            )}
            {isSatSet && <SatSetSatSet setOpen={setSatSet} />}
            {isPeraturan && <Peraturan setOpen={setPeraturan} />}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
