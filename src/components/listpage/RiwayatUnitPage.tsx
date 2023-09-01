import BackgroundAndNavbar from "../BackgroundAndNavbar";
import { Flex, Image, Button, Heading, Text, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TextInput from "~/components/friends/TextInput";
import { api } from "~/utils/api";
import { ViewCard } from "../showcase/ViewCard";
import { useState } from "react";
import {type Lembaga, type UnitProfile } from "@prisma/client";
import SearchedHistory from "./SearchedHistory";

export default function RiwayatUnitPage({ title, group }: { title: string, group?:string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryEntered, setQueryEntered] = useState<string>("");
  const lembaga = title === "Himpunan" ? "HMJ" : (title as Lembaga);
  const historyData = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: lembaga,
  }).data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") setQueryEntered(searchQuery);
  };
  return (
    <BackgroundAndNavbar bg="/background.png">
      <Flex
        w="full"
        alignItems="center"
        flexDirection="column"
        position="relative"
        px="25px"
        gap="25px"
        pt="50px"
      >
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

        {historyData && historyData.length > 0 ? (
          <>
            <Flex alignItems="center" flexDirection="column" maxW="90%">
              <Heading
                size="H4"
                textShadow="0px 4px 30px #72D8BA"
                color="yellow.5"
                textAlign="center"
              >
                {title}
              </Heading>
              <Text wordBreak="break-word" width="60%" align="center">
                Berikut ini adalah daftar {title} yang telah kamu kunjungi.
              </Text>
            </Flex>

            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />

            <Wrap
              justify="space-evenly"
              w="full"
              maxH="700px"
              overflow="auto"
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
                <SearchedHistory
                  searchQuery={searchQuery}
                  lembaga={lembaga}
                />
              )}
              {searchQuery === "" &&
                historyData?.map((each) => {
                  let route = ""
                  if(title === "UKM"){
                    route = `/showcase/ukm/${each.group ? each.group : ""}/${each.userId}`
                  }else if(title === "HMJ"){
                    route = `/showcase/himpunan/${each.userId}`
                  }else{
                    console.log(title,'Ini title')
                    route = `/showcase/${title.toLowerCase()}/${each.userId}`
                  }
                  return (
                    <ViewCard
                      key={each.name}
                      title={each.name}
                      image={each.image}
                      route={route}
                    />
                  );
                })}
            </Wrap>
          </>
        ) : (
          <Flex flexDir={"column"} mx={"auto"} my={"25vh"}>
            <Heading color={"yellow.5"} textAlign={"center"}>
              {" "}
              Waduh!
            </Heading>
            <Text fontSize={"16px"} textAlign={"center"}>
              {" "}
              {`Belum ada ${title} yang sudah kamu kunjungi! Silahkan kembali untuk mengunjungi halaman ${title}.`}{" "}
            </Text>
          </Flex>
        )}
      </Flex>
    </BackgroundAndNavbar>
  );
}
