import { useEffect, useState } from "react";
import { Button, Flex, Heading, Image, Text, Wrap } from "@chakra-ui/react";
import { Lembaga, type UnitProfile } from "@prisma/client";
import { useRouter } from "next/router";
import TextInput from "~/components/friends/TextInput";
import { ViewCard } from "~/components/showcase/ViewCard";
import SearchedUnit from "~/components/listpage/SearchedUnit";

interface ListPageProps {
  title: string;
  description?: string;
  withbackbutton?: boolean;
  additionTitle?: string;
  lembaga: Lembaga;
  dataUnit?: UnitProfile[];
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
          w="full"
          alignItems="center"
          flexDirection="column"
          position="relative"
          px="25px"
          gap="25px"
          pt="50px"
        >
          {withbackbutton && (
            <Button
              onClick={() => router.back()}
              bgColor="transparent"
              position="absolute"
              top={0}
              left={3}
              borderRadius="full"
              width={10}
              height={10}
              padding={0}
            >
              <Image src="/backbutton-logo.svg" alt="Back button" />
            </Button>
          )}

          {/* Page title */}
          <Flex alignItems="center" flexDirection="column">
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
              textAlign="center"
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
              <Text wordBreak="break-word" width="60%" align="center">
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
    <Flex
      w="full"
      alignItems="center"
      flexDirection="column"
      position="relative"
      px="25px"
      gap="25px"
      pt={withbackbutton ? "50px" : "20px"}
    >
      {withbackbutton && (
        <Button
          onClick={() => router.back()}
          bgColor="transparent"
          position="absolute"
          top={0}
          left={3}
          borderRadius="full"
          width={10}
          height={10}
          padding={0}
        >
          <Image src="/backbutton-logo.svg" alt="Back button" />
        </Button>
      )}

      {/* Page title */}
      <Flex alignItems="center" flexDirection="column" maxW="90%">
        <Heading
          size="H4"
          textShadow="0px 4px 30px #72D8BA"
          color="yellow.5"
          textAlign="center"
        >
          {title}
        </Heading>
        {additionTitle && (
          <Heading
            size="H4"
            textShadow="0px 4px 30px #72D8BA"
            color="yellow.5"
            textAlign="center"
          >
            {additionTitle}
          </Heading>
        )}
        {description && (
          <Text wordBreak="break-word" width="60%" align="center">
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

      <Wrap
        justify="space-evenly"
        w="full"
        maxH="700px"
        overflowY="auto"
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
            group={lembaga === Lembaga.UKM ? title : undefined}
          />
        )}
        {searchQuery === "" &&
          data?.map((each) => {
            const route =
              lembaga === Lembaga.UKM
                ? `${title.toLowerCase()}/${each.userId}`
                : lembaga === Lembaga.BSO
                ? `bso/${each.userId}`
                : lembaga === Lembaga.PUSAT
                ? `pusat/${each.userId}`
                : lembaga === Lembaga.PENGMAS
                ? `pengmas/${each.userId}`
                : each.name;
            return (
              <ViewCard
                key={each.name}
                title={each.name}
                image={each.image}
                route={route}
                unitId={each.userId}
              />
            );
          })}
      </Wrap>
    </Flex>
  );
}
