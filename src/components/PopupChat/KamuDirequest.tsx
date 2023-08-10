import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { type UserMatch } from "@prisma/client";
import useEmit from "~/hooks/useEmit";

const KamuDirequest = ({
  setOpen,
  match
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  match : UserMatch | null;
}) => {

  const askReveal = useEmit("askReveal");
  const handleAskReveal = (choice: boolean) => {
    if (match) {
      askReveal.mutate({ agree: choice });
      setOpen(false);
    }
  };

  return (
    <Flex
      display="flex"
      width="304px"
      height="379px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="40px"
      borderRadius="20px"
      background="#1F1F2E"
      boxShadow="0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
    >
      <Text
        color="yellow.4"
        textAlign="center"
        fontFamily="SomarRounded-Regular"
        fontSize="32px"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="100%" /* 32px */
        letterSpacing="-0.32px"
      >
        Kamu 
        <br />
        direquest
        <br />
        untuk reveal
        <br />
        profil nih!
      </Text>
      <Flex gap="20px">
        <Button
          width="119.5px"
          padding="23px 60px"
          justifyContent="center"
          alignItems="center"
          gap="12px"
          borderRadius="12px"
          border="2px"
          borderColor="yellow.5"
          background="gray.600"
          onClick={() => {
            handleAskReveal(false);
          }}
        >
          <Text
            color="yellow.5"
            fontFamily="SomarRounded-Bold"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="150%" /* 24px */
          >
            Malu nih
          </Text>
        </Button>

        <Button
          display="flex"
          width="119.5px"
          padding="24.5px 60px"
          justifyContent="center"
          alignItems="center"
          gap="12px"
          borderRadius="12px"
          background="yellow.5"
          onClick={() => {
            handleAskReveal(true);
          }}
        >
          <Text
            color="purple.2"
            fontFamily="SomarRounded-Bold"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="150%" /* 24px */
          >
            Gaskeun
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default KamuDirequest;
