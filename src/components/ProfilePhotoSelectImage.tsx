import React, { useState } from "react";
import WebcamComponent from "./WebcamComponent";
import { Box, Image, Text, Button, Collapse} from "@chakra-ui/react";

export const ProfilePhotoSelectImage = ({
  open,
  setOpen,
  changeImage
}: {
  open: boolean;
  setOpen: any;
  changeImage : any;
}) => {
  const [pictureSelected, setPictureSelected] = useState(false);
  const [image, setImage] = useState<any>(undefined);

  function onImageChange(file: FileList) {
    if (file[0]){
        setPictureSelected(true);
        setImage(URL.createObjectURL(file[0]!));
        // console.log(image)
    }
  }

  return (
    <Box zIndex={10}>
      <Collapse in={open} animateOpacity>
        <Box
          display={"flex"}
          w={"full"}
          mx={"auto"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          {/* Black Layer */}
          <Box
            position={"absolute"}
            background={"black"}
            h={"full"}
            w={"full"}
            maxW={"375px"}
            top={0}
            opacity={0.5}
            onClick={() => setOpen(false)}
          />

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"fixed"}
            bottom={0}
            background={"purple.1"}
            height={"274px"}
            w={"full"}
            maxW={"375px"}
            padding={"10px"}
            gap={"30px"}
          >
            <Box
              display={"flex"}
              flexDir={"row"}
              w={"full"}
              justifyContent={"space-between"}
            >
              <Text fontWeight={700} size={"SH5"} color={"white"}>
                {" "}
                Profile photo{" "}
              </Text>
              <Box display={"flex"} gap={"15px"}>
                <Image
                  onClick={() => {changeImage(undefined); setOpen(false)}}
                  src="/components/trashbin.svg"
                />
                <Image
                  onClick={() => setOpen(false)}
                  src="/components/closeButton.svg"
                />
              </Box>
            </Box>

            <Box
              w={"220px"}
              h={"119px"}
              background={"transparent"}
              borderStyle={"dotted"}
              borderRadius={"10px"}
              borderWidth={"1px"}
              borderColor={"white"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Image src="/components/addFile.svg" />

              <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
                <Button
                  backgroundColor={"yellow.5"}
                  borderRadius={"12px"}
                  width={"112px"}
                  height={"34px"}
                >
                  <label htmlFor="img">
                    <Text fontWeight={700} color={"purple.2"} size={"SH5"}>
                      {" "}
                      Select File{" "}
                    </Text>
                  </label>
                </Button>

                <input
                    hidden
                  type="file"
                  id="img"
                  accept="image/*"
                  onChange={(e) => onImageChange(e.target.files!)}
                />

                {pictureSelected ? (
                  <Text size={"B5"} fontWeight={400} color={"green.3"}>
                    {" "}
                    Selected file{" "}
                  </Text>
                ) : (
                  <Text size={"B5"} fontWeight={400} color={"yellow.1"}>
                    {" "}
                    No file chosen{" "}
                  </Text>
                )}
              </Box>
            </Box>

            <Button
              borderRadius={"12px"}
              w={"123px"}
              h={"48px"}
              background={pictureSelected ? "yellow.1" : "gray.400"}
              onClick={() => {
                pictureSelected && changeImage(image); setOpen(false); setPictureSelected(false); 
              }}
            >
              <Text fontWeight={700} color={"white"} size={"SH5"}>
                {" "}
                Submit{" "}
              </Text>
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
