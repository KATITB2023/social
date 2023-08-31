import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { RequestBerhasilPopup } from "~/components/merchandise/RequestBerhasilPopup";
import {
  Wrap,
  Center,
  Heading,
  Flex,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import Layout from "~/layout";
import TextInput from "~/components/merchandise/TextInput";
import CardItem from "~/components/merchandise/CardItem";
import RequestTab from "~/components/merchandise/RequestTab";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import { Merchandise } from "~/server/types/merchandise";
import { MdRefresh } from "react-icons/md";

export const getServerSideProps = withSession({ force: true });

const DummyMerchData: Merchandise[] = [
  {
    id: "12345",
    image: "/components/merch/bigmug.png",
    name: "Merch 1",
    price: 300,
    stock: 20,
  },
  {
    id: "11335",
    image: "/components/merch/bigmug.png",
    name: "Merch 2",
    price: 500,
    stock: 30,
  },
  {
    id: "24345",
    image: "/components/merch/bigmug.png",
    name: "Merch 3",
    price: 100,
    stock: 1,
  },
  {
    id: "55112",
    image: "/components/merch/bigmug.png",
    name: "Merch 4",
    price: 250,
    stock: 10,
  },
  {
    id: "35213",
    image: "/components/merch/bigmug.png",
    name: "Merch 5",
    price: 80,
    stock: 5,
  },
];

type CartData = {
  merchRequested:Merchandise;
  requestAmount: number;
  index: number;
};

export default function MerchandisePage() {
  const merchItem = api.showcase.getAllMerchandise.useQuery({}).data;
  console.log(merchItem);
  const user = api.profile.getUserProfile.useQuery();

  // const point = user.data?.point;
  const point = 100000;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceSelectedItems, setPriceSelectedItems] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const [cartArray, setCartArray] = useState<CartData[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const tempArr: CartData[] = new Array<CartData>(DummyMerchData.length);
    for (let i = 0; i < DummyMerchData.length; i++) {
      tempArr[i] = {
        merchRequested: DummyMerchData[i]!,
        requestAmount: 0,
        index: i,
      };
    }
    setCartArray(tempArr);
  }, []);

  // console.log(cartArray)

  const handleChangeItem = (change: number, idx: number) => {
    if (cartArray) {
      cartArray[idx]!.requestAmount += change;
      setSelectedItems(selectedItems + change);
    }
  };

  const handleChangePrice = (change: number) => {
    setPriceSelectedItems(priceSelectedItems + change);
  };

  const clearCart = () => {
    if (cartArray) {
      for (let i = 0; i < cartArray.length; i++) {
        cartArray[i]!.requestAmount = 0;
      }
      setSelectedItems(0);
      setPriceSelectedItems(0);
    }
  };

  // TODO: ganti dummy jd merch data asli
  const filteredMerchData = DummyMerchData.filter((merch) =>
    merch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Merchandise">
      <BackgroundAndNavbar bg="/background.png">
        <Center flexDirection={"column"} gap={4}>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            gap={4}
            display={"inline-flex"}
            w={"85%"}
          >
            <Flex flexDirection={"column"}>
              <Heading color="#FFFC83">
                Merchandise <br />
                ITB Showcase
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
            <Flex flexDir={"column-reverse"} gap={2}>
              <Button
                background={"#2f2e2e"}
                borderRadius={12}
                border={"1px #FFFC83 solid"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={clearCart}
              >
                <MdRefresh width={"15px"} height={"15px"} color="yellow" />
              </Button>
              <Link href={"/request-merchandise"}>
                <Button
                  background={"#2f2e2e"}
                  borderRadius={12}
                  border={"1px #FFFC83 solid"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    src="/components/merch/shopping_cart.svg"
                    width={"15px"}
                    height={"15px"}
                  />
                </Button>
              </Link>
            </Flex>
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
            {filteredMerchData.map((each, idx) => {
              const originalIdx = DummyMerchData.findIndex(item => item.id === each.id);
              return (
                <CardItem
                  key={each.id}
                  currentAmountItem={selectedItems}
                  changeAmountItem={handleChangeItem}
                  currentSumCoinPrice={priceSelectedItems}
                  changeSumCoinPrice={handleChangePrice}
                  id={each.id}
                  image={each.image}
                  name={each.name}
                  price={each.price}
                  stock={each.stock}
                  idx={originalIdx}
                  requestQuota={cartArray ? cartArray[originalIdx]!.requestAmount : 0}
                />
              );
            })}
          </Wrap>
          {selectedItems > 0 && (
            <RequestTab
              currentUserCoin={point}
              itemAmount={selectedItems}
              sumCoinPrice={priceSelectedItems}
              merch={cartArray!}
            />
          )}
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
