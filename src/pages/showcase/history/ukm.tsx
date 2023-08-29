import React from "react";
import Layout from "~/layout";
import RiwayatUnitPage from "~/components/listpage/RiwayatUnitPage";

export default function HistoryUKMPage() {
  return (
    <Layout title="Riwayat Pengunjungan UKM">
      <RiwayatUnitPage title="UKM" />
    </Layout>
  );
}
