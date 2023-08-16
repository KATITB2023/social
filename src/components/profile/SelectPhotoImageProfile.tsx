import {
  Box,
  Button,
  Collapse,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TRPCClientError } from "@trpc/client";
import React, { useRef, useState } from "react";
import { api } from "~/utils/api";
import { sanitizeURL, uploadFile } from "~/utils/file";
import ImageCropDrawer from "./ImageCropDrawer";
import { getSquaredImage } from "./cropimage";

export const SelectPhotoImageProfile = ({
  open,
  setOpen,
  nim,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nim: string;
}) => {
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

  const inputRef = useRef<HTMLInputElement>(null);

  async function onImageChange(file: FileList) {
    if (file[0]) {
      const image = await getSquaredImage(URL.createObjectURL(file[0]));
      onOpen();
      setImageSelected(image);
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  function onCancel() {
    onClose();
    setImageSelected(undefined);
  }

  // async function deleteProfile() {
  //   try {
  //     setIsUpdating(true);
  //     const res = await profileMutaion.mutateAsync({
  //       image: undefined,
  //     });
  //     toast({
  //       title: "Success",
  //       status: "success",
  //       description: res.message,
  //       duration: 2000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   } catch (e: unknown) {
  //     if (!(e instanceof TRPCClientError)) throw e;
  //     toast({
  //       title: "Failed",
  //       status: "error",
  //       description: e.message,
  //       duration: 2000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //   }

  //   setIsUpdating(false);
  //   setOpen(false);
  // }

  async function updateImage(file: File) {
    if (!file) return;
    console.log(file);
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Failed",
        status: "error",
        description: "Ukuran gambar maksimal 5MB.",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const extension = file.name.split(".").pop();
    const url =
      sanitizeURL(`https://cdn.oskmitb.com/${nim}`) +
      (extension ? `.${extension}` : "");
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
    }

    setIsUpdating(false);
    setOpen(false);
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
              maxW={"500px"}
              top={0}
              opacity={0.5}
              onClick={() => setOpen(false)}
            />

            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              position={"fixed"}
              bottom={0}
              background={"purple.1"}
              height={"230px"}
              w={"full"}
              maxW={"500px"}
              padding={"10px"}
              gap={"30px"}
              pb={"30px"}
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
                  {/*              <Button
                    variant={"unstyled"}
                    onClick={() => void deleteProfile()}
                  >
                    <Image src="/components/trashbin.svg" alt="trash icon" />
                  </Button> */}
                  <Button variant={"unstyled"} onClick={() => setOpen(false)}>
                    <Image src="/components/closeButton.svg" alt="close icon" />
                  </Button>
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
                    fontWeight={700}
                    color={"purple.2"}
                    size={"SH5"}
                    onClick={() => inputRef.current?.click()}
                  >
                    {" "}
                    Select File{" "}
                  </Button>

                  <input
                    hidden
                    type="file"
                    id="img"
                    accept=".png, .jpg, .jpeg"
                    ref={inputRef}
                    onChange={(e) => {
                      const files = e.target.files;
                      console.log(files);
                      if (files && files[0]) {
                        const fileName = files[0].name.toLowerCase();
                        const validExtensions = [".png", ".jpeg", ".jpg"];

                        const fileExtension = fileName.slice(
                          ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
                        );

                        if (validExtensions.includes("." + fileExtension)) {
                          void onImageChange(files);
                        } else {
                          toast({
                            title: `Invalid image extension : .${fileExtension}`,
                            status: "error",
                            description: "Must be either jpg, jpeg, or png",
                            duration: 2000,
                            isClosable: true,
                            position: "top",
                          });
                        }
                        e.target.value = "";
                      }
                    }}
                  />

                  <Text fontWeight={700} fontSize={"SH5"} color={"white"}>
                    {" "}
                    *png, jpg, jpeg{" "}
                  </Text>

                  <ImageCropDrawer
                    imageFile={imageSelected as File}
                    onCancel={onCancel}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    setCroppedImage={setCroppedImage}
                    nim={nim}
                    updateImage={updateImage}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};
