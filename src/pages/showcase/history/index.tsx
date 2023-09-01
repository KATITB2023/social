import React from "react";
import { Flex, Text, Heading} from "@chakra-ui/react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Link from "next/link";
import { CardSlider } from "~/components/showcase/CardSlider";
import { api } from "~/utils/api";

export default function HistoryPage() {

  const ukmVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "UKM",
  }).data;
  const bsoVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "BSO",
  }).data;
  const hmjVisitedArr = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "HMJ",
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
          {(!ukmVisitedArr || ukmVisitedArr.length === 0) &&
          (!bsoVisitedArr || bsoVisitedArr.length === 0) &&
          (!hmjVisitedArr || hmjVisitedArr.length === 0) ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              my={"25vh"}
            >
              <Heading textAlign={"center"} textColor={"yellow.5"}>
                {" "}
                Waduh!{" "}
              </Heading>
              <Text textAlign={"center"} fontSize={"16px"}>
                Kamu belum mengunjungi UKM, BSO, maupun Himpunan manapun.
                Silakan kunjungi halaman organisasi yang ingin kamu tuju!
              </Text>
            </Flex>
          ) : (
            <>
              <Heading
                textAlign="center"
                size="H4"
                fontWeight="400px"
                color="yellow.5"
              >
                UKM, BSO, DAN HIMPUNAN YANG SUDAH DIKUNJUNGI
              </Heading>
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
                  <CardSlider lembaga="UKM" general={false}/>
                    
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
                  <CardSlider lembaga="BSO" />
                    
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
                  <CardSlider lembaga="HMJ" />
                    
                </>
              )}
            </>
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
