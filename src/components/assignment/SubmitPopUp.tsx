import {
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  Flex,
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
  taskId: string;
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
        position: "top",
      });
      submittingFile(false);
      return;
    }

    const sanitizedFileName = sanitizeURL(
      `https://cdn.oskmitb.com/${fileToSend.name}`
    );

    await uploadFile(sanitizedFileName, fileToSend, (event) => {
      if (!event.total) return;
    });

    try {
      const result = await uploadMutation.mutateAsync({
        assignmentId: taskId,
        filePath: sanitizedFileName,
      });
      
      if (result === "Tugas berhasil dikumpulkan") {
        toast({
          title: "Tugas berhasil dikumpulkan.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        submittingFile(false);

        // Refresh halaman
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
        position: "top",
      });
      submittingFile(false);
    }
  };

  return (
    <Flex
      position={"fixed"}
      w={"100vw"}
      h={"100vh"}
      top={0}
      left={0}
      display={isSubmitting ? "block" : "none"}
      zIndex={3}
    >
      <Flex
        position={"relative"}
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* Black overlay */}
        <Flex
          position={"absolute"}
          bg={"black"}
          w={"100vw"}
          h={"100vh"}
          top={0}
          left={0}
          opacity={0.7}
          onClick={() => submittingFile(false)}
          zIndex={2}
        />

        <Flex
          mx={"auto"}
          alignSelf={"center"}
          backgroundColor={"purple.1"}
          alignItems={"center"}
          justifyContent={"center"}
          height="397px"
          width="272px"
          borderRadius="24px"
          zIndex={10}
        >
          <Center
            flexDirection="column"
            justifyContent="center"
            alignItems={"center"}
          >
            <Image
              src="/close.png"
              mt="40px"
              mb="20px"
              alignSelf={"right"}
              onClick={() => submittingFile(false)}
              alt={"close"}
            />
            <Image
              src="/qmark.png"
              mb="20px"
              alignSelf={"center"}
              alt={"qmark"}
            />
            <Heading mb="10px">SUBMIT</Heading>
            <Text
              alignSelf={"center"}
              textAlign={"center"}
              mb="20px"
              opacity={0.6}
            >
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
                <Text fontFamily="subheading" size="SH5" color="yellow.5">
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
                onClick={() => void handleFileSubmit()}
              >
                <Text fontFamily="subheading" size="SH5" color="purple.2">
                  Submit
                </Text>
              </Button>
            </HStack>
          </Center>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubmitPopUp;
