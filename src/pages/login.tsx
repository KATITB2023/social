import {
  Image,
  Text,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
  useToast,
  Box
} from '@chakra-ui/react';
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext
} from 'next';
import { useState } from 'react';
import { getCsrfToken, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserRole } from '@prisma/client';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Head from 'next/head';
import LoginBackground from '~/components/login/login-background';
import Navbar from '~/components/Navbar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

function Navbar2({ children }: childrenOnlyProps) {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Flex flexDirection="column">
        <Navbar 
        />
        {children}
      </Flex>
    </Box>
  );
}

interface FormValues {
  password: string;
  nim: string;
}

const LoginForm = ({
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
    reset
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      nim: '',
      password: ''
    }
  });

  const handleLoggedIn = () => {
    toast({
      title: 'Success',
      description: 'Berhasil login!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
    handleRedirect();
  };

  const handleRedirect = () => {
    router.push('/profile')
  };

  const handleError = (message: string) => {
    toast({
      title: 'Error',
      description: `${message}`,
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
  };

const login: SubmitHandler<FormValues> = async (data: FormValues, event) => {
  event?.preventDefault();
  const res = await signIn('credentials', {
    nim: data.nim,
    password: data.password,
    redirect: false,
    csrfToken
  });

  if (res?.error) {
    handleError(res.error);
    setError('root', { message: res.error });
    reset({}, { keepErrors: true, keepValues: true });
    return;
  }

  handleLoggedIn();
  reset();
};

// if (session) handleRedirect();

return (
  <Flex
    width="300px"
    height="359.31px"
    direction='column'
    justifyContent={{ base: 'center', md: 'end' }}
    alignItems='center'
    position='absolute'
    gap="25px"
  > 
    <Flex
      width="114px"
      height="128.31px"
      gap="20px"
      direction="column"
      justifyContent='center'
      alignItems='center'
    >
      <Image
        src="logoOSKM.svg"
        width="60px"
        height="70.306px"
        style={{ filter: 'drop-shadow(0px 4px 11px rgba(255, 255, 255, 0.25))' }}
      />
      <Heading
        size={{ base: 'xl', md: '3xl' }}
        color='yellow.5'
        textShadow={`0px 0px 10px `}
      >
        LOGIN
      </Heading>
    </Flex>

    <form onSubmit={(e) => void handleSubmit(login)(e)}>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.nim}>
          <Input
            type='number'
            placeholder='NIM'
            {...register('nim', { required: 'NIM tidak boleh kosong' })}
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
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              {...register('password', {
                required: 'Password tidak boleh kosong'
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
              display='flex'
              height='100%'
              alignItems='center'
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  cursor='pointer'
                  width="24px"
                  height="24px"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEye
                  cursor='pointer'
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
        direction='column'
        alignItems='center'
        marginTop='25px'
        gap='5px'
        order="2"
      >
        <Button
          type='submit'
          width='109px'
          height="48px"
          display="flex"
          padding="12px 32px"
          justifyContent="center"
          alignItems="center"
          gap="12px"
          borderRadius="12px"
          bg="yellow.5"
          isLoading={isSubmitting}
          loadingText='Loading'
          isDisabled={!isDirty || !isValid}
          zIndex='5'
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
          href='/forgot-password'
          size="B5"
          zIndex='5'
          lineHeight="18px"
        >
          Lupa Password?
        </Link>
      </Flex>
    </form>
  </Flex>
);
};


const Login = ({
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Navbar2>
      <Head>
        <title>Login - KAT ITB 2023</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex
        position='absolute'
        width='100%'
        backgroundColor='gray.600'
        zIndex={0}
        minHeight='100vh'
      >
        <Flex
          justifyContent={{ base: 'center', md: 'end' }}
          alignItems='center'
          paddingInline={{ base: '0', md: '15vw' }}
          width='100%'
        >
          <LoginBackground />
          <LoginForm csrfToken={csrfToken} />
        </Flex>
      </Flex>
    </Navbar2>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken }
  };
};

export default Login;