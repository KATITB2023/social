import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import PopupWithBlackOverlay from "../PopupWithBlackOverlay";
import { api } from "~/utils/api";

export const PopupInputCode = ({
  isOpen,
  onClose,
  unitId,
  setVisitedSuccess,
  setVisitedFail,
}: {
  isOpen: boolean;
  onClose: () => void;
  unitId: string;
  setVisitedSuccess: Dispatch<SetStateAction<boolean>>;
  setVisitedFail: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const visitMutation = api.showcase.visitUnit.useMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if(inputValue.length <= 6) {
      setInputValue(newValue);
      setIsInputValid(newValue.trim() !== "");
    }
  };

  const handleSubmit = () => {
    if (isInputValid) {
      visitMutation.mutate(
        { unitId: unitId, pin: inputValue },
        {
          onError() {
            setVisitedFail(true);
          },
          onSuccess() {
            setVisitedSuccess(true);
          },
        }
      );

      onClose();
    }
  };

  return (
    <PopupWithBlackOverlay
      open={isOpen}
      setClose={() => onClose()}
      opacity={0.85}
    >
      <Flex
        direction="column"
        alignItems="center"
        padding="40px 23px 80px 23px"
        maxW={"90%"}
        mx={"auto"}
      >
        <Text
          width="100%"
          textAlign="center"
          textShadow="0px 4px 30px #72D8BA"
          fontFamily="Bodwars"
          fontSize="H5"
          fontWeight="400"
          lineHeight="120%"
          fontStyle="normal"
          color="yellow.5"
          marginBottom="6px"
        >
          INPUT CODE
        </Text>
        <Text fontWeight="400" lineHeight="150%" size="B5" whiteSpace="nowrap">
          Silakan tanya kode unik ke pihak terkait （◕ヮ◕)ﾉ*:･ﾟ✧
        </Text>
        <Box position="relative" width="100%" height="100%">
          <Image
            src="/Rectangle 1.svg"
            width="100%"
            height="75%"
            position="absolute"
            zIndex="1"
            alt=""
          />
          <Image
            src="/Vector 2.svg"
            width="100%"
            height="100%"
            position="relative"
            zIndex="2"
            style={{ transform: "translateY(-20px)" }}
            alt=""
          />
          <Image
            src="/Bulan 1 glow 1.svg"
            width="100%"
            maxHeight="139px"
            position="absolute"
            zIndex="3"
            style={{ transform: "translateY(-160px)" }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "4",
              textAlign: "center",
              width: "100%",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={{
                background: "rgba(0, 0, 0, 0)",
                border: "none",
                textAlign: "center",
                outline: "none",
                transform: "translateY(-41px)",
                padding: "10px",
                width: "80%",
                maxWidth: "300px",
                fontSize: "32px",
                margin: "0 auto",
                fontFamily: "bodwars",
              }}
            />
          </div>

          <Flex display="flex" gap="16px" justifyContent="center">
            <Button
              padding="8px 24px"
              borderRadius="12px"
              background="var(--gray-color-gray-600, #2F2E2E)"
              border="2px solid var(--yellow-yellow-5, #FFFC83)"
              onClick={() => onClose()}
            >
              <Text
                color="yellow.5"
                size="B5"
                fontWeight="700"
                lineHeight="150%"
              >
                Cancel
              </Text>
            </Button>
            <Button
              onClick={handleSubmit}
              bg={
                isInputValid
                  ? "yellow.5"
                  : "var(--gray-color-gray-400, #9B9B9B)"
              }
              borderColor={
                isInputValid
                  ? "yellow.5"
                  : "var(--gray-color-gray-400, #9B9B9B)"
              }
              borderWidth="2px"
              borderStyle="solid"
              disabled={!isInputValid}
              padding="8px 24px"
              color={isInputValid ? "purple.2" : "white"}
              borderRadius="12px"
              cursor={isInputValid ? "pointer" : "not-allowed"}
            >
              <Text size="B5" fontWeight="700" lineHeight="150%">
                Submit
              </Text>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </PopupWithBlackOverlay>
  );
};
