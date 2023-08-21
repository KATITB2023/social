import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import Card from "./TemporaryCard";
import TextInput from "../friends/TextInput";
import Navbar from "../Navbar";
import Footer from "../Footer";

/**
 * to do:
 *
 * 1. Make a temporary card component,
 *
 * 2. Make a temporary data to be mapped,
 *
 * 3. Make the structure:
 *
 * 3.1. Make a button '<' to go back to the page before this one.
 *
 * 3.2. Make the header for the entire content
 *
 * 3.3. Make a search bar component
 *
 * 3.4. Map the temporary data to be a list of cards.
 *
 * 4. Style the content.
 *
 *
 *
 * for scalability:
 *
 * (coming soon)
 */
const defaultData = [
  {
    image: "",
    name: "LFM",
  },
  {
    image: "",
    name: "URO",
  },
  {
    image: "",
    name: "8EH",
  },
  {
    image: "",
    name: "KSEP1",
  },
  {
    image: "",
    name: "KSEP2",
  },
  {
    image: "",
    name: "KSEP3",
  },
  {
    image: "",
    name: "KSEP4",
  },
  {
    image: "",
    name: "KSEP5",
  },
  {
    image: "",
    name: "KSEP6",
  },
  {
    image: "",
    name: "KSEP7",
  },
  {
    image: "",
    name: "KSEP8",
  },
  {
    image: "",
    name: "KSEP9",
  },
  {
    image: "",
    name: "KSEP10",
  },
];

const gridgappx = 10;
export default function ListUnitPage() {
  const data = defaultData;
  return (
    <>
      <Box
        position="relative"
        height="100%"
        minH={"100vh"}
        overflow={"hidden"}
        backgroundImage={"background-bsoukmhimp.svg"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        pb={10}
      >
        <Flex flexDirection="column" height="100vh">
          <Navbar />
          <Flex
            alignItems={"center"}
            flexDirection={"column"}
            mx="25px"
            gap="25px"
            flex="1"
          >
            <Button bgColor={"transparent"}>
              <Image src="backbutton-logo.svg" alt="<"></Image>
            </Button>
            <Heading
              size="H4"
              textShadow="0px 4px 30px #72D8BA"
              color="yellow.5"
            >
              UKM
            </Heading>
            <TextInput placeholder="Search..." />
            <Grid
              width="100%"
              height="569px"
              gap={`${gridgappx}px`}
              overflow={"auto"}
              gridTemplateColumns={"1fr 1fr"}
              gridTemplateRows={`calc(${100 / 3}% - ${gridgappx / 3}px) calc(${
                100 / 3
              }% - ${gridgappx / 3}px) calc(${100 / 3}% - ${gridgappx / 3}px)`}
              gridAutoRows={`calc(${100 / 3}% - ${gridgappx / 3}px)`}
            >
              {data.map((each) => {
                return (
                  <>
                    <Box bgColor={"navy.1"} key={each.name}>
                      <Card name={each.name} image={each.image} />
                    </Box>
                  </>
                );
              })}
            </Grid>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
