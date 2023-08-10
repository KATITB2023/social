import {
    Box, 
    Flex, 
    IconButton, 
    Text 
} from '@chakra-ui/react';
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";

export default function NewFriendPopUp() {
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
        height="281px" 
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
            background="#2FC1AD"
            width="48px"
            height="48px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="20px auto"
        >
            <MdDone
            size={24}
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
        </Box>
    </Flex>
  );
}
