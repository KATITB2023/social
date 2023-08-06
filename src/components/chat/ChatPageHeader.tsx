import { Heading, Image, Spacer } from "@chakra-ui/react";

interface ChatPageHeaderProps {
  hidden: boolean;
}

const ChatPageHeader : React.FC<ChatPageHeaderProps> = ({ hidden }) => {
  return (
    <>
      <Spacer />
      <Image alt="maskot oskm" src="maskotglow.svg" w="80%" hidden={hidden} />
      <Heading
        as="h3"
        size="lg"
        color="yellow.400"
        textAlign="center"
        fontWeight="normal"
        w="80%"
        hidden={hidden}
      >
        TAMBAHIN PERCAKAPAN DULU YUK!
      </Heading>
      <Spacer />
      <Spacer />
    </>
  );
};

export default ChatPageHeader;