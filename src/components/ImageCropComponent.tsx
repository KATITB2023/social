import { Box, Button, Image } from "@chakra-ui/react";
import React, { useRef, useCallback, useState } from "react";

const MAX_H = 375;
const MAX_W = 375;

const ImageCropComponent = ({ img }: { img: any }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box h={"full"} w={"full"} maxH={MAX_H} maxW={MAX_W} display={"flex"} position={"relative"} overflow={"hidden"}>

        {img ? (
          <Image position={"absolute"} src={img} />
        ) : (
          <Box position={"absolute"} h={"full"} w={"full"} backgroundColor={"black"} color={"white"}/>
        )}

        <Image position={"absolute"} src={"/components/photoGrid.svg"} />

      </Box>
    </Box>
  );
};

export default ImageCropComponent;
