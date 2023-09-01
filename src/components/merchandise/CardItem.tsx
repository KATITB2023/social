import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useState } from "react";

interface CardItemInfo {
  id: string;
  image: string | null;
  name: string;
  price: number;
  stock: number;
  idx: number;
  requestQuota: number;
  currentAmountItem: number;
  changeAmountItem: (change: number, idx: number) => void;
  currentSumCoinPrice: number;
  changeSumCoinPrice: (change: number) => void;
}

const CardItem = ({
  currentAmountItem,
  changeAmountItem,
  currentSumCoinPrice,
  changeSumCoinPrice,
  id,
  image,
  name,
  price,
  stock,
  idx,
  requestQuota,
}: CardItemInfo) => {
  const [berhasilPopup, setBerhasilPopup] = useState(false);
  const handleIncrement = () => {
    if (requestQuota < stock) {
      changeAmountItem(1, idx);
      changeSumCoinPrice(price);
    }
  };

  const handleDecrement = () => {
    if (requestQuota > 0) {
      changeAmountItem(-1, idx);
      changeSumCoinPrice(-price);
    }
  };
  return (
    <>
      <Box
        w="47%"
        h={"auto"}
        p={4}
        borderRadius={16}
        border="0.50px #EABFFF solid"
        backgroundImage="linear-gradient(207deg, rgba(118.43, 95.94, 182.75, 0.93) 0%, rgba(204.99, 97.55, 207.19, 0.93) 46%, rgba(58.19, 48.70, 60.56, 0.93) 100%), radial-gradient(43.45% 36.33% at 31.24% 29.39%, rgba(164.69, 238.74, 255, 0.20) 0%, rgba(109.97, 190.80, 244.37, 0.04) 77%, rgba(69.95, 144.07, 212.50, 0) 100%)"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems={'flex-start'}
        gap={3}
      >
        <Flex
          w={"100%"}
          h={"auto"}
          position="relative"
          background="#FFFC83"
          borderRadius={12}
          justifyContent={"center"}
          aspectRatio={1/1}
        >
          <Image
            src={image || "/logo_showcase.png"}
            alt={`Merchandise ${name} image`}
            objectFit={"contain"}
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
          mt={3}
        >
          <Text
            color="#FFFC83"
            fontSize={16}
            fontFamily="SomarRounded-Regular"
            fontWeight="700"
            wordBreak="break-word"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {name}
          </Text>
          <Text
            color="white"
            fontSize={10}
            fontFamily="SomarRounded-Regular"
            fontWeight="400"
            wordBreak="break-word"
          >
            Sisa: {stock} pcs
          </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap={1}>
          <Image src="/components/merch/coin.png" />
          <Text
            color="#FFFC83"
            fontSize={12}
            fontFamily="SomarRounded-Regular"
            fontWeight="700"
            wordBreak="break-word"
          >
            {price} Coins
          </Text>
        </Flex>
        
        <Flex
          maxW={"100%"}
          h={"10%"}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <Button
            flex="1"
            background={requestQuota !== 0 ? "#FFFC83" : "#BFBFBF"}
            borderLeftRadius={12}
            borderRightRadius="0"
            justifyContent="center"
            alignItems="center"
            isDisabled={requestQuota === 0}
            onClick={handleDecrement}
          >
            <Text
              color="#0B0A0A"
              fontSize={12}
              fontFamily="SomarRounded-Regular"
              fontWeight="400"
              wordBreak="break-word"
            >
              -
            </Text>
          </Button>
          <Button
            borderRadius={0}
            flex="1"
            background="white"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              color="#0B0A0A"
              fontSize={12}
              fontFamily="SomarRounded-Regular"
              fontWeight="400"
            >
              {requestQuota}
            </Text>
          </Button>
          <Button
            flex="1"
            background={requestQuota !== stock ? "#FFFC83" : "#BFBFBF"}
            borderRightRadius={12}
            borderLeftRadius={0}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            isDisabled={requestQuota === stock}
            onClick={handleIncrement}
          >
            <Text
              color="#0B0A0A"
              fontSize={12}
              fontFamily="SomarRounded-Regular"
              fontWeight="400"
              wordBreak="break-word"
            >
              +
            </Text>
          </Button>
        </Flex>

        {/* Pop up image */}
        {berhasilPopup && (
          <PopupWithBlackOverlay
            open={berhasilPopup}
            setClose={() => setBerhasilPopup(false)}
          >
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
              aspectRatio={1/1}
            >
              <Image
                src={image || "/logo_showcase.png"}
                alt={`Merchandise ${name} image`}
              />

              <Flex
                bg={"purple.2"}
                w={"20px"}
                aspectRatio={1 / 1}
                position="absolute"
                top={5}
                cursor="pointer"
                onClick={() => setBerhasilPopup(false)}
                right={5}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"full"}
              >
                {" "}
                <Text textAlign={"center"} fontWeight={"bold"}> x </Text>
              </Flex>
            </Flex>
          </PopupWithBlackOverlay>
        )}
      </Box>
    </>
  );
};

export default CardItem;
