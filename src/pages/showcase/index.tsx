import Footer from "~/components/Footer";
import ComingSoon from "~/components/screen/ComingSoon";
import { withSession } from "~/server/auth/withSession";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "~/layout";
import Navbar from "~/components/Navbar";

export const getServerSideProps = withSession({ force: true });

export default function ShowcasePage() {
  return (
    <Layout title="Showcase">
      <Navbar/>
      <Flex>
        <Link href={"/showcase/ukm"}>
          <Button> UKM </Button>
        </Link>
        <Link href={"/showcase/bso"}>
          <Button> BSO </Button>
        </Link>
        <Link href={"/showcase/himpunan"}>
          <Button> Himpunan </Button>
        </Link>
      </Flex>
      <Footer />
    </Layout>
  );
}
