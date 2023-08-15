import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive: boolean;
  waiting?: number;
}

const Menu = ({ children, isActive, waiting }: MenuProps) => {
  return (
    <Flex
      width="6rem"
      paddingBottom="6px"
      justifyContent="center"
      gap="2"
      alignItems="center"
      borderBottomColor={isActive ? "yellow.5" : "transparent"}
      borderBottomWidth={isActive ? "2px" : "0px"}
    >
      <Text
        fontWeight="semibold"
        fontSize="14px"
        textAlign="center"
        color={isActive ? "yellow.5" : "white"}
      >
        {children}
      </Text>
        <Text
          borderRadius="full"
          bgColor="#E8553E"
          color="yellow.5"
          width="fit-content"
          height="fit-content"
          minWidth="20px"
          minHeight="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="14px"
          hidden={waiting === 0 || waiting === undefined}
        >
          {waiting}
        </Text>
    </Flex>
  );
};

export default Menu