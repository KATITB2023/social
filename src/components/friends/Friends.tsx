import { Flex, Text } from "@chakra-ui/react";
import MyFriendCard from "~/components/friends/MyFriendCard";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
import Layout from "~/layout";
import { useInView } from "framer-motion";

const Friends = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    api.friend.friendList.useInfiniteQuery(
      {
        status: "FRIEND",
        limit: 20,
      },
      {
        getNextPageParam: (d) => d.nextCursor,
      }
    );

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bottomView = useInView(bottomRef);

  useEffect(() => {
    if (bottomView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((e) => console.log(e));
    }
  }, [bottomView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Layout title="Friends">
      <Flex
        flexDirection="column"
        gap="2"
        justifyContent="center"
        alignItems="center"
      >
        {data?.pages
          .flatMap((page) => page.data)
          .map((item) => {
            return (
              <MyFriendCard
                image={item.image ?? undefined}
                name={item.name}
                bio={item.bio}
                id={item.id}
                key={item.id}
              />
            );
          })}
        {isFetchingNextPage ? <Text align={"center"}>Loading ...</Text> : <></>}
        <div ref={bottomRef}></div>
      </Flex>
    </Layout>
  );
};

export default Friends;
