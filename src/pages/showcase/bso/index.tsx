import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";

export default function BSOPage() {
  return (
    <Layout title="Badan Semi Otonom">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title="BSO" additionTitle="(BADAN SEMI OTONOM)" />
      </BackgroundAndNavbar>
    </Layout>
  );
}
