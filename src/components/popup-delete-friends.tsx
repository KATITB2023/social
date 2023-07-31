import {
    Box, 
    Flex,
    Button, 
    IconButton, 
    Text 
} from '@chakra-ui/react';
import { RxCross2 } from "react-icons/rx";
import { MdQuestionMark } from "react-icons/md";

export default function PopUpDeleteFriend() {
  return (
    <Flex
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Box
        width="272px" 
        height="349px" 
        backgroundColor="#340C8F"
        padding="40px 28px"
        borderRadius={24}
        >
        <Flex
            flexDirection="column"
            alignItems="flex-end"
            gap={20}
            width="216px"
            height="24px"
            alignSelf="stretch"  
        >
            <IconButton
            isRound={true}
            variant='ghost'
            color='white'
            aria-label='Done'
            fontSize='24px'
            size='24px'
            _hover={{ bg: "transparent" }}
            icon={<RxCross2 />}
            />
        </Flex>
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
            <MdQuestionMark
            size={32}
            color="#000000"
            opacity="50%" 
            />
        </Box>
        <Flex
            display="flex"
            flexDirection="column"
            padding="0px"
            gap="12px"
            width="216px"
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
            Yakin ingin menghapus "nama" dari request?
            </Text>
        </Flex>
        <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            padding="0px"
            gap="20px"
            width="216px"
            marginTop="20px"
            height="48px"
            order="3"
            alignSelf="stretch"
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
        </Box>
    </Flex>
  );
}
