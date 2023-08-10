import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Collapse,
  useToast,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { sanitizeURL, uploadFile } from "~/utils/file";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import ImageCropDrawer from "./ImageCropDrawer";

export const SelectPhotoImageProfile = ({
  open,
  setOpen,
  changeImage,
  nim,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  nim: string;
}) => {
  const [pictureSelected, setPictureSelected] = useState(false);
  const [imageSelected, setImageSelected] = useState<File | undefined>(
    undefined
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string>("");

  const utils = api.useContext();
  const toast = useToast();
  const profileMutaion = api.profile.editProfile.useMutation({
    onSuccess(): void {
      void utils.profile.getUserProfile.invalidate();
    },
  });

  function onImageChange(file: FileList) {
    if (file[0]) {
      setPictureSelected(true);
      setImageSelected(file[0]);
      onOpen();
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  function onCancel() {
    onClose();
  }

  async function updateImage(file: File) {
    if (!file) return;
    const url = sanitizeURL(`https://cdn.oskmitb.com/${nim}`);
    try {
      setIsUpdating(true);
      await uploadFile(url, file, (progressEvent) => {
        if (progressEvent.loaded == progressEvent.progress) {
        }
      });
      const res = await profileMutaion.mutateAsync({
        image: url,
      });
      toast({
        title: "Success",
        status: "success",
        description: res.message,
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (e: unknown) {
      if (!(e instanceof TRPCClientError)) throw e;
      toast({
        title: "Failed",
        status: "error",
        description: e.message,
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  }

  return (
    <>
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
                    onClick={() => {
                      changeImage(undefined);
                      setOpen(false);
                    }}
                    src="/components/trashbin.svg"
                    alt="trash icon"
                  />
                  <Image
                    onClick={() => setOpen(false)}
                    src="/components/closeButton.svg"
                    alt="close icon"
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
                <Image src="/components/addFile.svg" alt="add file" />

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
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        onImageChange(files);
                      }
                    }}
                  />

                  {pictureSelected ? (
                    <ImageCropDrawer
                      imageFile={imageSelected as File}
                      onCancel={onCancel}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      setCroppedImage={setCroppedImage}
                      nim={nim}
                    />
                  ) : null}
                </Box>
              </Box>

              <Button
                borderRadius={"12px"}
                w={"123px"}
                h={"48px"}
                background={pictureSelected ? "yellow.1" : "gray.400"}
                onClick={() => {
                  setOpen(false);
                  pictureSelected && void updateImage(croppedImageFile as File);
                  setPictureSelected(false);
                }}
              >
                {isUpdating ? (
                  <Spinner />
                ) : (
                  <Text fontWeight={700} color={"white"} size={"SH5"}>
                    {" "}
                    Submit{" "}
                  </Text>
                )}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <ImageCropDrawer
        imageFile={imageSelected as File}
        onCancel={onCancel}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setCroppedImage={setCroppedImage}
        nim={nim}
      />
    </>
  );
};
