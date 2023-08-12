import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React from "react";

const TextInput = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        sx={{
          color: "gray.300",
          _groupFocus: {
            color: "yellow",
          },
        }}
      >
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
        placeholder="add or search friend"
        _invalid={{
          borderColor: "red.300",
          borderWidth: "2px",
        }}
      />
    </InputGroup>
  );
};

export default TextInput;
