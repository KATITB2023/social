import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { api } from "~/utils/api";

export default function BSOPage() {
  const {data} = api.showcase.getAllUnits.useQuery({
    lembaga: "BSO",
  });
  return (
    <Layout title="Badan Semi Otonom">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage
          title="BSO"
          additionTitle="(BADAN SEMI OTONOM)"
          withbackbutton={true}
          lembaga="BSO"
          dataUnit={data}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
