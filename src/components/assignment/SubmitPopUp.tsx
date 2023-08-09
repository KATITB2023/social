import {
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api"; 
import { uploadFile, sanitizeURL } from "~/utils/file";

const SubmitPopUp = ({
  isSubmitting,
  submittingFile,
  fileToSend,
  taskId,
}: {
  isSubmitting: boolean;
  submittingFile: React.Dispatch<React.SetStateAction<boolean>>;
  fileToSend?: File; 
  taskId: string
}) => {
  const toast = useToast();
  const uploadMutation = api.assignment.submitAssignment.useMutation();
  const handleFileSubmit = async () => {
    if (!fileToSend) {
      toast({
        title: "Belum ada file yang dipilih.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      submittingFile(false);
      return;
    }

    const sanitizedFileName = sanitizeURL("https://cdn.oskmitb.com/"+fileToSend.name);
    await uploadFile(sanitizedFileName, fileToSend, (event) => {
      if (!event.total) return;
    });

    try {
      const result = await uploadMutation.mutateAsync({
        assignmentId: taskId,
        filePath: sanitizedFileName
      });

      if (result === "Tugas berhasil dikumpulkan") {
        toast({
          title: "Tugas berhasil dikumpulkan.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        submittingFile(false);

      } else {
        toast({
          title: "Gagal mengirim tugas",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        submittingFile(false);
      }

    } catch (error) {
      toast({
        title: "Gagal mengirim tugas",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      submittingFile(false);
    }
  };

  return (
    <Center
      display={isSubmitting ? "block" : "none"}
      position={"absolute"}
      alignSelf={"center"}
      backgroundColor={"purple.1"}
      alignItems={"center"}
      verticalAlign={"center"}
      justifyContent={"center"}
      height="397px"
      width="272px"
      borderRadius="24px"
      mt="110px"
    >
      <Center
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
      >
        <Image
          src="close.svg"
          mt="40px"
          mb="20px"
          alignSelf={"right"}
          onClick={() => submittingFile(false)}
        />
        <Image src="qmark.svg" mb="20px" alignSelf={"center"} />
        <Heading mb="10px">SUBMIT</Heading>
        <Text alignSelf={"center"} textAlign={"center"} mb="20px" opacity={0.6}>
          Apakah kamu yakin ingin melakukan submisi tugas? Tugas yang telah
          tersubmit tidak bisa diedit kembali
        </Text>
        <HStack>
          <Button
            backgroundColor={"gray.600"}
            display="flex"
            justifyContent="center"
            verticalAlign="center"
            alignItems="center"
            textColor={"yellow.5"}
            borderColor={"yellow.5"}
            borderWidth="2px"
            width="98px"
            height="48px"
            borderRadius="10px"
            onClick={() => submittingFile(false)}
          >
            <Text
              fontFamily="subheading"
              size="SH5"
              color="yellow.5"
            >
              Cancel
            </Text>
          </Button>
          <Button
            backgroundColor={"yellow.5"}
            display="flex"
            justifyContent="center"
            verticalAlign="center"
            alignItems="center"
            textColor={"gray.600"}
            borderColor={"yellow.5"}
            borderWidth="2px"
            width="98px"
            height="48px"
            borderRadius="10px"
            onClick={handleFileSubmit}
          >
            <Text
              fontFamily="subheading"
              size="SH5"
              color="purple.2"
            >
              Submit
            </Text>
          </Button>
        </HStack>
      </Center>
    </Center>
  );
};

export default SubmitPopUp;
