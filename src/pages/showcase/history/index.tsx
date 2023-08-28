import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import RiwayatUnitPage from "~/components/listpage/RiwayatUnitPage";

export default function HistoryPage() {
  return (
    <Layout title="Riwayat Pengunjungan">
        <RiwayatUnitPage title=""/>
    </Layout>
  );
}
