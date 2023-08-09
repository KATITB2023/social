import React from 'react'
import {
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

const SatSetSatSet = () => {
  return (
    <Flex
      display= "flex"
      paddingTop= "50px"
      paddingBottom= "50px"
      width= "304px"
      flexDirection= "column"
      justifyContent= "center"
      alignItems= "center"
      gap= "40px"
      borderRadius= "20px"
    background= "#1F1F2E"
    boxShadow= "0px 4px 20px 0px rgba(255, 252, 131, 0.40)"
    >
      <Text
        alignSelf= "stretch"
        color= "yellow.4"
        textAlign= "center"
        fontFamily= "SomarRounded-Bold"
        fontSize= "32px"
        fontStyle= "normal"
        fontWeight= "700"
        lineHeight= "100%" /* 32px */
        letterSpacing= "-0.32px"
      >Satsetsatset
        <br />
        Laporanmu
        <br />
        berhasil
        <br />
        diterima tim
        <br />
        kami!
      </Text>
      <Flex
        display= "flex"
        flexDirection= "column"
        alignItems= "center"
        gap= "32px"
      >
        <Button 
          display= "flex"
          padding= "12px 32px"
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
          >Hentikan percakapan</Text>
          </Button>
      </Flex>
    </Flex>
  )
}

export default SatSetSatSet