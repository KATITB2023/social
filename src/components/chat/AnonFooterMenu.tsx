import React from "react";
import useEmit from "~/hooks/useEmit";
import { Button } from "@chakra-ui/react";

const AnonFooterMenu = () => {
  const endMatch = useEmit("endMatch");
  const askReveal = useEmit("askReveal");

  const handleEndMatch = () => {
    endMatch.mutate(undefined);
  };

  const handleAskReveal = () => {
    askReveal.mutate({ agree: true });
  };

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={handleEndMatch}>
        End Match
      </Button>
      <Button colorScheme="teal" size="sm" onClick={handleAskReveal}>
        Ask Reveal
      </Button>
    </>
  );
};

export default AnonFooterMenu;
