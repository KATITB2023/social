import React from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

interface DynamicProps extends ButtonProps {
  borderColor?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
}

const MatchButton: React.FC<DynamicProps> = ({
  borderColor,
  backgroundColor,
  width = "119px",
  height = "48px",
  children,
  ...rest
}) => {
  return (
    <Button
      width={width}
      height={height}
      borderRadius={"12px"}
      backgroundColor={backgroundColor}
      border="2px solid"
      borderColor={borderColor}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MatchButton;
