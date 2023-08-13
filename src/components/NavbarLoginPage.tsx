import { Box, Flex, Image } from "@chakra-ui/react";

export const NavbarLoginPage = () => {
    return (
      <>
        {/* Make dummy box to have effect set 'sticky' because 'sticky' does not work */}
        <Flex
          position={"relative"}
          display={"block"}
          backgroundColor={"transparent"}
          h={"60px"}
          my={"20px"}
        />
  
        <Flex
          my={"20px"}
          mx={"auto"}
          top={0}
          position={"fixed"}
          insetX={0}
          zIndex={1}
          background="url('/navbarbg.png')"
          maxWidth={"450px"}
          w={"90%"}
          h="60px"
          borderRadius="50px"
          flexDir="row"
          alignItems="center"
          paddingY="2%"
          paddingX="22px"
          boxShadow="0px 0px 20px 0px #FFFC8366"
          transitionDuration={"0.3s"}
          transitionTimingFunction={"ease-in-out"}
        >
          <Box
            backgroundColor="#0B0A0A"
            opacity="0.6"
            borderRadius="50px"
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
          />
  
          <Image
            alt="Ekor"
            src="/ekor.svg"
            position="absolute"
            left="0"
            height="full"
            objectFit="cover"
            objectPosition="center"
            borderRadius="50px"
          />
  
          <Image
            objectFit="cover"
            objectPosition="center"
            src="/Vector.svg"
            alt="OSKM ITB"
            zIndex="2"
          />
        </Flex>
      </>
    );
  };