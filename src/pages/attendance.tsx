import { type PropsWithChildren, useState } from "react";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import {
  type AttendanceEvent,
  type AttendanceRecord,
  type Status,
} from "@prisma/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";

import Navbar from "~/components/Navbar";
import Layout from "~/layout";
import dayjs from "dayjs";

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
      src={`/${name}.svg`}
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

const BackgroundAndNavbar = ({ children }: PropsWithChildren) => {
  return (
    <Box
      position="relative"
      minHeight="100vh"
      height="100%"
      overflow={"hidden"}
    >
      <Image
        src="background.png"
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
  bg: string;
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
  );
};

// UTILS FUNCTION
const getTwoTime = (startDate: Date, endDate: Date) => {
  const startTime = dayjs(startDate).tz("Asia/Jakarta").format("DD/MM HH:mm");
  const endTime = dayjs(endDate).tz("Asia/Jakarta").format("DD/MM HH:mm");
  return `${startTime} - ${endTime}`;
};

const validTime = (startTime: Date, endTime: Date) => {
  const now = dayjs();
  return dayjs(startTime).isBefore(now) && dayjs(endTime).isAfter(now);
};

const EventCard = ({
  event,
  status: initialStatus,
}: {
  event: AttendanceEvent;
  status: Status | null;
}) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(() =>
    initialStatus === null ? "TIDAK_HADIR" : initialStatus
  );

  const toast = useToast();
  const absenMutation = api.absensi.submitAbsensi.useMutation();
  const canAttend = validTime(event.startTime, event.endTime);

  const handleAttend = async (eventId: string) => {
    try {
      const result = await absenMutation.mutateAsync({ eventId });

      toast({
        title: "Success",
        status: "success",
        description: result,
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      setCurrentStatus("HADIR");
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
      {currentStatus === "HADIR" ? (
        <StatusButton
          bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF"
          borderColor="green.2"
          text="Hadir"
          isDisabled={true}
        />
      ) : currentStatus === "IZIN_PENDING" ? (
        <StatusButton
          bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF"
          borderColor="green.2"
          text="Izin Pending"
          isDisabled={true}
        />
      ) : currentStatus === "IZIN_DITERIMA" ? (
        <StatusButton
          bg="linear-gradient(0deg, rgba(114, 216, 186, 0.50) 0%, rgba(114, 216, 186, 0.50) 100%), #FFF"
          borderColor="green.2"
          text="Izin Diterima"
          isDisabled={true}
        />
      ) : currentStatus === "IZIN_DITOLAK" ? (
        <StatusButton
          bg="linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF"
          borderColor="#E8553E"
          text="izin ditolak"
        />
      ) : canAttend ? (
        <StatusButton
          bg="yellow.5"
          text="Tandai Hadir"
          onClick={() => void handleAttend(event.id)}
          isDisabled={absenMutation.isLoading}
        />
      ) : dayjs().isBefore(event.startTime) ? (
        <StatusButton bg="yellow.5" text="Belum Dibuka" isDisabled={true} />
      ) : (
        <StatusButton
          bg="linear-gradient(0deg, rgba(232, 85, 62, 0.50) 0%, rgba(232, 85, 62, 0.50) 100%), #FFF"
          text="Tidak Hadir"
          isDisabled={true}
        />
      )}
    </Flex>
  );
};

interface AbsenStatus {
  event: AttendanceEvent;
  record: AttendanceRecord | null;
  status: Status | null;
}

const AttendListPage = () => {
  const hasil = api.absensi.viewAbsensi.useQuery();
  const eventList = hasil.data;
  const eventsByDay: Map<string, AbsenStatus[]> = new Map();

  if (eventList) {
    eventList.forEach(({ event, record, status, day }) => {
      const absenStatus: AbsenStatus = {
        event,
        record,
        status,
      };
      if (eventsByDay.has(day)) {
        const temp = eventsByDay.get(day)!;
        eventsByDay.delete(day);
        eventsByDay.set(day, temp.concat([absenStatus]));
      } else {
        eventsByDay.set(day, [absenStatus]);
      }
    });
  }

  return (
    <Layout title={"Attendance"}>
      <BackgroundAndNavbar>
        <Container bgImage="url('attendancelist_background.svg')" pb={"10"}>
          <Flex flexDir="column">
            <Heading size="H4" color="yellow.400" mx="auto" mt="5%">
              ATTENDANCE LIST
            </Heading>
            <Flex flexDir="column">
              {Array.from(eventsByDay.keys()).map((item) => (
                <Flex key={item} flexDir="column" gap="20px" mt="44px">
                  <Heading size="SH4">{item}</Heading>
                  {eventsByDay.get(item)!.map((eventsInDay, index) => (
                    <EventCard
                      key={index}
                      event={eventsInDay.event}
                      status={eventsInDay.status}
                    />
                  ))}
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Container>
      </BackgroundAndNavbar>
    </Layout>
  );
};
export default AttendListPage;