import { Container, Flex, Text, Image, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    setSelected(router.pathname.replace("/", ""));
  }, [router.pathname]);

  const handleClicked = (path: string) => {
    void router.push(`/${path}`);
  };

  return (
    <Flex
      width="100%"
      maxWidth="100vw"
      backgroundColor="#1A1422"
      height="80px"
      position="absolute"
      bottom={0}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
    >
      <Flex
        flexDirection="row"
        width="100%"
        maxW="100%"
        height="100%"
        justifyContent="center"
        paddingTop="8px"
        paddingBottom="8px"
        gap="8px"
      >
        <Box
          width={"30%"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="11px"
          style={{
            borderBottom: selected === "chat" ? "2px solid #FFFC83" : "",
          }}
          onClick={() => handleClicked("chat")}
          cursor={"pointer"}
        >
          <Image
            src={
              selected === "chat" ? "VectorChatYellow.svg" : "VectorChat.svg"
            }
            alt="Vector Chat"
            height="25px"
          />
          <Text
            fontSize="13px"
            fontWeight={500}
            lineHeight="12px"
            alignSelf="center"
            color={selected === "chat" ? "yellow.5" : "gray.300"}
          >
            Chat
          </Text>
        </Box>
        <Box
          width={"30%"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="11px"
          style={{
            borderBottom: selected === "match" ? "2px solid #FFFC83" : "",
          }}
          onClick={() => handleClicked("match")}
          cursor={"pointer"}
        >
          <Image
            src={
              selected === "match"
                ? "VectorFindMatchYellow.svg"
                : "VectorFindMatch.svg"
            }
            alt="Vector Chat"
            height="25px"
          />
          <Text
            fontSize="13px"
            fontWeight={500}
            lineHeight="12px"
            alignSelf="center"
            color={selected === "match" ? "yellow.5" : "gray.300"}
          >
            Find Match!
          </Text>
        </Box>
        <Box
          width={"30%"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="11px"
          onClick={() => handleClicked("history")}
          style={{
            borderBottom: selected === "history" ? "2px solid #FFFC83" : "",
          }}
          cursor={"pointer"}
        >
          <Image
            src={
              selected === "history"
                ? "VectorHistoryYellow.svg"
                : "VectorHistory.svg"
            }
            alt="Vector History"
            height="25px"
          />
          <Text
            fontSize="13px"
            fontWeight={500}
            lineHeight="12px"
            alignSelf="center"
            color={selected === "history" ? "yellow.5" : "gray.300"}
          >
            History
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
