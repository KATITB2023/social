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
import { useState, useRef } from "react";

export default function HistoryPage() {
  const ukmItems = [
    { image: "/base.png", title: "1", route: "/" },
    { image: "/base.png", title: "2", route: "/" },
    { image: "/base.png", title: "3", route: "/" },
    { image: "/base.png", title: "4", route: "/" },
    { image: "/base.png", title: "5", route: "/" },
    { image: "/base.png", title: "6", route: "/" },
    { image: "/base.png", title: "7", route: "/" },
    { image: "/base.png", title: "8", route: "/" },
    { image: "/base.png", title: "7", route: "/" },
    { image: "/base.png", title: "8", route: "/" },
    { image: "/base.png", title: "7", route: "/" },
    { image: "/base.png", title: "8", route: "/" },
  ];

  let dataUKM6 = [];
  if (ukmItems.length < 6) {
    dataUKM6 = ukmItems;
  } else {
    for (let i = 0; i < 6; i++) {
      dataUKM6.push(ukmItems[i]);
    }
  }

  const bsoItems = [
    { image: "/base.png", title: "1", route: "/" },
    { image: "/base.png", title: "2", route: "/" },
    { image: "/base.png", title: "3", route: "/" },
    { image: "/base.png", title: "4", route: "/" },
    { image: "/base.png", title: "5", route: "/" },
    { image: "/base.png", title: "6", route: "/" },
  ];
  const himpunanItems = [
    { image: "/base.png", title: "LFM", route: "/" },
    { image: "/base.png", title: "Radio kambing sejahtera", route: "/" },
    { image: "/base.png", title: "tes", route: "/" },
    { image: "/base.png", title: "Radio kambing sejahtera", route: "/" },
    { image: "/base.png", title: "LPM3", route: "/" },
    { image: "/base.png", title: "Si paling Berenang", route: "/" },
  ];

  const itemsPerPage = 2;

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const SliderWrapper = styled("div")`
    @media only screen and (width: 390px) {
      .slick-slide {
        margin: 0 1px;
      }
      .slick-list {
        margin: 0 -5px;
      }
    }
    @media only screen and (min-width: 390px) {
      .slick-slide {
        margin: 0 0px;
      }
      .slick-list {
        margin: 0 -10px;
      }
    }
    @media only screen and (min-width: 500px) {
      .slick-slide {
        margin: 0 2px;
      }
      .slick-list {
        margin: 0 -15px;
      }
    }
  `;

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
          <Box key={index} w="100%" mt="20px" maxW={"200px"} h="200px">
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
          mt="30px"
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

          <Box mt="15px" mb="20px">
            <TextInput placeholder="Search..." />
          </Box>

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="30px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              UKM
            </Heading>
            <Text size="B3" textColor="yellow.5" fontWeight="700">
              View all
            </Text>
          </Flex>
          <SliderWrapper>
            <CustomSlider>
              {dataUKM6.map((item, index) => (
                <ViewCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  route={item.route}
                  width={"90%"}
                />
              ))}
            </CustomSlider>
          </SliderWrapper>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="75px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              BSO
            </Heading>
            <Text size="B3" textColor="yellow.5" fontWeight="700">
              View all
            </Text>
          </Flex>
          <SliderWrapper>
            <CustomSlider>
              {bsoItems.map((item, index) => (
                <ViewCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  route={item.route}
                  width={"90%"}
                />
              ))}
            </CustomSlider>
          </SliderWrapper>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            marginTop="75px"
          >
            <Heading size="SH4" textColor="white" fontWeight="700">
              HIMPUNAN
            </Heading>
            <Text size="B3" textColor="yellow.5" fontWeight="700">
              View all
            </Text>
          </Flex>
          <SliderWrapper>
            <CustomSlider>
              {himpunanItems.map((item, index) => (
                <ViewCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  route={item.route}
                  width={"90%"}
                />
              ))}
            </CustomSlider>
          </SliderWrapper>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
