import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  type ResponsiveValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "../Image";

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
      <Button
        variant={"unstyled"}
        alignSelf="center"
        borderRadius={br}
        width={size}
        height={size}
        onClick={onOpen}
        overflow="hidden"
        position={"relative"}
        border={"5px black solid"}
        boxShadow={"0px 0px 10px 1px #FFFFFF"}
      >
        {isImageLoading && <Spinner />}
        <Image
          onLoadingComplete={() => setIsImageLoading(false)}
          src={src}
          alt="Profile Picture"
          width={size}
          height={size}
          hidden={isImageLoading}
          position={"absolute"}
          objectFit={"cover"}
          objectPosition={"center"}
          inset={0}
        />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="black" justifyContent="space-evenly">
          <ModalCloseButton size="24px" mx="24px" my="24px" zIndex={10} />
          <Image
            src={src}
            alt="Profile Picture"
            borderRadius={0}
            boxSize="100%"
            layout="fill"
            objectFit={"contain"}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
