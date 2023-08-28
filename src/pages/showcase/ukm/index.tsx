import React from "react";
import Layout from "~/layout";

import RiwayatUnitPage from "~/components/listpage/RiwayatUnitPage";

export default function UKMPage() {
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <RiwayatUnitPage title="UKM" />
    </Layout>
  );
}
