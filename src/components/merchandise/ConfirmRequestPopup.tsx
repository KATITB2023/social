import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Flex, Image, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RequestBerhasilPopup } from "./RequestBerhasilPopup";

export const ConfirmRequestPopup = ({
    open,
    setCloseWindow,
}: {
    open: boolean;
    setCloseWindow: () => void;
    }) => {
    const [berhasilPopup, setBerhasilPopup] = useState(false);

    // TODO: KALO KLIK REQUEST, POPUP INI HILANG, DAN MUNCUL POPUP BARU
    const handleSubmit = () => {
        setBerhasilPopup(true);
        // setCloseWindow();
    }
    return (
        <PopupWithBlackOverlay open={open} setClose={setCloseWindow}>
            <Flex
                gap="15px"
                flexDir="column"
                bg="purple.1"
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
                    cursor="pointer"
                    src="/close.png"
                    position="absolute"
                    top={5}
                    right={5}
                    onClick={setCloseWindow}
                    alt="close"
                />
                <Flex
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        src="/warning.svg"
                        mt="20px"
                        maxW="50%"
                        aspectRatio={1}
                        padding={3}
                        borderRadius="full"
                        alt="check"
                    />
                    <Text
                        textAlign={"center"}
                        color="#FFFC83"
                        fontFamily="SomarRounded-Bold"
                        fontWeight="700"
                        fontSize={"14px"}
                    >
                        Cek kembali pesananmu!
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontFamily="SomarRounded-Regular"
                        fontWeight="400"
                        fontSize={"12px"}
                    >
                        {" "}
                        Barang yang telah di-request akan langsung mengurangi jumlah koin dan tidak dapat dibatalkan
                    </Text>
                </Flex>
                <Flex
                    w={"100%"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"8px"}
                >
                    <Flex
                        maxW={"30%"}
                        maxH={"20vh"}
                        justifyContent={"center"}
                        background="#FFFC83"
                        borderRadius={12}
                        px={"7.5px"}>
                        <Image src="/components/merch/mug.png"
                            //alt
                            maxW={"full"}
                            maxH={"full"}
                        />
                    </Flex>

                    {/* Item Request */}
                    <Flex w="65%" flexDir={"column"}>
                        {/* Kolom untuk nama item dan stock */}
                        <Flex w={"full"} flexDir={"row"} justifyContent={"space-between"}>
                            <Text
                                fontFamily={"SomarRounded-Bold"}
                                fontSize={"16px"}
                                textAlign={"center"}
                            >
                                Merch A
                            </Text>
                            <Text fontFamily={"SomarRounded-Regular"} fontSize={"12px"}>
                                1 pcs
                            </Text>
                        </Flex>
                        {/* Kolom untuk jumlah coins */}
                        <Flex w={"full"} flexDirection={"row"} alignItems={"center"}>
                            <Image
                                src="/components/merch/coin.png"
                                width={"30px"}
                                height={"30px"}
                                alt="Koin"
                            />
                            <Text>300 Coins</Text>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Request Button */}
                <Flex
                    w={"100%"}
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="space-between"
                    gap={2}>
                    <Flex justifyContent="space-between" alignItems="flex-start" gap={4} >
                        <Text
                            color="white"
                            fontSize={16}
                            fontFamily="SomarRounded-Regular"
                            fontWeight="700"
                        >
                            21 Barang
                        </Text>
                        <Text
                            color={"#C0EACA"}
                            fontSize={16}
                            fontFamily="SomarRounded-Regular"
                            fontWeight="700"
                            wordBreak="break-word"
                        >
                            6300 Coins
                        </Text>
                    </Flex>
                    <Button
                        alignSelf="stretch"
                        padding={2}
                        background="#FFFC83"
                        borderRadius={12}
                        overflow="hidden"
                        justifyContent="center"
                        alignItems="center"
                        gap={12}
                        onClick={handleSubmit}
                    >
                        <Text
                            color="#4909B3"
                            fontSize={12}
                            fontFamily="SomarRounded-Regular"
                            fontWeight="700"
                        >
                            Request
                        </Text>
                    </Button>
                </Flex>
            {berhasilPopup &&
                <RequestBerhasilPopup
                    open={berhasilPopup}
                    setClose={() => setBerhasilPopup(false)}
                    coinDecreased={900}
                />}
            </Flex>

        </PopupWithBlackOverlay>
    );
};
