import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import TextInput from "../friends/TextInput";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "../showcase/ViewCard";

export const defaultData = [
  {
    image: "",
    name: "LFM",
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
  const data = defaultData;
  return (
    <>
      <Flex
        w={"full"}
        alignItems={"center"}
        flexDirection={"column"}
        px={"25px"}
        gap="25px"
        mt="20px"
      >
        {withbackbutton && (
          <Button bgColor={"transparent"}>
            <Image src="backbutton-logo.svg" alt="<"></Image>
          </Button>
        )}

        {/* Page title */}
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Heading size="H4" textShadow="0px 4px 30px #72D8BA" color="yellow.5">
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

        <Wrap justify={"space-evenly"} w={"full"} maxH={"700px"} overflow={"auto"}>
          {data.map((each) => {
            return <ViewCard key={each.name} title={each.name} image={each.image} route="/" />;
          })}
        </Wrap>

        {/* </Grid> */}
      </Flex>
    </>
  );
}