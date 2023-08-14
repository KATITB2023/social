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

export const SearchedFriends = (props:{
    searchQuery: string
  }) => {
    const [filteredData, setFilteredData] = useState<searchFriendByPin | null>(null)
    const filter = props.searchQuery
    const result = api.friend.searchUsersByPin.useQuery({
      query:filter
    })

    useEffect(() => {
      if(result.data) {
        setFilteredData(result.data)
      }
    }, [result])

    return(
      <>
        <Text fontWeight='semibold' color='white' fontSize='H4'>My Friends</Text>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='2'>
          {filteredData?.profile.id != undefined ? 
            <AddFriendCard
              image={filteredData.profile.image ?? undefined}
              name={filteredData.profile.name}
              bio={filteredData.profile.bio}
              key={filteredData.profile.id}
              id={filteredData.profile.id}
              statusFriend={filteredData.status ? filteredData.status : "NOT_FRIEND"}
            /> :
            <h1>Tidak ditemukan</h1>
          }
          
        </Flex>
      </>
    )
  }