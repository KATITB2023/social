import React, { useState } from "react";
import {
  Image,
  Popover,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import ReactButton from "./Button";

enum ReactionOption {
  Excited = "(๑˃ᴗ˂)ﻭ",
  Sigh = "(￢‿￢ )",
  Surprised = "(~‾⌣‾)~",
  Sad = "（πーπ）",
  Blushing = "σ(￣、￣〃)",
  Confused = "（Σ(O_O）",
  Love = "(づ￣ ³￣)づ",
  Thinking = "(；⌣̀_⌣́)",
}
type Reaction = {
  count: number;
  reacted: boolean;
};
type Reactions = {
  [k: string]: Reaction;
};
type ReactionButtonProps = {
  reactions: {
    [k: string]: Reaction;
  };
};
const ReactionButton: React.FC<ReactionButtonProps> = ({ reactions }) => {
  const sortedReactionNames = Object.keys(reactions).sort((a, b) => {
    const reactionA = reactions[a];
    const reactionB = reactions[b];

    if (reactionA && reactionB) {
      return reactionB.count - reactionA.count;
    } else {
      return 0; // Nilai default jika salah satu reaction tidak ada
    }
  });
  const topReactionNames = sortedReactionNames.splice(0, 3);
  const unusedReactions = Object.values(ReactionOption).filter(
    (reaction) => !topReactionNames.includes(reaction)
  );
  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-start"
      alignItems={"center"}
      gap={2}
    >
      {topReactionNames.map((name) => {
        const reactionCount: number | undefined = reactions[name]?.count;
        return <ReactButton name={name} reactionCount={reactionCount} />;
      })}
      <Popover isLazy>
        <PopoverTrigger>
          <Button
            // py={1}
            size={"xs"}
            justifyContent="center"
            bg="transparent"
            color={"#FFFC83"}
            _hover={{
              bg: "#FFFC83",
              color: "#4909B3",
            }}
            border="0.50px #FFFC83 solid"
            borderRadius={"50%"}
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent background="#1D0263">
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
          <PopoverHeader fontWeight="semibold" justifyContent={"center"}>
            <Text
              fontFamily="SomarRounded-Bold"
              fontWeight="400"
              color={"#FFFC83"}
              textAlign={"center"}
            >
              Reaction
            </Text>
          </PopoverHeader>
          <PopoverBody>
            <Flex
              flexWrap="wrap"
              justifyContent="center"
              alignItems={"center"}
              gap={2}
            >
              {unusedReactions.map((name) => (
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
                  // onClick={() => handleVote(feedId, name)}
                >
                  <Text
                    fontSize={"10px"}
                    fontFamily="SomarRounded-Bold"
                    fontWeight="700"
                  >
                    {name}
                  </Text>
                </Button>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ReactionButton;
