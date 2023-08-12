import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive: boolean;
  waiting?: number;
}

const Menu = ({ children, isActive, ...props }: MenuProps) => {
    console.log(props.waiting)
    return (
    <Flex
      {...props}
      width="full"
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
      {
        props.waiting && props.waiting > 0 &&
<Text
  borderRadius="full"
  bgColor="#E8553E"
  color="yellow.5"
  width="fit-content"
  height="fit-content"
  minWidth="20px" // Set a minimum width
  minHeight="20px" // Set a minimum height
  display="flex"
  justifyContent="center"
  alignItems="center"
  fontSize="14px"
>
  {props.waiting > 99 ? "99+" : props.waiting}
</Text>

      }
    </Flex>
  );
};

export default Menu;
