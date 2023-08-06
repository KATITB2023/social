import React, { useState } from "react";
import {
  Flex,
  Textarea,
  Image,
  Slide,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import useEmit from "~/hooks/useEmit";
import AnonFooterMenu from "./AnonFooterMenu";

interface FooterProps {
  onSubmit: (text: string) => void;
  receiverId: string;
  isAnon: boolean;
}

const Footer = ({ onSubmit, receiverId, isAnon }: FooterProps) => {
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);
  const [text, setText] = useState<string>("");
  const clientEvent = isAnon ? "anonTyping" : "isTyping";
  const isTyping = useEmit(clientEvent);
  const [anonMenuOpen, setAnonMenuOpen] = useState(false);

  const handleSubmit = (text: string) => {
    if (text !== "") {
      onSubmit(text);
      setText("");
    }
  };

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(false);

    if (event.key === "Enter" && enterToPostMessage) {
      handleSubmit(text);
    }

    isTyping.mutate({ typing: true, receiverId });
  };

  const onKeyUpCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(true);
  };

  const onBlurCustom: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    setEnterToPostMessage(true);
    isTyping.mutate({ typing: false, receiverId });
  };

  return (
    <>
      <Flex
        w="100%"
        backgroundColor={"#1A1422"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingX={"10px"}
        paddingY={"15px"}
        borderTopLeftRadius={"10px"}
        borderTopRightRadius={"10px"}
        position={"relative"}
        gap={"10px"}
        boxShadow={"0px 4px 30px white"}
      >
        {isAnon && (
          <AnonFooterMenu
            menuOpen={anonMenuOpen}
            setMenuOpen={setAnonMenuOpen}
          />
        )}
        <Textarea
          w={"full"}
          as={ResizeTextarea}
          resize={"none"}
          minH={"39px"}
          maxH={"166px"}
          bg={"white"}
          color={"black"}
          placeholder="Ketik Pesan Anda..."
          border="none"
          borderRadius="10px"
          _focus={{
            border: "1px solid black",
          }}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDownCustom}
          onKeyUp={onKeyUpCustom}
          onBlur={onBlurCustom}
        />

        <Image
          cursor={"pointer"}
          display={text.length === 0 ? "none" : "block"}
          src="/components/chat_page/chat_submit.svg"
          borderRadius="full"
          padding={1.5}
          _hover={{
            bg: "gray.500",
          }}
          onClick={() => {
            handleSubmit(text);
          }}
        />

        {isAnon && (
          <Slide direction="bottom" in={anonMenuOpen}>
            <Flex
              backgroundColor={"#2D3648"}
              w={"375px"}
              position={"absolute"}
              flexDir={"column"}
              bottom={0}
              // left={0}
              // zIndex={-1}
              gap={"16px"}
              px={"16px"}
              pt={"8px"}
              pb={"24px"}
              borderTopLeftRadius={"20px"}
              borderTopRightRadius={"20px"}
            >
              <Flex
                cursor={"pointer"}
                onClick={() => setAnonMenuOpen(false)}
                w={"full"}
                borderRadius={"full"}
                justifyContent={"center"}
                alignItems={"center"}
                py={"2px"}
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

              <Flex cursor={"pointer"}>
                <Text> Stop Pembicaraan </Text>
              </Flex>

              <Flex cursor={"pointer"}>
                <Text> Laporkan Teman </Text>
              </Flex>

              <Flex cursor={"pointer"}>
                <Text> Minta Reveal Profile </Text>
              </Flex>

              <Flex cursor={"pointer"}>
                <Text> Peraturan </Text>
              </Flex>
            </Flex>
          </Slide>
        )}
      </Flex>
    </>
  );
};

export default Footer;
