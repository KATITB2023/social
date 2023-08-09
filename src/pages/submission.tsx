import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api"; 
import { useSession, signOut } from "next-auth/react";
import Navbar from "~/components/Navbar";
import SubmitPopUp from "~/components/assignment/SubmitPopUp";
import NotFound from "./404";
import { fileURLToPath } from "url";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

function BackgroundAndNavbar({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="background.png"
        alt="background"
        height="100%"
        zIndex="-1"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
}

// Data Structure
interface submission {
  isSubmitted: boolean;
  isDeadlinePassed: boolean;
  fileSubmitted: string | null ;
}

// Main Function
export default function showSubmissionPage() {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const inputAssignmentData = api.assignment.viewAssignment.useQuery({
    assignmentId: taskId
  });
  const assignmentData = inputAssignmentData.data   

  if (!assignmentData) {
    return <NotFound />;
  }

  const inputSubmissionData: submission = {
    isSubmitted: assignmentData.submissionStatus === "SUBMITTED",
    isDeadlinePassed: assignmentData.submissionStatus === "PASSED_DEADLINE",
    fileSubmitted: assignmentData.submission?.filePath!,
  };
  
  return (
    <BackgroundAndNavbar>
    <Flex 
      flexDirection="column"
      justifyContent="space-between"
      mx="24px"
      my="70px"
    >
      <HStack mb="3px">
        <Text
          color="#ffffff"
          fontFamily="subheading"
          fontSize="12px"
        >
          Deadline
        </Text>
        <Text> : </Text>
        <Text
          color="#ffffff"
          fontFamily="body"
          fontSize="12px"
        >
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
      <Text 
        textAlign={"justify"}
      >
        {assignmentData.description}
      </Text>
      <FileUpload {...inputSubmissionData} />
      </Flex>
    </BackgroundAndNavbar>
  );
}

// Other Functions
function SubmissionStatus(param: submission) {
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
        <Text 
          fontFamily="subheading"
          fontSize="10px"
        > 
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
  ) : (
    param.isDeadlinePassed? (
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
          <Text 
            fontFamily="subheading"
            fontSize="10px"
          > 
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
          <Text 
            fontFamily="subheading"
            fontSize="10px"
          > 
            Belum Terkumpul
          </Text>
        </Box>
      </Flex>
    )
  );
}

function FileUpload(param: submission) {
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSubmitOpen, setSubmitOpen] = useState(false);

  const router = useRouter();
  const taskId = router.query.taskId as string;

  function handleCancelClick() {
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
      textDecorationLine="underline"
      color="yellow.4"
    >
      <a
        href={param.fileSubmitted as string} // Ubah URL sesuai kebutuhan
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
  ) : (
    param.isDeadlinePassed? (
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
    ):(
      <>
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
          <Image mt={-10} position="absolute" src="/komethello.png" />
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
              <Text>
                {" "}
                upload file{" "}
              </Text>
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
      <HStack gap="20px" position="absolute" bottom="30px">
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
          alignItems="center"
          textColor={"gray.600"}
          borderColor={"yellow.5"}
          borderWidth="2px"
          width="155px"
          height="48px"
          borderRadius="10px"
          onClick={() => setSubmitOpen(true)}
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
      <SubmitPopUp
        isSubmitting={isSubmitOpen}
        submittingFile={setSubmitOpen}
        fileToSend={file}
        taskId={taskId}
      />
      </>
    )
  );
}