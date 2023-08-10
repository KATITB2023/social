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
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import LoginBackground from "~/components/login/login-background";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

function Navbar2({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Flex flexDirection="column">
        <Navbar currentPage="Reset Password" />
        {children}
      </Flex>
    </Box>
  );
}

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const toast = useToast();

  const resetPasswordMutation = api.auth.resetPassword.useMutation();

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Berhasil mengubah password!",
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

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    try {
      event?.preventDefault();

      if (data.newPassword !== data.confirmPassword) {
        handleError("Password tidak sama!");
        reset({}, { keepErrors: true, keepValues: true });
        return;
      }

      const userId =
        router.query.userId instanceof Array
          ? router.query.userId[0]
          : router.query.userId;

      if (!userId) {
        handleError("User ID tidak ditemukan!");
        reset({}, { keepErrors: true, keepValues: true });
        return;
      }

      const token =
        router.query.token instanceof Array
          ? router.query.token[0]
          : router.query.token;

      if (!token) {
        handleError("Token tidak ditemukan!");
        reset({}, { keepErrors: true, keepValues: true });
        return;
      }

      // Call procedure to send email
      await resetPasswordMutation.mutateAsync({
        userId,
        token,
        newPassword: data.newPassword,
      });

      handleSuccess();
      reset();
    } catch (err) {
      if (!(err instanceof TRPCClientError)) throw err;

      handleError(err.message);
      reset({}, { keepErrors: true, keepValues: true });
    }
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
              RESET PASSWORDMU!
            </Text>
          </Flex>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <VStack spacing={7}>
              <FormControl isInvalid={!!errors.newPassword}>
                <Input
                  type="password"
                  placeholder="Password Baru"
                  {...register("newPassword", {
                    required: "Password baru tidak boleh kosong",
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
                <FormErrorMessage>
                  {errors.newPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <Input
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  {...register("confirmPassword", {
                    required: "Konfirmasi Password baru tidak boleh kosong",
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
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
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

export default ResetPasswordForm;
