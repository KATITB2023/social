import React from "react";
import { useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const itemsPerPage = 2;

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

function SampleNextArrow({
  className,
  style,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  // const { className, style, onClick } = props;
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
  // const { className, style, onClick } = props;
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
export const CardSlider: React.FC<CustomSliderProps> = ({ children }) => {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
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
    // <SliderWrapper>
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
    // </SliderWrapper>
  );
};
