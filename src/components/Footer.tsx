import {
  Center,
  Flex,
  Box,
  Image,
  Link,
  UnorderedList,
  HStack,
  VStack,
  Divider,
  Text,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      p={5}
      width="100%"
      backgroundSize="cover"
      backgroundImage={"/footer/foot-blur.png"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position={"relative"}
      justifyContent="center"
      alignItems="center"
      fontWeight="semibold"
      fontFamily="SomarRounded-Regular"
    >
      <Box
        w={"full"}
        h={"full"}
        position={"absolute"}
        top={0}
        left={0}
        bgColor={"black"}
      />
      <Image
        position={"absolute"}
        left={0}
        src="/footer/foot-bintangMini.png"
        draggable="false"
        loading="lazy"
      />

      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={1}
      >
        <Image
          src="/footer/foot-oskm.svg"
          width={"80%"}
          draggable="false"
          loading="lazy"
        />
        <Box w={"full"}>
          <HStack marginTop="33px" spacing={{ base: "51px", lg: "45px" }}>
            <VStack alignItems="left" spacing={{ base: "14px", lg: "45px" }}>
              <Link href="https://oskmitb.com/about-us" color="white" _hover={{ textDecoration: "none" }}>
                About Us
              </Link>
              <Link href="https://oskmitb.com/interactive-map" color="white" _hover={{ textDecoration: "none" }}>
                Interactive Map
              </Link>
            </VStack>
            <VStack alignItems="left" spacing={{ base: "14px", lg: "45px" }}>
              <Link href="https://oskmitb.com/merchandise" color="white" _hover={{ textDecoration: "none" }}>
                Merchandise
              </Link>
              <Link href="https://oskmitb.com/blog" color="white" _hover={{ textDecoration: "none" }}>
                Blog
              </Link>
            </VStack>
          </HStack>
        </Box>

        <Divider my="20px" />

        <Flex gap={"13px"} justifyContent={"start"} w={"full"}>
          <Link href="https://twitter.com/oskmitb" color="white">
            <Image
              src="/footer/foot-twitter.png"
              draggable="false"
              loading="lazy"
            />
          </Link>
          <Link href="https://www.instagram.com/oskm.itb/" color="white">
            <Image
              src="/footer/foot-instagram.png"
              draggable="false"
              loading="lazy"
            />
          </Link>
          <Link href="https://www.youtube.com/channel/UCmkkBEqwMZ1SEZN937pdpgA" color="white">
            <Image
              src="/footer/foot-youtube.png"
              draggable="false"
              loading="lazy"
            />
          </Link>
          {/* <Link href="/" color="white">
            <Image
              src="/footer/foot-linkedin.png"
              draggable="false"
              loading="lazy"
            />
          </Link> */}
        </Flex>

        <Box marginTop="22px" alignItems="left">
          <HStack>
            <Image
              src="/footer/foot-itb.png"
              draggable="false"
              loading="lazy"
            />
            <Box fontSize="12px" textAlign="left" color="white">
              <Text>ITB Kampus Jatinangor</Text>
              <Text maxW="250px">
                Jl. Let. Jen. Purn. Dr. (HC) Mashudi No. 1 Jatinangor, Kab.
                Sumedang, Jawa Barat Indonesia 45363
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
