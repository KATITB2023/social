import React from "react";
import {
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Heading,
  Wrap,
  Text
} from "@chakra-ui/react";
import { ViewCard } from "../showcase/ViewCard";
import { api } from "~/utils/api";

interface FakultasProps {
  title: string;
}


const Fakultas = ({ title }: FakultasProps) => {
  const {data,isFetching} = api.showcase.getAllUnits.useQuery({
    lembaga:'HMJ',
    group:title
  })
  return (
    <AccordionItem marginBottom={2} border={"transparent"}>
      <AccordionButton
        _expanded={{
          boxShadow: "0 0 8px yellow",
        }}
        _hover={{ bgColor: "gray.600" }}
        paddingX={6}
        borderRadius={12}
        bgColor={"gray.600"}
        marginBottom={2}
      >
        <Heading
          size={"H5"}
          textAlign={"left"}
          width={"full"}
          color={"yellow.5"}
        >
          {title}
        </Heading>
        <AccordionIcon color={"yellow.5"} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Wrap
          justify={"space-evenly"}
          w={"full"}
          maxH={"700px"}
          overflow={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "5px",
            },
            "::-webkit-scrollbar-track": {
              display: "none",
              background: "rgb(68,70,84)",
            },
            "::-webkit-scrollbar-thumb": {
              background: "rgba(217,217,227,.8)",
              borderRadius: "full",
            },
          }}
        >
          {
          isFetching ? <Text align={"center"}>Loading ...</Text> :  
          data?.map((each) => {
            return (
              <ViewCard
                key={each.name}
                width={"full"}
                title={each.name}
                image={each.image ?? ''}
                route={`/showcase/ukm/${each.name}`}
              />
            );
          })}
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Fakultas;
