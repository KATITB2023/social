import { NonAnonChatHeader } from "~/server/types/message";
import CardHomeChat from "./CardHomeChat";
import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";

interface existingChatProps {
  data: NonAnonChatHeader[] | undefined;
}

const ExistingChat: React.FC<existingChatProps> = ({ data }) => {
  interface CardExistingChatProps {
    name: string;
    src: string;
    text: string;
    count: number;
    now: Date;
    time: Date;
  }

  const CardExistingChat: React.FC<CardExistingChatProps> = ({
    name,
    src,
    text,
    count,
    now,
    time,
  }) => {
    const sameDay =
      now.getDate() === time.getDate() && now.getMonth() === time.getMonth();

    const day = time.getDate();
    const month = time.getMonth() + 1; // Add 1 to account for zero-based months
    const year = time.getFullYear().toString().slice(2); // Extract the last two digits of the year

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Concatenate the formatted values with the separator
    const outputDate = `${formattedDay}/${formattedMonth}/${year}`;

    return (
      <CardHomeChat>
        <HStack p="0" m="0" spacing={3}>
          <Avatar name={name} src={src} size="md" />
          <Flex direction="column" justify="center" align="flex-start" w="100%">
            <Text color="yellow.5" fontSize={"16px"}>
              {name}
            </Text>
            <Text
              color="yellow.3"
              fontSize={"12px"}
              overflow={"hidden"}
              maxW="100%"
              maxH="2rem"
            >
              {text}
            </Text>
          </Flex>
          <Flex
            direction="column"
            justify="space-between"
            align="flex-end"
            h="100%"
          >
            <Text color="yellow.3">
              {!sameDay && outputDate}
              {time.getHours()}.{time.getMinutes()}
            </Text>
            <Text
              color="yellow.5"
              bg="#E8553E"
              borderRadius="5px"
              p="2px 5px 0px 5px"
            >
              {count}
            </Text>
          </Flex>
        </HStack>
      </CardHomeChat>
    );
  };

  return (
    <VStack spacing={5} w="100%" mt="11rem" maxH="60%" overflowY="auto">
      {data?.map((val) => {
        const today = new Date();
        return (
          <CardExistingChat
            key={val.user.id}
            name={val.user.name}
            src={val.user.profileImage == null ? "" : val.user.profileImage}
            text={val.lastMessage.message}
            count={val.unreadMessageCount}
            now={today}
            time={val.lastMessage.createdAt}
          />
        );
      })}
    </VStack>
  );
};

export default ExistingChat;

