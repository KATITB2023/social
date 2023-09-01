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
import { MdDone } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function PopupVisitedCoin(props: {
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
              background="#2FC1AD"
              width="48px"
              height="48px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="20px auto"
            >
              <MdDone size={24} color="#000000" opacity="50%" />
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
                size="B5"
                fontWeight={400}
                lineHeight="150%"
                display="flex"
                alignItems="center"
                textAlign="center"
                color="rgba(255, 255, 255, 0.6)"
              >
                Terima kasih sudah berkunjung! Yuk berinteraksi dengan lembaga
                lain (/^▽^/)
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
