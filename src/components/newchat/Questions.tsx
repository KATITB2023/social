import QuestionBox from "./Box";
import Eclipse from "./Eclipse";
import MatchButton from "./Button";
import {
  Text,
  Box,
  ButtonGroup,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";

const dummy = ["Jepang", "Korea", "ITB", "Film", "Makanan", "Film", "Olahraga"];
type QuestionProps = {
  handlePageChange: (page: number) => void;
};
type ThirdQuestionProps = {
  handlePageChange: (page: number) => void;
  findMatch :() =>void;
};

export const FirstQuestion: React.FC<QuestionProps> = ({
  handlePageChange,
}) => {
  return (
    <QuestionBox>
      <Eclipse num="1" />
      <Text
        fontFamily="SomarRounded-Bold"
        fontSize="30px"
        textAlign="center"
        color="yellow.4"
      >
        Mau anonim?
      </Text>
      <Box display="flex" flexDirection="row">
        {/* Set anonim atau tidak */}
        <ButtonGroup onClick={() => handlePageChange(2)}>
          <MatchButton borderColor="yellow.5" backgroundColor="gray.600">
            <Text
              fontFamily="SomarRounded-Bold"
              color="yellow.5"
              fontSize="16px"
            >
              {/* Set ke anonim */}
              Boleh
            </Text>
          </MatchButton>
          <MatchButton backgroundColor="yellow.5">
            <Text
              fontFamily="SomarRounded-Bold"
              color="purple.2"
              fontSize="16px"
            >
              {/* Set ke tidak anonim */}
              Rill Aja
            </Text>
          </MatchButton>
        </ButtonGroup>
      </Box>
    </QuestionBox>
  );
};
export const SecondQuestion: React.FC<QuestionProps> = ({
  handlePageChange,
}) => {
  return (
    <Box
      width="370px"
      backgroundColor=""
      height="600px"
      maxH="60vh"
      display="flex"
      flexDirection="column"
      padding={0}
      alignItems={"center"}
      gap={"20px"}
    >
      <QuestionBox
        maxW="100%"
        width="326px"
        maxHeight="90px"
        display={"flex"}
        flexDirection={"row"}
        gap={"16px"}
        paddingX={"24px"}
        paddingY={"24px"}
      >
        <Eclipse num="2" />
        <Text
          fontFamily={"SomarRounded-Bold"}
          color={"yellow.4"}
          fontSize="20px"
        >
          Pilih Topik Kuy!
        </Text>
      </QuestionBox>
      <QuestionBox
        maxW={"90%"}
        maxH={"80%"}
        width="255px"
        minHeight="250px"
        height={"70%"}
        paddingX="30px"
        paddingY="30px"
        gap="40px"
      >
        <Box
          display="flex"
          flexDirection="column"
          overflowY={"scroll"}
          maxH={"100%"}
          width={"216px"}
          height={"358px"}
          maxW={"90%"}
          gap={"20px"}
          sx={{
            "::-webkit-scrollbar": {
              width: "11px",
            },
            "::-webkit-scrollbar-track": {
              background: "#2F2E2E",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#FFE655",
              borderRadius: "5px",
            },
          }}
        >
          {dummy.map((item) => {
            return (
              <Box
                width={"154px"}
                minHeight={"55px"}
                paddingX={"20px"}
                paddingY={"10px"}
                gap={"12px"}
                key={item}
                backgroundColor="gray.600"
                borderStyle={"solid"}
                borderWidth={"2px"}
                borderColor={"yellow.5"}
                borderRadius={"12px"}
                alignContent={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Text
                  alignSelf={"center"}
                  fontFamily={"SomarRounded-Bold"}
                  color={"yellow.5"}
                >
                  {item}
                </Text>
              </Box>
            );
          })}
        </Box>
      </QuestionBox>
      <ButtonGroup gap="20px">
        <MatchButton
          borderColor="yellow.5"
          backgroundColor="gray.600"
          onClick={() => handlePageChange(1)}
        >
          <Text fontFamily="SomarRounded-Bold" color="yellow.5" fontSize="16px">
            {/* Set ke anonim */}
            Kembali
          </Text>
        </MatchButton>
        <MatchButton backgroundColor="yellow.5">
          <Text
            fontFamily="SomarRounded-Bold"
            color="purple.2"
            fontSize="16px"
            onClick={() => handlePageChange(3)}
          >
            {/* Set ke tidak anonim */}
            Lanjut!
          </Text>
        </MatchButton>
      </ButtonGroup>
    </Box>
  );
};

export const ThirdQuestion: React.FC<ThirdQuestionProps> = ({
  handlePageChange,
  findMatch
}) => {
  return (
    <Box
      width="370px"
      height="600px"
      maxH="60vh"
      display="flex"
      flexDirection="column"
      padding={0}
      alignItems={"center"}
      gap={"10px"}
    >
      <QuestionBox
        w={"336px"}
        maxH={"478px"}
        gap="20px"
        paddingX={"30px"}
        paddingY="30px"
        display={"flex"}
        justifyContent={"start"}
      >
        <Box width={"100%"} position="relative" cursor={"pointer"}>
          <Image
            src="BackButton.svg"
            alt="Back Button"
            position={"absolute"}
            top={0}
            left={0}
            onClick={() => handlePageChange(2)}
          />
        </Box>
        <Box marginTop={2}>
          <Eclipse num="3" />
        </Box>
        <Box display="flex" flexDirection="column" gap="30px">
          <Text
            fontFamily="SomarRounded-Bold"
            fontSize="30px"
            textAlign="center"
            color="yellow.4"
          >
            Lagi nyari jodoh?
          </Text>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box
              border={"2px solid #FFFC83"}
              backgroundColor="#2F2E2E"
              paddingX="28px"
              paddingY="10px"
              borderRadius="12px"
              w="282px"
              maxW="100%"
              alignSelf={"center"}
            >
              <Text
                fontSize={"16px"}
                color={"yellow.5"}
                fontFamily={"SomarRounded-Bold"}
                alignSelf={"center"}
                textAlign={"center"}
              >
                Makcomblangin donk hehe
              </Text>
            </Box>
            <Box
              backgroundColor="yellow.5"
              borderRadius="12px"
              paddingX="28px"
              paddingY="10px"
              w="282px"
              maxW="100%"
              alignSelf={"center"}
            >
              <Text
                fontSize="16px"
                color="purple.2"
                fontFamily="SomarRounded-Bold"
                alignSelf={"center"}
                textAlign={"center"}
              >
                Lagi nyari bestie nih!
              </Text>
            </Box>
          </Box>
        </Box>
      </QuestionBox>
      <Box
        zIndex={10}
        backgroundColor={"#E8553E"}
        borderRadius={"12px"}
        paddingY="10px"
        paddingX={"24px"}
        cursor="pointer"
        onClick={()=>findMatch()}
      >
        <Text
          fontSize={"28px"}
          color={"yellow.5"}
          fontFamily={"SomarRounded-Bold"}
        >
          Start Finding!
        </Text>
      </Box>
    </Box>
  );
};
