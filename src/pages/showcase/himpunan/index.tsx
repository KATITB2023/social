import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";

export const getServerSideProps = withSession({ force: true });

export default function HimpunanPage() {
  useSession({ required: true });
  return (
    <Layout title="Himpunan">
      <BackgroundAndNavbar bg="/background.png">
        <ListPage title="Himpunan" withbackbutton={true} lembaga="HMJ"/>
      </BackgroundAndNavbar>
    </Layout>
  );
}
