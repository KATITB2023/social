import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
type ButtonProps = {
  name: string;
  reactionCount: number;
  feedId: number;
  reacted: boolean;
  handleReact: (reaction: string) => void;
};
export const TopReactionButton: React.FC<ButtonProps> = ({
  name,
  reactionCount,
  reacted,
  feedId,
  handleReact,
}) => {
  const [count, setCount] = useState(reactionCount);
  const [isReacted, setIsReacted] = useState(reacted);
  useEffect(() => {
    setCount(reactionCount);
    setIsReacted(reacted);
  }, [reacted,reactionCount]);
  const handleClick = (reaction: string) => {
    if (isReacted) {
      setCount(count - 1);
      setIsReacted(false);
    } else {
      setCount(count + 1);
      setIsReacted(true);
    }
    handleReact(reaction);
  };
  return (
    <Button
      size={"sm"}
      px={2}
      justifyContent="center"
      backgroundColor={isReacted ? "#FFFC83" : "transparent"}
      color={isReacted ? "#4909B3" : "#FFFC83"}
      border="0.50px #FFFC83 solid"
      borderRadius={7}
      gap={2}
      key={name}
      onClick={() => handleClick(name)}
    >
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="700">
        {name}
      </Text>
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="400">
        {count}
      </Text>
    </Button>
  );
};

export const OtherReactionButton: React.FC<ButtonProps> = ({
  name,
  reactionCount,
  feedId,
  reacted,
  handleReact,
}) => {
  const [count, setCount] = useState(0);
  const [isReacted, setIsReacted] = useState(false);

  const handleClick = (reaction: string) => {
    if (isReacted) {
      setCount(count - 1);
      setIsReacted(false);
    } else {
      setCount(count + 1);
      setIsReacted(true);
    }
    handleReact(reaction);
  };
  useEffect(() => {
    setCount(reactionCount);
  }, []);
  return (
    <Button
      // py={1}
      size={"sm"}
      px={2}
      justifyContent="center"
      _hover={{
        bg: "#FFFC83",
        color: "#4909B3",
      }}
      border="0.50px #FFFC83 solid"
      borderRadius={7}
      gap={2}
      key={name}
      backgroundColor={isReacted ? "#FFFC83" : "transparent"}
      color={isReacted ? "#4909B3" : "#FFFC83"}
      onClick={() => handleClick(name)}
    >
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="700">
        {name}
      </Text>
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="400">
        {count}
      </Text>
    </Button>
  );
};
