import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { type UnitProfile } from "@prisma/client";
import { ViewCard } from "~/components/showcase/ViewCard";
import { useRouter } from "next/router";
import TextInput from "~/components/friends/TextInput";
import { api } from "~/utils/api";

/** TODO: HAPUS INI */
const defaultData: UnitProfile[] = [
  {
    userId: "",
    name: "LFM",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP1",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP2",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP3",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP4",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSPE5",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
];

// const gridgappx = 10;

interface RiwayatPageProps {
  title: string;
  description?: string;
  withbackbutton?: boolean;
  additionTitle?: string;
  withInfiniteScroll?: boolean;
  limit?: number;
}

export default function RiwayatPage({
  title,
  description,
  additionTitle,
  withbackbutton = false,
  withInfiniteScroll = false,
  limit = 100,
}: RiwayatPageProps) {
  const myRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryEntered, setQueryEntered] = useState<string>("");

  /** TODO: UBAH INI JADI INFINITE QUERY */
  const { data: fetchedData } = api.showcase.getAllVisitedUnits.useQuery({
    searchValue: queryEntered,
    limit,
  });

  const [data, setData] = useState<UnitProfile[] | undefined>(fetchedData);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /** TODO: UBAH INI JADI REFETCH INFINITE QUERY */
  const handleInfiniteScroll = () => {
    const newData = defaultData;

    setData((prev) => {
      if (prev) return [...prev, ...newData];
      return [...newData];
    });

    setSpinnerIsVisible(false);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") setQueryEntered(searchQuery);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setSpinnerIsVisible(entry?.isIntersecting ?? false);
      if (spinnerIsVisible && fetchedData) {
        handleInfiniteScroll();
      }
    });

    if (!myRef.current) return;
    observer.observe(myRef.current);

    return () => {
      observer.disconnect();
    };
  }, [myRef, spinnerIsVisible, fetchedData]);

  useEffect(() => {
    setData(fetchedData);
    if (fetchedData && fetchedData.length < 6) {
      setHasMore(false);
    }
  }, [fetchedData]);

  if (!fetchedData)
    return (
      <>
        <Flex
          w={"full"}
          alignItems={"center"}
          flexDirection={"column"}
          position={"relative"}
          px={"25px"}
          gap="25px"
          pt="50px"
        >
          {withbackbutton && (
            <Button
              onClick={() => router.back()}
              bgColor={"transparent"}
              position={"absolute"}
              top={0}
              left={3}
              borderRadius={"full"}
              width={10}
              height={10}
              padding={0}
            >
              <Image src="/backbutton-logo.svg" alt="Back button" />
            </Button>
          )}

          {/* Page title */}
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
              textAlign={"center"}
            >
              {title}
            </Heading>
            {additionTitle && (
              <Heading
                size="H4"
                textShadow="0px 4px 30px #72D8BA"
                color="yellow.5"
              >
                {additionTitle}
              </Heading>
            )}
            {description && (
              <Text wordBreak={"break-word"} width="60%" align={"center"}>
                {description}
              </Text>
            )}
          </Flex>

          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
            onEnter={handleEnter}
          />
        </Flex>{" "}
      </>
    );

  return (
    <>
      <Flex
        w={"full"}
        alignItems={"center"}
        flexDirection={"column"}
        position={"relative"}
        px={"25px"}
        gap="25px"
        pt="50px"
      >
        {withbackbutton && (
          <Button
            onClick={() => router.back()}
            bgColor={"transparent"}
            position={"absolute"}
            top={0}
            left={3}
            borderRadius={"full"}
            width={10}
            height={10}
            padding={0}
          >
            <Image src="/backbutton-logo.svg" alt="Back button" />
          </Button>
        )}

        {/* Page title */}
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Heading
            size="H4"
            textShadow="0px 4px 30px #72D8BA"
            color="yellow.5"
            textAlign={"center"}
          >
            {title}
          </Heading>
          {additionTitle && (
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
            >
              {additionTitle}
            </Heading>
          )}
          {description && (
            <Text wordBreak={"break-word"} width="60%" align={"center"}>
              {description}
            </Text>
          )}
        </Flex>

        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />

        {/* <Grid
            width="100%"
            height="520px"
            rowGap={`${gridgappx * 2}px`}
            overflow={"auto"}
            gridTemplateColumns={"1fr 1fr"}
            gridTemplateRows={`calc(${100 / 3}% - ${
              (gridgappx * 4) / 3
            }px) calc(${100 / 3}% - ${(gridgappx * 4) / 3}px) calc(${
              100 / 3
            }% - ${(gridgappx * 4) / 3}px)`}
            gridAutoRows={`calc(${100 / 3}% - ${(gridgappx * 4) / 3}px)`}
          > */}

        <Wrap
          justify={"space-evenly"}
          w={"full"}
          maxH={"700px"}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "5px",
            },
            "::-webkit-scrollbar-track": {
              display: "none",
              background: "rgb(68,70,84)",
            },
            "::-webkit-scrollbar-thumb": {
              background: "rgba(217,217,227,.8)",
              borderRadius: "full",
            },
          }}
        >
          {data?.map((each) => {
            return (
              <ViewCard
                key={Number(Date.now()) + Math.random()}
                // key will be changed later to each.name
                title={each.name}
                image={each.image || ""}
                route={`/showcase/ukm/${each.name}`}
              />
            );
          })}

          {hasMore &&
            (withInfiniteScroll ? (
              <Box as="div" ref={myRef}>
                <Spinner size="lg" />
              </Box>
            ) : null)}
        </Wrap>
      </Flex>
    </>
  );
}
