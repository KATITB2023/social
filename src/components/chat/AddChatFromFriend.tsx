import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import CardHomeChat from "./CardHomeChat";

interface addChatFromFriendProps {
  data: [] | undefined;
}

const AddChatFromFriend: React.FC<addChatFromFriendProps> = ({ data }) => {
  interface cardAddChatFromFriendProps {
    name: string;
    src: string;
  }

  const CardAddChatFromFriend: React.FC<cardAddChatFromFriendProps> = ({
    name,
    src,
  }) => {
    return (
      <CardHomeChat>
        <HStack p="0" m="0" spacing={3}>
          <Avatar name={name} src={src} size="md" />
          <Text color="yellow.5" as="b">
            {name}
          </Text>
        </HStack>
      </CardHomeChat>
    );
  };


  return (
    <VStack
      spacing={5}
      w="100%"
      mt="9rem"
      maxH="80%"
      overflowY="auto"
      pb="13vh"
      pt="3vh"
    >
      <CardAddChatFromFriend
        name="Dan Abrahmov 1"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 2"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 3"
        src="https://bit.ly/dan-abramov"
      />
      <CardAddChatFromFriend
        name="Dan Abrahmov 999"
        src="https://bit.ly/dan-abramov"
      />
    </VStack>
  );
};

export default AddChatFromFriend;