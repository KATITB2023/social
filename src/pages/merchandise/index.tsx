import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { RequestBerhasilPopup } from "~/components/merchandise/RequestBerhasilPopup";
import { Wrap, Center, Heading, Flex, Text, Button, Image } from "@chakra-ui/react";
import Layout from "~/layout";
import TextInput from "~/components/merchandise/TextInput";
import CardItem from "~/components/merchandise/CardItem";
import { useState } from "react";

export const getServerSideProps = withSession({ force: true });

export default function MerchandisePage() {
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
            w={"85%"}
            flexWrap={"wrap"}
            justify={"space-between"}
          >
            <CardItem/>
            <CardItem/>
          </Wrap>
        </Center>
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading>Merchandise</Heading>

          {/* Ini diganti aja, disesuaikan sama pemanggilannya kapan */}
          <Button onClick={() => setBerhasilPopup(true)}>
            {" "}
            Berhasil Request Popup{" "}
          </Button>

          {berhasilPopup && (
            <RequestBerhasilPopup
              open={berhasilPopup}
              setClose={() => setBerhasilPopup(false)}
              coinDecreased={900} // ini nanti diganti make angka yang bener
            />
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
