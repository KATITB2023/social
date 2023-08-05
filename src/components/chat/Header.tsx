import { Flex, Avatar, Text, Image } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

interface HeaderProps {
  name: string | undefined;
  isTyping: boolean;
}

const Header = ({ name, isTyping }: HeaderProps) => {
  const router = useRouter();
  return (
    <Flex
      flexDir={"column"}
      position={"relative"}
      alignItems={"center"}
      mx={"auto"}
      my={"20px"}
      h={"128px"}
      w={"343px"}
      bg={"#191624"}
      borderTopLeftRadius={"50px"}
      borderTopRightRadius={"50px"}
      borderBottomLeftRadius={"20px"}
      borderBottomRightRadius={"20px"}
      boxShadow="0px 4px 20px 0px #FFFC8366"
    >
      <Navbar />
      <Flex
        position={"absolute"}
        paddingX={"15px"}
        bottom={"10px"}
        left={0}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Image
          onClick={() => {
            router.back();
          }}
          src="/components/chat_page/chat_backArrow.svg"
        />
        {name ? (
          <Flex>
            <Avatar
              w={"35px"}
              h={"35px"}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Flex flexDirection="column" mx="5" justify="center">
              <Text
                color={"yellow.4"}
                fontSize="lg"
                fontWeight={700}
                textShadow={"0px 4px 20px #98F9FF80"}
              >
                {name}
              </Text>
              {isTyping && <Text color="green.500">Typing ...</Text>}
            </Flex>
          </Flex>
        ) : (
          <Flex>
            <Text
              color={"yellow.4"}
              fontSize="lg"
              fontWeight={700}
              textShadow={"0px 4px 20px #98F9FF80"}
            >
              Pilih Teman
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
