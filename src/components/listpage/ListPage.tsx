import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import TextInput from "../friends/TextInput";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "../showcase/ViewCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type UnitProfile } from "@prisma/client";

export const defaultData: UnitProfile[] = [
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

interface ListPageProps {
  title: string;
  description?: string;
  withbackbutton?: boolean;
  additionTitle?: string;
  lembaga: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
  dataUnit?: UnitProfile[] | undefined;
}

export default function ListPage({
  title,
  description,
  additionTitle,
  withbackbutton = false,
  lembaga,
  dataUnit,
}: ListPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryEntered, setQueryEntered] = useState<string>("");
  const { data: fetchedData } = api.showcase.getAllUnits.useQuery({
    searchValue: queryEntered,
    lembaga,
  });
  console.log(dataUnit, "Ini data unit");
  const [data, setData] = useState<UnitProfile[] | undefined>(dataUnit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") setQueryEntered(searchQuery);
  };

  useEffect(() => {
    setData(dataUnit);
  }, [dataUnit]);

  if (!data)
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
        pt={withbackbutton ? "50px" : "20px"}
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
        <Flex alignItems={"center"} flexDirection={"column"} maxW={"90%"}>
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
              textAlign={"center"}
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
          {data && data.length === 0 ? (
            <>
              <Text size="B3">
                Nothing matches with your query: &quot;{queryEntered}&quot;.
              </Text>
            </>
          ) : (
            data?.map((each) => {
              return (
                <ViewCard
                  key={each.name}
                  title={each.name}
                  // image={each.image}
                  route={`/showcase/ukm/${each.name}`}
                />
              );
            })
          )}
        </Wrap>
      </Flex>
    </>
  );
}
