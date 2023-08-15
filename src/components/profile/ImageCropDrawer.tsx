import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TRPCClientError } from "@trpc/client";
import React, { useEffect, useRef, useState } from "react";
import type { Crop, PixelCrop } from "react-image-crop";
import { ReactCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCroppedImg from "~/components/profile/cropimage";
import ProfilePicture from "./ProfilePicture";

interface ImageCropProps {
  imageFile: File;
  onCancel: () => void;
}

interface useDisclosureType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      1,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropDrawer({
  imageFile,
  onCancel,
  isOpen,
  onOpen,
  onClose,
  updateImage,
}: ImageCropProps &
  useDisclosureType & {
    setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
    nim: string;
    updateImage: (file: File) => Promise<void>;
  }) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const [currPreview, setCurrPreview] = useState<File | undefined>();
  const [imageURL, setImageURL] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageURL(url);

      // clean up
      return () => {
        // URL.revokeObjectURL(url);
      };
    }
  }, [imageFile]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  }

  const toast = useToast();
  async function updateCurrPreview() {
    if (!imageRef.current || !completedCrop) return;
    try {
      const currPreviewFile = await getCroppedImg(
        imageRef.current,
        completedCrop
      );
      setCurrPreview(currPreviewFile);
    } catch (e: unknown) {
      if (!(e instanceof TRPCClientError)) throw e;
      toast({
        title: "Failed",
        status: "error",
        description: "Please try again.",
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Drawer
      placement="bottom"
      onClose={() => {
        onCancel();
        setCurrPreview(undefined);
      }}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        justifyContent={"center"}
        flexDirection={"row"}
        background={"transparent"}
      >
        <Box bgColor="navy.1" maxW={"500px"} width={"full"}>
          <DrawerHeader>
            <Flex flexDir="row" justifyContent={"space-between"}>
              <Heading size="H4" color="yellow.5">
                Crop Image
              </Heading>
              <Button
                onClick={() => {
                  onCancel();
                  setCurrPreview(undefined);
                }}
                alignSelf="flex-end"
                backgroundColor="pink.3"
              >
                <Text size="B3" color="white">
                  Cancel
                </Text>
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column" gap="30px" alignItems={"center"}>
              <Flex
                justifyContent={"center"}
                position="relative"
                width={"50%"}
                aspectRatio={"1 / 1"}
                background={"black"}
              >
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1 / 1}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Image
                    ref={imageRef}
                    src={imageURL}
                    alt="crop"
                    objectFit={"contain"}
                    objectPosition={"center"}
                    width={"100%"}
                    height={"100%"}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </Flex>
              <Button
                onClick={() => {
                  void updateCurrPreview();
                }}
                alignSelf="center"
              >
                {" "}
                Preview Profile{" "}
              </Button>
              <Box width="164px" aspectRatio={"1/1"}>
                {currPreview && (
                  <ProfilePicture
                    src={URL.createObjectURL(currPreview)}
                    size={164}
                    br="full"
                  />
                )}
              </Box>

              {currPreview ? (
                <Button
                  onClick={() => {
                    onClose();
                    void updateImage(currPreview);
                    setCurrPreview(undefined);
                  }}
                  backgroundColor={"yellow.5"}
                >
                  {" "}
                  Set Profile!
                </Button>
              ) : null}
            </Flex>
          </DrawerBody>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
