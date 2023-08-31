import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { RequestBerhasilPopup } from "~/components/merchandise/RequestBerhasilPopup";
import { Wrap, Center, Heading, Flex, Text, Button, Image } from "@chakra-ui/react";
import Layout from "~/layout";
import TextInput from "~/components/merchandise/TextInput";
import CardItem from "~/components/merchandise/CardItem";
import RequestTab from "~/components/merchandise/RequestTab";
import { useState } from "react";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({ force: true });

export default function MerchandisePage() {
  // const merchItem = api.showcase.getAllMerchandise.useQuery().data;
  // console.log(merchItem);
  const user = api.profile.getUserProfile.useQuery();
  const point = user.data?.point;

  const [berhasilPopup, setBerhasilPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceSelectedItems, setPriceSelectedItems] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Layout title="Merchandise">
      <BackgroundAndNavbar bg="/background.png">
        <Center flexDirection={"column"} gap={4}>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={'flex-start'}
            gap={4}
            display={"inline-flex"}
            w={"85%"}
          >
            <Flex flexDirection={"column"}>
              <Heading
                color="#FFFC83">
                Merchandise <br />ITB Showcase
              </Heading>
              <Text
                color={"white"}
                fontSize={12}
                fontFamily={"SomarRounded-Regular"}
                fontWeight={400}
              >
                Tukarkan koinmu dengan merchandise menarik!
              </Text>
            </Flex>
            <Button
              background={"#2f2e2e"}
              borderRadius={12}
              border={"1px #FFFC83 solid"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src="/components/merch/shopping_cart.svg" />
            </Button>
          </Flex>
          <Flex w={"85%"}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />
          </Flex>
          <Wrap
            px={"7.5%"}
            w={"full"}
            flexWrap={"wrap"}
            justify={"space-between"}
            flexDirection={"column"}
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
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
          </Wrap>
          {selectedItems > 0 &&
            <RequestTab />}
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
