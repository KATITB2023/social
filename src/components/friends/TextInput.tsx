import {
  InputGroup,
  InputLeftElement,
  Input,
  type InputProps,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React from "react";

interface TextInputProps extends InputProps {
  placeholder: string;
  onEnter?: (e: React.KeyboardEvent) => void;
}

const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" color="white">
        <Search2Icon />
      </InputLeftElement>
      <Input
        color="gray.300"
        _hover={{
          color: "white",
        }}
        _focus={{
          boxShadow: "0 0 10px yellow",
          focusBorderColor: "gray.300",
          color: "white",
        }}
        type="text"
        bgColor="#4A58F680"
        opacity="90%"
        borderRadius="xl"
        borderColor="transparent"
        _placeholder={{
          color: "inherit",
          fontSize: "14px",
        }}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onEnter}
        placeholder={props.placeholder}
        _invalid={{
          borderColor: "red.300",
          borderWidth: "2px",
        }}
      />
    </InputGroup>
  );
};

export default TextInput;
