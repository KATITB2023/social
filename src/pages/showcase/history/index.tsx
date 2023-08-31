import React from "react";
import { Flex, Text, Heading, Box, grid } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import TextInput from "~/components/friends/TextInput";
import Link from "next/link";
import { CardSlider } from "~/components/showcase/CardSlider";
import { api } from "~/utils/api";

export default function HistoryPage() {
  // DUMMY DATA
  // const ukmItems = [
  //   { image: "/base.png", title: "1", route: "/" },
  //   { image: "/base.png", title: "2", route: "/" },
  //   { image: "/base.png", title: "3", route: "/" },
  //   { image: "/base.png", title: "4", route: "/" },
  //   { image: "/base.png", title: "5", route: "/" },
  //   { image: "/base.png", title: "6", route: "/" },
  //   { image: "/base.png", title: "7", route: "/" },
  //   { image: "/base.png", title: "8", route: "/" },
  //   { image: "/base.png", title: "7", route: "/" },
  //   { image: "/base.png", title: "8", route: "/" },
  //   { image: "/base.png", title: "7", route: "/" },
  //   { image: "/base.png", title: "8", route: "/" },
  // ];

  // const bsoItems = [
  //   { image: "/base.png", title: "1", route: "/" },
  //   { image: "/base.png", title: "2", route: "/" },
  //   { image: "/base.png", title: "3", route: "/" },
  //   { image: "/base.png", title: "4", route: "/" },
  //   { image: "/base.png", title: "5", route: "/" },
  //   { image: "/base.png", title: "6", route: "/" },
  // ];
  // const himpunanItems = [
  //   { image: "/base.png", title: "LFM", route: "/" },
  //   { image: "/base.png", title: "Radio kambing sejahtera", route: "/" },
  //   { image: "/base.png", title: "tes", route: "/" },
  //   { image: "/base.png", title: "Radio kambing sejahtera", route: "/" },
  //   { image: "/base.png", title: "LPM3", route: "/" },
  //   { image: "/base.png", title: "Si paling Berenang", route: "/" },
  // ];

  const ukmVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "UKM",
    limit: 10,
  }).data;
  const bsoVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "BSO",
    limit: 10,
  }).data;
  const hmjVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "HMJ",
    limit: 10,
  }).data;

  return (
    <Layout title="Riwayat Pengunjungan">
      <BackgroundAndNavbar bg="/background.png">
        <Flex
          w="80%"
          justifyContent="center"
          margin="auto"
          my="30px"
          flexDirection="column"
        >
          <Heading
            textAlign="center"
            size="H4"
            fontWeight="400px"
            color="yellow.5"
          >
            UKM, BSO, DAN HIMPUNAN YANG SUDAH DIKUNJUNGI
          </Heading>

          <Box mt="15px" mb="20px">
            <TextInput placeholder="Search..." />
          </Box>
          {(!ukmVisitedArr || ukmVisitedArr.length === 0) &&
          (!bsoVisitedArr || bsoVisitedArr.length === 0) &&
          (!hmjVisitedArr || hmjVisitedArr.length === 0) ? (
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Heading textAlign={"center"}>
                {" "}
                Waduh! Kamu belum mengunjungi UKM, BSO, maupun Himpunan manapun!{" "}
              </Heading>
            </Flex>
          ) : (
            <>
              {ukmVisitedArr && ukmVisitedArr.length > 0 && (
                <>
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    width="full"
                    marginTop="30px"
                  >
                    <Heading size="SH4" textColor="white" fontWeight="700">
                      UKM
                    </Heading>
                    <Link href={"history/ukm"}>
                      <Text size="B3" textColor="yellow.5" fontWeight="700">
                        View all
                      </Text>
                    </Link>
                  </Flex>
                  <CardSlider>
                    {ukmVisitedArr &&
                      ukmVisitedArr.map((item, index) => (
                        <Flex mx={"5px"} key={index}>
                          <ViewCard
                            image={item.image}
                            title={item.name}
                            route={item.userId}
                            width={"100%"}
                          />
                        </Flex>
                      ))}
                  </CardSlider>
                </>
              )}

              {bsoVisitedArr && bsoVisitedArr.length > 0 && (
                <>
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    width="full"
                    marginTop="75px"
                  >
                    <Heading size="SH4" textColor="white" fontWeight="700">
                      BSO
                    </Heading>
                    <Link href={"history/bso"}>
                      <Text size="B3" textColor="yellow.5" fontWeight="700">
                        View all
                      </Text>
                    </Link>
                  </Flex>
                  <CardSlider>
                    {bsoVisitedArr &&
                      bsoVisitedArr.map((item, index) => (
                        <Flex mx={"5px"} key={index}>
                          <ViewCard
                            image={item.image}
                            title={item.name}
                            route={item.userId}
                            width={"100%"}
                          />
                        </Flex>
                      ))}
                  </CardSlider>
                </>
              )}

              {hmjVisitedArr && hmjVisitedArr.length > 0 && (
                <>
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    width="full"
                    marginTop="75px"
                  >
                    <Heading size="SH4" textColor="white" fontWeight="700">
                      HIMPUNAN
                    </Heading>
                    <Link href={"history/himpunan"}>
                      <Text size="B3" textColor="yellow.5" fontWeight="700">
                        View all
                      </Text>
                    </Link>
                  </Flex>
                  <CardSlider>
                    {hmjVisitedArr.map((item, index) => (
                      <Flex mx={"5px"} key={index}>
                        <ViewCard
                          image={item.image}
                          title={item.name}
                          route={item.userId}
                          width={"100%"}
                        />
                      </Flex>
                    ))}
                  </CardSlider>
                </>
              )}
            </>
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
