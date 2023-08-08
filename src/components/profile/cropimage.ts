/*
This entire file is from 
https://github.com/CodingWith-Adam/react-easy-crop-tutorial/blob/main/src/cropImage.js
with some modifications to make it type-safe using typescript.
*/

interface PixelCrop {
  height: number;
  width: number;
  x: number;
  y: number;
}

type HTMLImageElementLoadable = HTMLImageElement & {
  addEventListener: (
    type: "load" | "error",
    listener: ((this: HTMLImageElement, ev: Event) => any) | null,
    options?: boolean | AddEventListenerOptions
  ) => void;
};

const createImage = (url: string) =>
  new Promise<HTMLImageElementLoadable>((resolve, reject) => {
    const image = new Image() as HTMLImageElementLoadable;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox

    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(
  imageURL: string,
  pixelCrop: PixelCrop,
  rotation = 0
) {
  const image = await createImage(imageURL);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create canvas context.");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (!file) return;
      const url = URL.createObjectURL(file);
      resolve(url);
    }, "image/jpeg");
  });
}
