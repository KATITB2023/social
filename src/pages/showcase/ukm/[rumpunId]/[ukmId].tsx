import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Flex, Heading, Image, Button} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

// Data Structure


// Data Input
const inputUKMData: { [key: string]: string | undefined} = {
  nama: "LFM",
  logo: "/logo-ukm.png",
  foto: "/",
  medsos: "ig",
  detail:
`Haloo`,
};


// Main Function
export default function UKMInfo() {
  const router = useRouter();
  return (
    <Layout title={`UKM: ${inputUKMData.nama}`}>
      <BackgroundAndNavbar bg="/background-bsoukmhimp.svg">
        <Flex
          flexDirection="column"
          justifyContent="center"
          align-items="center"
          mx="5%"
          my="5%"
          position="relative"
        >
          <Image
            cursor={"pointer"}
            onClick={() => {
              void router.back();
            }}
            alt="Back"
            src="/backbutton-detailukmhim.png"
            w={"24px"}
          />
          <Center>
            <Flex flexDirection="column">
              <Heading 
                fontStyle="H3"
                fontSize="170%"
                color="yellow.5"
                textShadow="0px 4px 30px #72D8BA"
                textAlign="center"
                mb="10%"
              > 
                {inputUKMData.nama}
              </Heading>
              <Image
                alt="Logo"
                src={inputUKMData.logo}
                sizes="10%"
                mb="15%"
              />
              <Center>
                <Button
                  padding="8px 24px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="12px"
                  background="yellow.5"
                  fontFamily="subheading"
                  fontSize="12px"
                  width="80%"
                  height="relative"
                  color="#4909b3"
                  onClick={() => router.push(`/404`)}
                >
                  Tandai Kunjungan
                </Button>
              </Center>
            </Flex>
          </Center>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
