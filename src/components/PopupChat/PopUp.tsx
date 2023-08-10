import React, { FC } from 'react';
import "~/pages/_app"
import {
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

interface PopupProps {
  content1: string;
  content2: string;
  content3: string;
  content4: string;
}

const PopUp: FC<PopupProps> = ({ content1, content2, content3, content4 }) => {
  return (
    <Flex
      display= "flex"
      width= "304px"
      paddingTop= "50px"
      paddingBottom= "50px"
      flexDirection= "column"
      justifyContent= "center"
      alignItems= "center"
      gap= "40px"
      borderRadius= "20px"
      background= "#1F1F2E"
      boxShadow= "0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
    >
      <Text
        color= "yellow.4"
        textAlign= "center"
        fontFamily= "SomarRounded-Bold"
        fontSize= "32px"
        fontStyle= "normal"
        fontWeight= "700"
        lineHeight= "100%" /* 32px */
        letterSpacing= "-0.32px"
      >{content1}
      <br/>
      {content2}
      <br/>
      {content3}
      <br/>
      {content4}
      </Text>
      <Flex
        display= "flex"
        flexDirection= "column"
        alignItems= "center"
        gap= "32px"
      >
        <Button
          display= "flex"
          padding= "12px 90px"
          justifyContent= "center"
          alignItems= "center"
          alignContent= "center"
          gap= "12px"
          alignSelf= "stretch"
          flexWrap= "wrap"
          borderRadius= "12px"
          background= "yellow.5"
          cursor= "pointer"
        >
          <Text
            color= "purple.2"
            textAlign= "center"
            fontFamily= "SomarRounded-Bold"
            fontSize= "16px"
            fontStyle= "normal"
            fontWeight= "700"
            lineHeight= "150%" /* 24px */
          >Kembali</Text>
          </Button>
      </Flex>
    </Flex>
  )
}

export default PopUp