import { Flex } from '@chakra-ui/react'
import React from 'react'
import RequestFriendCard from '~/components/friends/RequestFriendCard'
import { api } from "~/utils/api";


const Request = () => {
  const cursor = 1 as number;
  const limit = 40 as number;
  const getDataRequest = api.friend.friendList.useQuery({
    status:'WAITING_FOR_ACCEPTANCE',
    cursor,
    limit
  })
  return (
    <Flex flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
      {
        getDataRequest.data?.data?.map((item, index) => {
          return (
            <RequestFriendCard
              key={index}
              id= {item.id}
              image={item.image ?? undefined}
              name={item.name}
              status={item.bio}
            />
          )
        })
      }
    </Flex>
  )
}

export default Request