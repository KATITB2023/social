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
} from "@chakra-ui/react";
import ProfilePicture from "./ProfilePicture";
import { uploadFile } from "~/utils/file";

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
  setCroppedImage,
  nim,
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
  const cdnURL = `https://cdn.oskmitb.com/${nim}`;

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
        <DrawerHeader>Crop Image</DrawerHeader>
        <DrawerBody>
          <Flex flexDir="column">
            <Button onClick={onClose}> Cancel </Button>
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
                  containerStyle: { width: "100%", aspectRatio: "100%" },
                  mediaStyle: { width: "100%", aspectRatio: "100%" },
                }}
              />
            </Box>
            <Button onClick={updateCurrPreview}> Preview Profile </Button>
            <Box width="164px" aspectRatio={"1/1"}>
              {currPreview && (
                <ProfilePicture
                  src={URL.createObjectURL(currPreview)}
                  size="164px"
                  br="full"
                />
              )}
            </Box>
            <Button
              onClick={() => {
                onClose();
                setCroppedImage(currPreview);
                void updateImage(currPreview as File);
              }}
            >
              {" "}
              Submit!
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
