import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AddFriendCard from '~/components/friends/AddFriendCard'
import { api } from "~/utils/api";
import type { UserProfile } from "~/server/types/user-profile";
import { type FRIENDSHIP_STATUS } from "~/server/types/friendship";

type searchFriendByPin = {
  status: FRIENDSHIP_STATUS | undefined;
    profile: {
      nim: string;
      name: string;
      bio: string;
      image: string | null;
      id: string;
  };
}

const SearchedFriends = (props:{
    searchQuery: string
  }) => {
    const filter = props.searchQuery
    const result = api.friend.getOtherUserProfile.useQuery({
      pin:filter
    })

    return(
      <>
        <Text fontWeight='semibold' color='white' fontSize='H4'>Add Friends</Text>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='2'>
          {result.data != undefined && result.data.id != undefined ? 
            <AddFriendCard
              image={result.data.image ?? undefined}
              name={result.data.name}
              bio={result.data.bio}
              key={result.data.id}
              id={result.data.id}
              statusFriend={result.data.status ? result.data.status : "NOT_FRIEND"}
            /> :
            <h1>Tidak ditemukan pengguna</h1>
          }
        </Flex>
      </>
    )
  }

  export default SearchedFriends;