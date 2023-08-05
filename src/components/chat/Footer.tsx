import React, { useState } from "react";
import { Flex, Textarea, Image, Box } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import useEmit from "~/hooks/useEmit";

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
        gap={"10px"}
        boxShadow={"0px 4px 30px white"}
      >
        <Textarea
          as={ResizeTextarea}
          resize={"none"}
          minH={"69px"}
          maxH={"166px"}
          bg={"white"}
          color={"black"}
          placeholder="Type Something..."
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
      </Flex>
    </>
  );
};

export default Footer;
