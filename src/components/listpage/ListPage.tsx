import { Button, Flex, Heading, Image, Text, Wrap } from "@chakra-ui/react";
import TextInput from "../friends/TextInput";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ViewCard } from "../showcase/ViewCard";
import { useEffect, useState } from "react";
import { type UnitProfile } from "@prisma/client";
import SearchedUnit from "./SearchedUnit";

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
          {searchQuery && (
            <SearchedUnit
              searchQuery={searchQuery}
              lembaga={lembaga}
              group={lembaga === "UKM" ? title : undefined}
            />
          )}
          {searchQuery === "" &&
            data?.map((each) => {
              const route =
                lembaga === "UKM"
                  ? `${title.toLowerCase()}/${each.userId}`
                  : lembaga === "BSO"
                  ? `bso/${each.userId}`
                  : `${each.name}`;
              return (
                <ViewCard
                  key={each.name}
                  title={each.name}
                  // image={each.image}
                  route={route}
                  unitId={each.userId}
                />
              );
            })}
        </Wrap>
      </Flex>
    </>
  );
}
