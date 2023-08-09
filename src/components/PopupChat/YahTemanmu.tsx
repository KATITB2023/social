import React from 'react'
import {
  Button,
  Flex,
  Text
} from "@chakra-ui/react";

const YahTemanmu = () => {
  return (
    <Flex
      display= "flex"
      width= "266px"
      height= "376px"
      flexDirection= "column"
      justifyContent= "center"
      alignItems= "center"
      gap= "40px"
      borderRadius= "20px"
      background= "#1F1F2E"
      boxShadow= "0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
    >
      <Flex
        color= "yellow.4"
        textAlign= "center"
        fontFamily= "SomarRounded-Bold"
        fontSize= "24px"
        fontStyle= "normal"
        fontWeight= "700"
        lineHeight= "24px" /* 100% */
        letterSpacing= "-0.24px"
      >
        <p>Yah temanmu mengakhiri percakapan nih
        <br />
        =”(
        </p>
      </Flex>
      <Flex
        display= "flex"
        padding= "12px 2px"
        justifyContent= "center"
        alignItems= "center"
        gap= "10px"
        borderRadius= "4px"
        background= "yellow.5"
        cursor= "pointer"
      >
        <Text
          color= "purple.2"
          fontFamily= "Somar Rounded"
          fontSize= "16px"
          fontStyle= "normal"
          fontWeight= "700"
          lineHeight="24px" /* 150% */
          letterSpacing= "-0.16px"
        >Kembali ke Find Match</Text>
      </Flex>
      <Text
        color= "white"
        textAlign= "center"
        fontFamily= "SomarRounded-Regular"
        fontSize= "14px"
        fontStyle= "normal"
        fontWeight= "400"
        lineHeight= "24px" /* 171.429% */
      >p.s. Rekaman percakapan ini
          <br />
          ini otomatis tersimpan
          <br />
          di History-mu ya!
      </Text>
    </Flex>
  )
}

export default YahTemanmu