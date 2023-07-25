import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface FooterProps {
  onSubmit: (text: string) => void;
}

const Footer = ({ onSubmit }: FooterProps) => {
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);
  const [text, setText] = useState<string>("");
  // const isTyping = useEmit("isTyping");

  const handleSubmit = (text: string) => {
    if (text !== "") {
      onSubmit(text);
      setText("");
    }
  };

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(false);

    if (event.key === "Enter" && enterToPostMessage) {
      handleSubmit(text);
    }

    // isTyping.mutate({ typing: true });
  };

  const onKeyUpCustom: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(true);
  };

  const onBlurCustom: React.FocusEventHandler<HTMLInputElement> = () => {
    setEnterToPostMessage(true);
    // isTyping.mutate({ typing: false });
  };

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
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
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        onClick={() => {
          handleSubmit(text);
        }}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
