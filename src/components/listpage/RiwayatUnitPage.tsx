import { Lembaga } from "@prisma/client";
import BackgroundAndNavbar from "../BackgroundAndNavbar";
import { Flex, Image, Button, Heading, Text, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TextInput from "~/components/friends/TextInput";
import { ViewCard } from "~/components/showcase/ViewCard";
import { api } from "~/utils/api";

export default function RiwayatUnitPage({ title }: { title: string }) {
  const router = useRouter();
  const historyData =
    title === "UKM"
      ? api.showcase.getAllVisitedUnits.useQuery({ lembaga: Lembaga.UKM }).data
      : title === "Himpunan"
      ? api.showcase.getAllVisitedUnits.useQuery({ lembaga: Lembaga.HMJ }).data
      : title === "BSO"
      ? api.showcase.getAllVisitedUnits.useQuery({ lembaga: Lembaga.BSO }).data
      : undefined;

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

            <TextInput placeholder="Search..." />

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
              {historyData.map((unitProfile) => {
                return (
                  <ViewCard
                    key={unitProfile.name}
                    title={unitProfile.name}
                    image={unitProfile.image}
                    route={
                      title === "UKM"
                        ? unitProfile.group
                          ? `/showcase/ukm/${unitProfile.group}/${unitProfile.userId}`
                          : "/"
                        : `/showcase/${title.toLowerCase()}/${
                            unitProfile.userId
                          }`
                    }
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
