import { Flex } from '@chakra-ui/react'
import React from 'react'
import MyFriendCard from '~/components/friends/MyFriendCard'
import { api } from "~/utils/api";

const Friends = () => {
  const cursor = 1 as number;
  const limit = 10 as number;
  const getDataRequest = api.friend.friendList.useQuery({
    status:'FRIEND',
    cursor,
    limit
  })
  console.log(getDataRequest.data)
  return (
    <Flex flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
        <MyFriendCard/>
        <MyFriendCard/>
        <MyFriendCard/>
        <MyFriendCard/>
        <MyFriendCard/>
    </Flex>
  )
}

export default Friends