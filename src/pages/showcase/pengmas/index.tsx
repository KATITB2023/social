import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { api } from "~/utils/api";

export default function PengmasPage() {
  const {data} = api.showcase.getAllUnits.useQuery({
    lembaga: "PENGMAS",
  });
  return (
    <Layout title="Pengabdian Masyarakat">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage
          title="Pengmas"
          additionTitle="(Pengabdian Masyarakat)"
          withbackbutton={true}
          lembaga="PENGMAS"
          dataUnit={data}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
