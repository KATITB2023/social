import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropimage";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

interface ImageCropProps {
  imageURL: string;
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

export default function Gana({ imageURL, onCancel }: ImageCropProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<CropPosition>({ x: 0, y: 0 });
  const aspect = { value: 1 / 1, text: "1/1" };
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    CropPosition & CropDimension
  >({ x: 0, y: 0, width: 0, height: 0 });

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageURL, croppedAreaPixels);
    setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
  };
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={true} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>"Crop Image"</DrawerHeader>
        <DrawerBody>
          <Button onClick={onClose}> Cancel </Button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Consequat nisl vel pretium lectus quam id. Semper quis lectus nulla
            at volutpat diam ut venenatis. Dolor morbi non arcu risus quis
            varius quam quisque. Massa ultricies mi quis hendrerit dolor magna
            eget est lorem. Erat imperdiet sed euismod nisi porta. Lectus
            vestibulum mattis ullamcorper velit.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
