import React, { useState } from "react";
import { Flex, Textarea, Image, Text } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import useEmit from "~/hooks/useEmit";
import { AnonMenu } from "./AnonMenu";

interface FooterProps {
  onSubmit: (text: string) => void;
  receiverId: string;
  isAnon: boolean;
  isAnonRevealed : boolean,
  setSender : React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const Footer = ({ onSubmit, receiverId, isAnon, isAnonRevealed, setSender }: FooterProps) => {
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
      event.preventDefault();
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
      {/* Anon Footer Menu */}
      {isAnon && (
        <Flex
          w={"full"}
          maxW={"25%"}
          cursor={"pointer"}
          bgColor={"white"}
          minH={"39px"}
          maxH={"166px"}
          border="none"
          borderRadius="10px"
          flexDir={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5px"}
          px={"10px"}
          py={"5px"}
          onClick={() => {
            setAnonMenuOpen(!anonMenuOpen);
          }}
        >
          <Image src="/components/anon_chat_page/anon_menu.png" />
          <Text color={"black"} size={"B4"} fontWeight={400}>
            {" "}
            Menu{" "}
          </Text>
        </Flex>
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
        sx={{
          "::-webkit-scrollbar": {
            width: "11px",
            position : "absolute",
            right : "5px"
          },
          "::-webkit-scrollbar-track": {
            background: "#2F2E2E",
            borderRadius: "5px",
            marginY : "10px",
            marginRight : "10px"
          },
          "::-webkit-scrollbar-thumb": {
            background: "purple.2",
            borderRadius: "5px",
          },
        }}
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

      {isAnon && anonMenuOpen && <AnonMenu setOpen={setAnonMenuOpen} setSender={setSender!} isRevealed={isAnonRevealed}/>}
    </Flex>
  );
};

export default Footer;
