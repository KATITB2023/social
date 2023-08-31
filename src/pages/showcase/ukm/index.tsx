import React from "react";
import Layout from "~/layout";

import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Heading, Flex, Button, Image, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ViewCard } from "~/components/showcase/ViewCard";

export default function UKMPage() {
  const router = useRouter();
  const rumpunData = api.showcase.getGroups.useQuery({lembaga : "UKM"}).data;
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <BackgroundAndNavbar bg="/background.png">
        <Flex
          w={"full"}
          alignItems={"center"}
          flexDirection={"column"}
          position={"relative"}
          px={"25px"}
          gap="25px"
          pt={"50px"}
        >
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

          {/* Page title */}
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
              textAlign={"center"}
            >
              RUMPUN UNIT KEGIATAN MAHASISWA
            </Heading>

          </Flex>


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
            {rumpunData && rumpunData.map((item) => {
              return (
                <ViewCard
                  key={item}
                  title={item}
                  route={`/showcase/ukm/${item}`}
                />
              );
            })}
          </Wrap>

          {/* </Grid> */}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
