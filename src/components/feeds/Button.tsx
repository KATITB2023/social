import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { count } from "console";
type ButtonProps = {
  name: string;
  reactionCount: number;
  feedId: number;
};
export const TopReactionButton: React.FC<ButtonProps> = ({
  name,
  reactionCount,
  feedId,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(reactionCount);
  }, []);
  const reactMutation = api.feed.react.useMutation();
  const handleReact = (reaction: string) => {
    const result = reactMutation.mutate({
      feedId: feedId,
      reaction: reaction,
    });
    console.log(result);
  };
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
      onClick={() => handleReact(name)}
      // onClick={() => handleVote(feedId, reaction)}
    >
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="700">
        {name}
      </Text>
      <Text fontSize={"10px"} fontFamily="SomarRounded-Bold" fontWeight="400">
        {reactionCount}
      </Text>
    </Button>
  );
};

export const OtherReactionButton: React.FC<ButtonProps> = ({
  name,
  reactionCount,
  feedId,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(reactionCount);
  }, []);
  const reactMutation = api.feed.react.useMutation();
  const handleReact = (reaction: string) => {
    const result = reactMutation.mutate({
      feedId: feedId,
      reaction: reaction,
    });
    console.log(result);
  };
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
      onClick={() => handleReact(name)}
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
