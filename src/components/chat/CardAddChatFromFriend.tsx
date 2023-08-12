import { Avatar, HStack, Text } from "@chakra-ui/react";
import CardHomeChat from "./CardHomeChat";

interface cardAddChatFromFriendProps {
  name: string;
  src: string;
  path: string;
}

const CardAddChatFromFriend: React.FC<cardAddChatFromFriendProps> = ({
  name,
  src,
  path,
}) => {
  return (
    <CardHomeChat path={path}>
      <HStack p="0" m="0" spacing={3}>
        <Avatar
          name={name}
          src={src}
          size="md"
          fontWeight="bold"
          pt="3px"
          fontSize="sm"
        />
        <Text color="yellow.5" as="b" overflow="hidden">
          {name}
        </Text>
      </HStack>
    </CardHomeChat>
  );
};

export default CardAddChatFromFriend;
