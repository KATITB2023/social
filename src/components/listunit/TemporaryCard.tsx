import { Box, Button, Heading } from "@chakra-ui/react";

export default function Card({ image, name }: { image: string; name: string }) {
  return (
    <Box bgColor={"navy.1"} width="100%" height="100%">
      <Heading>{name}</Heading>
      <Button bgColor={"yellow.5"}>Visit</Button>
    </Box>
  );
}
