import { Heading, Image, Box} from "@chakra-ui/react";

interface ChatPageHeaderProps {
  hidden: boolean;
}

const ChatPageHeader: React.FC<ChatPageHeaderProps> = ({ hidden }) => {
  return (
    <Box
      display={"flex"}
      hidden={hidden}
      w={"80%"}
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image alt="Maskot_OSKM" src="/maskotglow.png" />
      <Heading
        as="h3"
        size="lg"
        color="yellow.400"
        textAlign="center"
        fontWeight="normal"
        position={"absolute"}
        bottom={0}
      >
        TAMBAHIN PERCAKAPAN DULU YUK!
      </Heading>
    </Box>
  );
};

export default ChatPageHeader;
