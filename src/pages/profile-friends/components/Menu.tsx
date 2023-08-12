import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Menu = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <Flex width='full' paddingBottom='6px' justifyContent='center' gap='2' alignItems='center'  borderBottomColor='yellow.5' borderBottomWidth='2px'>
        <Text fontWeight='semibold' fontSize='14px' textAlign='center' color='yellow.5'>
            {
                children
            }
        </Text>
        <Text borderRadius='full' bgColor='#E8553E' color='yellow.5' width='20px' height='20px' display='flex' justifyContent='center' alignItems='center'>
    6
</Text>

    </Flex>
  )
}

export default Menu