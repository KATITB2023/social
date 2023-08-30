import React from "react";
import Layout from "~/layout";

import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";

export default function UKMPage() {
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title="UKM" withbackbutton={true} lembaga="UKM" />
      </BackgroundAndNavbar>
    </Layout>
  );
}
