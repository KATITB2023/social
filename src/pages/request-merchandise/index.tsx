import { Heading, Flex, Text, Image, Button } from "@chakra-ui/react";
import React from "react";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import CoinCard from "~/components/merchandise/CoinCard";
import MerchandiseRequested from "~/components/requestMerchandise/RequestMerchandise";
import Layout from "~/layout";
import { type MerchandiseRequest } from "~/server/types/merchandise";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const RequestMerchandise = () => {
  const result = api.showcase.getMerchandiseCheckoutHistory.useQuery();
  const user = api.profile.getUserProfile.useQuery();
  const coin = user.data?.coin;
  const data = result.data as MerchandiseRequest[];
  const router = useRouter();

  return (
    <Layout title="Request Merchandise">
      <BackgroundAndNavbar bg="/background.png">
        <Flex
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          w={"90%"}
          marginX={"auto"}
          gap={"24px"}
          position={"relative"}
          pt={"40px"}
        >
          <Button
            onClick={() => router.back()}
            bgColor={"transparent"}
            position={"absolute"}
            top={0}
            left={0}
            borderRadius={"full"}
            width={10}
            height={10}
            padding={0}
          >
            <Image src="/backbutton-logo.svg" alt="Back button" />
          </Button>

          <Flex
            display={"flex"}
            flexDir={"column"}
            paddingInline={"1rem"}
            gap={"4px"}
          >
            <Heading
              color="yellow.5"
              fontSize={"24px"}
              lineHeight={"28.8px"}
              textShadow={"0px 4px 30px #72D8BA"}
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              Request Merchandise
            </Heading>
            <Text textAlign={"center"} fontSize={"12px"}>
              Barang yang telah direquest tidak dapat dibatalkan. Silakan ambil
              di booth merchandise
            </Text>
          </Flex>
          <CoinCard coin={coin ? coin : 0} />
          <Flex
            flexDirection={"column"}
            w={"full"}
            maxH={"75vh"}
            gap={"12px"}
            overflowY={"auto"}
            sx={{
              "::-webkit-scrollbar": {
                width: "11px",
              },
              "::-webkit-scrollbar-track": {
                background: "#2F2E2E",
                borderRadius: "5px",
              },
              "::-webkit-scrollbar-thumb": {
                background: "white",
                borderRadius: "5px",
              },
            }}
          >
            {data?.map((item) => {
              return (
                <MerchandiseRequested
                  key={item.merch.id}
                  merch={item.merch}
                  status={item.isApproved}
                  quantity={item.quantity}
                />
              );
            })}
          </Flex>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
};

export default RequestMerchandise;
