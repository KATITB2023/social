import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import TextInput from "../friends/TextInput";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "../showcase/ViewCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

interface EachCardType {
  image: string;
  name: string;
  route: string; // Assuming RouterType is a custom type representing your router
}

export const defaultData: EachCardType[] = [
  {
    image: "",
    name: "LFM",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "URO",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "8EH",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP1",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP2",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP3",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP4",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP5",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP6",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP7",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP8",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "KSEP9",
    route: "showcase/ukm/lfm",
  },
];

// const gridgappx = 10;

interface ListPageProps {
  title: string;
  description?: string;
  withbackbutton?: boolean;
  additionTitle?: string;
  lembaga: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
}

export default function ListPage({
  title,
  description,
  additionTitle,
  withbackbutton = false,
  lembaga,
}: ListPageProps) {
  const myRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const { data } = api.showcase.getAllUnits.useQuery({
  //   searchValue: searchQuery,
  //   lembaga,
  // });
  const [data, setData] = useState(defaultData);
  const [hasMore, setHasMore] = useState(true);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState<boolean>(false);
  console.log("my spinner", spinnerIsVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  function handleInfiniteScroll() {
    console.log("fetches more...");
    const newData = defaultData;
    setData((prev) => [...prev, ...newData]);
    setSpinnerIsVisible(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setSpinnerIsVisible(entry?.isIntersecting ?? false);
      if (spinnerIsVisible) {
        handleInfiniteScroll();
      }
    });

    if (!myRef.current) return;
    observer.observe(myRef.current);

    return () => {
      observer.disconnect();
    };
  }, [myRef, spinnerIsVisible]);

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
          {hasMore && (
            <Box as="div" ref={myRef}>
              <Spinner size="lg" />
            </Box>
          )}
        </Wrap>

        {/* </Grid> */}
      </Flex>
    </>
  );
}
