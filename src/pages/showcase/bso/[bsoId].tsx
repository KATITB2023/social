import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Heading } from "@chakra-ui/react";

export default function BSOInfo() {
  return (
    <Layout title="BSO: {Nama BSO}">
      <BackgroundAndNavbar bg="/background.png">
        <Center>
          {" "}
          <Heading> Info BSO </Heading>{" "}
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
