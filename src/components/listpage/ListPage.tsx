import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Accordion,
} from "@chakra-ui/react";
import TextInput from "../friends/TextInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "../showcase/ViewCard";

export const defaultData = [
  {
    image: "",
    name: "LFM",
    route: "showcase/ukm/lfm",
  },
  {
    image: "",
    name: "URO",
  },
  {
    image: "",
    name: "8EH",
  },
  {
    image: "",
    name: "KSEP1",
  },
  {
    image: "",
    name: "KSEP2",
  },
  {
    image: "",
    name: "KSEP3",
  },
  {
    image: "",
    name: "KSEP4",
  },
  {
    image: "",
    name: "KSEP5",
  },
  {
    image: "",
    name: "KSEP6",
  },
  {
    image: "",
    name: "KSEP7",
  },
  {
    image: "",
    name: "KSEP8",
  },
  {
    image: "",
    name: "KSEP9",
  },
  {
    image: "",
    name: "KSEP10",
  },
];

// const gridgappx = 10;

interface ListPageProps {
  title: string;
  description?: string;
  withbackbutton?: boolean;
  additionTitle?: string;
}

export default function ListPage({
  title,
  description,
  additionTitle,
  withbackbutton = false,
}: ListPageProps) {
  const router = useRouter();
  const { data, isFetching } = api.showcase.getGroups.useQuery({
    lembaga: "HMJ",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
          <Heading size="H4" textShadow="0px 4px 30px #72D8BA" color="yellow.5" textAlign={"center"}>
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

        <TextInput placeholder="Search..." />

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
          overflow={"auto"}
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
          {defaultData.map((each) => {
            return (
              <ViewCard
                key={each.name}
                title={each.name}
                // image={each.image}
                route={`/showcase/ukm/${each.name}`}
              />
            );
          })}
        </Wrap>

        {/* </Grid> */}
      </Flex>
    </>
  );
}
