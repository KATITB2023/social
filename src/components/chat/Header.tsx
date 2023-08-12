import { Flex, Avatar, Text, Image } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

interface HeaderProps {
  name: string | undefined;
  image: string | null | undefined;
  isTyping: boolean;
  isAnon: boolean;
  handleClick: () => void;
}

const Header = ({
  name,
  image,
  isTyping,
  isAnon,
  handleClick,
}: HeaderProps) => {
  const router = useRouter();
  return (
    <Flex
      flexDir={"column"}
      position={"relative"}
      alignItems={"center"}
      mx={"auto"}
      mt={"20px"}
      minH={"128px"}
      maxWidth={"450px"}
      w={"90%"}
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
        left={0}
        bottom={"10px"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Image
          cursor={"pointer"}
          onClick={() => {
            // router.back();
            handleClick();
          }}
          src="/components/chat_page/chat_backArrow.svg"
        />
        {name ? (
          <Flex>
            {isAnon || !image ? (
              <Avatar
                w={"35px"}
                h={"35px"}
                src="/components/anon_chat_page/anon_profile.svg"
              />
            ) : (
              <Avatar w={"35px"} h={"35px"} src={image} name={name}/>
            )}

            <Flex flexDirection="column" mx="5" justify="center">
              <Text
                color={"yellow.4"}
                fontSize="lg"
                fontWeight={700}
                textShadow={"0px 4px 20px #98F9FF80"}
                noOfLines={2}
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
