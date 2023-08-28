import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import {useRouter} from "next/router";

export default function RumpunUKMPage() {
  const router = useRouter();
  const rumpun = router.asPath.split("/").pop()!;

  return (
    <Layout title={`Rumpun: {Nama Rumpun}`}>
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title={router.asPath.split("/").pop()!.toUpperCase()} withbackbutton={true}/>
      </BackgroundAndNavbar>
    </Layout>
  );
}
