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
  //   { image: "/base.png", name: "1", userId: "/" },
  //   { image: "/base.png", name: "2", userId: "/" },
  //   { image: "/base.png", name: "3", userId: "/" },
  //   { image: "/base.png", name: "4", userId: "/" },
  //   { image: "/base.png", name: "5", userId: "/" },
  //   { image: "/base.png", name: "6", userId: "/" },
  //   { image: "/base.png", name: "7", userId: "/" },
  //   { image: "/base.png", name: "8", userId: "/" },
  //   { image: "/base.png", name: "7", userId: "/" },
  //   { image: "/base.png", name: "8", userId: "/" },
  //   { image: "/base.png", name: "7", userId: "/" },
  //   { image: "/base.png", name: "8", userId: "/" },
  // ];

  // const bsoItems = [
  //   { image: "/base.png", name: "1", userId: "/" },
  //   { image: "/base.png", name: "2", userId: "/" },
  //   { image: "/base.png", name: "3", userId: "/" },
  //   { image: "/base.png", name: "4", userId: "/" },
  //   { image: "/base.png", name: "5", userId: "/" },
  //   { image: "/base.png", name: "6", userId: "/" },
  // ];
  // const himpunanItems = [
  //   { image: "/base.png", name: "LFM", userId: "/" },
  //   { image: "/base.png", name: "Radio kambing sejahtera", userId: "/" },
  //   { image: "/base.png", name: "tes", userId: "/" },
  //   { image: "/base.png", name: "Radio kambing sejahtera", userId: "/" },
  //   { image: "/base.png", name: "LPM3", userId: "/" },
  //   { image: "/base.png", name: "Si paling Berenang", userId: "/" },
  // ];

  const ukmVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "UKM",
    limit: 5,
  }).data;
  const bsoVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "BSO",
    limit: 5,
  }).data;
  const hmjVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "HMJ",
    limit: 5,
  }).data;

  return (
    <Layout title="Riwayat Pengunjungan">
      <BackgroundAndNavbar bg="/background.png">
        <Flex
          w="80%"
          justifyContent={"space-evenly"}
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

{/*           <Box mt="15px" mb="20px">
            <TextInput placeholder="Search..." />
          </Box> */}

          {(!ukmVisitedArr || ukmVisitedArr.length === 0) &&
          (!bsoVisitedArr || bsoVisitedArr.length === 0) &&
          (!hmjVisitedArr || hmjVisitedArr.length === 0) ? (

            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              my={"15vh"}
            >
              <Heading textAlign={"center"} textColor={"yellow.5"}>
                {" "}
                Waduh!{" "}
              </Heading>
              <Text textAlign={"center"} fontSize={"16px"} >
                Kamu belum mengunjungi UKM, BSO, maupun Himpunan manapun.
                Silakan kunjungi halaman organisasi yang ingin kamu tuju!
              </Text>
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
