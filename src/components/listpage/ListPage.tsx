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
import Fakultas from "./Fakultas";
import { api } from "~/utils/api";
import { useState } from "react";
import SearchedHMJ from "./SearchedHMJ";

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
        {searchQuery == "" && data ? (
          <Accordion width={"full"} paddingY={2} defaultIndex={[0]} allowMultiple>
            {isFetching ? (
              <Text align={"center"}>Loading ...</Text>
            ) : (
              data?.map((group, index) => <Fakultas key={index} title={group} />)
            )}
          </Accordion>
        ) :(
          <SearchedHMJ searchQuery={searchQuery} />
        )
        }
      </Flex>
    </>
  );
}
