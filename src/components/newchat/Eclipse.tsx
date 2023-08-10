import React from "react";
import { Container, Flex, Text, Image, Box } from "@chakra-ui/react";


type EclipseProps = {
  num : string
}
const Eclipse = ({num,...rest} : EclipseProps) => {
  return (
    <Box
      display="flex"
      borderRadius={"50%"}
      borderColor="yellow.5"
      backgroundColor={"gray.600"}
      width={"55px"}
      height={"55px"}
      justifyContent="center"
      alignItems="center"
      border="2px solid #FFE655"
      gap={"10px"}
      {...rest}
    >
      <Text
        textAlign="center"
        fontSize="35px"
        fontWeight={"700px"}
        color="yellow.4"
        fontFamily="SomarRounded-Bold"
      >
        {num}
      </Text>
    </Box>
  );
};

export default Eclipse;
