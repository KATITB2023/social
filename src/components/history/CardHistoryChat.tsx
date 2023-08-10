import { Avatar, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import CardHomeChat from "../chat/CardHomeChat";

interface CardHistoryChatProps {
  name: string;
  src: string;
  path: string;
  time: Date;
}

const CardHistoryChat: React.FC<CardHistoryChatProps> = ({
  name,
  src,
  path,
  time,
}) => {
  const timeLocalStr = time.toLocaleString();
  const timeLocal = new Date(timeLocalStr);

  const hour =
    timeLocal.getHours() < 10
      ? `0${timeLocal.getHours()}`
      : timeLocal.getHours();
  const minute =
    timeLocal.getMinutes() < 10
      ? `0${timeLocal.getMinutes()}`
      : timeLocal.getMinutes();
  const outputDate1 = `${hour}.${minute}`;

  const day = timeLocal.getDate();
  const month = timeLocal.getMonth() + 1; // Add 1 to account for zero-based months
  const year = timeLocal.getFullYear().toString().slice(2); // Extract the last two digits of the year

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Concatenate the formatted values with the separator
  const outputDate2 = `${formattedDay}/${formattedMonth}/20${year}`;

  return (
    <CardHomeChat path={path}>
      <Flex p="0" m="0" direction="row" alignItems="center">
        <Avatar
          name={name}
          src={src}
          size="md"
          fontWeight="bold"
          pt="3px"
          fontSize="sm"
        />
        <Text
          color="yellow.5"
          as="b"
          overflow="hidden"
          pl="1rem"
          pr="1rem"
          maxH="1rem"
          textOverflow="ellipsis"
        >
          {name}
        </Text>
        <Spacer />
        <Flex direction="column" alignItems="end" >
          <Text color="yellow.3" overflow="hidden" fontSize={"12px"} pb="4px">
            {outputDate2}
          </Text>
          <Text color="yellow.3" overflow="hidden" fontSize={"12px"}>
            {outputDate1}
          </Text>
        </Flex>
      </Flex>
    </CardHomeChat>
  );
};

export default CardHistoryChat;
