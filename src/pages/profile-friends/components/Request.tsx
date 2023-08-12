import { useDisclosure } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import DeleteFriendPopUp from '~/components/friends/DeleteFriendPopUp'
import NewFriendPopUp from '~/components/friends/NewFriendPopUp'
import RequestFriendCard from '~/components/friends/RequestFriendCard'
import { api } from "~/utils/api";


const Request = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const cursor = 1 as number;
  const limit = 5 as number;
  const getDataRequest = api.friend.friendList.useQuery({
    status:'WAITING_FOR_ACCEPTANCE',
    cursor,
    limit
  })
  return (
    <Flex flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
      <DeleteFriendPopUp onClose={onClose} isOpen={isOpen} />
      <NewFriendPopUp onClose={onClose2} isOpen={isOpen2}/>
      {
        getDataRequest.data?.data?.map((item, index) => {
          return (
            <RequestFriendCard
              key={index}
              image={item.image ?? undefined}
              name={item.name}
              status={item.bio}
              onOpen={onOpen}
              onOpen2={onOpen2}
            />
          )
        })
      }
    </Flex>
  )
}

export default Request