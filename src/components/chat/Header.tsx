import { Flex, Avatar, Text } from "@chakra-ui/react";

interface HeaderProps {
  name: string;
  isTyping: boolean;
}

const Header = ({ name, isTyping }: HeaderProps) => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        {isTyping && <Text color="green.500">Typing ...</Text>}
      </Flex>
    </Flex>
  );
};

export default Header;
