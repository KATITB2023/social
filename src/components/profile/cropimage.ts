import type { PixelCrop } from "react-image-crop";

const TO_RADIANS = Math.PI / 180;

type HTMLImageElementLoadable = HTMLImageElement & {
  addEventListener: (
    type: "load" | "error",
    listener: ((this: HTMLImageElement, ev: Event) => any) | null,
    options?: boolean | AddEventListenerOptions
  ) => void;
};

export const createImage = (url: string) =>
  new Promise<HTMLImageElementLoadable>((resolve, reject) => {
    const image = new Image() as HTMLImageElementLoadable;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox

    image.src = url;
  });

export async function getSquaredImage(imageURL: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const image = await createImage(imageURL);

  const size = Math.max(image.width, image.height);

  canvas.width = size;
  canvas.height = size;
  const x = image.width < size ? (size - image.width) / 2 : 0;
  const y = image.height < size ? (size - image.height) / 2 : 0;
  ctx.drawImage(image, x, y);

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }

      resolve(new File([blob], "image.png", { type: "image/png" }));
    }, "image/png");
  });
}

export default async function getCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }

      resolve(new File([blob], "image.png", { type: "image/png" }));
    }, "image/png");
  });
}
