import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "~/components/profile/cropimage";
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
  Text,
} from "@chakra-ui/react";
import ProfilePicture from "./ProfilePicture";
import { uploadFile } from "~/utils/file";
import Header from "../chat/Header";

interface ImageCropProps {
  imageFile: File;
  onCancel: () => void;
}

interface CropPosition {
  x: number;
  y: number;
}

interface CropDimension {
  width: number;
  height: number;
}

interface useDisclosureType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
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
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<CropPosition>({ x: 0, y: 0 });
  const aspect = { value: 1 / 1, text: "1/1" };
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    CropPosition & CropDimension
  >({ x: 0, y: 0, width: 0, height: 0 });

  const [currPreview, setCurrPreview] = useState<File | undefined>();
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageURL(url);

      // Clean up - revoke the object URL when it's no longer needed.
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile]);

  const onCropChange = (crop: CropPosition) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropComplete = (
    _: unknown,
    croppedAreaPixels: CropPosition & CropDimension
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function updateCurrPreview() {
    const currPreviewFile = await getCroppedImg(imageURL, croppedAreaPixels);
    setCurrPreview(currPreviewFile);
  }

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent bgColor="navy.1">
        <DrawerHeader>
          <Heading size="H4" color="yellow.5">
            Crop Image
          </Heading>
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDir="column" gap="30px" alignItems={"center"}>
            <Button
              onClick={onCancel}
              alignSelf="flex-end"
              backgroundColor="pink.3"
            >
              {" "}
              <Text size="B3" color="white">
                Cancel{" "}
              </Text>
            </Button>
            <Box aspectRatio="1 / 1" width="100%" position="relative">
              <Cropper
                image={imageURL}
                zoom={zoom}
                crop={crop}
                aspect={aspect.value}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    background: "#000",
                  },
                  cropAreaStyle: { minHeight: "100%", minWidth: "100%" },
                }}
              />
            </Box>
            <Button onClick={updateCurrPreview} alignSelf="center">
              {" "}
              Preview Profile{" "}
            </Button>
            <Box width="164px" aspectRatio={"1/1"}>
              {currPreview && (
                <ProfilePicture
                  src={URL.createObjectURL(currPreview)}
                  size="164px"
                  br="full"
                />
              )}
            </Box>

            {currPreview ? (
              <Button
                onClick={() => {
                  onClose();
                  void updateImage(currPreview);
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
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
      </DrawerContent>
    </Drawer>
  );
}
