import React, { useState, useRef } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

const EhAdaApaNih = ({
  setOpen,
  onSubmit,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit : (text: string) => void;
}) => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    adjustTextAreaHeight();
  };

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
    setOpen(false);
  }

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <Flex
      display="inline-flex"
      padding="50px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="40px"
      borderRadius="20px"
      background="#1F1F2E"
      boxShadow="0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
    >
      <Text
        color="yellow.4"
        textAlign="center"
        fontFamily="SomarRounded-Bold"
        fontSize="32px"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="100%" /* 32px */
        letterSpacing="-0.32px"
      >
        Eh ada apa nih?
      </Text>
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="32px"
      >
        <Flex
          display="flex"
          padding="12px 20px"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          gap="12px"
          alignSelf="stretch"
          flexWrap="wrap"
          borderRadius="12px"
          background="gray.200"
          cursor="pointer"
        >
          <textarea
            ref={textAreaRef}
            rows={1}
            placeholder="| Ketik Laporanmu di sini."
            value={text}
            onChange={(e) => {
              handleInputChange(e);
            }}
            style={{
              height: "auto",
              overflowY: "hidden",
              width: "198px",
              maxHeight: "120px",
              border: "none",
              color: "var(--purple-purple-2, #4909B3)",
              fontFeatureSettings:
                "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
              fontFamily: "SomarRounded-Bold",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "150%" /* 24px */,
              resize: "none",
            }}
          />
        </Flex>
        <Button
          display="flex"
          padding="24px 32px"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          gap="12px"
          alignSelf="stretch"
          flexWrap="wrap"
          borderRadius="12px"
          background="yellow.5"
          cursor="pointer"
          onClick={handleSubmit}
        >
          <Text
            color="purple.4"
            textAlign="center"
            fontFamily="SomarRounded-Bold"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="150%" /* 24px */
          >
            Kirim!
          </Text>
        </Button>
        <Button
          display="flex"
          padding="24px 32px"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          gap="12px"
          alignSelf="stretch"
          flexWrap="wrap"
          borderRadius="12px"
          border="2px"
          borderColor="yellow.5"
          background="gray.600"
          cursor="pointer"
          onClick={() => setOpen(false)}
        >
          <Text
            color="yellow.5"
            fontFamily="SomarRounded-Bold"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="150%" /* 24px */
          >
            Gajadi lapor hehe
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default EhAdaApaNih;
