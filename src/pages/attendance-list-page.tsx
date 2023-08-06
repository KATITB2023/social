import {
  Box,
  Image,
  Container,
  Flex,
  Heading,
  Button,
  Text,
  Spacer,
} from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { stat } from "fs";

const eventList = {
  "Day 1": {
    "1": {
      title: "Sesi 2 (Talkshow)",
      startTime: "17.50",
      endTime: "18.10",
      status: "tandai hadir",
    },
    "2": {
      title: "Sesi 2 (Talkshow)",
      startTime: "17.50",
      endTime: "18.10",
      status: "tandai hadir",
    },
  },
  "Day 2": {
    "1": {
      title: "Sesi 2 (Talkshow)",
      startTime: "17.50",
      endTime: "18.10",
      status: "tandai hadir",
    },
    "2": {
      title: "Sesi 2 (Talkshow)",
      startTime: "17.50",
      endTime: "18.10",
      status: "tandai hadir",
    },
  },
};

type childrenOnlyProps = {
  children: string | JSX.Element | JSX.Element[];
};

interface BgAssetProps {
  name: string;
  left: string;
  top: string;
  height?: string;
  width?: string;
  objPos?: string;
  objFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

const BackgroundAsset = (props: BgAssetProps) => {
  const { name, left, top, height, width, objPos, objFit } = props;
  return (
    <Image
      src={`${name}.svg`}
      alt="asset"
      zIndex="-1"
      position="absolute"
      height={height ? height : "200px"}
      width={width ? width : "200px"}
      top={top}
      left={left}
      objectPosition={objPos ? objPos : ""}
      objectFit={objFit}
    />
  );
};

const BackgroundAndNavbar = ({ children }: childrenOnlyProps) => {
  return (
    <Box position="relative" minHeight="100vh" height="100%">
      <Image
        src="background.svg"
        alt="background"
        height="100%"
        zIndex="-2"
        position="absolute"
        objectFit="cover"
        minWidth="100%"
        width="100%"
      />
      <BackgroundAsset name="komet4" top="40px" left="-35px" />
      <BackgroundAsset
        name="bulan1"
        top="380px"
        left="-28px"
        height="150px"
        width="150px"
      />
      <BackgroundAsset
        name="nebulaBiru"
        top="233px"
        left="-40px"
        height="400px"
        width="400px"
      />
      <BackgroundAsset
        name="nebulaPink"
        top="-2px"
        left="8px"
        height="400px"
        width="400px"
        objPos="50% 100%"
        objFit="contain"
      />
      <BackgroundAsset name="bintang2" top="388px" left="16px" />
      <BackgroundAsset
        name="komet1"
        top="630px"
        left="143px"
        height="220px"
        width="240px"
        objPos="475% 100%"
        objFit="contain"
      />
      <BackgroundAsset
        name="spark1Biru"
        top="403px"
        left="180px"
        objPos="190% 100%"
        objFit="contain"
      />
      <BackgroundAsset name="spark1Merah" top="605px" left="-28px" />

      <Flex flexDirection="column">
        <Navbar />
        {children}
      </Flex>
    </Box>
  );
};

interface EventData {
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface EventCardProps {
  eventData: EventData;
}

interface StatButtonProps {
  status: string;
}

const StatusButton = (props: StatButtonProps) => {
  const { status } = props;
  if (status == "tandai hadir") {
    return (
      <Button bg="yellow.5" borderRadius="12px" py="4px" px="16px" size="xs">
        <Text color="purple.2" size="A">
          {status}
        </Text>
      </Button>
    );
  } else if (status == "hadir") {
    return (
      <Button border="1px" borderColor="green.2" bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF" borderRadius="12px" py="4px" px="16px" size="xs">
        <Text color="green.2" size="A">
          {status}
        </Text>
      </Button>
    );
  } else {
    return (
      <Button  border="1px" borderColor="#E8553E" bg="linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF" borderRadius="12px" py="4px" px="16px" size="xs">
        <Text color="#E8553E" size="A">
          {status}
        </Text>
      </Button>
    )
  }
};

const EventCard = (props: EventCardProps) => {
  const { eventData } = props;

  return (
    <Flex
      flexDir="row"
      alignItems="center"
      p="16px"
      borderRadius="12px"
      bg="linear-gradient(314deg, rgba(43, 7, 146, 0.93) 0%, rgba(43, 7, 146, 0.66) 0%, rgba(43, 7, 146, 0.00) 100%), rgba(255, 255, 255, 0.40);"
    >
      <Flex flexDir="column" gap="8px">
        <Heading size="SH5" color="yellow.4">
          {eventData.title}
        </Heading>
        <Flex alignItems="center">
          <Text size="B5" fontWeight="bold">
            Waktu
          </Text>
          <Text size="B5">
            &nbsp;: {eventData.startTime} - {eventData.endTime}
          </Text>
        </Flex>
      </Flex>
      <Spacer />
      <StatusButton status="hadir"/>
    </Flex>
  );
};

const AttendListPage = () => {
  const { data: session } = useSession();
  const eventQuery = api.absensi.viewAbsensi.useQuery();
  const eventListt = eventQuery?.data;

  return (
    <BackgroundAndNavbar>
      <Container bgImage="url('attendancelist_background.svg')">
        <Flex flexDir="column">
          <Heading size="H4" color="yellow.400" mx="auto" mt="128px">
            ATTENDANCE LIST
          </Heading>
          {Object.entries(eventList).map(([day, events]) => (
            <Flex key={day} flexDir="column" gap="20px" mt="44px">
              <Heading size="SH4">{day}</Heading>
              {Object.entries(events).map(([id, event]) => (
                <EventCard key={id} eventData={event} />
              ))}
            </Flex>
          ))}
        </Flex>
      </Container>
    </BackgroundAndNavbar>
  );
};
export default AttendListPage;
