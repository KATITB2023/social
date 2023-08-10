import React from "react";
import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

interface DynamicBoxProps extends BoxProps {
  width?: string | number;
  height?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
}


export const QuestionBox: React.FC<DynamicBoxProps> = ({
  width,
  height,
  paddingY = "36px",
  paddingX = "40px",
  children,
  ...rest
}) => {
  return (
    <Box
      zIndex={"10"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={width}
      height={height}
      backgroundColor={"#1F1F2E"}
      borderRadius={"20px"}
      paddingY={paddingY}
      paddingX={paddingX}
      gap={"40px"}
      boxShadow = "0px 4px 20px rgba(255, 252, 131, 0.4)"
      {...rest}
    >
      {children}
    </Box>
  );
};


export default QuestionBox;
