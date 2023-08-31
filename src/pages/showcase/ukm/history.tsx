import React from "react";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import RiwayatPage from "~/components/listpage/RiwayatPage";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";

export const getServerSideProps = withSession({ force: true });

export default function HistoryPage() {
  useSession({ required: true });
  return (
    <Layout title="Riwayat Pengunjungan">
      <BackgroundAndNavbar bg="/background.png">
        <RiwayatPage
          title="Riwayat Pengunjungan"
          description="Berikut adalah daftar unit yang telah kamu kunjungi."
          withbackbutton={true}
          lembaga="UKM"
          withInfiniteScroll={true}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
