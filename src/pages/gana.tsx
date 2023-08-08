import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { ProfilePicture } from "./profile";
import ImageCropDrawer from "~/components/profile/ImageCropDrawer";

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

export default function Gana() {
  return (
    <>
      <ImageCropDrawer
        imageURL="/feeds-image-example.png"
        onCancel={onCancel}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Button onClick={onOpen}>Open</Button>
    </>
  );
}
