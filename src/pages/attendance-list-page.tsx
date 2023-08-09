import {
  Box,
  Image,
  Container,
  Flex,
  Heading,
  Button,
  Text,
  Spacer,
  useToast,
  Spinner,
  position,
} from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";
import {
  type AttendanceEvent,
  type AttendanceRecord,
  Status,
} from "@prisma/client";
import { useState } from "react";
import { TRPCClientError } from "@trpc/client";

// const eventList = {
//   "Day 1": {
//     "1": {
//       title: "Sesi 2 (Talkshow)",
//       startTime: "17.50",
//       endTime: "18.10",
//       status: "tandai hadir",
//     },
//     "2": {
//       title: "Sesi 2 (Talkshow)",
//       startTime: "17.50",
//       endTime: "18.10",
//       status: "tandai hadir",
//     },
//   },
//   "Day 2": {
//     "1": {
//       title: "Sesi 2 (Talkshow)",
//       startTime: "17.50",
//       endTime: "18.10",
//       status: "tandai hadir",
//     },
//     "2": {
//       title: "Sesi 2 (Talkshow)",
//       startTime: "17.50",
//       endTime: "18.10",
//       status: "tandai hadir",
//     },
//   },
// };

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

const StatusButton = ({
  onClick,
  isDisabled = true,
  bg,
  borderColor,
  text,
}: {
  onClick?: () => void;
  isDisabled?: boolean;
  bg:string;
  borderColor?: string;
  text: string;
}) => {
  return (
    <Button
    border="1px"
    borderColor={borderColor}
    bg={bg}
    borderRadius="12px"
    py="4px"
    px="16px"
    size="xs"
    _hover={isDisabled ? { opacity: 1 } : { opacity: 0.8 }}
    onClick={isDisabled ? undefined : onClick}
  >
    <Text color={borderColor} size="A">
      {text}
    </Text>
  </Button>
  )
};

const getTwoTime = (startDate: Date, endDate: Date) => {
  const startTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = endDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${startTime} - ${endTime}`;
};

const validTime = (startTime: Date, endTime: Date) => {
  const currentTime = new Date(Date.now());

  return currentTime >= startTime && currentTime <= endTime;
};

// const SuccessToast = ({ children }) => {
//   const toast = useToast();

//   return (
//     <Box
//       position="fixed"
//       top="50%"
//       left="50%"
//       transform="translate(-50%, -50%)"
//       zIndex="9999"
//       borderRadius="24px"
//       bg="var(--purple-purple-1, #340C8F)"
//       shadow="0px 4px 25px 0px rgba(255, 255, 255, 0.50)"
//     >
//       <Image src="hadir.svg" alt="icon"/>
//       <Heading size="SH4">HADIR!</Heading>
//       {children}
//     </Box>
//   );
// };

const EventCard = ({
  event,
  status,
}: {
  event: AttendanceEvent;
  status: Status | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [alreadyAbsen, setAlreadyAbsen] = useState(
    status !== null || status !== Status.TIDAK_HADIR
  );
  const toast = useToast();
  const absenMutation = api.absensi.submitAbsensi.useMutation();
  const canAbsen = validTime(event.startTime, event.endTime);

  const handleAttend = async (eventId: string) => {
    setLoading(true);
    try {
      const result = await absenMutation.mutateAsync(eventId);

      toast({
        title: "Success",
        status: "success",
        description: result?.message,
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      setAlreadyAbsen(true);
    } catch (err: unknown) {
      if (!(err instanceof TRPCClientError)) throw err;

      toast({
        title: "Failed",
        status: "error",
        description: err.message,
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(false);
  };

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
          {event.title}
        </Heading>
        <Flex alignItems="center">
          <Text size="B5" fontWeight="bold">
            Waktu
          </Text>
          <Text size="B5">
            &nbsp;: {getTwoTime(event.startTime, event.endTime)}
          </Text>
        </Flex>
      </Flex>
      <Spacer />
      {alreadyAbsen ? (
        status===Status.HADIR ? (
          <StatusButton bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF" borderColor="green.2" text="hadir"/>
          ) : (
            status===Status.IZIN_DITERIMA ? (
              <StatusButton bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF" borderColor="green.2" text="izin diterima"/>
              ) : (
                status===Status.IZIN_PENDING ? (
                <StatusButton bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF" borderColor="green.2" text="izin pending"/>
                ) : (
                  // izin ditolak
                  <StatusButton bg="linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF" borderColor="#E8553E" text="izin ditolak"/>
                )
            )
        ) 
      ) : canAbsen ? (
        loading ? (
          <Spinner color="#1C939A" />
        ) : (
          <StatusButton bg="yellow.5" text="tandai hadir" onClick={() => void handleAttend(event.id)}/>
        )
      ) : (
        <StatusButton bg="linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF" borderColor="#E8553E" text="tidak hadir"/>
      )}
    </Flex>
  );
};

interface AbsenStatus {
  event: AttendanceEvent;
  record: AttendanceRecord | null;
  status: Status | null;
}

interface EventsDay {
  day: string;
  events: AbsenStatus[];
}

const isThere = ({
  eventsDay,
  dayId,
}: {
  eventsDay: EventsDay[];
  dayId: string;
}) => {
  eventsDay.forEach(({ day, events }) => {
    if (dayId === day) {
      return true;
    }
  });
  return false;
};

const AttendListPage = () => {
  const eventQuery = api.absensi.viewAbsensi.useQuery();
  const eventList = eventQuery?.data;

  const eventsByDay: EventsDay[] = [];

  // if (eventList) {
  //   eventList.forEach(({ event, record, status }) => {
  //     const dayId = event.dayId;

  //     // Create a new AbsenStatus object
  //     const absenStatus: AbsenStatus = {
  //       event,
  //       record,
  //       status,
  //     };

  //     if (isThere(eventsDay={eventsByDay} dayId={dayId})) {
  //       eventsByDay.push({
  //         day: dayId,
  //         events: [absenStatus],
  //       });
  //     } else {
  //       // If the day is already in the eventsByDay array, push the AbsenStatus to its events
  //       eventsByDay[dayIndex].events.push(absenStatus);
  //     }
  //   });
  // }

  return (
    <BackgroundAndNavbar>
      <Container bgImage="url('attendancelist_background.svg')">
        <Flex flexDir="column">
          <Heading size="H4" color="yellow.400" mx="auto" mt="128px">
            ATTENDANCE LIST
          </Heading>
          <Flex flexDir="column">
            {/* {eventListt?.map((item) => (
              <Flex key={item.event.id} flexDir="column" gap="20px" mt="44px">
                <Heading size="SH4">{item.event.dayId}</Heading>
                {events.map(([id, event]) => (
                  <EventCard key={id} eventData={event} />
                ))}
              </Flex>
            ))} */}
            <Flex flexDir="column" gap="20px" mt="44px">
              <Heading size="SH4">DAY 1</Heading>
              {eventList?.map((item) => (
                <EventCard key={item.event.id} event={item.event} status={item.status}/>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </BackgroundAndNavbar>
  );
};
export default AttendListPage;
