import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import Navbar from "~/components/Navbar";
import Footer from "~/components/newchat/Footer";
import Layout from "~/layout";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
import CardHistoryChat from "~/components/history/CardHistoryChat";

const History: NextPage = () => {
  const vStackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isFetching, isError, isSuccess, fetchNextPage, hasNextPage } =
    api.messageAnonymous.chatHeader.useInfiniteQuery(
      {
        limit: 10,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  useEffect(() => {
    const vStackElement = vStackRef.current;

    const handleScroll = () => {
      if (
        vStackElement &&
        hasNextPage &&
        vStackElement.scrollHeight -
          vStackElement.scrollTop -
          vStackElement.clientHeight <
          75
      ) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          void fetchNextPage();
        }, 250);
      }
    };

    if (vStackElement) {
      // Attach the scroll event listener to the VStack element
      vStackElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener and timeout on component unmount
    return () => {
      if (vStackElement) {
        vStackElement.removeEventListener("scroll", handleScroll);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasNextPage]);

  return (
    <Layout title={"Riwayat Percakapan"}>
      <Flex
        h="100vh"
        direction="column"
        position="relative"
        bg={`url(/addchatbg.png)`}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        alignItems="center"
      >
        <Navbar />
        <VStack
          ref={vStackRef}
          spacing={5}
          w="100%"
          // mt="9rem"
          maxH="80%"
          overflowY="auto"
          pb="12vh"
          // pt="3vh"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px", // Set the width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent", // Customize the track color
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#FFFC83", // Customize the thumb color
              borderRadius: "9999px", // Make the thumb rounded
            },
          }}
        >
          {data?.pages.map((page, idx1) => {
            return page.data.map((item, idx2) => {
              const toPath = `match/history/${item.userMatch.id}`;
              const endDate = item.userMatch.endedAt;
              if (endDate && toPath) {
                return (
                  <CardHistoryChat
                    key={`${idx1}-${idx2}`}
                    name={item.user.name}
                    src={
                      item.user.profileImage == null
                        ? ""
                        : item.user.profileImage
                    }
                    path={toPath}
                    time={endDate}
                  />
                );
              }
            });
          })}

          {isFetching && (
            <Box>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="white"
                color="yellow.4"
                size="lg"
              />
            </Box>
          )}
        </VStack>
        <Footer />
      </Flex>
    </Layout>
  );
};

export default History;
