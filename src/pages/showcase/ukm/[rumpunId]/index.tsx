import React from "react";
import { Wrap } from "@chakra-ui/react";
import { ViewCard } from "~/components/showcase/ViewCard";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { useRouter } from "next/router";
import ListUnitPage from "~/components/listpage/ListUnitPage";

export default function RumpunUKMPage() {
  const router = useRouter();

  return (
    <Layout title={`Rumpun: {Nama Rumpun}`}>
      <ListUnitPage />
    </Layout>
  );
}
