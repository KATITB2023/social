import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import LoginBackground from "~/components/login/login-background";
import Navbar from "~/components/Navbar";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

function Navbar2({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Flex flexDirection="column">
        <Navbar currentPage={"Forgot Password"} />
        {children}
      </Flex>
    </Box>
  );
}

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<{ email: string }>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();
  const toast = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Berhasil mengirim email!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    void router.push("/login");
  };

  const handleError = (error: string) => {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const onSubmit: SubmitHandler<{ email: string }> = (data, event) => {
    event?.preventDefault();
    if (data.email !== "anu@anu.anu") {
      handleError("Email tidak terdaftar");
      reset({}, { keepErrors: true, keepValues: true });
      return;
    }

    handleSuccess();
    reset();
  };

  return (
    <Navbar2>
      <Flex
        position="absolute"
        width="100%"
        backgroundColor="gray.600"
        zIndex={0}
        minHeight="100vh"
        justifyContent={{ base: "center", md: "end" }}
        alignItems="center"
        paddingInline={{ base: "0", md: "15vw" }}
      >
        <LoginBackground />
        <Flex
          width="300px"
          height="250px"
          direction="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          gap="25px"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Flex
            direction="column"
            alignItems="center"
            gap="10px"
            width="236px"
            height="104px"
          >
            <Text
              fontFamily="Bodwars"
              fontStyle="normal"
              fontWeight="400"
              fontSize="32px"
              lineHeight="120%"
              display="flex"
              alignItems="center"
              textAlign="center"
              textTransform="uppercase"
              color="yellow.5"
              textShadow="0px 0px 10px yellow.5"
            >
              LUPA PASSWORD?
            </Text>
            <Text color="#FFF" textAlign="center" size="B5">
              Tenang saja, Spacefarers!
            </Text>
          </Flex>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <VStack spacing={7}>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email tidak boleh kosong",
                    validate: (value) =>
                      value.includes("@") || "Email tidak valid",
                  })}
                  display="flex"
                  width="300px"
                  height="48pz"
                  padding="12px 32px"
                  gap="8px"
                  alignItems="center"
                  borderRadius="12px"
                  border="2px solid #989B9B"
                  background="#2F2E2E"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                display="flex"
                padding="12px 32px"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                width="108px"
                height="48px"
                borderRadius="12px"
                background="yellow.5"
                isDisabled={!isDirty || !isValid}
                isLoading={isSubmitting}
                loadingText="Loading"
              >
                <Text size="SH5" lineHeight="24px" color="purple.2">
                  Kirim
                </Text>
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </Navbar2>
  );
};

export default ForgotPasswordForm;
