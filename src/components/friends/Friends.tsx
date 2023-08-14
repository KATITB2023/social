import { Flex, Button } from '@chakra-ui/react'
import MyFriendCard from '~/components/friends/MyFriendCard'
import { api } from "~/utils/api";
import { useRef,useEffect, useState } from 'react';

const Friends = () => {
  const cursor = 1 as number;
  const [total, setTotal] = useState<number>(10);
  const getDataRequest = api.friend.friendList.useQuery({
    status:'FRIEND',
    cursor,
    limit: total
  })

  return (
    <Flex flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
      {
        getDataRequest.data?.data?.map((item, index) => {
          return (
            <MyFriendCard
              image={item.image ?? undefined}
              name={item.name}
              bio={item.bio}
              id={item.id}
              key={index}
            />
          )
        })
      }
      {getDataRequest.data && getDataRequest.data?.nextCursor != undefined ? 
        <Button  onClick={() => setTotal(total + 10)}>
          See more
        </Button>
        : 
        <></>
      }
    </Flex>
  )
}

export default Friends