import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import SubmitPopUp from "~/components/assignment/SubmitPopUp";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import LoadingScreen from "~/components/LoadingScreen";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

// Data Structure
interface id {
  isSubmitted: boolean;
  isDeadlinePassed: boolean;
  fileSubmitted: string | null;
}

// Main Function
export default function SubmissionPage() {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const inputAssignmentData = api.assignment.viewAssignment.useQuery({
    assignmentId: taskId,
  });
  const assignmentData = inputAssignmentData.data;
  const filePath = assignmentData?.filePath;

  if (!assignmentData) {
    return <LoadingScreen />;
  }

  const inputSubmissionData: id = {
    isSubmitted: assignmentData.submissionStatus === "SUBMITTED",
    isDeadlinePassed: assignmentData.submissionStatus === "PASSED_DEADLINE",
    fileSubmitted: assignmentData.submission?.filePath as string,
  };

  const downloadFile = (url: string) => {
    void fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName! );
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <Layout title={"Submission"}>
      <BackgroundAndNavbar>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          align-items="center"
          mx="5%"
          paddingY={5}
        >
          <HStack mb="3px">
            <Image
              cursor={"pointer"}
              onClick={() => {
                void router.back();
              }}
              src="/BackButton.svg"
              w={"15px"}
            />
            <Text color="#ffffff" fontFamily="subheading" fontSize="12px">
              Deadline
            </Text>
            <Text> : </Text>
            <Text color="#ffffff" fontFamily="body" fontSize="12px">
              {assignmentData.endTime.toLocaleDateString()}
            </Text>
          </HStack>
          <Heading color="yellow.4" alignSelf="left">
            {assignmentData.title}
          </Heading>
          <SubmissionStatus {...inputSubmissionData} />
          <Text
            color="white"
            fontFamily="subheading"
            fontSize="20px"
            alignSelf="left"
            mt="30px"
            mb="3px"
          >
            Soal 01
          </Text>
          <Text textAlign={"justify"}>{assignmentData.description}</Text>
          {filePath && (
            <Button
              w={"50%"}
              my={2}
              bg={"yellow.5"}
              border={"2px gray.600 solid"}
              _hover={{
                bg: "gray.600",
                color: "yellow.5",
              }}
              onClick={() => {
                downloadFile(filePath);
              }}
            >
              Download Panduan
            </Button>
          )}
          <FileUpload {...inputSubmissionData} />
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}

// Other Functions
function SubmissionStatus(param: id) {
  return param.isSubmitted ? (
    <Center>
      <Box
        backgroundColor={"#b8eadc"}
        textColor={"#1c939a"}
        borderColor={"#1c939a"}
        border="0.92px solid"
        borderRadius="12px"
        padding="4px 16px"
        verticalAlign={"center"}
        mt="5px"
      >
        <Text fontFamily="subheading" fontSize="10px">
          Terkumpul
        </Text>
      </Box>
      <Spacer />
      {/*
      <Text
        color="#ffffff"
        fontFamily="body"
        fontSize="12px"
      >
        Submitted at {param.submissionDate}</Text>
      */}
    </Center>
  ) : param.isDeadlinePassed ? (
    <Flex>
      <Box
        backgroundColor={"#fffcbf"}
        textColor={"#ffbe3b"}
        borderColor={"#ffbe3b"}
        border="0.92px solid"
        borderRadius="12px"
        padding="4px 16px"
        verticalAlign={"center"}
        mt="5px"
      >
        <Text fontFamily="subheading" fontSize="10px">
          Terlambat
        </Text>
      </Box>
    </Flex>
  ) : (
    <Flex>
      <Box
        backgroundColor={"#f2a89d"}
        textColor={"#e8553e"}
        borderColor={"#e8553e"}
        border="0.92px solid"
        borderRadius="12px"
        padding="4px 16px"
        verticalAlign={"center"}
        mt="5px"
      >
        <Text fontFamily="subheading" fontSize="10px">
          Belum Terkumpul
        </Text>
      </Box>
    </Flex>
  );
}

function FileUpload(param: id) {
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSubmitOpen, setSubmitOpen] = useState(false);

  const router = useRouter();
  const taskId = router.query.taskId as string;

  function handleCancelClick() {
    void router.push("/assignment");
    setFileSelected(false);
  }

  function handleFileChange(file: FileList) {
    const firstFile = file[0];
    if (firstFile) {
      setFileSelected(true);
      setFile(firstFile);
    }
  }

  return param.isSubmitted ? (
    <Box
      borderColor={"white"}
      width="100%"
      justifyContent={"center"}
      alignItems="center"
      borderWidth="1px"
      display="flex"
      verticalAlign={"center"}
      mt={5}
      borderRadius="20px"
      background="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40)"
      flexDirection="column"
      fontFamily="subheading"
      fontSize="16px"
      textDecorationLine="underline"
      color="yellow.4"
      paddingY={"10px"}
    >
      <a
        href={param.fileSubmitted as string}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "underline",
          color: "yellow.4",
          cursor: "pointer",
        }}
      >
        Download submitted file
      </a>
    </Box>
  ) : param.isDeadlinePassed ? (
    <Box
      borderColor={"white"}
      height="184px"
      width="100%"
      justifyContent={"center"}
      alignItems="center"
      borderWidth="1px"
      display="flex"
      verticalAlign={"center"}
      mt={5}
      borderRadius="20px"
      background="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40)"
      flexDirection="column"
      fontFamily="subheading"
      fontSize="16px"
      color="yellow.4"
    >
      Tidak mengumpulkan tugas
    </Box>
  ) : (
    <Flex flexDir={"column"} justifyContent={"space-between"}>
      <Box
        borderColor={"white"}
        height="184px"
        width="100%"
        justifyContent={"center"}
        alignItems="center"
        borderWidth="1px"
        display="inline-flex"
        verticalAlign={"center"}
        mt={5}
        mb={20}
        borderRadius="20px"
        background="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40)"
        flexDirection="column"
      >
        {fileSelected ? (
          <Text
            fontFamily="subheading"
            fontSize="16px"
            textDecorationLine="underline"
            color="yellow.4"
          >
            {file ? file.name : ""}
          </Text>
        ) : (
          <>
            <Image
              mt={-10}
              position="absolute"
              src="/komethello.png"
              alt="komethello"
            />
            <Button
              bg={"transparent"}
              borderColor={"yellow.4"}
              padding="4px 16px"
              borderWidth="1px"
              borderRadius="12px"
              textColor={"yellow.4"}
              fontFamily="subheading"
              fontSize="16px"
              mt={110}
              cursor="pointer"
              height="32px"
              width="116px"
            >
              <label htmlFor="fileInput">
                <Text> Upload File </Text>
              </label>
            </Button>
            <input
              hidden
              type="file"
              id="fileInput"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  handleFileChange(files);
                }
              }}
            />
          </>
        )}
      </Box>

      <HStack gap="20px" bottom="30px">
        <Button
          backgroundColor={"gray.600"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textColor={"yellow.5"}
          borderColor={"yellow.5"}
          borderWidth="2px"
          width="155px"
          height="48px"
          borderRadius="10px"
          onClick={handleCancelClick}
        >
          <Text fontFamily="subheading" size="SH5" color="yellow.5">
            Cancel
          </Text>
        </Button>
        <Button
          backgroundColor={"yellow.5"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textColor={"gray.600"}
          borderColor={"yellow.5"}
          borderWidth="2px"
          width="155px"
          height="48px"
          borderRadius="10px"
          onClick={() => setSubmitOpen(true)}
        >
          <Text fontFamily="subheading" size="SH5" color="purple.2">
            Submit
          </Text>
        </Button>
      </HStack>

      <SubmitPopUp
        isSubmitting={isSubmitOpen}
        submittingFile={setSubmitOpen}
        fileToSend={file}
        taskId={taskId}
      />
    </Flex>
  );
}

export { SubmissionPage };
