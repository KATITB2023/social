import React from "react";
import useEmit from "~/hooks/useEmit";
import { Button } from "@chakra-ui/react";

const AnonFooterMenu = () => {
  const endMatch = useEmit("endMatch");

  const handleEndMatch = () => {
    endMatch.mutate(undefined);
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={handleEndMatch}>
        End Match
      </Button>
    </>
  );
};

export default AnonFooterMenu;
