import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { withSession } from "~/server/auth/withSession";
import { Flex, Heading, Button } from "@chakra-ui/react";
import Layout from "~/layout";
import { useState } from "react";
import { RequestBerhasilPopup } from "~/components/merchandise/RequestBerhasilPopup";

export const getServerSideProps = withSession({ force: true });

export default function MerchandisePage() {
  const [berhasilPopup, setBerhasilPopup] = useState(false);

  return (
    <Layout title="Merchandise">
      <BackgroundAndNavbar bg="/background.png">
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading>Merchandise</Heading>

          {/* Ini diganti aja, disesuaikan sama pemanggilannya kapan */}
          <Button onClick={() => setBerhasilPopup(true)}>
            {" "}
            Berhasil Request Popup{" "}
          </Button>

          {berhasilPopup && (
            <RequestBerhasilPopup
              open={berhasilPopup}
              setClose={() => setBerhasilPopup(false)}
              coinDecreased={900} // ini nanti diganti make angka yang bener
            />
          )}
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
