import {
  type ResponsiveValue,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ProfilePicture({
  src = "/defaultprofpict.svg",
  size = "100%",
  br = "full",
}: {
  src?: string;
  size?: ResponsiveValue<number | string>;
  br?: ResponsiveValue<number | string>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  return (
    <>
      <Box
        alignSelf="center"
        borderRadius={br}
        width={size}
        height={size}
        onClick={onOpen}
        overflow="hidden"
      >
        <Flex justifyContent="center" alignItems="center">
          {isImageLoading && <Spinner />}

          <Image
            onLoad={() => setIsImageLoading(false)}
            src={src}
            alt="Profile Picture"
            width="100%"
            hidden={isImageLoading}
            height="100&"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="black" justifyContent="space-evenly">
          <ModalCloseButton size="24px" mx="24px" my="24px" />
          <Image
            src={src}
            alt="Profile Picture"
            borderRadius={0}
            boxSize="100%"
          />
        </ModalContent>
      </Modal>
    </>
  );
}
