import { useDisclosure } from '@chakra-ui/react'
import { Flex,Box } from '@chakra-ui/react'
import React from 'react'
import DeleteFriendPopUp from '~/components/friends/DeleteFriendPopUp'
import NewFriendPopUp from '~/components/friends/NewFriendPopUp'
import RequestFriendCard from '~/components/friends/RequestFriendCard'

const Request = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  return (
    <Flex flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
      <DeleteFriendPopUp onClose={onClose} isOpen={isOpen} />
      <NewFriendPopUp onClose={onClose2} isOpen={isOpen2}/>
     <RequestFriendCard onOpen={onOpen} onOpen2={onOpen2} />
     <RequestFriendCard onOpen={onOpen} onOpen2={onOpen2} />
     <RequestFriendCard onOpen={onOpen} onOpen2={onOpen2} />
     <RequestFriendCard onOpen={onOpen} onOpen2={onOpen2} />
     <RequestFriendCard onOpen={onOpen} onOpen2={onOpen2} />
    </Flex>
  )
}

export default Request