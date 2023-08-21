import { withSession } from "~/server/auth/withSession";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import ListPage from "~/components/listpage/ListPage";
import { useSession } from "next-auth/react";

export const getServerSideProps = withSession({ force: true });

export default function ShowcasePage() {
  useSession({ required: true });
  return (
    <Layout title="Showcase">
      <BackgroundAndNavbar bg="/background-bsoukmhimp.svg">
        <ListPage title="MEDIA" />
      </BackgroundAndNavbar>
    </Layout>
  );
}
