import { Box, Button, Image } from "@chakra-ui/react";
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { MdCameraswitch } from "react-icons/md"

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const MAX_H = 375;
const MAX_W = 375;

const constraints = {
  width: MAX_W,
  height: MAX_H,
  facingMode: FACING_MODE_USER,
};

const WebcamComponent = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webCamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
  }, [webCamRef]);

  const switchCam = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box maxH={MAX_H} maxW={MAX_W} display={"flex"} position={"relative"}>
        <Webcam
          audio={false}
          mirrored={true}
          ref={webCamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ ...constraints, facingMode }}
        />
        <Image position={"absolute"} src={"/components/photoGrid.svg"} />

        <Button position={"absolute"} borderRadius={"full"} bottom={3} right={3} onClick={switchCam} padding={0}>
            <MdCameraswitch size={20}/>
        </Button>
      </Box>

      {/* <Button onClick={capture}>Capture Photo</Button> */}
    </Box>
  );
};

export default WebcamComponent;
