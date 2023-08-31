import Footer from "~/components/Footer";
import { withSession } from "~/server/auth/withSession";
import { Flex, Button, Box, Image, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { CardSlider } from "~/components/showcase/CardSlider";
import { ViewCard } from "~/components/showcase/ViewCard";

export const getServerSideProps = withSession({ force: true });

export default function ShowcasePage() {
  useSession({ required: true });
  const profileQuery = api.profile.getUserProfile.useQuery();
  const visitedUnitArr = api.showcase.getAllVisitedUnits.useQuery({limit:10}).data;
  console.log(visitedUnitArr)

  return (
    <Layout title="Showcase">
      <BackgroundAndNavbar bg="/showcase-bg.png">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="600px"
        >
          {/* Background image */}
          <Image
            alt="/"
            src="/bintang-kuning-showcase.png"
            position="absolute"
            top="55px"
            left="65px"
          ></Image>
          <Image
            alt="/"
            src="/bintang-ungu-showcase.png"
            position="absolute"
            top="45px"
            left="20px"
          ></Image>
          <Image
            alt="/"
            src="/komet-atas-showcase.png"
            position="absolute"
            top="80px"
            left="0"
          ></Image>
          <Image
            alt="/"
            src="/rasi-ungu.png"
            position="absolute"
            objectFit={"cover"}
            w="50%"
            top="190px"
            right="0"
          ></Image>
          <Image
            src="defaultprofpict.svg"
            alt="profile pic"
            borderRadius="full"
            width="40%"
            objectFit="cover"
            objectPosition="center"
          ></Image>

          <Heading
            size="H3"
            color="yellow.5"
            marginTop="45px"
            marginBottom="30px"
            textShadow="0px 4px 30px #72D8BA"
            fontWeight="300"
            fontSize="3xl"
            textAlign={"center"}
          >
            ITB SHOWCASE
          </Heading>
          <Text size="B4" color="white" textAlign="center" w="80%">
            Ini deskripsi singkat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="180px"
          marginTop="30px"
          position="relative"
        >
          <Image
            alt="/"
            src="/bulan-koin.png"
            position="absolute"
            objectFit={"cover"}
            w="30%"
            top="30px"
            left="0"
            opacity={"0.3"}
            zIndex="0"
          ></Image>
          <Image
            alt="/"
            src="/spark-koin.png"
            position="absolute"
            objectFit={"cover"}
            w="100%"
            top="-170px"
            left="-50px"
            opacity={"0.5"}
          ></Image>
          <Heading
            size="SH5"
            color="yellow.5"
            textShadow="0px 4px 30px #72D8BA"
            width="70%"
            fontSize="20px"
            textAlign="center"
            marginBottom="10px"
          >
            KUNJUNGI BOOTH DAN DAPATKAN HADIAH MENARIK!
          </Heading>
          <Box
            display="flex"
            flexDirection="row"
            paddingX="3%"
            paddingY="3%"
            width="90%"
            height="90px"
            marginY="10px"
            borderRadius="20px"
            boxShadow="0px 0px 15px #FFFC83"
            backgroundColor="navy.1"
            zIndex="1"
          >
            <Image
              src="/coin.png"
              alt="coin"
              objectFit="cover"
              objectPosition="center"
              width="20%"
            ></Image>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              marginLeft="20px"
            >
              <Heading
                color="yellow.5"
                size="H5"
                fontSize="12px"
                fontWeight="200"
              >
                YOUR COINS
              </Heading>
              <Text color="green.5" size="B5" fontSize="22px">
                {profileQuery.data?.coin}
              </Text>
            </Flex>
          </Box>

          <Box
            w="90%"
            display={"block"}
            position={"relative"}
            flexDirection="row"
            justifyContent={"space-between"}
            marginTop="10px"
          >
            <Link href={"/"}>
              <Button
                w={"48%"}
                textColor="yellow.5"
                backgroundColor="gray.600"
                border="solid"
                borderWidth="2px"
                borderColor="yellow.5"
                borderRadius="13px"
                h="40px"
                position={"absolute"}
                left={0}
                _hover={{
                  boxShadow: "0px 5px 10px #FFBE3B",
                }}
              >
                Tutorial
              </Button>
            </Link>

            <Link href={"/merchandise"}>
              <Button
                w={"48%"}
                backgroundColor="yellow.5"
                textColor="purple.2"
                borderRadius="13px"
                h="40px"
                overflow={"hidden"}
                position={"absolute"}
                right={0}
                fontWeight={700}
                _hover={{
                  boxShadow: "0px 5px 10px #FFBE3B",
                }}
                zIndex="1"
                justifySelf={"end"}
              >
                Tukarkan Koinmu
              </Button>
            </Link>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="140px"
          h="400px"
          position={"relative"}
        >
          <Image
            alt="/"
            src="/komet-listrik.png"
            position="absolute"
            objectFit="cover"
            w="40%"
            top="-160px"
            right="0"
            zIndex="0"
          ></Image>
          <Image
            alt="/"
            src="/aura-ukm.png"
            position="absolute"
            objectFit="cover"
            w="60%"
            top="-60px"
            left="0"
          ></Image>
          <Image
            alt="/"
            src="/spark-ukm-button.png"
            position="absolute"
            objectFit="cover"
            w="40%"
            bottom="90px"
            right="30px"
          ></Image>
          <Heading
            size="H3"
            color="yellow.5"
            marginTop="45px"
            marginBottom="20px"
            textShadow="0px 4px 30px #72D8BA"
            fontWeight="300"
            fontSize="3xl"
            textAlign={"center"}
          >
            UKM
          </Heading>
          <Text
            size="B4"
            color="white"
            textAlign="center"
            w="80%"
            marginBottom="40px"
          >
            Ini deskripsi singkat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </Text>
          <Link href={"/showcase/ukm"}>
            <Button
              borderRadius="12px"
              backgroundColor="yellow.5"
              paddingX="24px"
              paddingY="8px"
              textColor="purple.2"
              _hover={{
                boxShadow: "0px 5px 10px #FFBE3B",
              }}
            >
              Explore
            </Button>
          </Link>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="140px"
          h="400px"
          position={"relative"}
        >
          <Image
            alt="/"
            src="/komet-bso.png"
            position="absolute"
            objectFit="cover"
            w="30%"
            top="-40px"
            left="0"
          ></Image>
          <Image
            alt="/"
            src="/aura-bso.png"
            position="absolute"
            objectFit="cover"
            w="60%"
            top="-160px"
            right="30px"
          ></Image>
          <Image
            alt="/"
            src="/spark-bso-himpunan.png"
            position="absolute"
            objectFit={"cover"}
            w="50%"
            bottom="-200px"
            right="0"
          ></Image>
          <Heading
            size="H3"
            color="yellow.5"
            marginTop="45px"
            marginBottom="20px"
            textShadow="0px 4px 30px #72D8BA"
            fontWeight="300"
            fontSize="3xl"
            textAlign={"center"}
          >
            BSO
          </Heading>
          <Text
            size="B4"
            color="white"
            textAlign="center"
            w="80%"
            marginBottom="40px"
          >
            Ini deskripsi singkat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </Text>
          <Link href={"/showcase/bso"}>
            <Button
              borderRadius="12px"
              backgroundColor="yellow.5"
              paddingX="24px"
              paddingY="8px"
              textColor="purple.2"
              _hover={{
                boxShadow: "0px 5px 10px #FFBE3B",
              }}
            >
              Explore
            </Button>
          </Link>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="140px"
          h="400px"
          position={"relative"}
        >
          <Image
            alt="/"
            src="/komet-himpunan.png"
            position="absolute"
            objectFit="cover"
            w="40%"
            top="-170px"
            left="0"
          ></Image>
          <Heading
            size="H3"
            color="yellow.5"
            marginTop="45px"
            marginBottom="20px"
            textShadow="0px 4px 30px #72D8BA"
            fontWeight="300"
            fontSize="3xl"
            textAlign={"center"}
          >
            HIMPUNAN
          </Heading>
          <Text
            size="B4"
            color="white"
            textAlign="center"
            w="80%"
            marginBottom="40px"
          >
            Ini deskripsi singkat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </Text>
          <Link href={"/showcase/himpunan"}>
            <Button
              borderRadius="12px"
              backgroundColor="yellow.5"
              paddingX="24px"
              paddingY="8px"
              textColor="purple.2"
              _hover={{
                boxShadow: "0px 5px 10px #FFBE3B",
              }}
            >
              Explore
            </Button>
          </Link>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="140px"
          h="400px"
          position={"relative"}
        >
          <Heading
            size="H3"
            color="yellow.5"
            marginTop="45px"
            marginBottom="20px"
            textShadow="0px 4px 30px #72D8BA"
            fontWeight="300"
            fontSize="3xl"
            textAlign={"center"}
          >
            APA SAJA YANG SUDAH KAMU KUNJUNGI?
          </Heading>

          <CardSlider>
            {visitedUnitArr && visitedUnitArr.map((item, index) => (
              <Flex mx={"5px"} key={index}>
                <ViewCard
                  image={item.image}
                  title={item.name}
                  route={item.userId}
                  width={"100%"}
                />
              </Flex>
            ))}
          </CardSlider>

          <Link href={"/showcase/history"}>
            <Button
              borderRadius="12px"
              backgroundColor="yellow.5"
              paddingX="24px"
              paddingY="8px"
              textColor="purple.2"
              _hover={{
                boxShadow: "0px 5px 10px #FFBE3B",
              }}
            >
              Explore
            </Button>
          </Link>
        </Box>
      </BackgroundAndNavbar>
    </Layout>
  );
}
