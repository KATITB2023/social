import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function PopupWrongCode(props: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const router = useRouter();
  const handleClose = () => {
    props.onClose();
    router.refresh();
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#340C8F"
          borderRadius={24}
          width="272px"
          padding="40px 28px"
        >
          <ModalCloseButton />
          <ModalBody>
            <Box
              borderRadius="36px"
              background="#E8553E"
              width="48px"
              height="48px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="20px auto"
            >
              <MdClose size={24} color="#000000" opacity="50%" />
            </Box>
            <Flex
              display="flex"
              flexDirection="column"
              padding="0px"
              gap="12px"
              order={2}
              alignItems="center"
              textAlign="center"
            >
              <Text
                fontFamily="Bodwars"
                fontStyle="normal"
                fontWeight="400"
                fontSize="24px"
                lineHeight="120%"
                display="flex"
                alignItems="center"
                textAlign="center"
                textTransform="uppercase"
                color="#FFFFFF"
                whiteSpace="nowrap"
              >
                KODE SALAH!
              </Text>
              <Text
                size="B5"
                fontWeight={400}
                lineHeight="150%"
                display="flex"
                alignItems="center"
                textAlign="center"
                color="rgba(255, 255, 255, 0.6)"
              >
                Silakan masukkan kembali
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
