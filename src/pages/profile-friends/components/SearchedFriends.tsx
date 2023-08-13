import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MyFriendCard from '~/components/friends/MyFriendCard'
import { api } from "~/utils/api";
import type { UserProfile } from "~/server/types/user-profile";

export const SearchedFriends = (props:{
    searchQuery: string
  }) => {
    const [filteredData, setFilteredData] = useState<UserProfile[]|[] >([])
    const filter = props.searchQuery
    const result = api.friend.searchUsers.useQuery({
      query:filter
    })

    useEffect(() => {
      if (result.data) {
        setFilteredData(result.data as UserProfile[])
      }
    }, [result])

    return(
      <>
        <Text fontWeight='semibold' color='white' fontSize='H4'>My Friends</Text>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='2'>
          {
            filteredData
            .filter(item => item.status === 'FRIEND') // Filter items with status FRIEND
            .map((item, index) => (
              <MyFriendCard
                image={item.image ?? undefined}
                name={item.name}
                status={item.bio}
                key={index}
              />
            ))
          }
        </Flex>
      </>
    )
  }