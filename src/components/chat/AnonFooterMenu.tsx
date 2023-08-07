import React from "react";
import useEmit from "~/hooks/useEmit";
import { Button, Flex, useToast } from "@chakra-ui/react";

const AnonFooterMenu = () => {
  const toast = useToast();

  const endMatch = useEmit("endMatch");
  const askReveal = useEmit("askReveal");

  const handleEndMatch = () => {
    endMatch.mutate(undefined);
  };

  const handleAskReveal = () => {
    askReveal.mutate({ agree: true });
    toast({
      title: "Berhasil request teman untuk reveal profil!",
    });
  };

  return (
    <>
      <Flex direction="column">
        <Button colorScheme="teal" size="sm" onClick={handleEndMatch}>
          End Match
        </Button>
        <Button colorScheme="teal" size="sm" onClick={handleAskReveal}>
          Ask Reveal
        </Button>
      </Flex>
    </>
  );
};

export default AnonFooterMenu;
