import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useState } from "react";

const CardItem = () => {
    const [berhasilPopup, setBerhasilPopup] = useState(false);
    return (
        <>
        <Box
              w="45%"
              p={4}
              borderRadius={16}
              border="0.50px #EABFFF solid"
              backgroundImage="linear-gradient(207deg, rgba(118.43, 95.94, 182.75, 0.93) 0%, rgba(204.99, 97.55, 207.19, 0.93) 46%, rgba(58.19, 48.70, 60.56, 0.93) 100%), radial-gradient(43.45% 36.33% at 31.24% 29.39%, rgba(164.69, 238.74, 255, 0.20) 0%, rgba(109.97, 190.80, 244.37, 0.04) 77%, rgba(69.95, 144.07, 212.50, 0) 100%)"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={3}
            >
              <Flex
                w={"100%"}
                h={"50%"}
                position="relative"
                background="#FFFC83"
                borderRadius={12}
                justifyContent={"center"}
              >
                <Image
                  src="/components/merch/bigmug.png"
                />
                <Button
                  position={"absolute"}
                  top={0} 
                  right={0}
                  variant="unstyled"
                  padding={0}
                  alignItems={"flex-end"}
                  onClick={() => setBerhasilPopup(true)}
                  >
                  <Image
                    top={0} 
                    right={0}
                    position={"absolute"}
                    padding={1}
                  src="/components/merch/zoom_in.svg"
                />
                </Button>
              </Flex>
              <Flex
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box
                  color="#FFFC83"
                  fontSize={16}
                  fontFamily="SomarRounded-Regular"
                  fontWeight="700"
                  wordBreak="break-word"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  Merch A
                </Box>
                <Box
                  color="white"
                  fontSize={10}
                  fontFamily="SomarRounded-Regular"
                  fontWeight="400"
                  wordBreak="break-word"
                >
                  Sisa: 20 pcs
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={1}
                
              >
                <Image
                  src="/components/merch/coin.png"
                />
                <Box
                  color="#FFFC83"
                  fontSize={12}
                  fontFamily="SomarRounded-Regular"
                  fontWeight="700"
                  wordBreak="break-word"
                >
                  300 Coins
                </Box>
              </Flex>
              <Flex
                w={"100%"}
                h={"30%"}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Button
                  h={"40%"}
                  flex="1 1 0"
                  p={4}
                  background="#BFBFBF"
                  borderLeftRadius={12}
                  borderRightRadius="0"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={10}           
                >
                  <Box
                    color="#0B0A0A"
                    fontSize={12}
                    fontFamily="SomarRounded-Regular"
                    fontWeight="400"
                    wordBreak="break-word"
                  >
                    -
                  </Box>
                </Button>
                <Flex
                  h={"40%"}
                  flex="1 1 0"
                  p={4}
                  background="white"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={10}
                >
                  <Box
                    color="#0B0A0A"
                    fontSize={12}
                    fontFamily="SomarRounded-Regular"
                    fontWeight="400"
                    wordBreak="break-word"
                  >
                    0
                  </Box>
                </Flex>
                <Button
                  h={"40%"}
                  flex="1 1 0"
                  p={4}
                  background="#FFFC83"
                  borderRightRadius={12}
                  borderLeftRadius={0}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={10}
                  
                >
                  <Box
                    color="#0B0A0A"
                    fontSize={12}
                    fontFamily="SomarRounded-Regular"
                    fontWeight="400"
                    wordBreak="break-word"
                  >
                    +
                  </Box>
                </Button>
          </Flex>
          {/* Pop up image */}
          {berhasilPopup &&
            <PopupWithBlackOverlay open={berhasilPopup}
              setClose={() => setBerhasilPopup(false)}>
              <Flex
                background="#FFFC83"
                w="90%"
                mx="auto"
                maxW="350px"
                position="relative"
                p={10}
                borderRadius="24px"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src="/components/merch/bigmug.png"
                />
                <Image
                  cursor="pointer"
                  src="/close.png"
                  position="absolute"
                  top={5}
                  right={5}
                  onClick={() => setBerhasilPopup(false)}
                  alt="close"
                />
              </Flex>
            </PopupWithBlackOverlay>
          }
            </Box>
            </>
    )
}

export default CardItem;