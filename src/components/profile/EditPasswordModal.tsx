import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export default function EditPasswordModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const editPassMutation = api.auth.editPassword.useMutation();

  interface FormValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleError = (message: string) => {
    toast({
      title: "Error",
      description: `${message}`,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSuccess = (message: string) => {
    toast({
      title: "Success",
      description: `${message}`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    reset();
  };

  const editPassword: SubmitHandler<FormValues> = async (
    data: FormValues,
    event
  ) => {
    event?.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      handleError("Password tidak sama");
      setError("root", { message: "Password tidak sama" });
      reset({}, { keepErrors: true, keepValues: true });
      return;
    }

    try {
      await editPassMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } catch (error: unknown) {
      if (!(error instanceof TRPCClientError)) throw error;

      handleError(error.message);
      setError("root", { message: error.message });
      reset({}, { keepErrors: true, keepValues: true });
      return;
    }
    handleSuccess("Berhasil mengedit password");
    reset();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-br, navy.3, purple.1)">
        <ModalHeader color="white">Edit Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => void handleSubmit(editPassword)(e)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.oldPassword}>
                <InputGroup>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Password Lama"
                    {...register("oldPassword", {
                      required: "Password lama tidak boleh kosong",
                    })}
                    padding="12px 20px"
                    alignItems="center"
                    gap="8px"
                    borderRadius="12px"
                    border="2px solid var(--gray-color-gray-400, #9B9B9B)"
                    background="var(--gray-color-gray-600, #2F2E2E)"
                  />
                  <InputRightElement
                    display="flex"
                    height="100%"
                    alignItems="center"
                  >
                    {showOldPassword ? (
                      <AiOutlineEyeInvisible
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowOldPassword(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowOldPassword(true)}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.oldPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.newPassword}>
                <InputGroup>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password Baru"
                    {...register("newPassword", {
                      required: "Password baru tidak boleh kosong",
                    })}
                    padding="12px 20px"
                    alignItems="center"
                    gap="8px"
                    borderRadius="12px"
                    border="2px solid var(--gray-color-gray-400, #9B9B9B)"
                    background="var(--gray-color-gray-600, #2F2E2E)"
                  />
                  <InputRightElement
                    display="flex"
                    height="100%"
                    alignItems="center"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowNewPassword(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowNewPassword(true)}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.newPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi Password"
                    {...register("confirmPassword", {
                      required: "Konfirmasi password tidak boleh kosong",
                    })}
                    padding="12px 20px"
                    alignItems="center"
                    gap="8px"
                    borderRadius="12px"
                    border="2px solid var(--gray-color-gray-400, #9B9B9B)"
                    background="var(--gray-color-gray-600, #2F2E2E)"
                  />
                  <InputRightElement
                    display="flex"
                    height="100%"
                    alignItems="center"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        cursor="pointer"
                        width="24px"
                        height="24px"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <Flex
              direction="column"
              alignItems="center"
              marginTop="25px"
              gap="5px"
              order="2"
            >
              <Button
                type="submit"
                width="109px"
                height="48px"
                display="flex"
                padding="15px 20px"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                borderRadius="12px"
                bg="yellow.5"
                isLoading={isSubmitting}
                loadingText="Loading"
                isDisabled={!isDirty || !isValid}
                zIndex="5"
              >
                <Text lineHeight="150%" color="purple.2" fontWeight={700}>
                  Edit Password
                </Text>
              </Button>
            </Flex>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
