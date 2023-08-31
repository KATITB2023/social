import React from "react";
import { Flex, Text, Heading, Box, grid } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import TextInput from "~/components/friends/TextInput";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { type UnitProfile } from "@prisma/client";

export const defaultData: UnitProfile[] = [
  {
    userId: "",
    name: "LFM",
    lembaga: "HMJ",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP1",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP2",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP3",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSEP4",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
  {
    userId: "",
    name: "KSPE5",
    lembaga: "UKM",
    pin: "2112",
    group: "keren",
    image: "/base.png",
    bio: "aku keren",
    visitedCount: 0,
    updatedAt: new Date(),
  },
];

interface HistoryPageProps {
  lembaga: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
  limit: 100;
}

export default function HistoryPage({ lembaga, limit }: HistoryPageProps) {
  const { data: session } = useSession({ required: true });

  const [queryEntered, setQueryEntered] = useState<string>("");
  const dataUKM = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "UKM",
    searchValue: queryEntered,
    limit,
  });
  const getDataUKM = dataUKM.data;

  const dataBSO = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "BSO",
    searchValue: queryEntered,
    limit,
  });
  const getDataBSO = dataBSO.data;

  const dataHimpunan = api.showcase.getAllVisitedUnits.useQuery({
    lembaga: "HMJ",
    searchValue: queryEntered,
    limit,
  });
  const getDataHimpunan = dataHimpunan.data;

  let dataUKM6 = [];
  if (getDataUKM && getDataUKM.length > 0) {
    if (getDataUKM.length < 6) {
      dataUKM6 = getDataUKM;
    } else {
      for (let i = 0; i < 6; i++) {
        dataUKM6.push(getDataUKM[i]);
      }
    }
  }
  let dataBSO6 = [];
  if (getDataBSO && getDataBSO.length > 0) {
    if (getDataBSO.length < 6) {
      dataBSO6 = getDataBSO;
    } else {
      for (let i = 0; i < 6; i++) {
        dataBSO6.push(getDataBSO[i]);
      }
    }
  }
  let dataHimpunan6 = [];
  if (getDataHimpunan && getDataHimpunan.length > 0) {
    if (getDataHimpunan.length < 6) {
      dataHimpunan6 = getDataHimpunan;
    } else {
      for (let i = 0; i < 6; i++) {
        dataHimpunan6.push(getDataHimpunan[i]);
      }
    }
  }

  const itemsPerPage = 2;

  function SampleNextArrow({
    className,
    style,
    onClick,
  }: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) {
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow({
    className,
    style,
    onClick,
  }: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) {
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }

  interface CustomSliderProps {
    children: React.ReactNode;
  }
  const CustomSlider: React.FC<CustomSliderProps> = ({ children }) => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      autoplaySpeed: 4000,
      slidesToShow: itemsPerPage,
      slidesToScroll: itemsPerPage,
      adaptiveHeight: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: (current: number, next: number) => {
        setOldSlide(current);
        setActiveSlide(next);
      },
      afterChange: (current: number) => setActiveSlide2(current),
      customPaging: function (i: number) {
        if (i === activeSlide / 2) {
          return (
            <Box mt="20px">
              <img src={`/Page_ellipse.svg`} />
            </Box>
          );
        } else {
          return (
            <Box mt="20px">
              <img src={`/Rest_ellipse.svg`} />
            </Box>
          );
        }
      },
    };

    return (
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <Box
            key={index}
            w="100%"
            mt="20px"
            h="200px"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {child}
          </Box>
        ))}
      </Slider>
    );
  };

  return (
    <Layout title="Riwayat Pengunjungan">
      <BackgroundAndNavbar bg="/background-history.svg">
        <Flex
          w="80%"
          justifyContent="center"
          margin="auto"
          my="30px"
          flexDirection="column"
        >
          <Heading
            textAlign="center"
            size="H4"
            fontWeight="400px"
            color="yellow.5"
          >
            UKM, BSO, DAN HIMPUNAN YANG SUDAH DIKUNJUNGI
          </Heading>

          {/* <Box mt="15px" mb="20px">
            <TextInput placeholder="Search..." />
          </Box> */}

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="30px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              UKM
            </Heading>
            <Link href={"history/ukm"}>
              <Text size="B3" textColor="yellow.5" fontWeight="700">
                View all
              </Text>
            </Link>
          </Flex>

          {/* defaultData bisa diganti jadi dataUKM6,dataBSO6 dan dataHimpunan6 */}
          <CustomSlider>
            {defaultData?.map((item, index) => {
              //dataUKM6
              return (
                <Flex mx={"5px"} key={index}>
                  <ViewCard
                    image={item?.image || "-"}
                    title={item?.name || "-"}
                    route={`/showcase/ukm/${item.name}`}
                    width={"100%"}
                  />
                </Flex>
              );
            })}
          </CustomSlider>

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="75px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              BSO
            </Heading>
            <Link href={"history/bso"}>
              <Text size="B3" textColor="yellow.5" fontWeight="700">
                View all
              </Text>
            </Link>
          </Flex>

          <CustomSlider>
            {defaultData.map(
              (
                item,
                index // dataBSO6
              ) => (
                <Flex mx={"5px"} key={index}>
                  <ViewCard
                    image={item?.image || "-"}
                    title={item?.name || "-"}
                    route={`/showcase/ukm/${item.name}`}
                    width={"100%"}
                  />
                </Flex>
              )
            )}
          </CustomSlider>

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="75px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              HIMPUNAN
            </Heading>
            <Link href={"history/himpunan"}>
              <Text size="B3" textColor="yellow.5" fontWeight="700">
                View all
              </Text>
            </Link>
          </Flex>

          <CustomSlider>
            {defaultData.map(
              (
                item,
                index // dataHimpunan6
              ) => (
                <Flex mx={"5px"} key={index}>
                  <ViewCard
                    image={item?.image || "-"}
                    title={item?.name || "-"}
                    route={`/showcase/ukm/${item.name}`}
                    width={"100%"}
                  />
                </Flex>
              )
            )}
          </CustomSlider>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
