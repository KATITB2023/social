import React from 'react'
import { Button, Text } from '@chakra-ui/react'
type ButtonProps = {
    name : string;
    reactionCount : number | undefined;
}
const ReactButton : React.FC<ButtonProps> = ({name,reactionCount}) => {
  return (
    <Button
            // py={1}
            size={"sm"}
            px={2}
            justifyContent="center"
            bg="transparent"
            color={"#FFFC83"}
            _hover={{
              bg: "#FFFC83",
              color: "#4909B3",
            }}
            border="0.50px #FFFC83 solid"
            borderRadius={7}
            gap={2}
            key={name}
            // onClick={() => handleVote(feedId, reaction)}
          >
            <Text
              fontSize={"10px"}
              fontFamily="SomarRounded-Bold"
              fontWeight="700"
            >
              {name}
            </Text>
            <Text
              fontSize={"10px"}
              fontFamily="SomarRounded-Bold"
              fontWeight="400"
            >
              {reactionCount}
            </Text>
          </Button>
  )
}

export default ReactButton
