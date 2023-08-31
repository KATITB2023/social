import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { useRouter } from "next/router";

export default function RumpunUKMPage() {
  const router = useRouter();
  const rumpunId = router.query.rumpunId as string;
  return (
    <Layout title={`Rumpun: ${rumpunId}`}>
      <BackgroundAndNavbar bg="/background.png">
        <ListPage
          title={rumpunId}
          withbackbutton={true}
        />
      </BackgroundAndNavbar>
    </Layout>
  );
}
