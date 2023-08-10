import Footer from "~/components/Footer";
import ComingSoon from "~/components/screen/ComingSoon";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ force: true });

export default function LeaderboardPage() {
  return (
    <>
      <ComingSoon />
      <Footer />
    </>
  );
}
