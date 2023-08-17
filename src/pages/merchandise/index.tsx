import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import Footer from "~/components/Footer";
import ComingSoon from "~/components/screen/ComingSoon";
import { withSession } from "~/server/auth/withSession";
import { Center, Heading } from "@chakra-ui/react";

export const getServerSideProps = withSession({ force: true });

export default function MerchandisePage() {
  return (
    <>
      <BackgroundAndNavbar bg="/background.png">
        <Center>
          <Heading>Merchandise</Heading>
        </Center>
      </BackgroundAndNavbar>
      <Footer />
    </>
  );
}
