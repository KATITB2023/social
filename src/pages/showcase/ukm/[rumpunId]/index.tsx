import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function RumpunUKMPage() {
  const router = useRouter();
  const rumpunId = router.query.rumpunId as string;
  const {data} = api.showcase.getUnitsByGroup.useQuery({group : rumpunId})
  return (
    <Layout title={`Rumpun: ${rumpunId}`}>
      <BackgroundAndNavbar bg="/background.png">
        <ListPage
          title={rumpunId}
          withbackbutton={true}
          lembaga="UKM"
          dataUnit = {data}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
