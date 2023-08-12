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

import { type Dispatch, useState, type SetStateAction } from "react";
import { type SelfProfile } from "~/server/types/user-profile";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";

export default function EditingProfile({
  initialState,
  setIsEditMode,
}: {
  initialState: SelfProfile;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(initialState.bio ?? "");
  const [instagram, setInstagram] = useState<string>(
    initialState.instagram ?? ""
  );
  const [email, setEmail] = useState<string>(initialState.email ?? "");
  const utils = api.useContext();
  const profileMutation = api.profile.editProfile.useMutation({
    onSuccess(): void {
      void utils.profile.getUserProfile.invalidate();
    },
  });
  const toast = useToast();

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await profileMutation.mutateAsync({
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
      setIsEditMode(false);
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
  }

  function handleCancel() {
    setBio(initialState.bio ?? "");
    setInstagram(initialState.instagram ?? "");
    setEmail(initialState.email ?? "");
    setIsEditMode((isEditMode) => !isEditMode);
  }

  return (
    <form onSubmit={(e) => void handleSave(e)}>
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
