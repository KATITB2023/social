import React, { useState } from "react";
import WebcamComponent from "./WebcamComponent";
import ImageCropComponent from "./ImageCropComponent";
import { Box, Image, Text } from "@chakra-ui/react";

export const SelectImage = () => {
  const [cameraOpen, setCameraOpen] = useState(true);
  const [currentImage, setCurrentImage ] = useState(null);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      h={"full"}
      backgroundColor={"navy.1"}
    >
      {/* Topbar */}
      <Box
        display={"flex"}
        paddingY={"16px"}
        paddingX={"24px"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image src="/components/closeButton.svg" w={"24px"} />
        <Image src="/components/nextArrow.svg" w={"24px"} />
      </Box>

      {/* Grid Component */}
      {cameraOpen
        ? <WebcamComponent />
        : <ImageCropComponent img={currentImage} />
      }

      {/* Image Selection */}
      <Box>
        <Box
          display={"flex"}
          paddingY={"16px"}
          paddingX={"24px"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color={"white"}> Temporary Text </Text>
          <Image onClick={() => setCameraOpen(!cameraOpen)} src="/components/camera.svg" w={"24px"} />
        </Box>
      </Box>
    </Box>
  );
};
