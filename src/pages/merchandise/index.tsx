import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { Center, Heading } from "@chakra-ui/react";
import Layout from "~/layout";

export const getServerSideProps = withSession({ force: true });

export default function MerchandisePage() {
  return (
    <Layout title="Merchandise">
      <BackgroundAndNavbar bg="/background.png">
        <Center>
          <Heading>Merchandise</Heading>
        </Center>
      </BackgroundAndNavbar>
    </Layout>
  );
}
