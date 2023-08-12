import { Flex } from '@chakra-ui/react'
import React from 'react'
import MyFriendCard from '~/components/friends/MyFriendCard'

const Friends = () => {
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