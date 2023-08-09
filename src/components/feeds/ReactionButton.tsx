import React, { useState } from "react";
import { Image, Popover, PopoverHeader, PopoverTrigger, PopoverContent, PopoverBody, Text, Button, Flex } from "@chakra-ui/react";

enum ReactionOption {
    Excited = '(๑˃ᴗ˂)ﻭ',
    Sigh = '(￢‿￢ )',
    Surprised = '(~‾⌣‾)~',
    Sad = '（πーπ）',
    Blushing = 'σ(￣、￣〃)',
    Confused = '（Σ(O_O）',
    Love = '(づ￣ ³￣)づ',
    Thinking = '(；⌣̀_⌣́)'
}
const ReactionButton = () => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="flex-start"
            alignItems={'center'}
            gap={2}
        >
            {Object.values(ReactionOption).slice(0,3).map((reaction) => (
                <Button
                    // py={1}
                    size={'sm'}
                    px={2}
                    justifyContent='center'
                    bg="transparent"
                    color={'#FFFC83'}
                    _hover={{
                        bg: '#FFFC83',
                        color: '#4909B3'
                    }}
                    border='0.50px #FFFC83 solid'
                    borderRadius={7}
                    gap={2}
                    key={reaction}
                // onClick={() => handleVote(feedId, reaction)}
                >
                    <Text
                        fontSize={'10px'}
                        fontFamily="SomarRounded-Bold"
                        fontWeight="700"
                    >
                        {reaction}
                    </Text>
                    <Text
                        fontSize={'10px'}
                        fontFamily="SomarRounded-Bold"
                        fontWeight="400"
                    >
                        1
                    </Text>
                </Button>
            ))}
            <Popover isLazy>
                <PopoverTrigger>
                    <Button
                        // py={1}
                        size={'xs'}
                        justifyContent='center'
                        bg="transparent"
                        color={'#FFFC83'}
                        _hover={{
                            bg: '#FFFC83',
                            color: '#4909B3'
                        }}
                        border='0.50px #FFFC83 solid'
                        borderRadius={'50%'}
                    >
                        +
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    background='#1D0263'>
                    <Image
                        src="popup-background.png"
                        alt="background"
                        height="100%"
                        zIndex="-1"
                        position="absolute"
                        objectFit="cover"
                        minWidth="100%"
                        width="100%"
                    />
                    <PopoverHeader
                        fontWeight='semibold'
                        justifyContent={'center'}
                    >
                        <Text
                        fontFamily="SomarRounded-Bold"
                        fontWeight="400"
                        color={'#FFFC83'}
                        textAlign={'center'}
                    >
                        Reaction
                    </Text>
                    </PopoverHeader>
                    <PopoverBody>
                        <Flex
                            flexWrap="wrap"
                            justifyContent="center"
                            alignItems={'center'}
                            gap={2}
                        >
                            {Object.values(ReactionOption).map((reaction) => (
                                <Button
                                    // py={1}
                                    size={'sm'}
                                    px={2}
                                    justifyContent='center'
                                    bg="transparent"
                                    color={'#FFFC83'}
                                    _hover={{
                                        bg: '#FFFC83',
                                        color: '#4909B3'
                                    }}
                                    border='0.50px #FFFC83 solid'
                                    borderRadius={7}
                                    gap={2}
                                    key={reaction}
                                // onClick={() => handleVote(feedId, reaction)}
                                >
                                    <Text
                                        fontSize={'10px'}
                                        fontFamily="SomarRounded-Bold"
                                        fontWeight="700"
                                    >
                                        {reaction}
                                    </Text>
                                </Button>
                            ))}
                            </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default ReactionButton;