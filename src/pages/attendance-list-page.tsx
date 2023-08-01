import { Container, Flex, Heading, Button, Text, Spacer} from '@chakra-ui/react'
import Navbar from '~/components/Navbar';

// const eventList = {

// }

// interface EventCardProps {
//   day: number;

// }

const EventCard = () => {
  return (
      <Flex flexDir="row" alignItems="center" p="16px" borderRadius="12px" bg="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40);">
        <Flex flexDir="column" gap="8px">
          <Heading size="SH5" color="yellow.4">
            Sesi - 2 (Talkshow)
          </Heading>
          <Flex alignItems="center">
            <Text size="B5" fontWeight="bold">
              Waktu
            </Text>
            <Text size="B5">&nbsp;: 00.00 - 00.00</Text>
          </Flex>
        </Flex>
        <Spacer/>
        <Button bg="yellow.5" borderRadius="12px" py="4px" px="16px" size="xs">
          <Text color="purple.2" size="A">
            tandai hadir
          </Text>
        </Button>
      </Flex>
  )
}

const AttendListPage = () => {
  return (
    
    <Container bgImage="url('attendancelist_background.svg')" >
      <Navbar/>
      <Flex flexDir="column">
        <Heading size="H4" color="yellow.400" mx="auto" mt="128px">ATTENDANCE LIST</Heading>
        <Flex flexDir="column" gap="20px" mt="44px">
          <Heading size="SH4">DAY 2</Heading>
          <EventCard/>
          <EventCard/>
        </Flex>
        <Flex flexDir="column" gap="20px" mt="44px">
          <Heading size="SH4">DAY 2</Heading>
          <EventCard/>
          <EventCard/>
        </Flex>
      </Flex>
    </Container>
    
  )
}
export default AttendListPage;