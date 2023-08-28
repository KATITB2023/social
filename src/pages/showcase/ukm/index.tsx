import React from "react";
import RiwayatUnitPage from "~/components/listpage/RiwayatUnitPage";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";

export default function UKMPage() {
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <RiwayatUnitPage />
    </Layout>
  );
}
