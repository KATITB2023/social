import React from "react";
import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import { api } from "~/utils/api";
import { ViewCard } from "./ViewCard";
import { Lembaga } from "@prisma/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CardSliderProps {
  lembaga?: "HMJ" | "UKM" | "BSO" | "PUSAT" | undefined;
}

export const CardSlider = ({ lembaga }: CardSliderProps) => {
  const visitedUnitArr = api.showcase.getAllVisitedUnits.useQuery({
    searchValue: "",
    lembaga: lembaga,
  }).data;
  const slidesToShow: number = visitedUnitArr
    ? visitedUnitArr.length > 1
      ? 2
      : 1
    : 0;
  const settings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
  };

  return (
    <Box maxW={"100vw"} width={"full"} marginBottom={"2em"} h={"50%"}>
      <Slider {...settings}>
        {visitedUnitArr?.map((unit) => {
          let route = ""
          if(unit.lembaga === "UKM"){
            route = `/showcase/ukm/${unit.group ? unit.group : ""}/${unit.userId}`
          }else if(unit.lembaga === "HMJ"){
            route = `/showcase/himpunan/${unit.userId}`
          }else{
            route = `/showcase/${unit.lembaga.toLowerCase()}/${unit.userId}`
          }
          return (
            <ViewCard
              width={"130px"}
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
