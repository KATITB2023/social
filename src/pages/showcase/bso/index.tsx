import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import Footer from "~/components/Footer";

export default function BSOPage() {
  return (
    <Layout title="BSO">
      <Wrap justify={"space-evenly"}>
        <ViewCard
          image="/background.png"
          title="Ini Nama Organisasi"
          route={"/"}
        />
        <ViewCard
          image="/background.png"
          title="Ini Nama Organisasi"
          route={"/"}
        />
        <ViewCard
          image="/background.png"
          title="Ini Nama Organisasi"
          route={"/"}
        />
        <ViewCard
          image="/background.png"
          title="Ini Nama Organisasi"
          route={"/"}
        />
      </Wrap>
      <Footer />
    </Layout>
  );
}
