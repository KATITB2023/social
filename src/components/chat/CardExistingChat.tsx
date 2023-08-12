import { Avatar, Flex, Spacer, Text } from "@chakra-ui/react";
import CardHomeChat from "./CardHomeChat";

interface CardExistingChatProps {
  name: string;
  src: string;
  text: string;
  count: number;
  now: Date;
  time: Date;
  path: string;
}

const CardExistingChat: React.FC<CardExistingChatProps> = ({
  name,
  src,
  text,
  count,
  now,
  time,
  path,
}) => {
  const timeLocalString = time.toLocaleString();
  const timeLocal = new Date(timeLocalString);

  const hour =
    timeLocal.getHours() < 10
      ? `0${timeLocal.getHours()}`
      : timeLocal.getHours();
  const minute =
    timeLocal.getMinutes() < 10
      ? `0${timeLocal.getMinutes()}`
      : timeLocal.getMinutes();
  const outputDate1 = `${hour}.${minute}`;

  const sameDay =
    now.getDate() === timeLocal.getDate() &&
    timeLocal.getMonth() === timeLocal.getMonth();

  const day = timeLocal.getDate();
  const month = timeLocal.getMonth() + 1; // Add 1 to account for zero-based months
  const year = timeLocal.getFullYear().toString().slice(2); // Extract the last two digits of the year

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Concatenate the formatted values with the separator
  const outputDate2 = `${formattedDay}/${formattedMonth}/${year}`;

  return (
    <CardHomeChat path={path}>
      <Flex p="0" m="0" direction="row" alignItems='center' >
        <Avatar
          name={name}
          src={src}
          size="md"
          fontWeight="bold"
          pt="3px"
          fontSize="sm"
          mr="1rem"
        />
        <Flex direction="column" justify="center" align="flex-start"  >
          <Text
            color="yellow.5"
            fontSize={"16px"}
            maxH="1.5rem"
            overflow="hidden"
          >
            {name}
          </Text>
          <Text
            pt="3px"
            color="yellow.3"
            fontSize={"10px"}
            overflow={"hidden"}
            maxH="2.5rem"
            lineHeight="18px"
          >
            {text}
          </Text>
        </Flex>
        <Spacer />
        <Flex
          direction="column"
          justify="space-between"
          align="flex-end"
          h="100%"
          pl="0.5rem"
          minW="4rem"
        >
          <Text color="yellow.3" fontSize={"10px"} pt="4px">
            {!sameDay && outputDate2}
          </Text>
          <Text color="yellow.3" fontSize={"10px"}>
            {outputDate1}
          </Text>
          <Spacer />
          <Text
            color="yellow.5"
            bg="#E8553E"
            borderRadius="5px"
            p="2px 5px 0px 5px"
            fontSize={"12px"}
            hidden={count === 0}
          >
            {count > 999 ? "999+" : count}
          </Text>
        </Flex>
      </Flex>
    </CardHomeChat>
  );
};

export default CardExistingChat;
