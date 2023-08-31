import { Flex } from "@chakra-ui/react";

export default function PopupWithBlackOverlay({
  children,
  open,
  setClose,
  opacity = 0.7,
}: {
  children: string | JSX.Element | JSX.Element[];
  open: boolean;
  setClose: () => void;
  opacity? : number;
}) {
  return (
    <Flex
      position={"fixed"}
      display={open ? "block" : "none"}
      w={"100vw"}
      h={"100vh"}
      top={0}
      left={0}
      zIndex={3}
    >
      <Flex
        position={"relative"}
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* Black overlay */}
        <Flex
          position={"absolute"}
          w={"100vw"}
          h={"100vh"}
          bg={"black"}
          opacity={opacity}
          onClick={setClose}
          cursor={"pointer"}
        />

        <Flex zIndex={4}>{children}</Flex>
      </Flex>
    </Flex>
  );
}
