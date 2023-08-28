import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";

export default function BSOPage() {
  return (
    <Layout title="Badan Semi Otonom">
      <BackgroundAndNavbar bg="/background.png">
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
      </BackgroundAndNavbar>
    </Layout>
  );
}
