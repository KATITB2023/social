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
  
  export default function NewFriendPopUp(props: {
    onClose: () => void;
    isOpen: boolean;
  }) {
    const router = useRouter();
    const handleClose = () => {
      props.onClose();
      router.refresh();
    };
    return (
      <Modal isOpen={props.isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor="#340C8F"
          borderRadius={24}
          width="300px"
          padding="40px 20px"
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
              >
                NEW FRIEND!
              </Text>
              <Text
                size="B3"
                fontWeight={500}
                lineHeight="150%"
                display="flex"
                alignItems="center"
                textAlign="center"
                color="rgba(255, 255, 255, 0.6)"
              >
                Selamat kamu mendapatkan teman baru
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }