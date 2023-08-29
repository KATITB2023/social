import React from "react";
import Layout from "~/layout";
import RiwayatUnitPage from "~/components/listpage/RiwayatUnitPage";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";

export const getServerSideProps = withSession({ force: true });

export default function HistoryPage() {
  useSession({ required: true });
  return (
    <Layout title="Riwayat Pengunjungan">
      <RiwayatUnitPage title="Riwayat Pengunjungan" />
    </Layout>
  );
}
