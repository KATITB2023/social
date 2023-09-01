import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { api } from "~/utils/api";

export default function PusatPage() {
  const {data} = api.showcase.getAllUnits.useQuery({
    lembaga: "PUSAT",
  });
  return (
    <Layout title="Pusat">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage
          title="Pusat"
          withbackbutton={true}
          lembaga="PUSAT"
          dataUnit={data}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
