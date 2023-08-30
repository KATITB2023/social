import { Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import PointCard from "~/components/merchandise/PointCard";
import MerchandiseRequested from "~/components/requestMerchandise/RequestMerchandise";
import Layout from "~/layout";
import { MerchandiseRequest } from "~/server/types/merchandise";
import { api } from "~/utils/api";

const RequestMerchandise = () => {
  const result = api.showcase.getMerchandiseCheckoutHistory.useQuery();
  const user = api.profile.getUserProfile.useQuery();
  const point = user.data?.point;
  const data = result.data as MerchandiseRequest[];

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
        >
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
          <PointCard point={point ? point : 0} />
          <Flex
            flexDirection={"column"}
            w={"full"}
            maxH={"60vh"}
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
