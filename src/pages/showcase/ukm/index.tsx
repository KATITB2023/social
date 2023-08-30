import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListUnitPage from "~/components/listpage/ListUnitPage";
import ListPage from "~/components/listpage/ListPage";
import { api } from "~/utils/api";

export default function UKMPage() {
  return (
    <Layout title="Unit Kegiatan Mahasiswa">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title="RUMPUN UNIT KEGIATAN MAHASISWA" dataInput={api.showcase.getGroups.useQuery({lembaga:"UKM", }).data} withbackbutton={true} />
      </BackgroundAndNavbar>
    </Layout>
  );
}