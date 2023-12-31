import Menu from "~/components/friends/Menu";
import Friends from "~/components/friends/Friends";
import Request from "~/components/friends/Request";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const MenuList = (param: {
  totalFriends: number;
  totalRequest: number;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const params = useSearchParams();
  const [state, setState] = useState<string>(
    params.get("status") ?? "my-friends"
  );
  useEffect(() => {
    setState(params.get("status") ?? "my-friends");
  }, [params]);
  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="40px"
      >
        <Menu
          waiting={param.totalFriends}
          isActive={state == "my-friends"}
          onClick={() => {
            setState("my-friends");
          }}
        >
          <Link href="?status=my-friends">
            <Text whiteSpace={"nowrap"}>
            My Friends

            </Text>
          </Link>
        </Menu>
        <Menu
          waiting={param.totalRequest}
          isActive={state == "request"}
          onClick={() => {
            setState("request");
          }}
        >
          <Link href="?status=request">Request</Link>
        </Menu>
      </Flex>
      {state === "my-friends" ? <Friends /> : <Request flexRef={param.ref} />}
    </>
  );
};

export default MenuList;
