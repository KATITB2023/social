import { Heading, Image, Spacer } from "@chakra-ui/react";

const ChatPageHeader = () => {
  return (
    <>
      <Spacer />
      <Image alt="maskot oskm" src="maskotglow.svg" w="80%" />
      <Heading
        as="h3"
        size="lg"
        color="yellow.400"
        textAlign="center"
        fontWeight="normal"
        w="80%"
      >
        TAMBAHIN PERCAKAPAN DULU YUK!
      </Heading>
      <Spacer />
      <Spacer />
    </>
  );
};

export default ChatPageHeader;