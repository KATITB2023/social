import {
  FormControl,
  FormLabel,
  Box,
  Text,
  Input,
  Center,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { type Dispatch, useReducer, useState, SetStateAction } from "react";
import { type SelfProfile } from "~/server/types/user-profile";
import { type EditableProps } from "~/pages/profile";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";

export default function EditingProfile({
  initialState,
  setIsEditMode,
  onProfileEdit,
}: {
  initialState: SelfProfile;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  onProfileEdit: ({ bio, instagram, email }: EditableProps) => void;
}) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(initialState.bio ?? "");
  const [instagram, setInstagram] = useState<string>(
    initialState.instagram ?? ""
  );
  const [email, setEmail] = useState<string>(initialState.email ?? "");
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const profileMutaion = api.profile.editProfile.useMutation();
  const toast = useToast();

  const router = useRouter();

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await profileMutaion.mutateAsync({
        bio: bio,
        instagram: instagram,
        email: email,
      });

      toast({
        title: "Success",
        status: "success",
        description: res.message,
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(res);
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
    onProfileEdit({ bio, instagram, email });
    // setIsEditMode((isEditMode) => !isEditMode);
    setIsEditMode(false);
  }

  function handleCancel() {
    setBio(initialState.bio ?? "");
    setInstagram(initialState.instagram ?? "");
    setEmail(initialState.email ?? "");
    setIsEditMode((isEditMode) => !isEditMode);
  }

  return (
    <form onSubmit={handleSave}>
      <FormControl>
        <Box display="flex" flexDirection="column" gap="8px" mb="25px">
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Bio</Text>
            </FormLabel>
            <Input
              type="text"
              value={bio}
              placeholder={initialState.bio ?? ""}
              onChange={(e) => setBio(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Instagram</Text>
            </FormLabel>
            <Input
              type="text"
              value={instagram}
              placeholder={initialState.instagram ?? ""}
              onChange={(e) => setInstagram(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
          <Box>
            <FormLabel mb="4px">
              <Text size="B3">Email</Text>
            </FormLabel>
            <Input
              type="email"
              value={email}
              placeholder={initialState.email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
              size="B3"
              py="0.75em"
              px="2em"
              borderRadius="0.75em"
              borderWidth="2px"
              borderColor="gray.400"
              backgroundColor="gray.600"
            />
          </Box>
        </Box>
        <Center gap="15px">
          {isUpdating ? (
            <Spinner />
          ) : (
            <>
              <Button
                paddingX="1.5em"
                paddingY="0.5em"
                backgroundColor="gray.600"
                alignSelf="center"
                onClick={handleCancel}
                borderColor="yellow.5"
                color="yellow.5"
                borderWidth="2px"
                borderRadius="0.75em"
              >
                <Text size="B5">Cancel</Text>
              </Button>
              <Button
                paddingX="1.5em"
                paddingY="0.5em"
                backgroundColor="yellow.5"
                alignSelf="center"
                type="submit"
                color="purple.2"
                borderRadius="0.75em"
              >
                <Text size="B5">Save</Text>
              </Button>
            </>
          )}
        </Center>
      </FormControl>
    </form>
  );
}
