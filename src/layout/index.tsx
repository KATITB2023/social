import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { socket } from "~/utils/socket";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !socket.connected) {
      socket.connect();
    } else if (status === "unauthenticated" && socket.connected) {
      socket.disconnect();
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Social App OSKM ITB 2023" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
        {process.env.NODE_ENV !== "production" && (
          <div className="hidden md:block">
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        )}
      </motion.div>
    </>
  );
}
