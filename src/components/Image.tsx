import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import type { PropsWithoutRef } from "react";
import React from "react";

type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : never;
type ImageProps = PropsWithoutRef<PropsFrom<typeof NextImage>>;

const imageLoader: ImageProps["loader"] = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", (quality || 80).toString());
  return url.toString();
};

const CustomImageLoader = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "loader">
>(function Image(props, ref) {
  if (typeof props.src !== "string" || props.src.startsWith("/"))
    return <NextImage ref={ref} {...props} />;
  return <NextImage ref={ref} {...props} loader={imageLoader} />;
});

const Image = chakra(CustomImageLoader, {
  shouldForwardProp: (prop) =>
    ["width", "height", "src", "alt", "quality"].includes(prop),
});

export default Image;
