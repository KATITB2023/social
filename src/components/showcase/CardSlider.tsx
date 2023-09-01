import React from "react";
import { useState, useRef } from "react";
import { Box, Icon } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { api } from "~/utils/api";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ViewCard } from "./ViewCard";

interface CustomSliderProps {
  children: React.ReactNode;
}
export const CardSlider: React.FC<CustomSliderProps> = ({ children }) => {
  const visitedUnitArr = api.showcase.getAllVisitedUnits.useQuery({
    searchValue: "",
  }).data;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Box maxW={"100vw"} width={"full"} marginBottom={"2em"}>
      <Slider {...settings}>
        {visitedUnitArr?.map((unit) => {
          const route =
            unit.lembaga === "UKM"
              ? `showcase/ukm/${unit.group ? unit.group : ""}/${unit.userId}`
              : unit.lembaga === "HMJ"
              ? `/showcase/himpunan/${unit.userId}`
              : `showcase/${unit.lembaga.toLowerCase()}/${unit.userId}`;

          return (
            <ViewCard
              image={unit.image}
              title={unit.name}
              route={route}
              key={unit.userId}
              unitId={unit.userId}
            />
          );
        })}
      </Slider>
    </Box>
  );
};
