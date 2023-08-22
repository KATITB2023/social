import { Heading, Box, Flex, Image } from "@chakra-ui/react";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Footer from "~/components/Footer";

const merchs = [
  {
    name: "Merch A",
    quantity: 1,
    status: "on Display",
  },
  {
    name: "Merch B",
    quantity: 1,
    status: "on Display",
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
    <Flex
      bgColor="var(--gray-color-gray-600, #2F2E2E);"
      borderRadius="12px"
      justifyContent="space-between"
      px="20px"
      py="10px"
    >
      <Heading size="SH5" textColor="yellow.5">{name}</Heading>
      
      <Image src="/arrow_down.svg" alt=""/>
    </Flex>
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
