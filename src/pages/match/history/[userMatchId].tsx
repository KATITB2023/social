import { type NextPage } from "next";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";

export const getServerSideProps = withSession({ force: true });

const ChatHistory: NextPage = () => {
  return <Layout title={"Riwayat Percakapan"}></Layout>;
};

export default ChatHistory;
