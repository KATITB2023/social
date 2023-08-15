import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddFriendCard from "~/components/friends/AddFriendCard";
import { api } from "~/utils/api";

const SearchedFriends = (props: { searchQuery: string }) => {
  const [debouncedFilter, setDebouncedFilter] = useState(props.searchQuery);
  const result = api.friend.getOtherUserProfile.useQuery({
    pin: debouncedFilter,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(props.searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [props.searchQuery]);

  return (
    <>
      <Text fontWeight="semibold" color="white" fontSize="H4">
        Add Friends
      </Text>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2"
      >
        {result.data != undefined && result.data.id != undefined ? (
          <AddFriendCard
            image={result.data.image ?? undefined}
            name={result.data.name}
            bio={result.data.bio}
            key={result.data.id}
            id={result.data.id}
            statusFriend={
              result.data.status ? result.data.status : "NOT_FRIEND"
            }
          />
        ) : (
          <h1>Tidak ditemukan pengguna</h1>
        )}
      </Flex>
    </>
  );
};

export default SearchedFriends;
