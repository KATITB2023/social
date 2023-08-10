import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import LoginBackground from "~/components/login/login-background";
import Layout from "~/layout";

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

const NavbarLogin = () => {
  return (
    <Layout title="Navbar">
      {/* Make dummy box to have effect set 'sticky' because 'sticky' does not work */}
      <Flex
        position={"relative"}
        display={"block"}
        backgroundColor={"transparent"}
        h={"60px"}
        my={"20px"}
      />

      <Flex
        my={"20px"}
        mx={"auto"}
        top={0}
        position={"fixed"}
        insetX={0}
        zIndex={1}
        background="url('/navbarbg.svg')"
        maxWidth={"343px"}
        w={"full"}
        h="60px"
        borderRadius="50px"
        flexDir="row"
        alignItems="center"
        paddingY="2%"
        paddingX="22px"
        boxShadow="0px 0px 20px 0px #FFFC8366"
        transitionDuration={"0.3s"}
        transitionTimingFunction={"ease-in-out"}
      >
        <Box
          backgroundColor="#0B0A0A"
          opacity="0.6"
          borderRadius="50px"
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
        />

        <Image
          alt="Ekor"
          src="/ekor.svg"
          position="absolute"
          left="0"
          height="full"
          objectFit="cover"
          objectPosition="center"
          borderRadius="50px"
        />

        <Image
          objectFit="cover"
          objectPosition="center"
          src="/Vector.svg"
          alt="OSKM ITB"
          zIndex="2"
        />
      </Flex>
    </Layout>
  );
};

function Navbar2({ children }: childrenOnlyProps) {
  return (
    <>
      <Box position="relative" height={"100vh"}>
        {/* Grey layer */}
        <Flex
          position="absolute"
          width="100%"
          backgroundColor="gray.600"
          zIndex={0}
          minHeight="100%"
        >
          <LoginBackground />
        </Flex>

        <Flex flexDirection="column" h={"full"} w={"full"} >
          <Navbar currentPage="" />
          {children}
        </Flex>
      </Box>
      <Footer/>
    </>
  );
}

interface FormValues {
  password: string;
  nim: string;
}

const LoginForm = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showPassword, setShowPassword] = useState(false);
  useSession();
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      nim: "",
      password: "",
    },
  });

  const handleLoggedIn = () => {
    toast({
      title: "Success",
      description: "Berhasil login!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    handleRedirect();
  };

  const handleRedirect = () => {
    void router.push("/");
  };

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

  const login: SubmitHandler<FormValues> = async (data: FormValues, event) => {
    event?.preventDefault();
    const res = await signIn("credentials", {
      nim: data.nim,
      password: data.password,
      redirect: false,
      csrfToken,
    });
    if (res?.error) {
      handleError(res.error);
      setError("root", { message: res.error });
      reset({}, { keepErrors: true, keepValues: true });
      return;
    }
    handleLoggedIn();
    reset();
  };

  // if (session) handleRedirect();

  return (
    <Flex
      flexDir={"column"}
      w={"full"}
      justifyContent={"center"}
      alignItems="center"
      height="90vh"
      gap="25px"
    >
      <Flex
        gap="20px"
        flexDir={"column"}
        justifyContent="center"
        alignItems="center"
        zIndex={0}
      >
        <Image
          src="/logoOSKM.svg"
          alt="logo OSKM"
          width="60px"
          style={{
            filter: "drop-shadow(0px 4px 11px rgba(255, 255, 255, 0.25))",
          }}
        />
        <Heading size={"H3"} color="yellow.5" textShadow={`0px 0px 10px `}>
          LOGIN
        </Heading>
      </Flex>

      <form onSubmit={(e) => void handleSubmit(login)(e)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.nim}>
            <Input
              type="number"
              placeholder="NIM"
              {...register("nim", { required: "NIM tidak boleh kosong" })}
              width="300px"
              height="48px"
              padding="12px 32px"
              alignItems="center"
              gap="8px"
              borderRadius="12px"
              border="2px solid var(--gray-color-gray-400, #9B9B9B)"
              background="var(--gray-color-gray-600, #2F2E2E)"
            />
            <FormErrorMessage>{errors.nim?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password tidak boleh kosong",
                })}
                width="300px"
                height="44px"
                padding="10px 32px"
                alignItems="center"
                borderRadius="12px"
                border="2px solid var(--gray-color-gray-400, #9B9B9B)"
                background="var(--gray-color-gray-600, #2F2E2E)"
              />
              <InputRightElement
                display="flex"
                height="100%"
                alignItems="center"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    cursor="pointer"
                    width="24px"
                    height="24px"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <AiOutlineEye
                    cursor="pointer"
                    width="24px"
                    height="24px"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
            padding="12px 32px"
            justifyContent="center"
            alignItems="center"
            gap="12px"
            borderRadius="12px"
            bg="yellow.5"
            isLoading={isSubmitting}
            loadingText="Loading"
            isDisabled={!isDirty || !isValid}
          >
            <Text
              width="45px"
              height="24px"
              size="B3"
              lineHeight="150%"
              color="purple.2"
              fontWeight={700}
            >
              Login
            </Text>
          </Button>
          <Link
            href="/forgot-password"
            size="B5"
            zIndex={0}
            lineHeight="18px"
            cursor={"pointer"}
          >
            Lupa Password?
          </Link>
        </Flex>
      </form>
    </Flex>
  );
};

const Login = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Navbar2>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        width="100%"
        flexDirection={"column"}
      >
        <LoginForm csrfToken={csrfToken} />
      </Flex>
    </Navbar2>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

export default Login;
