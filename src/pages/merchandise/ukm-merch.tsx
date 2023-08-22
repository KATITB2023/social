import { Heading, Flex, Image } from "@chakra-ui/react";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Footer from "~/components/Footer";

const merchs = [
  {
    name: "Merch A",
    quantity: 1,
    status: "On display",
  },
  {
    name: "Merch B",
    quantity: 1,
    status: "On display",
  },
];

const MerchCard = ({
  name,
  quantity,
  status,
}: {
  name: string;
  quantity: number;
  status: string;
}) => {
  return (
    <>
      <Flex
        bgColor="var(--gray-color-gray-600, #2F2E2E)"
        borderRadius="12px"
        justifyContent="space-between"
        px="20px"
        py="10px"
      >
        <Heading size="SH5" textColor="yellow.5">
          {name}
        </Heading>
        <Image src="/arrow_down.svg" alt="" />
      </Flex>

      <Flex
        borderRadius="15px"
        border="1px"
        borderColor="white"
        flexDir="column"
        p="15px"
        bgColor="rgba(255, 255, 255, 0.40);"
      >
        <Flex>
          <Flex w="138px" h="120px" color="yellow"></Flex>
          <Flex flexDir="column" gap="25px" w="full">
            <Flex flexDir="column" gap="3px">
              <Heading size="SH5" textColor="yellow.5">
                {name}
              </Heading>
              <Flex
                bgColor="white"
                borderRadius="9px"
                color="black"
                fontSize="10px"
                justifyContent="center"
                fontWeight="bold"
                w="fit-content"
                px="20px"
                py="3px"
              >
                {status}
              </Flex>
            </Flex>
            <Flex flexDir="column">
              <Heading
                size="SH5"
                textColor="white"
                fontSize="14px"
                fontWeight="light"
              >
                Stocks left: {quantity}
              </Heading>
              <Flex w="full" justifyContent="space-between">
                <Flex>
                  <Image src="/plus.svg" alt="" />
                  <Image src="/minus.svg" alt="" />
                </Flex>
                <Image src="/trash.svg" alt="" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          bgColor="rgba(255, 137, 213, 0.53)"
          border="1px"
          borderColor="white"
          borderRadius="10px"
          width="full"
          justifyContent="center"
          color="yellow.5"
          fontWeight="bold"
        >
          Reward it
        </Flex>
      </Flex>
    </>
  );
};

const UkmMerchPage = () => {
  return (
    <>
      <BackgroundAndNavbar bg="/background.png">
        <Heading
          size="H4"
          color="yellow.5"
          mx="auto"
          fontWeight="thin"
          textShadow="0px 4px 30px #72D8BA"
          mt="7"
          mb="50"
        >
          MERCHANDISE
        </Heading>
        <Flex flexDir="column" gap="15px" mx="24px">
          {merchs.map((merch, index) => (
            <MerchCard
              key={index}
              name={merch.name}
              quantity={merch.quantity}
              status={merch.status}
            />
          ))}
        </Flex>
      </BackgroundAndNavbar>
      <Footer />
    </>
  );
};
export default UkmMerchPage;
