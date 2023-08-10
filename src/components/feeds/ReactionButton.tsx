import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRerender } from "~/hooks/useRerender";
import { api } from "~/utils/api";
import { OtherReactionButton, TopReactionButton } from "./Button";

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
  id: number;
};
const ReactionButton: React.FC<ReactionButtonProps> = ({ reactions, id }) => {
  const client = api.useContext();
  const rerender = useRerender();
  const reactMutation = api.feed.react.useMutation({
    onSuccess(data, variables) {
      const oldData = client.feed.getFeeds.getInfiniteData({});
      let found = false;
      oldData?.pages.forEach((page) => {
        if (found) return;
        page.data.forEach((feed) => {
          if (found) return;
          if (feed.id === variables.feedId) {
            const reaction = feed.reactions[variables.reaction];
            if (reaction) {
              if (data) {
                reaction.count++;
              } else {
                reaction.count--;
              }
              if (reaction.count === 0) {
                delete feed.reactions[variables.reaction];
              }
            } else {
              feed.reactions[variables.reaction] = {
                count: 1,
                reacted: true,
              };
            }
            found = true;
            rerender();
          }
        });
      });
    },
  });
  const handleReact = (reaction: string) => {
    reactMutation.mutate({
      feedId: id,
      reaction: reaction,
    });
  };
  const sortedReactionNames = Object.keys(reactions).sort((a, b) => {
    const reactionA = reactions[a];
    const reactionB = reactions[b];

    if (reactionA && reactionB) {
      return reactionB.count - reactionA.count;
    } else {
      return 0; // Nilai default jika salah satu reaction tidak ada
    }
  });
  const defaultReactionNames = Object.values(ReactionOption).splice(0, 3);
  const topReactionNames =
    sortedReactionNames.length !== 0
      ? sortedReactionNames.splice(0, 3)
      : defaultReactionNames;
  let i = 0;
  while (topReactionNames.length < 3) {
    const reaction = defaultReactionNames[i];
    if (!reaction) break;
    i++;
    if (topReactionNames.includes(reaction)) {
      continue;
    }
    topReactionNames.push(reaction);
  }
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
        const reactionCount: number | undefined = reactions[name]?.count
          ? reactions[name]?.count
          : 0;
        const reacted: boolean | undefined = reactions[name]?.reacted
          ? reactions[name]?.reacted
          : false;
        return (
          <TopReactionButton
            key={name}
            feedId={id}
            name={name}
            reacted={reacted ? reacted : false}
            reactionCount={reactionCount ? reactionCount : 0}
            handleReact={handleReact}
          />
        );
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
              {unusedReactions.map((name) => {
                const reactionCount: number | undefined = reactions[name]?.count
                  ? reactions[name]?.count
                  : 0;
                const reacted: boolean | undefined = reactions[name]?.reacted
                  ? reactions[name]?.reacted
                  : false;
                return (
                  <OtherReactionButton
                    key={name}
                    name={name}
                    reacted={reacted ? reacted : false}
                    reactionCount={reactionCount ? reactionCount : 0}
                    feedId={id}
                    handleReact={handleReact}
                  />
                );
              })}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ReactionButton;
