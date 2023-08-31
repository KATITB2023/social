import { Text, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmRequestPopup } from "./ConfirmRequestPopup";
import { RequestBerhasilPopup } from "./RequestBerhasilPopup";


const Request = () => {
  const [canBuy, setCanBuy] = useState(true);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [berhasilPopup, setBerhasilPopup] = useState(false);

  const handleSubmitRequest = () => {
    setConfirmPopup(false);
    setBerhasilPopup(true);
  }
  
  return (
    <Flex
      position={"fixed"}
      bottom={0}
      w={"95%"}
      maxW={"450px"}
      h={"auto"}
      py={4}
      px={8}
      background="#1D0263"
      boxShadow="0px 0px 15px #FFFC83"
      borderRadius={16}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="space-between"
      gap={2}
      zIndex={3}
    >
      <Flex justifyContent="space-between" alignItems="center" gap={4}>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          gap={8}
          display="flex"
        >
          <Text
            color="#FFFC83"
            fontSize={12}
            fontFamily="SomarRounded-Regular"
            fontWeight="700"
            wordBreak="break-word"
          >
            Jumlah Koinmu
          </Text>
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            gap={4}
            display="flex"
          >
            <Text
              color="#FFFC83"
              fontSize={12}
              fontFamily="SomarRounded-Regular"
              fontWeight="700"
              wordBreak="break-word"
            >
              3000
            </Text>
          </Flex>
        </Flex>
        <Flex
          padding={2}
          // background="linear-gradient(0deg, white 0%, white 100%)"
          background={
            canBuy
              ? "linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF;"
              : "linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF"
          }
          borderRadius={12}
          overflow="hidden"
          border={canBuy ? "0.46px #1C939A solid" : "0.46px #E8553E solid"}
          justifyContent="center"
          alignItems="center"
          gap={12}
          display="flex"
        >
          <Text
            color={canBuy ? "#1C939A" : "#E8553E"}
            fontSize={10}
            fontFamily="SomarRounded-Regular"
            fontWeight="700"
            wordBreak="break-word"
          >
            {canBuy ? "Koin mencukupi!" : "Koin tidak mencukupi!"}
          </Text>
        </Flex>
      </Flex>
      <Text
        alignSelf="stretch"
        color="white"
        fontSize={12}
        fontFamily="SomarRounded-Regular"
        fontWeight="400"
        wordBreak="break-word"
      >
        {canBuy
          ? "Silakan tukarkan dengan merchandise!"
          : "Silakan lakukan challenge di booth untuk tambahan koin!"}
      </Text>
      <Flex justifyContent="space-between" alignItems="flex-start" gap={4}>
        <Text
          color="white"
          fontSize={16}
          fontFamily="SomarRounded-Regular"
          fontWeight="700"
        >
          21 Barang
        </Text>
        <Text
          color={canBuy ? "#C0EACA" : "#E8553E"}
          fontSize={16}
          fontFamily="SomarRounded-Regular"
          fontWeight="700"
          wordBreak="break-word"
        >
          6300 Coins
        </Text>
      </Flex>
      <Button
        alignSelf="stretch"
        padding={2}
        background="#FFFC83"
        borderRadius={12}
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        gap={12}
        isDisabled={!canBuy}
        onClick={() => setConfirmPopup(true)}
      >
        <Text
          color="#4909B3"
          fontSize={12}
          fontFamily="SomarRounded-Regular"
          fontWeight="700"
        >
          Request
        </Text>
      </Button>
      {confirmPopup && (
        <ConfirmRequestPopup
          open={confirmPopup}
          setCloseWindow={() => setConfirmPopup(false)}
          onSubmit={handleSubmitRequest}
        />
      )}

      {berhasilPopup && (
        <RequestBerhasilPopup
          open={berhasilPopup}
          setClose={() => setBerhasilPopup(false)}
          coinDecreased={900}
        />
      )}
    </Flex>
  );
};
export default Request;
