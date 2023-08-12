import { NextPage } from "next";
import React, { useEffect } from "react";
import { Flex,} from "@chakra-ui/react";
import TextInput from "./components/TextInput";
import Menu from "./components/Menu";
import Friends from "./components/Friends";
import Request from "./components/Request";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import BackgroundAndNavigationBar from "~/components/profile/BackgroundAndNavigationBar";
import Layout from "~/layout";
import { withSession } from "~/server/auth/withSession";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getServerSideProps = withSession({ force: true });


const ProfileFriends: NextPage = () => {
  const sessionStatus = useSession();
  const router = useRouter();
  if (sessionStatus.status === "unauthenticated") {
    void router.push("/login");
  }
  const params = useSearchParams()
  const [state, setState] = React.useState<string>(params.get('status') ?? 'my-friends')
    useEffect (() => {
        setState(params.get('status') ?? 'my-friends')
    }, [params])
  return (
    <BackgroundAndNavigationBar>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="20px"
        mx="24px"
        my="16px"
      >
        <TextInput />
        <Flex flexDirection="row" justifyContent="center" alignItems='center' gap="40px">
          <Menu isActive={state=='my-friends'} onClick={()=>{setState('my-friends')}}>
            <Link href='?status=my-friends' >My Friends</Link>
          </Menu>

          <Menu waiting={2} isActive={state=='request'} onClick={()=>{setState('request')}}>
            <Link href='?status=request' >Request</Link>
          </Menu>
        </Flex>
        {
            state === 'my-friends' ? (
                <Friends/>
            ) : (
                <Request/>
            )
        }
      </Flex>
    </BackgroundAndNavigationBar>
  );
};

export default ProfileFriends;
