import { 
    Card, 
    Flex, 
    Box, 
    Text, 
    Button, 
    Icon 
} from "@chakra-ui/react";

import { MdOutlineChatBubbleOutline } from "react-icons/md";

export default function CardMyFriends() {
  return (
  <Card
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    padding="12px"
    gap="16px"
    width="325px"
    height="59px"
    background="linear-gradient(295.13deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0) 99.28%), rgba(255, 255, 255, 0.4)"
    borderRadius="12px"
    direction={{ base: 'column', sm: 'row' }}
  >
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
        <Flex
          flexDirection="row"
          alignItems="center"
          padding={0}
          gap={8}
          width="170px"
          height="35px"
          order={0}
          flex="0"
          marginTop="12px"
          marginLeft={`${12 - 16}px`}
          marginBottom="12px"
        >
        <Box
          position="relative"
          width="35px"
          height="35px"
        >
            <Box
              position="absolute"
              width="35px"
              height="35px"
              left="0px"
              top="0px"
              background="#340C8F"
              border="0.2px solid #8D47E5"
              boxShadow="0px 4px 30px #EABFFF"
              borderRadius="50%"
            />
            <Box
              position="absolute"
              width="7px"
              height="7px"
              borderRadius="50%"
              left="25px"
              top="28px"
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.25)"
              bg="#FFFC83"
            />
        </Box>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          padding="0px"
          width="127px"
          height="33px"
        >
            <Text
              width="30px"
              height="19px"
              size="B5"
              lineHeight="20px"
              display="flex"
              alignItems="flex-end"
              fontWeight={700}
              color="#FFFFFF"
            >
            Tulip
            </Text>

           <Text
              width="127px"
              height="14px"
              size="A"
              lineHeight="16px"
              display="flex"
              alignItems="flex-end"
              color="#FFFFFF"
            >
            yuk berteman!!
            </Text>
        </Flex>
        </Flex>
        <Button
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          padding="4px 16px"
          width="86px"
          height="23px"
          gap="12px"
          bg="#FFFC83"
          borderRadius="12px"
        >
            <Icon
              width="12px"
              height="12px"
              color="#4909B3"
              as={MdOutlineChatBubbleOutline}
            >
            </Icon>
            {/* Label */}
            <Text
              width="30px"
              height="15px"
              size="A"
              fontStyle="normal"
              fontWeight={1000}
              lineHeight="15px"
              color="#4909B3"
            >
            CHAT
            </Text>
        </Button>
    </Flex>
  </Card>
  );
}
