import {
  Box,
  Flex,
  Button,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { MdQuestionMark } from "react-icons/md";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";


export default function DeleteFriendPopUp(props: {
  onClose: () => void;
  isOpen: boolean;
  id: string;
}) {
  const router = useRouter();
  const deleteFriend = api.friend.removeFriend.useMutation();
  const handleDelete = async () => {
    props.onClose();
    await deleteFriend.mutateAsync({
      userId: props.id,
    });
    router.refresh();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        width="300px"
        backgroundColor="#340C8F"
        padding="40px 18px"
        borderRadius={24}
      >
        <ModalCloseButton />
        <ModalBody>
          <Box
            borderRadius="36px"
            background="#FFFC83"
            width="48px"
            height="48px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="20px auto"
          >
            <MdQuestionMark size={32} color="#000000" opacity="50%" />
          </Box>
          <Flex
            display="flex"
            flexDirection="column"
            padding="0px"
            gap="12px"
            height="89px"
            order={2}
            alignSelf="stretch"
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
              DELETE
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
              Yakin ingin menghapus nama dari request?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            padding="0px"
            gap="20px"
            order="3"
          >
            <Button
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              padding="12px 32px"
              gap="12px"
              width="98px"
              height="48px"
              background="#2F2E2E"
              border="2px solid #FFFC83"
              borderRadius="12px"
              onClick={props.onClose}
            >
              <Text
                width="57px"
                height="24px"
                size="SH5"
                fontWeight={700}
                lineHeight="150%"
                color="#FFFC83"
              >
                Cancel
              </Text>
            </Button>
            <Button
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              padding="12px 32px"
              gap="12px"
              width="98px"
              height="48px"
              background="#E8553E"
              borderRadius="12px"
              onClick={()=>{void handleDelete()}}
            >
              <Text
                width="53px"
                height="24px"
                size="SH5"
                fontWeight={700}
                lineHeight="150%"
                color="#FFFFFF"
              >
                Delete
              </Text>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}