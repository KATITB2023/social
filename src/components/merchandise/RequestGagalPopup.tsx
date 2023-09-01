import React from "react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { Flex, Image, Heading } from "@chakra-ui/react";

export const RequestGagalPopup = ({
    open,
    setClose,
}: {
    open: boolean;
    setClose: () => void;
}) => {
    return (
        <PopupWithBlackOverlay open={open} setClose={setClose}>
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
                    onClick={setClose}
                    alt="close"
                />
                <Image
                    src="/warning.svg"
                    mt="20px"
                    maxW="50%"
                    aspectRatio={1}
                    padding={3}
                    borderRadius="full"
                    alt="warning"
                />
                <Heading textAlign={"center"}>Request Gagal!</Heading>
            </Flex>
        </PopupWithBlackOverlay>
    );
};
