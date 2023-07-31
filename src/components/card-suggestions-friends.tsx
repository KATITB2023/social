import { 
    Card, 
    Flex, 
    Box, 
    Text, 
    Button, 
    IconButton 
} from "@chakra-ui/react";

import { MdOutlineCancel } from "react-icons/md";

export default function CardSuggestionsFriend() {
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

        {/* Frame 57 */}
        <Flex
            flexDirection="row"
            justifyContent="space-between" // Menambahkan properti justifyContent
            alignItems="center"
            width="100%"
        >
            {/* Frame 79 */}
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
            {/* Group 36 */}
            <Box
                position="relative"
                width="35px"
                height="35px"
            >
                {/* Ellipse 1 */}
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
                {/* Ellipse 2 */}
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
                {/* Tulip */}
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

                {/* "yuk berteman!!" */}
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

            {/* Frame 21 */}
            <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="84px"
            height="24px"
            >
            {/* Button */}
            <Button
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="4px 16px"
                gap={12}
                width="55px"
                height="23px"
                bg="#FFFC83"
                borderRadius="12px"
                flex="none"
                order={0}
                flexGrow={0}
            >
                {/* Label */}
                <Text
                width="23px"
                height="15px"
                size="A"
                fontStyle="normal"
                fontWeight={800}
                lineHeight="150%"
                color="#4909B3"
                flex="none"
                order={0}
                flexGrow={0}
                >
                ADD
                </Text>
            </Button>
            <Box 
                marginLeft="5px"
                >
            </Box>
            <IconButton
                isRound={true}
                variant='ghost'
                color='white'
                aria-label='Done'
                fontSize='24px'
                size='24px'
                _hover={{ bg: "transparent" }}
                icon={<MdOutlineCancel />}
                />
            </Flex>
        </Flex>
    </Card>
  );
}
