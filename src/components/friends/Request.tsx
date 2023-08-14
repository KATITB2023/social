import { Flex,Box,Spinner, Button } from '@chakra-ui/react'
import React from 'react'
import RequestFriendCard from '~/components/friends/RequestFriendCard'
import { api } from "~/utils/api";
import { useRef,useEffect, useState } from 'react';

const Request = ({flexRef}:{
  flexRef: React.MutableRefObject<HTMLDivElement | null> | null
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const FlexRef = useRef<HTMLDivElement | null>(null);
  const [total, setTotal] = useState<number>(10);
  const { data, isFetching, fetchNextPage, hasNextPage } =
  api.friend.friendList.useInfiniteQuery(
    {
      status: "WAITING_FOR_ACCEPTANCE",
      limit: total,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  useEffect(() => {
    const flexElement = FlexRef.current


    const handleScroll = () => {
      if (
        flexElement &&
        hasNextPage &&
        flexElement.scrollHeight -
          flexElement.scrollTop -
          flexElement.clientHeight <
          20
      ) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          void fetchNextPage();
        }, 250);
      }
    };

    if (flexElement) {
      // Attach the scroll event listener to the VStack element
      flexElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener and timeout on component unmount
    return () => {
      if (flexElement) {
        flexElement.removeEventListener("scroll", handleScroll);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasNextPage]);
  return (
    <Flex ref={FlexRef} flexDirection='column' gap='2' justifyContent='center' alignItems='center' >
      {
        data?.pages.map((page, idx1) => {
            return page.data.map((item,idx2) => {
              return (
                 <RequestFriendCard 
                  key = {`${idx1}-${idx2}`}
                  bio={item.bio}
                  id={item.id}
                  name={item.name}
                  image={item.image ?? undefined}
                 />
              )
            })
        })
      }
      {data && data!.pages[0]!.nextCursor != undefined ? 
        <Button  onClick={() => setTotal(total + 10)}>
          See more
        </Button>
        : 
        <></>
      }
      
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
    </Flex>
  )
}

export default Request