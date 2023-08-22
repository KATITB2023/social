import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import Footer from "~/components/Footer";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";

export default function HistoryPage() {
  return (
    <Layout title="Riwayat Pengunjungan">
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